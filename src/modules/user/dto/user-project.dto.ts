import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { UserEntity } from "../entities/user.entity";
import { ProjectEntity } from "src/modules/project/entities/project.entity";
import { ACCESS_LEVEL } from "src/constants/roles";

export class UserToProjectDto{

    @IsNotEmpty()
    @IsUUID()
    user:UserEntity

    @IsNotEmpty()
    @IsUUID()
    project:ProjectEntity

    @IsNotEmpty()
    @IsEnum(ACCESS_LEVEL)
    accessLevel: ACCESS_LEVEL
}