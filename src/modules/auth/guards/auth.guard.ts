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
    //estamos validando los decoradores de los controller, es decir si el valor de el controllador es publico
    //este puede ingresar debido a que devuelve un true
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )

    if(isPublic){
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>()
    const token = req.headers['codrr_token']

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

    //estamos setiando a la peticion un valor adicional que es el idUser y el roleUser ya que el guard
    //se ejecuta antes que el controller, y cuando la peticion ya llega al controlador
    //llega con estos datos ya dispoinibles
    //podemos hacer que estos atributos esten disponibles por medio del index.d.ts de express que definimos nuevos
    //atributos
    req.idUser = user.id
    req.roleUser = user.role
    return true;
  }
}
