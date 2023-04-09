import { IsNumber } from 'class-validator';
import { IsString,IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ROLES } from 'src/constants/roles';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName:string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    age:number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email:string

    @ApiProperty()
    @IsOptional()
    @IsString()
    username:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    role:ROLES
}
