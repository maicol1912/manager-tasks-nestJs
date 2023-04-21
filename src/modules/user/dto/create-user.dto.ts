import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,IsString,IsNumber,IsEnum } from "class-validator";
import { ROLES } from "src/constants/roles";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string;

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
