import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateClassDto {
  /**
   * full name  of class
   *
   */
  @ApiProperty({ description: 'name for class-category' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * active status of class
   */
  @ApiPropertyOptional({
    description: 'active status for class',
  })
  @IsOptional()
  @IsBoolean()
  active: boolean;
}
