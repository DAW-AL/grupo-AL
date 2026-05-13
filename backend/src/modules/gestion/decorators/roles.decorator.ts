import { SetMetadata } from '@nestjs/common';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolUsuarioEnum[]) =>
  SetMetadata(ROLES_KEY, roles);