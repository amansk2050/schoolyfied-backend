import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { School } from 'src/school/entities/school.entity';
import { Syllabus } from 'src/syllabus/entities/syllabus.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * It describes the schema for boards table in database.
 */
@Entity()
export class Boards {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * full name of the school boards
   */
  @Column({ unique: true, default: null })
  @ApiProperty()
  name: string;

  /**
   * abbreviation of user.
   */
  @Column({ length: 50 })
  @ApiProperty()
  abbr: string;

  /**
   * represents activation state of boards.
   */
  @Column({ type: 'boolean', default: true })
  @ApiProperty({ default: true })
  active: boolean;

  /**
   * timestamp for date of boards creation.
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of boards information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Syllabus, (syllabus) => syllabus.board)
  syllabus: Syllabus;

  @OneToMany(() => School, (school) => school.board)
  school: School;

  
}
