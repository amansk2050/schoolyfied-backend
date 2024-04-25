import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * It describes the schema for subject category , ex: math, science etc table in database.
 */
@Entity('subject')
export class Subject {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * full name of subject
   */
  @Column({ unique: true, default: null })
  @ApiProperty()
  name: string;

  /**
   * represents activation state of subject.
   */
  @Column({ type: 'boolean', default: true })
  @ApiProperty({ default: true })
  active: boolean;

  /**
   * timestamp for date of subject  creation.
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of subject information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
