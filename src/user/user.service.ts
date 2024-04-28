import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import * as crypto from 'crypto';
import { argon2hash } from '../auth/argon2/argon2';
import { InjectRepository } from '@nestjs/typeorm';
/**
 * This service contain contains methods and business logic related to user.
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger('USER');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  /**
   * it updates the user information as per provided information.
   * @param updateUserDto user information that needs to be updated.
   * @param user user information of current logged in user.
   * @returns updated user information
   */
  async updateUserData(updateUserDto: UpdateUserDto, user: User) {
    const { fullName } = updateUserDto;

    const names = fullName.split(' ');

    const firstName = names.splice(0, 1)[0];
    const lastName = names.join(' ');

    this.logger.log(`Checking if user exists`);
    const currentUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!currentUser) throw new NotFoundException('User Not Found');

    this.logger.log(`Create Updated User`);
    if (firstName) currentUser.firstName = firstName;
    if (lastName) currentUser.lastName = lastName;

    if (
      currentUser.firstName === user.firstName &&
      currentUser.lastName === user.lastName
    ) {
      this.logger.log(`User didn't update any data`);
      return user;
    }

    this.logger.log(`Save Updated User`);
    await this.userRepository.save(currentUser);

    this.logger.log('Sending update Confirmation Mail');
    this.mailService.sendConfirmationOnUpdatingUser(user);

    return currentUser;
  }

  /**
   * it creates and saves new user object in database. it also handles password hashing.
   * @param createAuthDto dto object containing user details.
   * @returns newly created user object and activation token.
   */
  async createUser(
    createAuthDto: CreateUserDto,
  ): Promise<{ user: User; activateToken: string }> {
    let { password, fullName, roles } = createAuthDto;

    password = await argon2hash(password); // NOTE: Hash the password

    try {
      // NOTE: Generate user activating token
      const activateToken: string = crypto.randomBytes(32).toString('hex');
      const names = fullName.split(' ');

      let user = new User();

      user.firstName = names.splice(0, 1)[0];
      user.lastName = names.join(' ');
      user.email = createAuthDto.email;
      user.password = password;
      user.roles = roles;

      user.activeToken = crypto
        .createHash('sha256')
        .update(activateToken)
        .digest('hex');

      user = await this.userRepository.save(user);

      return { user, activateToken };
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('Email already exists');
      else throw new InternalServerErrorException();
    }
  }

  /**
   * it checks for user in DB and if not found, creates and saves new user object in database. it is used for google authentication
   * @param user user information provided by google.
   * @returns newly created user object and activation token
   */
  async createOrFindUserGoogle(user: any) {
    const existingUser = await this.userRepository.findOne({
      where: {
        googleID: user.id,
      },
    });

    if (existingUser) return { existingUser, sendMail: false };

    const activateToken: string = crypto.randomBytes(32).toString('hex');

    let newUser = new User();
    newUser.googleID = user.id;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.email = user.email;
    newUser.activeToken = crypto
      .createHash('sha256')
      .update(activateToken)
      .digest('hex');

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (err) {
      if (err.code === '23505')
        throw new ConflictException('User already exists');
      else throw new InternalServerErrorException();
    }

    return { newUser, activateToken, sendMail: true };
  }

  /**
   * it creates password reset token and saves it in user object.
   * @param user user object containing user information.
   * @returns created password reset token.
   */
  async createPasswordResetToken(user: User): Promise<string> {
    const resetToken: string = crypto.randomBytes(32).toString('hex');

    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const timestamp = Date.now() + 10 * 60 * 1000; // NOTE: 10 mins to reset password
    user.passwordResetExpires = timestamp.toString();

    await this.userRepository.save(user); // Use the userRepository to save the user

    return resetToken;
  }
}
