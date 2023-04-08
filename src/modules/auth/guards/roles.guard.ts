import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    //el reflector se usa para leer la metadata enviada por medio de los decoradores
    private readonly reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //estamos validando los decoradores de los controller, es decir si el valor de el controllador es publico
    //este puede ingresar debido a que devuelve un true

    //TODO: ESTAMOS VALIDANDO SI SE ENVIO UN PUBLIC ACCESS EN LA RUTA CON EL @PUBLICACCESS, SI SE ENVIO ESTE 
    //TODO: PUBLIC TOMA UN VALOR Y DEVUELVE UN TRUE 
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    //obtenemos el rol que enviamos por medio del metadata del decorador del controller
    //TODO: SE OBTIENEN LOS METADATOS ENVIADOS POR MEDIO DEL DECORADOR @ROLES ESTE PUEDE RECIBIR UNA LISTA DE 
    //TODO: ROLES COMO LO PUEDE SER EDITOR,TRABAJADOR ETC
    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );
    
    //TODO: SE OBTIENEN LOS METADATOS DEL DECORADOR @ADMIN Y LO ALMACENAMOS EN LA VARIABLE ADMIN
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    
    //TODO: OBTENEMOS EL REQUEST DE EXPRESS
    const req = context.switchToHttp().getRequest<Request>();
    
    //TODO OBTENEMOS EL ROLE USER DEL REQUEST, OSEA VALIDAMOS EL ROL DE LA AUTENTICACION
    const { roleUser } = req;

    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'No tienes permisos para esta operacion',
        );
      }
    }

    //TODO: SI EL ROL ES ADMIN POR DEFECTO LO DEJARA ENTRAR
    if(roleUser === ROLES.ADMIN){
      return true
    }

    //TODO: ACA VALIDAMOS QUE EL ROL ACTUAL, ESTE ENTRE LA LISTA DE ROLES QUE SE ENVIARON EN EL DECORADOR @ROLES
    const isAuth = roles.some((role) => role === roleUser);

    //TODO: SI NOS DEVUELVE FALSE ENTONCES NO ESTA AUTORIZADO
    if (!isAuth) {
      throw new UnauthorizedException('No tienes permisos para esta operacion');
    }
    return true;
  }
}
