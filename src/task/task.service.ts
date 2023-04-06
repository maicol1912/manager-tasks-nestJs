import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import {v4} from "uuid"
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
@Injectable()
export class TaskService {

    getAllTask(){
        return Task.findAll();
    }

    async getTaskById(idTask:string):Promise<Task>{
        //return this.tasks.find(task => task.id ===id)
        const task = await Task.findOne({where:{id:idTask}})
        return task;
    }

    createTask(task:CreateTaskDto){
        const {title,description} = task

        Task.create({
            title,
            description,
            status:TaskStatus.PENDING
        })
        
        return "saved succesfully";
    }

    deleteTask(idTask:string){
        //this.tasks = this.tasks.filter(task => task.id !==id)
        return Task.destroy({where:{id:idTask}})
    }

    async updateTask(id:string,taskUpdate:UpdateTaskDto){
        /*const task = this.getTaskById(id);
        const newTask = Object.assign(task,updatedFiles)
        this.tasks.map(task => task.id === id ? newTask:task);
        return newTask;*/
        const updatedTask = await Task.update(taskUpdate, {
            where: { id },
            returning: true, // devuelve el registro actualizado
          });
        return updatedTask;
    }
}
