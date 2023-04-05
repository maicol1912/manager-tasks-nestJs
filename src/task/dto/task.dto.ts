import { TaskStatus } from "../task.entity";
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
    @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.PENDING])
    status?: TaskStatus
}