import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateSchoolDto } from './dto/create-school.dto';
import { School } from './entities/school.entity';
import { SchoolClass } from './entities/school-class.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { BoardsService } from 'src/boards/boards.service';
import { ClassCategoryService } from 'src/class-category/class-category.service';
import { ClassService } from 'src/class/class.service';
@Injectable()
export class SchoolService {
  private readonly logger = new Logger('SCHOOL');

  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(SchoolClass)
    private readonly schoolClassRepository: Repository<SchoolClass>,
    private readonly boardService: BoardsService,
    private readonly classCategoryService: ClassCategoryService,
    private readonly classService: ClassService,
  ) {}

  /**
   * it creates a new school.
   * @param createSchoolDto school information that needs to be created.
   * @param user user information of current logged in user.
   * @returns created school information
   */
  async createSchool(
    createSchoolDto: CreateSchoolDto,
    user: User,
  ): Promise<School> {
    const {
      name,
      address,
      branch_name,
      board_id,
      email,
      category_id,
      contact_number,
      is_branch,
    } = createSchoolDto;

    this.logger.log(`Checking if school exists`);
    const school = await this.schoolRepository.findOne({
      where: { name },
    });

    if (school) throw new ConflictException('School already exists');

    const board = await this.boardService.getBoardById(board_id);
    this.logger.log(`Create New School`);
    let newSchool = new School();
    const categories = [];
    for (let i = 0; i < category_id.length; i++) {
      const category = await this.classCategoryService.getClassCategoryById(
        category_id[i],
      );
      categories.push(category);
      newSchool.classCategory = [...categories];
    }

    newSchool.name = name;
    newSchool.branch_name = branch_name;
    newSchool.is_branch = is_branch;
    newSchool.contact_number = contact_number;
    newSchool.board = board;
    newSchool.address = address as JSON;
    newSchool.email = email;
    newSchool.createdBy = user;
    console.log('school :: ', newSchool);
    try {
      newSchool = await this.schoolRepository.save(newSchool);
      // now create a default class for this school for all categories
      this.logger.log(`Creating default classes for school`);
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].classes.length; j++) {
          const classDetails = await this.classService.getClassById(
            categories[i].classes[j].id,
          );
          // console.log("classDetails :: ",classDetails);
          const newSchoolClass = new SchoolClass();
          newSchoolClass.name = classDetails.name;
          newSchoolClass.category = categories[i];
          newSchoolClass.school = newSchool;
          newSchoolClass.createdBy = user;

          // console.log("newSchoolClass :: ",newSchoolClass);
          await this.schoolClassRepository.save(newSchoolClass);
        }
      }
      this.logger.log(`School Created Successfully`);
      return newSchool;
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new ConflictException('School already exists');
      else throw new InternalServerErrorException();
    }
  }

  /**
   * it returns all schools.
   */
  async getSchools() {
    try {
      this.logger.log(`Get all schools`);
      const data = await this.schoolRepository.find({
        relations: {
          schoolClass: true,
          classCategory: true,
          board: true,
        },
      });
      return data;
    } catch (error) {
      this.logger.error('Error while getting schools');
      throw new InternalServerErrorException('Error while getting schools');
    }
  }

  /**
   * it returns school by id.
   * @param id school id
   * @returns school information
   * @throws NotFoundException if school not found
   * @throws InternalServerErrorException if any error occurs
   */
  async getSchoolById(id: string) {
    this.logger.log(`Get school by id`);
    try {
      const data = await this.schoolRepository.findOne({
        where: { id },
        relations: {
          schoolClass: true,
          classCategory: true,
          board: true,
        },
      });
      if (!data) throw new NotFoundException('School not found');
      return data;
    } catch (error) {
      this.logger.error('Error while getting school by id');
      throw new InternalServerErrorException(
        'Error while getting school by id',
      );
    }
  }

  /**
   * it returns scholClass by id.
   * @param id schoolClass id
   * @returns schoolClass information
   * @throws NotFoundException if schoolClass not found
   * @throws InternalServerErrorException if any error occurs
   */
  async getSchoolClassById(id: string) {
    this.logger.log(`Get schoolClass by id`);
    try {
      const data = await this.schoolClassRepository.findOne({
        where: { id },
        relations: {
          school: true,
          category: true,
        },
      });
      if (!data) throw new NotFoundException('SchoolClass not found');
      return data;
    } catch (error) {
      this.logger.error('Error while getting schoolClass by id');
      throw new InternalServerErrorException(
        'Error while getting schoolClass by id',
      );
    }
  }
}
