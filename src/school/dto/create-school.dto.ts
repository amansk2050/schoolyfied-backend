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

export class CreateSchoolDto {
  /**
   * full name  of school
   *
   */
  @ApiProperty({ required: true, description: 'name for school' })
  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * branch name  of school
   *
   */
  @ApiProperty({ required: true, description: 'name for school' })
  @IsString()
  branch_name: string;

  /**
   * Board id
   */
  @ApiProperty({ required: true, description: 'board for school' })
  @IsNotEmpty()
  @IsString()
  board_id: string;

  /**
   * category id array of category id
   */
  @ApiProperty({ required: true, description: 'category of school' })
  @IsNotEmpty()
  @IsArray()
  category_id: string[];

  /**
   * address of school json data
   */
  @ApiProperty({ required: true, description: 'address of school' })
  @IsNotEmpty()
  @IsJSON()
  address: object;

  /**
   * email of school
   */
  @ApiProperty({ required: true, description: 'email of school' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * phone of school
   */
  @ApiProperty({ required: true, description: 'contact number of school' })
  @IsNotEmpty()
  @IsArray()
  contact_number: string[];

  /**
   * is branch of school
   */
  @ApiPropertyOptional({ required: false, description: 'is branch of school' })
  @IsNotEmpty()
  @IsBoolean()
  is_branch: boolean;
}
