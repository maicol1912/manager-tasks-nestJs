import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString,IsNumber,IsEnum } from "class-validator";
import { ROLES } from "src/constants/roles";

export class CreateUserDto {
    //TODO: EL API PROPERTY ES APRA DEFINIR LOS ATRIBUTOS DE UN ESQUEMA DE DTO QUE SE DEFINA EN SWAGGER
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string;

    //TODO: EL API PROPERTY ES APRA DEFINIR LOS ATRIBUTOS DE UN ESQUEMA DE DTO QUE SE DEFINA EN SWAGGER
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string;

    //TODO: EL API PROPERTY ES APRA DEFINIR LOS ATRIBUTOS DE UN ESQUEMA DE DTO QUE SE DEFINA EN SWAGGER
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLES)
    role:ROLES
}
