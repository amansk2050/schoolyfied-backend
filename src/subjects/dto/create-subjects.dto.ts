import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubjectsDto {
  /**
   * full name  of class
   *
   */
  @ApiProperty({ required: true, description: 'name for subject' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
