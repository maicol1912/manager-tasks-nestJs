import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }
    public async valdidateUser(username: string, password: string) {
        const userByUsername = await this.userService.findBy({
            key: 'username',
            value: username
        })
        const userByEmail = await this.userService.findBy({
            key: 'email',
            value: username
        })

        if (userByUsername) {
            const match = await bcrypt.compare(password, userByUsername.password)
            if (match) return userByUsername
        }
        if (userByEmail) {
            const match = await bcrypt.compare(password, userByEmail.password)
            if (match) return userByEmail
        }
        return null;
    }

    public signJWT({ payload, secret, expires }: { payload: jwt.JwtPayload; secret: string; expires: number | string; }) {
        return jwt.sign(payload, secret, { expiresIn: expires })
    }

    public async generateJWT(user: UserEntity): Promise<any> {
        const getUser = await this.userService.findOne(user.id)

        const payload:PayloadToken= {
            role:getUser.role,
            sub:getUser.id
        }

        return {
            accessToken:this.signJWT({
                payload,
                secret:process.env.JWT_SECRET,
                expires:'1h'
            }),
            user
        }
    }
}
