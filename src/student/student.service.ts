import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SchoolService } from "src/school/school.service";
import { UserService } from "src/user/user.service";
import { UserRoles } from "src/user/enums/role.enum";
import * as crypto from "crypto";
@Injectable()
export class StudentService {
  private readonly logger = new Logger("STUDENT");

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly schoolService: SchoolService,
    private readonly userService: UserService
  ) {}

  /**
   * it creates a new student.
   * @param createStudentDto student information that needs to be created.
   * @param user user information of current logged in user.
   * @returns created student information
   */
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const {
        primary_contact_number,
        school_id,
        school_class_id,
        fullName,
        email,
        parent_details,
        medical_details,
      } = createStudentDto;

      this.logger.log(`Generating random password`);
      const password = await this.generateRandomPassword(13);

      this.logger.log(`Creating user`);
      const { user } = await this.userService.createUser({
        fullName,
        email,
        password,
        roles: [UserRoles.STUDENT, UserRoles.USER],
      });

      const school = await this.schoolService.getSchoolById(school_id);
      if (!school) throw new NotFoundException("School not found");

      const schoolClass =
        await this.schoolService.getSchoolClassById(school_class_id);
      if (!schoolClass) throw new NotFoundException("School class not found");

      this.logger.log(`Creating student`);
      const student = this.studentRepository.create({
        user,
        school,
        school_class: schoolClass,
        primary_contact_number,
        parent_details,
        medical_details,
      });
      await this.studentRepository.save(student);
      this.logger.log(`Student created successfully`);
      return student;
    } catch (error) {
      this.logger.error(`Error while creating student ${error.message}`);
      throw new InternalServerErrorException("Error while creating student");
    }
  }

  /**
   * it returns student information by id.
   * @param id student id
   * @returns student information
   */
  async getStudentById(id: string): Promise<Student> {
    try {
      this.logger.log(`Fetching student by id`);
      const student = await this.studentRepository.findOne({
        where: { id },
        relations: {
          user: true,
          school: true,
          school_class: true,
        },
      });
      if (!student) throw new NotFoundException("Student not found");
      this.logger.log(`Student fetched successfully`);
      return student;
    } catch (error) {
      this.logger.error(`Error while fetching student ${error.message}`);
      throw new InternalServerErrorException("Error while fetching student");
    }
  }

  /**
   * geerates random password
   * @param length length of password
   * @returns random password
   * */
  async generateRandomPassword(length: number): Promise<string> {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex") // Convert bytes to hex string
      .slice(0, length); // Trim to desired length
  }
}
