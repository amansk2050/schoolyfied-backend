import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClassDto {
  /**
   * full name  of class
   *
   */
  @ApiProperty({ required: true, description: 'name for class-category' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
