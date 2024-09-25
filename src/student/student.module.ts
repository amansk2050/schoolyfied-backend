import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BoardsModule } from 'src/boards/boards.module';
import { Student } from './entities/student.entity';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    AuthModule,
    UserModule,
    BoardsModule,
    SchoolModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
