import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { ProjectEntity } from '../project/entities/project.entity';
import { ProjectService } from '../project/project.service';

@Module({
  imports:[TypeOrmModule.forFeature([TaskEntity,ProjectEntity])],
  controllers: [TasksController],
  providers: [TasksService,ProjectService]
})
export class TasksModule {}
