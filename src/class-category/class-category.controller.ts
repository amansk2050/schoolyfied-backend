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
import { ClassCategory } from './entities/class-category.entity';
import { CreateClassCategoryDto } from './dto/create-class-category.dto';
import { ClassCategoryService } from './class-category.service';

@Controller('class-category')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('class-category')
export class ClassCategoryController {
  constructor(private readonly classCategoryService: ClassCategoryService) {}

  /**
   * POST API - "/create" , This API is used to create a new class category.
   * @param createClassCategoryDto
   * @returns created class category information
   * @throws ConflictException if class category already exists
   */
  @Post('/create')
  @ApiOperation({
    description: 'Create a new class category.',
    summary: 'Create a new class category.',
  })
  @ApiOkResponse({
    description: 'Create a new class category',
    type: ClassCategory,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createClassCategory(
    @Body() createClassCategoryDto: CreateClassCategoryDto,
  ) {
    const data = await this.classCategoryService.createClassCategory(
      createClassCategoryDto,
    );
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/all" , This API is used to get all class category.
   * @returns all class category
   */
  @Get('/all')
  @ApiOperation({
    description: 'Get all class category.',
    summary: 'Get all class category.',
  })
  @ApiOkResponse({
    description: 'Get all class category',
    type: [ClassCategory],
  })
  async getAllClassCategory() {
    const data = await this.classCategoryService.getAllClassCategory();
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/id" , This API is used to get class category by id
   * @param id
   * @returns class category information
   * @throws NotFoundException if class category not found
   */
  @Get('/id')
  @ApiOperation({
    description: 'Get class category by id.',
    summary: 'Get class category by id.',
  })
  @ApiOkResponse({
    description: 'Get class category by id',
    type: ClassCategory,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async getClassCategoryById(@Query('id') id: string) {
    const data = await this.classCategoryService.getClassCategoryById(id);
    return {
      data,
      status: 'success',
    };
  }
}
