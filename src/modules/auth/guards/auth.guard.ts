import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { UserService } from 'src/modules/user/user.service';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService:UserService,
    private readonly reflector:Reflector
  ){}
  async canActivate(
    context: ExecutionContext,
  ){
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )
    if(isPublic){
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>()

    const token = req.headers['auth_token']
    if(!token || Array.isArray(token)){
      throw new UnauthorizedException('Invalid token')
    }

    const manageToken:IUseToken | string = useToken(token)

    if(typeof(manageToken)==='string'){
      throw new UnauthorizedException(manageToken)
    }

    if(manageToken.isExpired){
      throw new UnauthorizedException('Token expired')
    }

    const {sub} = manageToken

    const user:UserEntity = await this.userService.findOne(sub)

    if(!user){
      throw new UnauthorizedException('invalid user')
    }

    req.idUser = user.id
    req.roleUser = user.role
    return true;
  }
}
