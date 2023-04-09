import { Injectable } from '@nestjs/common';
import { CreateTasksDTO } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {
  //TODO: PARA INJECTAR EL @INJECTREPOSIUTORY NECESITAMOS IMPORTAR EL TYPEORM MODULE FORFEATURE
  constructor(
    @InjectRepository(TaskEntity)private readonly taskRepository:Repository<TaskEntity>,
    private readonly projectService: ProjectService
  ){}

  public async createTask(body: CreateTasksDTO,projectId:string):Promise<TaskEntity>{
    try {
      const project = await this.projectService.findOne(projectId)
      if(project === undefined){
        throw new ErrorManager({
          type:'NOT_FOUND',
          message:'No se ha encontrado el proyecto'
        })
      }
      //TODO: ESTAMOS ENVIANDO EL PROJECTO EL CUAL HARA REFERNCIA POR MEDIO DEL JOIN COLUMN
      //TODO: EN ESTE CASO PARA QUE ESTA TAREA QUEDE REALACIONADA AL PROYECTO QUE NOSOTROS DEFINAMOS
      //TODO: ASIGNAMOS EL OBJETO DE PROYECTO AL PROYECTO
      body.project = project
      return await this.taskRepository.save(body)
      
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
    
  }
  
}
