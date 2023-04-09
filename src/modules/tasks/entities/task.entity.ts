import { STATUS_TASK } from "../../../constants/status.task";
import { BaseEntity } from "../../../database/base.entity";
import { ProjectEntity } from "../../../modules/project/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name:'task'})
export class TaskEntity extends BaseEntity {
    @Column()
    taskName: string;

    @Column()
    taskDescription:string;

    @Column({type:'enum',enum:STATUS_TASK})
    status:STATUS_TASK

    @Column()
    responsableName:string;

    //TODO: RELACION DE UNO A MUCHOS, UNA TAREA PUEDE TENER SOLO UN PROYECTO
    @ManyToOne(()=>ProjectEntity,(project)=>project.tasks)
    @JoinColumn({
        name:'project_id'
    })
    project:ProjectEntity
}
