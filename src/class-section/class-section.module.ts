import { Module } from '@nestjs/common';
import { ClassSectionController } from './class-section.controller';
import { ClassSectionService } from './class-section.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSection } from './entities/class-section.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolModule } from 'src/school/school.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassSection]),
    UserModule,
    AuthModule,
    SchoolModule,
  ],
  controllers: [ClassSectionController],
  providers: [ClassSectionService],
})
export class ClassSectionModule {}
