import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ClassSection } from "./entities/class-section.entity";
import { CreateClassSectionDto } from "./dto/create-class-section.dto";
import { SchoolService } from "src/school/school.service";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";
@Injectable()
export class ClassSectionService {
  private readonly logger = new Logger("CLASS_SECTION");

  constructor(
    @InjectRepository(ClassSection)
    private readonly classSectionRepository: Repository<ClassSection>,
    private readonly schoolClassService: SchoolService,
    private readonly userService: UserService
  ) {}

  /**
   * it creates a new class section.
   * @param createClassSectionDto class section information that needs to be created.
   * @returns created class section information
   * @throws ConflictException if class section already exists
   * @throws InternalServerErrorException if any error occurs in case of other errors
   */
  async createClassSection(
    createClassSectionDto: CreateClassSectionDto,
    user: User
  ) {
    const {
      section_name,
      syllabus,
      class_teacher,
      class_monitor,
      school_class,
    } = createClassSectionDto;

    this.logger.log(`Checking if class section exists`);
    const classSection = await this.classSectionRepository.findOne({
      where: { section_name },
    });

    if (classSection)
      throw new ConflictException("Class section already exists");

    let schoolClass =
      await this.schoolClassService.getSchoolClassById(school_class);
    let classTeacher = await this.userService.getUserById(class_teacher);
    let classMonitor = await this.userService.getUserById(class_monitor);
    this.logger.log(`Create New Class Section`);
    let newClassSection = new ClassSection();
    newClassSection.section_name = section_name;
    newClassSection.syllabus = syllabus;
    newClassSection.created_by = user;
    newClassSection.updated_by = user;
    newClassSection.class_teacher = classTeacher;
    newClassSection.class_monitor = classMonitor;
    newClassSection.school_class = schoolClass;

    try {
      await this.classSectionRepository.save(newClassSection);
      return newClassSection;
    } catch (error) {
      this.logger.error(`Failed to create class section`, error.stack);
      throw new InternalServerErrorException("Failed to create class section");
    }
  }

  /**
   * it returns all class sections by SchoolClass id.
   * @param school_class_id school class id
   * @returns class sections of the school class
   * @throws NotFoundException if school class not found
   */
  async getClassSectionsBySchoolClassId(school_class_id: string) {
    this.logger.log(`Get class sections by school class id`);
    const schoolClass =
      await this.schoolClassService.getSchoolClassById(school_class_id);
    const classSections = await this.classSectionRepository.find({
      where: { school_class: schoolClass },
    });

    if (!classSections || classSections.length === 0)
      throw new NotFoundException("Class sections not found");
    return classSections;
  }

  /**
   * it returns class section by id.
   * @param id class section id
   * @returns class section information
   * @throws NotFoundException if class section not found
   */
  async getClassSectionById(id: string) {
    this.logger.log(`Get class section by id`);
    const classSection = await this.classSectionRepository.findOne({
      where: { id },
    });

    if (!classSection) throw new NotFoundException("Class section not found");
    return classSection;
  }
}
