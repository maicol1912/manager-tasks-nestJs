import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    //el reflector se usa para leer la metadata enviada por medio de los decoradores
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ) {

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

    const accessLevel = this.reflector.get<number>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );
    //TODO: SE OBTIENEN LOS METADATOS DEL DECORADOR @ADMIN Y LO ALMACENAMOS EN LA VARIABLE ADMIN
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    //TODO: OBTENEMOS EL REQUEST DE EXPRESS
    const req = context.switchToHttp().getRequest<Request>();

    //TODO OBTENEMOS EL ROLE USER DEL REQUEST, OSEA VALIDAMOS EL ROL DE LA AUTENTICACION
    const { roleUser, idUser } = req;
    if (accessLevel === undefined) {
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
    }


    //TODO: SI EL ROL ES ADMIN POR DEFECTO LO DEJARA ENTRAR
    if (roleUser === ROLES.ADMIN || roleUser === ROLES.CREATOR) {
      return true
    }

    //TODO: OBTENEMOS EL USUARIO
    const user = await this.userService.findOne(idUser)

    //TODO: VEMOS SI PARA ESE USUARIO HAY UN PROYECTO
    const userExistInProject = user.projectsIncludes.find((project) => project.project.id === req.params.id)

    //TODO: SI NO TIENE UN PROYECTO DE LANZA UNA EXCEPTION
    if (userExistInProject === undefined) {
      throw new UnauthorizedException(
        'No perteneces al proyecto',
      );
    }

    //TODO: SI EL ACCESS LEVEL QUE TIENE ES DIFERENTE AL ACCESS LEVEL QUE NECESITA EL PROYECTO LANZA UNA EXPCEION
    //TODO: ESTAMOS CONTROLANDO QUE SI EL ACCES LEVEL PEDIDO ES MAYOT AL ACCESS LEVEL QUE SE TIENE 
    //TODO: ENTONCES NO NOS DEJARIA ENTRAR
    if (ACCESS_LEVEL[accessLevel] > ACCESS_LEVEL[userExistInProject.accessLevel]){
      throw new UnauthorizedException(
        'No tienes el nivel necesario del proyecto',
      );
    }
    /*if (accessLevel !== userExistInProject.accessLevel) {
      throw new UnauthorizedException(
        'No tienes el nivel necesario del proyecto',
      );
    }*/
    return true;
  }
}
