import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
  /**
   * Fullname of user
   */
  @ApiProperty({ required: true, description: "Fullname of user" })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  /**
   * Email of user
   */
  @ApiProperty({ required: true, description: "Email of user" })
  @IsEmail()
  @IsString({ message: "Email can not be only numbers" })
  @IsNotEmpty()
  email: string;

  /**
   * school id
   */
  @ApiProperty({ required: true, description: "school for student" })
  @IsNotEmpty()
  @IsString()
  school_id: string;

  /**
   * school class id
   */
  @ApiProperty({ required: true, description: "school class for student" })
  @IsNotEmpty()
  @IsString()
  school_class_id: string;

  /**
   *  primary contact number
   */
  @ApiProperty({
    required: true,
    description: "primary contact number of student",
  })
  @IsNotEmpty()
  @IsString()
  primary_contact_number: string;

  /**
   *  address of student in json format
   */
  @ApiProperty({ required: true, description: "address of student" })
  @IsNotEmpty()
  address: JSON;

  /**
   *  parents detail of student in json format
   */
  @ApiProperty({ required: true, description: "parents detail of student" })
  @IsNotEmpty()
  parent_details: JSON;

  /**
   * medial deatils
   * */
  @ApiProperty({ required: true, description: "medical details of student" })
  @IsNotEmpty()
  medical_details: JSON;
}
