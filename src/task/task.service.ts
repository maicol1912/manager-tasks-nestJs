import { Injectable } from '@nestjs/common';
import { Task, TaskStatusEnum } from './entities/task.entity';
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

    async createTask(task:CreateTaskDto){
        const {title,description} = task

        await Task.create({
            title,
            description,
            status:TaskStatusEnum.PENDING,
        })
        
        return {"message":"saved succesfully"};
    }

    async deleteTask(idTask:string){
        //this.tasks = this.tasks.filter(task => task.id !==id)
        const task = Task.findOne({where:{id:idTask}})
        await Task.destroy({where:{id:idTask}})
        return 
    }

    async updateTask(id:string,taskUpdate:UpdateTaskDto):Promise<Task>{
        /*const task = this.getTaskById(id);
        const newTask = Object.assign(task,updatedFiles)
        this.tasks.map(task => task.id === id ? newTask:task);
        return newTask;*/
        const updatedTask = await Task.update(taskUpdate, {
            where: { id },
            returning: true, // devuelve el registro actualizado
          });
        return updatedTask[0][1];
    }
}
