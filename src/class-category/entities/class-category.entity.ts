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
@Entity()
export class ClassCategory {
  /**
   * auto-generated unique uuid primary key for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  /**
   * full name of class-category
   */
  @Column({ unique: true, default: null })
  @ApiProperty()
  name: string;

  /**
   * abbreviation of class-category
   */
  @Column({ length: 50 })
  @ApiProperty()
  abbr: string;


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
}
