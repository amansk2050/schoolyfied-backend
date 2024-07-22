import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClassSectionDto {
  /**
   * name of the section
   */
  @ApiProperty({ required: true, description: 'name of the section' })
  @IsNotEmpty()
  @IsString()
  section_name: string;

  /**
   * syllabus array of object
   */
  @ApiProperty({ required: true, description: 'syllabus array of object ' })
  @IsNotEmpty()
  syllabus: JSON;


  /**
   * class teacher
   */
  @ApiProperty({ required: true, description: 'class teacher' })
  @IsNotEmpty()
  @IsString()
  class_teacher: string;

  /**
   * class monitor
   */
  @ApiProperty({ required: true, description: 'class monitor' })
  @IsNotEmpty()
  @IsString()
  class_monitor: string;

  /**
   * school class id
   */
  @ApiProperty({ required: true, description: 'school class id' })
  @IsNotEmpty()
  @IsString()
  school_class: string;
}
