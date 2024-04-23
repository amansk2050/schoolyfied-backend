import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBoardDto {
  /**
   * full name  of boards
   */
  @ApiProperty({ required: true, description: 'full name for boards' })
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * abbreviation of boards
   */
  @ApiPropertyOptional({ required: true, description: 'abbreviation for boards' })
  @IsNotEmpty()
  @IsString()
  abbr: string;
}
