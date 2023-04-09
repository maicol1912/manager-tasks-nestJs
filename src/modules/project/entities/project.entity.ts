import {Column,Entity,OneToMany} from "typeorm"
import { BaseEntity } from "../../../database/base.entity";
import { IProject } from "../../../interfaces/project.interface";
import { UserProjectsEntity } from "../../user/entities/usersProjects.entity";
import { TaskEntity } from "../../../modules/tasks/entities/task.entity";


@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProject {
    @Column()
    name:string;

    @Column()
    description:string

    //TODO: RELACION UNO A MUCHOS CON LA TABLA INTERMEDIA DE PROJECTS USERS QUE REPRESENTA UNA RELACION
    //TODO: MUCHOS A MUCHOS 
    @OneToMany(()=>UserProjectsEntity,(userProjects)=>userProjects.project)
    usersIncludes:UserProjectsEntity[]

    //TODO: RELACION DE UNO A MUCHOS, UN PROYECTO PUEDE TENER MUCHAS TAREAS
    @OneToMany(()=>TaskEntity,(tasks)=>tasks.project)
    tasks:TaskEntity[]
}
