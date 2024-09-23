import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSyllabusDto } from './dto/create-syllabus.dto';
import { Syllabus } from './entities/syllabus.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsService } from 'src/boards/boards.service';
import { ClassService } from 'src/class/class.service';
import { SubjectsService } from 'src/subjects/subjects.service';
@Injectable()
export class SyllabusService {
  private readonly logger = new Logger('SYLLABUS');

  constructor(
    @InjectRepository(Syllabus)
    private readonly syllabusRepository: Repository<Syllabus>,
    private readonly boardService: BoardsService,
    private readonly classService: ClassService,
    private readonly subjectService: SubjectsService,
  ) {}

  /**
   * it creates a new syllabus.
   * @param createSyllabusDto syllabus information that needs to be created.
   * @returns created syllabus information
   */
  async createSyllabus(
    createSyllabusDto: CreateSyllabusDto,
  ): Promise<Syllabus> {
    const { board_id, class_id, subject_id, syllabus } = createSyllabusDto;

    const boardData = await this.boardService.getBoardById(board_id);
    const classData = await this.classService.getClassById(class_id);
    const subjectData = await this.subjectService.getSubjectById(subject_id);
    this.logger.log(`Checking if syllabus exists`);
    const isSyllabusPresent = await this.syllabusRepository.findOne({
      where: { board: boardData, class: classData, subject: subjectData },
    });
    if (isSyllabusPresent)
      throw new ConflictException('Syllabus already exists');
    const newSyllabus = new Syllabus();
    this.logger.log(`Creating new syllabus`);
    newSyllabus.board = boardData;
    newSyllabus.class = classData;
    newSyllabus.subject = subjectData;
    newSyllabus.syllabus = syllabus;
    try {
      await this.syllabusRepository.save(newSyllabus);
      return newSyllabus;
    } catch (error) {
      this.logger.error(`Failed to create syllabus`);
      throw new InternalServerErrorException('Failed to create syllabus');
    }
  }

  /**
   * it returns all syllabus.
   * @returns all syllabus
   */
  async getAllSyllabus(): Promise<Syllabus[]> {
    try {
      this.logger.log(`Fetching all syllabus`);
      const data = this.syllabusRepository.find({
        relations: { board: true, class: true, subject: true },
      });
      return data;
    } catch (error) {
      this.logger.error(`Failed to fetch syllabus`);
      throw new InternalServerErrorException('Failed to fetch syllabus');
    }
  }

  /**
   * it returns syllabus by id.
   * @param id syllabus id
   * @returns syllabus information
   */
  async getSyllabusById(id: string): Promise<Syllabus> {
    this.logger.log(`Fetching syllabus by id`);
    try {
      const data = await this.syllabusRepository.findOne({
        where: { id },
        relations: { board: true, class: true, subject: true },
      });
      if (!data) throw new NotFoundException('Syllabus not found');
      return data;
    } catch (error) {
      this.logger.error(`Failed to fetch syllabus by id`);
      throw new InternalServerErrorException('Failed to fetch syllabus by id');
    }
  }
}
