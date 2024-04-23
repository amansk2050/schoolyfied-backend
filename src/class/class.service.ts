import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

/**
 * This service contain contains methods and business logic related to class.
 */
@Injectable()
export class ClassService {
  private readonly logger = new Logger('CLASS_CATEGORY');

  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  /**
   * it creates a new class.
   * @param createClassDto class information
   * @returns created class information
   */
  async createClass(createClassDto: CreateClassDto) {
    const { name } = createClassDto;

    this.logger.log(`Checking if class exists`);
    const classCategory = await this.classRepository.findOne({
      where: { name },
    });

    if (classCategory) throw new ConflictException('Class already exists');

    this.logger.log(`Create New Class`);
    let newClass = new Class();
    newClass.name = name.toLowerCase();
    try {
      newClass = await this.classRepository.save(newClass);
      this.logger.log(`Class Created Successfully`);
      return newClass;
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new ConflictException('Class already exists');
      else throw new InternalServerErrorException();
    }
  }

  /**
   * it returns all class.
   */
  async getClasses() {
    try {
      this.logger.log(`Get all class`);
      const data = await this.classRepository.find();
      return data;
    } catch (error) {
      this.logger.error('Error while getting class ');
      throw new InternalServerErrorException('Error while getting class ');
    }
  }

  /**
   * it returns class by id.
   * @param id class id
   */
  async getClassById(id: string) {
    try {
      this.logger.log(`Getting class by id: ${id}`);
      const data = await this.classRepository.findOne({ where: { id } });
      if (!data) throw new NotFoundException('Class not found');
      return data;
    } catch (error) {
      this.logger.error('Error while getting class');
      throw new InternalServerErrorException('Error while getting class');
    }
  }

  /**
   * it updates class information
   * @param id class id
   * @param UpdateClassDto class information
   * @returns updated class information
   */
  async updateClass(id: string, updateClassDto: UpdateClassDto) {
    const { name, active } = updateClassDto;

    this.logger.log(`Checking if class exists`);
    console.log(id);
    const existingClass = await this.classRepository.findOneBy({ id });

    if (!existingClass) throw new NotFoundException('Class not found');

    if (name) {
      const classWithName = await this.classRepository.findOne({
        where: { name },
      });
      if (classWithName)
        throw new ConflictException('Class with the given name already exists');
      existingClass.name = name.toLowerCase();
    }

    if (active !== undefined) {
      existingClass.active = active;
    }

    try {
      const updatedClass = await this.classRepository.save(existingClass);
      this.logger.log(`Class Updated Successfully`);
      return updatedClass;
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new ConflictException('Class already exists');
      else throw new InternalServerErrorException();
    }
  }
}
