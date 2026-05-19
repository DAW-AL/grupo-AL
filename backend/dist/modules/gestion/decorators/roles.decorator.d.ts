import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: RolUsuarioEnum[]) => import("@nestjs/common").CustomDecorator<string>;
