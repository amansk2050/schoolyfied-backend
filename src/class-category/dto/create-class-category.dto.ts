import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClassCategoryDto {
  /**
   * full name  of class-category
   *
   */
  @ApiProperty({ required: true, description: 'name for class-category' })
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * abbreviation of class-category
   */
  @ApiPropertyOptional({
    required: true,
    description: 'abbreviation for class-category',
  })
  @IsNotEmpty()
  @IsString()
  abbr: string;

}
