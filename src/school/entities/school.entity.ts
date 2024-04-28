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
import { SchoolClass } from './school-class.entity';

/**
 * It describes the schema for school table in database.
 */
@Entity('school')
export class School {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * full name of school
   */
  @Column({ unique: true, default: null })
  @ApiProperty()
  name: string;

  /**
   * branch name of school
   * ex: branch1, branch2 etc
   */
  @Column({ default: null })
  @ApiProperty()
  branch_name: string;

  /**
   * school address in json format
   */
  @Column({ type: 'json', default: null })
  @ApiProperty()
  address: JSON;

  /**
   * school contact number can be multiple stored in array of strings
   */
  @Column({ type: 'simple-array', default: null })
  @ApiProperty()
  contact_number: string[];

  /**
   * school email address
   */
  @Column({ default: null })
  @ApiProperty()
  email: string;

  /**
   * school website
   */
  @Column({ default: null })
  @ApiProperty()
  website: string;

  /**
   * school logo
   */
  @Column({ default: null })
  @ApiProperty()
  logo: string;

  /**
   * is branch
   */
  @Column({ type: 'boolean', default: false })
  @ApiProperty({ default: false })
  is_branch: boolean;

  /**
   * represents activation state of school.
   */
  @Column({ type: 'boolean', default: true })
  @ApiProperty({ default: true })
  active: boolean;

  /**
   * timestamp for date of school  creation.
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of school information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => Boards, (board) => board.school)
  board: Boards;

  @ManyToOne(() => User, (User) => User.school)
  createdBy: User;

  @ManyToMany(() => ClassCategory)
  @JoinTable()
  classCategory: ClassCategory[];

  @OneToMany(() => SchoolClass, (schoolClass) => schoolClass.school)
  schoolClass: SchoolClass;
}
