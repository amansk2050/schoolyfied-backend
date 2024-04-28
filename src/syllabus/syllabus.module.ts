import { Module } from '@nestjs/common';
import { SyllabusController } from './syllabus.controller';
import { SyllabusService } from './syllabus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Syllabus } from './entities/syllabus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Syllabus])],
  controllers: [SyllabusController],
  providers: [SyllabusService],
})
export class SyllabusModule {}
