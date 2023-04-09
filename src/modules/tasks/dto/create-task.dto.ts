import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASK } from 'src/constants/status.task';
import { CreateProjectDto } from 'src/modules/project/dto/create-project.dto';

export class CreateTasksDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskDescription: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(STATUS_TASK)
    status: STATUS_TASK;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    responsableName: string;
    @ApiProperty()
    @IsOptional()
    project?: CreateProjectDto;
}
