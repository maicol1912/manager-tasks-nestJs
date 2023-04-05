import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import {v4} from "uuid"
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
@Injectable()
export class TaskService {
    private tasks:Task[]  = [
        {
            id:v4(),
            title:'first task',
            description: 'some task',
            status:TaskStatus.DONE
        }
    ]

    getAllTask(){
        return this.tasks;
    }

    getTaskById(id:string):Task{
        return this.tasks.find(task => task.id ===id)
    }

    createTask(task:CreateTaskDto){
        const {title,description} = task

        const newTask = {
            id:v4(),
            title,
            description,
            status:TaskStatus.DONE
        }
        this.tasks.push(newTask)
        return newTask;
    }

    deleteTask(id:string){
        this.tasks = this.tasks.filter(task => task.id !==id)
    }

    updateTask(id:string,updatedFiles:UpdateTaskDto):Task{
        const task = this.getTaskById(id);
        const newTask = Object.assign(task,updatedFiles)
        this.tasks.map(task => task.id === id ? newTask:task);
        return newTask;
    }
}
