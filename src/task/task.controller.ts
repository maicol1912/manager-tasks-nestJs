import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService:TaskService){}

  @Get()
  getTasks() {
    return this.taskService.getAllTask()
  }

  @Get(':id')
  getTaskById(@Param('id')id:string) {
    return this.taskService.getTaskById(id)
  }

  @Post()
  createTask(@Body()task:CreateTaskDto) {
    return this.taskService.createTask(task)
  }

  @Delete(':id')
  deleteTask(@Param('id')id:string){
    return this.taskService.deleteTask(id)
  }

  @Patch(':id')
  updateTask(@Param('id')id:string,@Body()taskUpdated:UpdateTaskDto){
    return this.taskService.updateTask(id,taskUpdated)
  }
}
