import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Boards } from 'src/boards/entities/boards.entity';
import { Class } from 'src/class/entities/class.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * It describes the schema for class category , ex: pre-primary, primary etc table in database.
 */
@Entity()
export class Syllabus {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * syllabus json feild
   */
  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty()
  syllabus: JSON;

  /**
   * represents activation state of class category.
   */
  @Column({ type: 'boolean', default: true })
  @ApiProperty({ default: true })
  active: boolean;

  /**
   * timestamp for date of class category creation.
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of class category information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => Class, (classes) => classes.syllabus)
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.syllabus)
  subject: Subject;

  @ManyToOne(() => Boards, (board) => board.syllabus)
  board: Boards;
}
