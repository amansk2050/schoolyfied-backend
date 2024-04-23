import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClassCategory } from './entities/class-category.entity';
import { CreateClassCategoryDto } from './dto/create-class-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
/**
 * This service contain contains methods and business logic related to class category.
 */

@Injectable()
export class ClassCategoryService {
  private readonly logger = new Logger('CLASS_CATEGORY');

  constructor(
    @InjectRepository(ClassCategory)
    private readonly classCategoryRepository: Repository<ClassCategory>,
  ) {}

  /**
   * it creates a new class category.
   * @param createClassCategoryDto class category information that needs to be created.
   * @returns created class category information
   */
  async createClassCategory(createClassCategoryDto: CreateClassCategoryDto) {
    const { name, abbr } = createClassCategoryDto;

    this.logger.log(`Checking if class category exists`);
    const classCategory = await this.classCategoryRepository.findOne({
      where: { abbr },
    });

    if (classCategory)
      throw new ConflictException('Class category already exists');

    this.logger.log(`Create New Class Category`);
    let newClassCategory = new ClassCategory();
    newClassCategory.name = name.toLowerCase();
    newClassCategory.abbr = abbr.toLowerCase();
    try {
      newClassCategory =
        await this.classCategoryRepository.save(newClassCategory);
      this.logger.log(`Class Category Created Successfully`);
      return newClassCategory;
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new ConflictException('Class category already exists');
      else throw new InternalServerErrorException();
    }
  }

  /**
   * it returns all class category.
   * @returns all class category
   */
  async getAllClassCategory() {
    try {
      this.logger.log(`Get all class category`);
      const data = await this.classCategoryRepository.find();
      return data;
    } catch (error) {
      this.logger.error('Error while getting class category');
      throw new InternalServerErrorException(
        'Error while getting class category',
      );
    }
  }

  /**
   * it returns class category by id.
   * @param id class category id
   * @returns class category
   */
  async getClassCategoryById(id: string) {
    this.logger.log(`Getting class category by id: ${id}`);
    try {
      const data = await this.classCategoryRepository.findOne({
        where: { id },
      });
      if (!data) throw new NotFoundException('Class category Not Found');
      return data;
    } catch (error) {
      this.logger.error('Error while getting class category');
      throw new InternalServerErrorException(
        'Error while getting class category',
      );
    }
  }
}
