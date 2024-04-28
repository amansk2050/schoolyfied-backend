import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
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
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { School } from './entities/school.entity';
import { SchoolClass } from './entities/school-class.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorators/roles.decorator';
import { UserRoles } from 'src/user/enums/role.enum';
@Controller('school')
@ApiTags('School')
@UseInterceptors(ClassSerializerInterceptor)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  /**
   * POST API - "/create" , This API is used to create a new school.
   * @param CreateSchoolDto
   * @returns created school information
   * @throws ConflictException if school already exists
   */
  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SCHOOL_ADMIN)
  @Roles(UserRoles.SCHOOL_OWNER)
  @Roles(UserRoles.PRINCIPAL)
  @ApiOperation({
    description: 'Create a new School.',
    summary: 'Create a new School.',
  })
  @ApiOkResponse({
    description: 'Create a new School',
    type: School,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createSchool(
    @GetUser() user: User,
    @Body() createSchoolDto: CreateSchoolDto,
  ) {
    const data = await this.schoolService.createSchool(createSchoolDto, user);
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/id" , This API is used to get school information by id.
   * @param id
   * @returns school information
   */
  @Get('/id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get School by Id.',
    summary: 'Get School by Id.',
  })
  @ApiOkResponse({
    description: 'Get School by Id',
    type: School,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async getSchoolById(@Query('id') id: string) {
    const data = await this.schoolService.getSchoolById(id);
    return {
      data,
      status: 'success',
    };
  }
}
