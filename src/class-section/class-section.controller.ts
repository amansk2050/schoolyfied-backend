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

import { ClassSectionService } from './class-section.service';
import { CreateClassSectionDto } from './dto/create-class-section.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorators/roles.decorator';
import { UserRoles } from 'src/user/enums/role.enum';
import { ClassSection } from './entities/class-section.entity';

@Controller('class-section')
@ApiTags('Class Section')
@UseInterceptors(ClassSerializerInterceptor)
export class ClassSectionController {
  constructor(private readonly classSectionService: ClassSectionService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SCHOOL_ADMIN)
  @Roles(UserRoles.SCHOOL_OWNER)
  @Roles(UserRoles.PRINCIPAL)
  @ApiOperation({
    description: 'Create a new Class Section.',
    summary: 'Create a new Class Section.',
  })
  @ApiOkResponse({
    description: 'Create a new Class Section',
    type: ClassSection,
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createClassSection(
    @GetUser() user: User,
    @Body() createClassSectionDto: CreateClassSectionDto,
  ) {
    return this.classSectionService.createClassSection(
      createClassSectionDto,
      user,
    );
  }

  /**
   * GET API - "/id" , This API is used to get class section by id.
   * @param id
   * @returns class section information
   * @throws NotFoundException if class section not
   */
  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.PRINCIPAL)
  @ApiOperation({
    description: 'Get Class Section by Id.',
    summary: 'Get Class Section by Id.',
  })
  @ApiOkResponse({
    description: 'Get Class Section by Id',
    type: ClassSection,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async getClassSectionById(@Param('id') id: string) {
    const data = this.classSectionService.getClassSectionById(id);
    return {
      data,
      status: 'success',
    };
  }
}
