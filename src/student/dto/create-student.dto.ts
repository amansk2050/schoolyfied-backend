import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  /**
   * user id
   */
  @ApiProperty({ required: true, description: 'user for student' })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  /**
   * school id
   */
  @ApiProperty({ required: true, description: 'school for student' })
  @IsNotEmpty()
  @IsString()
  school_id: string;

  /**
   * school class id
   */
  @ApiProperty({ required: true, description: 'school class for student' })
  @IsNotEmpty()
  @IsString()
  school_class_id: string;

  /**
   *  primary contact number
   */
  @ApiProperty({
    required: true,
    description: 'primary contact number of student',
  })
  @IsNotEmpty()
  @IsString()
  primary_contact_number: string;

  /**
   *  address of student in json format
   */
  @ApiProperty({ required: true, description: 'address of student' })
  @IsNotEmpty()
  address: JSON;

  /**
   *  parents detail of student in json format
   */
  @ApiProperty({ required: true, description: 'parents detail of student' })
  @IsNotEmpty()
  parent_details: JSON;

  /**
   * medial deatils
   * */
  @ApiProperty({ required: true, description: 'medical details of student' })
  @IsNotEmpty()
  medical_details: JSON;
}
