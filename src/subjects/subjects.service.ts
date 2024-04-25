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
import { Subject } from './entities/subject.entity';
import { CreateSubjectsDto } from './dto/create-subjects.dto';

@Injectable()
export class SubjectsService {
  private readonly logger = new Logger('CLASS_CATEGORY');

  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  /**
   * it creates a new subject.
   * @param createSubjectsDto subject information
   * @returns created subject information
   * @throws ConflictException if subject already exists
   * @throws InternalServerErrorException if any error occurs
   */
  async createSubject(createSubjectsDto: CreateSubjectsDto) {
    const { name } = createSubjectsDto;

    this.logger.log(`Checking if subject exists`);
    const subject = await this.subjectRepository.findOne({
      where: { name },
    });

    if (subject) throw new ConflictException('Subject already exists');

    this.logger.log(`Create New Subject`);
    let newSubject = new Subject();
    newSubject.name = name.toLowerCase();
    try {
      newSubject = await this.subjectRepository.save(newSubject);
      this.logger.log(`Subject Created Successfully`);
      return newSubject;
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new ConflictException('Subject already exists');
      else throw new InternalServerErrorException();
    }
  }

  /**
   * it returns all subjects.
   */
  async getSubjects() {
    try {
      this.logger.log(`Get all subjects`);
      const data = await this.subjectRepository.find();
      return data;
    } catch (error) {
      this.logger.error('Error while getting subjects ');
      throw new InternalServerErrorException('Error while getting subjects ');
    }
  }

  /**
   * it returns subject by id.
   * @param id subject id
   * @throws NotFoundException if subject not found
   */

  async getSubjectById(id: string) {
    try {
      this.logger.log(`Getting subject by id: ${id}`);
      const data = await this.subjectRepository.findOne({ where: { id } });
      if (!data) throw new NotFoundException('Subject not found');
      return data;
    } catch (error) {
      this.logger.error('Error while getting subject ');
      throw new InternalServerErrorException('Error while getting subject ');
    }
  }
}
