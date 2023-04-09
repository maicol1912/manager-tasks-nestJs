import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDTO } from './dto/create-task.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AccessLevelGuard } from '../auth/guards/access-level.guard';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //TODO: ESTE API HEADER SE USA PARA DEFINIR QUE SE NECESITA ENVIAR UN TOKEN POR AUTORIZATION PARA 
  //TODO: PODER ACCEDER AL RECURSO
  @ApiHeader({
    name: 'auth_token'
  })
  //TODO: EL API PARAM SE USA PARA DEFINIR EN SWAGGER QUE PARAMETRO RECIBE ESE ENDPOINT
  @ApiParam({
    name: 'projectId'
  })
  @Post('create/:projectId')
  public async create(@Body() createTaskDto: CreateTasksDTO,@Param('projectId')projectId:string) {
    return this.tasksService.createTask(createTaskDto,projectId);
  }
}
