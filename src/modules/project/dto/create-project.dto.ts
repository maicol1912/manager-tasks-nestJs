import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
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
