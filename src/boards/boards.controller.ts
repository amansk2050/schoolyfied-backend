import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiOperation,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Boards } from './entities/boards.entity';
import { CreateBoardDto } from './dto/create-boards.dto';
import { BoardsService } from './boards.service';

@Controller('boards')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  /**
   * POST API - "/create" , This API is used to create a new board.
   * @param createBoardDto
   * @returns created board information
   * @throws ConflictException if board already exists
   */
  @Post('/create')
  @ApiOperation({
    description: 'Create a new board.',
    summary: 'Create a new board.',
  })
  @ApiOkResponse({ description: 'Create a new board', type: Boards })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    const data = await this.boardsService.createBoard(createBoardDto);
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/all" , This API is used to get all boards.
   * @returns all boards
   */
  @Get('/all')
  @ApiOperation({
    description: 'Get all boards.',
    summary: 'Get all boards.',
  })
  @ApiOkResponse({ description: 'Get all boards', type: [Boards] })
  async getAllBoards() {
    const data = await this.boardsService.getAllBoards();
    return {
      data,
      status: 'success',
    };
  }

  /**
   * GET API - "/id" , This API is used to get a board by id.
   * @param id
   * @returns board information
   * @throws NotFoundException if board not found
   * @throws BadRequestException if invalid id
   */
  @Get('/id')
  @ApiOperation({
    description: 'Get a board by id.',
    summary: 'Get a board by id.',
  })
  @ApiOkResponse({ description: 'Get a board by id', type: Boards })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  async getBoardById(@Query('id') id: string) {
    const data = await this.boardsService.getBoardById(id);
    return {
      data,
      status: 'success',
    };
  }
}
