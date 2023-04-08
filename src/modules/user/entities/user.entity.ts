import {Column,Entity,OneToMany} from "typeorm"
import { Exclude } from "class-transformer";
import { UserProjectsEntity } from '../../user/entities/usersProjects.entity';
import { ROLES } from "../../../constants/roles";
import { BaseEntity } from "../../../database/base.entity";
import { IUser } from "../../../interfaces/user.interface";

@Entity({name:'users'})
export class UserEntity extends BaseEntity implements IUser {
    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    age:number;

    @Column({unique:true})
    email:string;

    @Column({unique:true})
    username:string;

    @Exclude()
    @Column()
    password:string;

    @Column({type:'enum',enum:ROLES})
    role:ROLES

    @OneToMany(()=>UserProjectsEntity,(userProjects)=>userProjects.user)
    projectsIncludes:UserProjectsEntity[]
}
