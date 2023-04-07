import { TaskStatusEnum } from "../entities/task.entity";
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, IsIn } from "class-validator"
export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string
}

export class UpdateTaskDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    @IsIn([TaskStatusEnum.IN_PROGRESS, TaskStatusEnum.DONE, TaskStatusEnum.PENDING])
    status?: TaskStatusEnum
}