import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
import { Subject } from './entities/subject.entity';
import { CreateSubjectsDto } from './dto/create-subjects.dto';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
@ApiTags('Subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  /**
   * POST API - "/create" , This API is used to create a new subject.
   * @param createSubjectsDto
   * @returns created subject information
   * @throws ConflictException if subject already exists
   */
  @Post('/create')
  @ApiOperation({
    description: 'Create a new subject.',
    summary: 'Create a new subject.',
  })
  @ApiOkResponse({
    description: 'Create a new subject',
    type: Subject,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createSubject(@Body() createSubjectsDto: CreateSubjectsDto) {
    const data = await this.subjectsService.createSubject(createSubjectsDto);
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/all" , This API is used to get all subjects.
   * @returns all subject information
   */
  @Get('/all')
  @ApiOperation({
    description: 'Get all subjects.',
    summary: 'Get all subjects.',
  })
  @ApiOkResponse({
    description: 'Get all subjects',
    type: [Subject],
  })
  async getSubjects() {
    const data = await this.subjectsService.getSubjects();
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/id" , This API is used to get a subject by id.
   * @param id
   * @returns subject information
   */
  @Get('/id')
  @ApiOperation({
    description: 'Get a subject by id.',
    summary: 'Get a subject by id.',
  })
  @ApiOkResponse({
    description: 'Get a subject by id',
    type: Subject,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async getSubjectById(@Param('id') id: string) {
    const data = await this.subjectsService.getSubjectById(id);
    return {
      data,
      status: 'success',
    };
  }
}
