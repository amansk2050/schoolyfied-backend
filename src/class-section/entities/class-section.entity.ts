import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Boards } from 'src/boards/entities/boards.entity';
import { ClassCategory } from 'src/class-category/entities/class-category.entity';
import { Syllabus } from 'src/syllabus/entities/syllabus.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SchoolClass } from 'src/school/entities/school-class.entity';

/**
 * It describes the schema for class_section table in database.
 */
@Entity('class_section')
export class ClassSection {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * name of the section
   */
  @Column({ default: null })
  @ApiProperty()
  section_name: string;

  /**
   * syllabus array of object it is not mapping
   */
  @Column({ type: 'jsonb', default: null })
  @ApiProperty()
  syllabus: JSON;

  /**
   * status of the true or false
   * default is true
   */
  @Column({ default: true })
  @ApiProperty()
  status: boolean;

  /**
   * created by
   */
  @ManyToOne(() => User, (user) => user.class_section)
  @ApiProperty()
  created_by: User;

  /**
   * updated by
   */
  @ManyToOne(() => User, (user) => user.class_section_user)
  @ApiProperty()
  updated_by: User;

  /**
   * class teacher
   */
  @ManyToOne(() => User, (user) => user.class_teacher)
  @ApiProperty()
  class_teacher: User;

  /**
   * class monitor
   */
  @ManyToOne(() => User, (user) => user.class_monitor)
  @ApiProperty()
  class_monitor: User;

  /**
   * school class id
   */
  @ManyToOne(() => SchoolClass, (school_class) => school_class.class_section)
  @ApiProperty()
  school_class: SchoolClass;

  /**
   * created at timestamp
   */
  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  /**
   * updated at timestamp
   */
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
