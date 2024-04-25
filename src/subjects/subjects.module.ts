import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
