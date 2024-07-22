import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Boards } from 'src/boards/entities/boards.entity';
import { ClassCategory } from 'src/class-category/entities/class-category.entity';
import { Syllabus } from 'src/syllabus/entities/syllabus.entity';
import { User } from 'src/user/entities/user.entity';
import { ClassSection } from 'src/class-section/entities/class-section.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './school.entity';

/**
 * It describes the schema for school_class table in database.
 */
@Entity('school_class')
export class SchoolClass {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * name of the class
   */
  @Column({ unique: true, default: null })
  @ApiProperty()
  name: string;

  /**
   * class category id
   */
  @ManyToOne(() => ClassCategory, (classCategory) => classCategory.schoolClass)
  @ApiProperty()
  category: ClassCategory;

  @ManyToOne(() => School, (school) => school.schoolClass)
  @ApiProperty()
  school: School;

  /**
   * represents activation state of class.
   */
  @Column({ type: 'boolean', default: true })
  @ApiProperty({ default: true })
  active: boolean;

  /**
   * timestamp for date of class creation.
   * */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of class information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  /**
   * is section
   */
  @Column({ type: 'boolean', default: false })
  @ApiProperty({ default: false })
  is_section: boolean;

  @ManyToOne(() => User, (User) => User.schoolClass)
  createdBy: User;

  @OneToMany(() => ClassSection, (classSection) => classSection.school_class)
  class_section: ClassSection;
}
