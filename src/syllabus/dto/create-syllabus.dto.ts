import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSyllabusDto {
  /**
   * board id
   */
  @ApiProperty({ required: true, description: 'board for school' })
  @IsNotEmpty()
  @IsString()
  board_id: string;

  /**
   * class id array of class id
   */
  @ApiProperty({ required: true, description: 'class of school' })
  @IsNotEmpty()
  @IsString()
  class_id: string;

  /**
   * subject id
   */
  @ApiProperty({ required: true, description: 'subject for school' })
  @IsNotEmpty()
  @IsString()
  subject_id: string;

  /**
   * syllabus in json format
   */
  @ApiProperty({ required: true, description: 'syllabus for school' })
  @IsNotEmpty()
  syllabus: JSON;
}
