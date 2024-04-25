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
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassService } from './class.service';
import { UpdateClassDto } from './dto/update-class.dto';
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  /**
   * POST API - "/create" , This API is used to create a new class.
   * @param createClassDto
   * @returns created class information
   * @throws ConflictException if class already exists
   */
  @Post('/create')
  @ApiOperation({
    description: 'Create a new class.',
    summary: 'Create a new class.',
  })
  @ApiOkResponse({
    description: 'Create a new class',
    type: Class,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createClass(@Body() createClassDto: CreateClassDto) {
    const data = await this.classService.createClass(createClassDto);
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/all" , This API is used to get all class.
   * @returns all class information
   */
  @Get('/all')
  @ApiOperation({
    description: 'Get all class.',
    summary: 'Get all class.',
  })
  @ApiOkResponse({
    description: 'Get all class',
    type: [Class],
  })
  async getClasses() {
    const data = await this.classService.getClasses();
    return {
      data,
      status: 'success',
    };
  }

  /**
   * PATCH API - "/update" , This API is used to update class information
   * @param id class id
   * @param UpdateClassDto class information
   * @returns updated class information
   * @throws NotFoundException if class not found
   */
  @Patch('/update')
  @ApiOperation({
    description: 'Update class information',
    summary: 'Update class information',
  })
  @ApiOkResponse({
    description: 'Update class information',
    type: Class,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async updateClass(
    @Query('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    const data = await this.classService.updateClass(id, updateClassDto);
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/id" , This API is used to get class by id
   * @param id class id
   * @returns class information
   * @throws NotFoundException if class not found
   */
  @Get('/id')
  @ApiOperation({
    description: 'Get class by id.',
    summary: 'Get class by id.',
  })
  @ApiOkResponse({
    description: 'Get class by id',
    type: Class,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async getClassById(@Query('id') id: string) {
    const data = await this.classService.getClassById(id);
    return {
      data,
      status: 'success',
    };
  }
}
