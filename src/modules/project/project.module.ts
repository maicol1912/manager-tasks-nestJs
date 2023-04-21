import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { UserProjectsEntity } from '../user/entities/usersProjects.entity';
import { UserService } from '../user/user.service';
import { ProvidersModule } from '../providers/providers.module';
import { HttpCustomService } from '../providers/providers.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProjectEntity,UserProjectsEntity]),
    ProvidersModule
  ],
  providers: [ProjectService,UserService,HttpCustomService],
  controllers: [ProjectController],
})
export class ProjectModule {}
