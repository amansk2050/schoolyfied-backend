import { Module } from '@nestjs/common';
import { SyllabusController } from './syllabus.controller';
import { SyllabusService } from './syllabus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Syllabus } from './entities/syllabus.entity';
import { BoardsModule } from 'src/boards/boards.module';
import { SubjectsModule } from 'src/subjects/subjects.module';
import { ClassModule } from 'src/class/class.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Syllabus]),
    BoardsModule,
    SubjectsModule,
    ClassModule,
  ],
  controllers: [SyllabusController],
  providers: [SyllabusService],
  exports: [SyllabusService],
})
export class SyllabusModule {}
