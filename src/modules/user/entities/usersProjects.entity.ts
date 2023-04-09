import { Entity,Column,ManyToOne } from 'typeorm';
import { ACCESS_LEVEL } from "../../../constants/roles";
import { BaseEntity } from "../../../database/base.entity";
import { UserEntity } from './user.entity';
import { ProjectEntity } from '../../../modules/project/entities/project.entity';

@Entity({name:'users-projects'})
export class UserProjectsEntity extends BaseEntity{

    @Column({type:'enum',enum:ACCESS_LEVEL})
    accessLevel:ACCESS_LEVEL

    //TODO: RELACION DE MUCHOS A UNO CON LA TABLA DE USUARIOS, ESTA ES UNA TABLA INTERMETDIA ENTRE PROJECTS Y USERS
    @ManyToOne(()=> UserEntity,(user)=> user.projectsIncludes)
    user: UserEntity;
    //
    //TODO: RELACION DE MUCHOS A UNO CON LA TABLA DE PROJECTS, ESTA ES UNA TABLA INTERMETDIA ENTRE PROJECTS Y USERS
    @ManyToOne(()=> ProjectEntity,(project)=> project.usersIncludes)
    project: ProjectEntity;
}