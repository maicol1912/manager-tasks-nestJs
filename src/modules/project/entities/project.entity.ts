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

    @OneToMany(()=>UserProjectsEntity,(userProjects)=>userProjects.project)
    usersIncludes:UserProjectsEntity[]

    @OneToMany(()=>TaskEntity,(tasks)=>tasks.project)
    tasks:TaskEntity[]
}
