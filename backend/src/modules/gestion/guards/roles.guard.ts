import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<RolUsuarioEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    
    if (!rolesRequeridos || rolesRequeridos.length === 0) {
      return true;
    }

   
    const { usuario } = context.switchToHttp().getRequest();

    if (!usuario || !rolesRequeridos.includes(usuario.rol)) {
      throw new ForbiddenException(
        'No tenés permisos para hacer eso :(',
      );
    }

    return true;
  }
}