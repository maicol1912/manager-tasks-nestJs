import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksDTO } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTasksDTO) {}
