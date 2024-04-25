import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ClassCategoryModule } from 'src/class-category/class-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    ClassCategoryModule,
  ],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
