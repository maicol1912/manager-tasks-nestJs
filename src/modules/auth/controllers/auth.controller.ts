import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    
    @Post('login')
    public async login(@Body() { username, password }: AuthDto) {
        const userValidate = await this.authService.valdidateUser(
        username, 
        password
        );

        if(!userValidate){
            throw new UnauthorizedException('Data not valid')
        }
        const jwt = await this.authService.generateJWT(userValidate)

        return jwt;
    }
}
