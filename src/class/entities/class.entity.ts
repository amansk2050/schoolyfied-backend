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
 * It describes the schema for class category , ex: pre-primary, primary etc table in database.
 */
@Entity('class')
export class Class {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * full name of class
   */
  @Column({ unique: true, default: null })
  @ApiProperty()
  name: string;



  /**
   * represents activation state of class.
   */
  @Column({ type: 'boolean', default: true })
  @ApiProperty({ default: true })
  active: boolean;

  /**
   * timestamp for date of class  creation.
   */
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  /**
   * timestamp for date of class information updation.
   */
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
