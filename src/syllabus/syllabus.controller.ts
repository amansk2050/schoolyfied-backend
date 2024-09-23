import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Syllabus } from './entities/syllabus.entity';
import { CreateSyllabusDto } from './dto/create-syllabus.dto';
import { SyllabusService } from './syllabus.service';

@Controller('syllabus')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('syllabus')
export class SyllabusController {
  constructor(private readonly syllabusService: SyllabusService) {}

  /**
   * POST API - "/create" , This API is used to create a new syllabus.
   * @param createSyllabusDto
   * @returns created syllabus information
   * @throws ConflictException if syllabus already exists
   */
  @Post('/create')
  @HttpCode(201)
  @ApiOperation({
    description: 'Create a new syllabus.',
    summary: 'Create a new syllabus.',
  })
  @ApiOkResponse({ description: 'Create a new syllabus', type: Syllabus })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createSyllabus(@Body() createSyllabusDto: CreateSyllabusDto) {
    const data = await this.syllabusService.createSyllabus(createSyllabusDto);
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/all" , This API is used to get all syllabus.
   * @returns all syllabus
   */
  @Get('/all')
  @HttpCode(200)
  @ApiOperation({
    description: 'Get all syllabus.',
    summary: 'Get all syllabus.',
  })
  @ApiOkResponse({ description: 'Get all syllabus', type: [Syllabus] })
  async getAllSyllabus() {
    const data = await this.syllabusService.getAllSyllabus();
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/:id" , This API is used to get syllabus by id.
   * @param id
   * @returns syllabus information
   */
  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({
    description: 'Get syllabus by id.',
    summary: 'Get syllabus by id.',
  })
  @ApiOkResponse({ description: 'Get syllabus by id', type: Syllabus })
  async getSyllabusById(@Param('id') id: string) {
    const data = await this.syllabusService.getSyllabusById(id);
    return {
      data,
      status: 'success',
    };
  }
}
