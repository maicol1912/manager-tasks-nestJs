import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService:TaskService){}

  @Get()
  getTasks() {
    return this.taskService.getAllTask()
  }

  @Post()
  createTask(@Body()task:Task) {
    return this.taskService.createTask(task)
  }
}
