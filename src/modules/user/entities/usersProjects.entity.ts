import { Entity,Column,ManyToOne } from 'typeorm';
import { ACCES_LEVEL } from "../../../constants/roles";
import { BaseEntity } from "../../../database/base.entity";
import { UserEntity } from './user.entity';
import { ProjectEntity } from '../../../modules/project/entities/project.entity';

@Entity({name:'users-projects'})
export class UserProjectsEntity extends BaseEntity{

    @Column({type:'enum',enum:ACCES_LEVEL})
    accesLevel:ACCES_LEVEL

    @ManyToOne(()=> UserEntity,(user)=> user.usersIncludes)
    user: UserEntity;

    @ManyToOne(()=> ProjectEntity,(project)=> project.projectsIncludes)
    project: ProjectEntity;
}