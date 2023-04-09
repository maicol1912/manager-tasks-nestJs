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
  //TODO: NECESITAMOS IMPORTAR LOS MODULOS NECESARIOS ASI COMO EL DE PROVIDERS
  imports:[
    TypeOrmModule.forFeature([ProjectEntity,UserProjectsEntity]),
    ProvidersModule
  ],
  //TODO: IMPORTAR LOS SERVICIOS NECESARIOS
  providers: [ProjectService,UserService,HttpCustomService],
  controllers: [ProjectController],
})
export class ProjectModule {}
