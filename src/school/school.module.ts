import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { SchoolClass } from './entities/school-class.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BoardsModule } from 'src/boards/boards.module';
import { ClassCategoryModule } from 'src/class-category/class-category.module';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([School]),
    TypeOrmModule.forFeature([SchoolClass]),
    AuthModule,
    UserModule,
    BoardsModule,
    ClassCategoryModule,
    ClassModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
