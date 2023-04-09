import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    //TODO: EL API PROPERTY ES APRA DEFINIR LOS ATRIBUTOS DE UN ESQUEMA DE DTO QUE SE DEFINA EN SWAGGER
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    //TODO: EL API PROPERTY ES APRA DEFINIR LOS ATRIBUTOS DE UN ESQUEMA DE DTO QUE SE DEFINA EN SWAGGER
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description:string
}
