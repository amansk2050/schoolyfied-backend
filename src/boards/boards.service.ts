import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Boards } from './entities/boards.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-boards.dto';
/**
 * This service contain contains methods and business logic related to boards.
 */

@Injectable()
export class BoardsService {
  private readonly logger = new Logger('BOARDS');

  constructor(
    @InjectRepository(Boards)
    private readonly boardsRepository: Repository<Boards>,
  ) {}

  /**
   * it creates a new board.
   * @param createBoardDto board information that needs to be created.
   * @returns created board information
   */
  async createBoard(createBoardDto: CreateBoardDto) {
    const { name, abbr } = createBoardDto;

    this.logger.log(`Checking if board exists`);
    const board = await this.boardsRepository.findOne({
      where: { abbr },
    });

    if (board) throw new ConflictException('Board already exists');

    this.logger.log(`Create New Board`);
    let newBoard = new Boards();
    newBoard.name = name;
    newBoard.abbr = abbr;
    try {
      newBoard = await this.boardsRepository.save(newBoard);
      this.logger.log(`Board Created Successfully`);
      return newBoard;
    } catch (error) {
      console.log(error);
      if (error.code === '23505')
        throw new ConflictException('Boards already exists');
      else throw new InternalServerErrorException();
    }
  }

  /**
   * it returns all boards.
   * @returns all boards
   */
  async getAllBoards(): Promise<Boards[]> {
    this.logger.log('Getting all boards');
    try {
      const boards = await this.boardsRepository.find();
      return boards;
    } catch (error) {
      this.logger.error('Error while getting boards');
      throw new InternalServerErrorException('Error while getting boards');
    }
  }

  /**
   * it returns board by id.
   * @param id board id
   * @returns board
   */
  async getBoardById(id: string): Promise<Boards> {
    this.logger.log(`Getting board by id: ${id}`);
    try {
      const board = await this.boardsRepository.findOne({ where: { id } });
      if (!board) throw new NotFoundException('Board Not Found');
      return board;
    } catch (error) {
      this.logger.error('Error while getting board');
      throw new InternalServerErrorException('Error while getting board');
    }
  }
}
