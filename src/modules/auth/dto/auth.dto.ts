import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interface";
import { ApiProperty } from "@nestjs/swagger";


export class AuthDto implements AuthBody{
    //TODO: EL API PROPERTY ES APRA DEFINIR LOS ATRIBUTOS DE UN ESQUEMA DE DTO QUE SE DEFINA EN SWAGGER
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    //TODO: EL API PROPERTY ES APRA DEFINIR LOS ATRIBUTOS DE UN ESQUEMA DE DTO QUE SE DEFINA EN SWAGGER
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
    
}