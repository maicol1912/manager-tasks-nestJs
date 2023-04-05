import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import {v4} from "uuid"
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

    createTask(task:Task){
        this.tasks.push(task)
        return task;
    }

    updateTask(){}

    deleteTask(){}
}
