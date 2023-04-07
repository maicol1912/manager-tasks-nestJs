import { IsNumber } from 'class-validator';
import { IsString,IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ROLES } from 'src/constants/roles';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    firstName:string;

    @IsOptional()
    @IsString()
    lastName:string;

    @IsOptional()
    @IsNumber()
    age:number;

    @IsOptional()
    @IsString()
    email:string

    @IsOptional()
    @IsString()
    username:string;

    @IsOptional()
    @IsString()
    password:string;

    @IsOptional()
    @IsString()
    role:ROLES
}
