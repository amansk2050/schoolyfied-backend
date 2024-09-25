import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorators/roles.decorator';
import { UserRoles } from 'src/user/enums/role.enum';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { User } from 'src/user/entities/user.entity';
@Controller('student')
@ApiTags('Student')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /**
   * POST API - "/create" , This API is used to create a new student.
   * @param CreateStudentDto
   * @returns created student information
   * @throws ConflictException if student already exists
   * @throws NotFoundException if user not found
   * @throws NotFoundException if school not found
   * @throws NotFoundException if school class not found
   * */
  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SCHOOL_ADMIN)
  @Roles(UserRoles.PRINCIPAL)
  @Roles(UserRoles.TEACHER)
  @ApiOperation({
    description: 'Create a new Student.',
    summary: 'Create a new Student.',
  })
  @ApiOkResponse({
    description: 'Create a new Student',
    type: Student,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createStudent(
    @GetUser() user: User,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    const data = await this.studentService.createStudent(createStudentDto);
    return {
      data,
      message: 'Student created successfully',
    };
  }

  /**
   * GET API - "/id" , This API is used to get student information by id.
   * @param id
   * @returns student information
   */
  @Get('/id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get Student by Id.',
    summary: 'Get Student by Id.',
  })
  @ApiOkResponse({
    description: 'Get Student by Id',
    type: Student,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async getStudentById(@GetUser() user: User, @Query('id') id: string) {
    const data = await this.studentService.getStudentById(id);
    return {
      data,
      message: 'Student fetched successfully',
    };
  }
}
