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
  @ApiProperty({ required: true, description: 'name for class' })
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * category id
   */
  @ApiProperty({ required: true, description: 'category of class' })
  @IsNotEmpty()
  @IsString()
  category_id: string;
}
