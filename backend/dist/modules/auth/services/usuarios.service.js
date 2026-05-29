"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const usuario_entity_1 = require("../entities/usuario.entity");
const estados_usuarios_enum_1 = require("../enums/estados-usuarios.enum");
const list_usuario_dto_1 = require("../dtos/output/list-usuario.dto");
const rol_usuario_enum_1 = require("../enums/rol-usuario.enum");
const historial_service_1 = require("../../historial/services/historial.service");
const historial_cambio_entity_1 = require("../../historial/entities/historial-cambio.entity");
let UsuariosService = class UsuariosService {
    usuariosRepository;
    historialService;
    constructor(usuariosRepository, historialService) {
        this.usuariosRepository = usuariosRepository;
        this.historialService = historialService;
    }
    async buscarUsuarioActivoPorNombre(nombre) {
        return await this.usuariosRepository.findOneBy({
            estado: estados_usuarios_enum_1.EstadosUsuariosEnum.ACTIVO,
            nombre,
        });
    }
    async listarUsuarios() {
        const usuarios = await this.usuariosRepository.find({
            order: { id: 'ASC' },
        });
        return usuarios.map((u) => {
            const dto = new list_usuario_dto_1.ListUsuarioDto();
            dto.id = u.id;
            dto.nombre = u.nombre;
            dto.estado = u.estado;
            dto.rol = u.rol;
            return dto;
        });
    }
    async consultarUsuario(id) {
        const usuario = await this.usuariosRepository.findOneBy({ id });
        if (!usuario) {
            throw new common_1.BadRequestException('Usuario no encontrado');
        }
        const dto = new list_usuario_dto_1.ListUsuarioDto();
        dto.id = usuario.id;
        dto.nombre = usuario.nombre;
        dto.estado = usuario.estado;
        dto.rol = usuario.rol;
        return dto;
    }
    async registrarUsuario(dto, usuarioActivo) {
        const nombreExistente = await this.usuariosRepository.findOneBy({
            nombre: dto.nombre,
        });
        if (nombreExistente) {
            throw new common_1.BadRequestException('Ya existe un usuario con ese nombre');
        }
        const usuario = this.usuariosRepository.create({
            nombre: dto.nombre,
            clave: await bcrypt.hash(dto.clave, 10),
            estado: estados_usuarios_enum_1.EstadosUsuariosEnum.ACTIVO,
            rol: dto.rol ?? rol_usuario_enum_1.RolUsuarioEnum.USER,
        });
        await this.usuariosRepository.save(usuario);
        await this.historialService.registrar({
            entidad: historial_cambio_entity_1.EntidadTipoEnum.USUARIO,
            entidadId: usuario.id,
            accion: historial_cambio_entity_1.AccionTipoEnum.CREAR,
            usuarioNombre: usuarioActivo.nombre,
            descripcion: `${usuarioActivo.nombre} registró el usuario "${usuario.nombre}"`,
        });
        return { id: usuario.id };
    }
    async modificarUsuario(id, dto, usuarioActivo) {
        const usuario = await this.usuariosRepository.findOneBy({ id });
        if (!usuario) {
            throw new common_1.BadRequestException('Usuario no encontrado');
        }
        const nombreAnterior = usuario.nombre;
        if (dto.nombre && dto.nombre !== usuario.nombre) {
            const nombreExistente = await this.usuariosRepository.findOneBy({
                nombre: dto.nombre,
            });
            if (nombreExistente) {
                throw new common_1.BadRequestException('Ya existe un usuario con ese nombre');
            }
            usuario.nombre = dto.nombre;
        }
        if (dto.clave) {
            usuario.clave = await bcrypt.hash(dto.clave, 10);
        }
        if (dto.rol) {
            usuario.rol = dto.rol;
        }
        if (dto.estado) {
            usuario.estado = dto.estado;
        }
        await this.usuariosRepository.save(usuario);
        const accion = (dto.estado === estados_usuarios_enum_1.EstadosUsuariosEnum.BAJA)
            ? historial_cambio_entity_1.AccionTipoEnum.ELIMINAR
            : historial_cambio_entity_1.AccionTipoEnum.MODIFICAR;
        const descripcion = (dto.estado === estados_usuarios_enum_1.EstadosUsuariosEnum.BAJA)
            ? `${usuarioActivo.nombre} dio de baja el usuario "${nombreAnterior}"`
            : `${usuarioActivo.nombre} modificó el usuario "${nombreAnterior}"`;
        await this.historialService.registrar({
            entidad: historial_cambio_entity_1.EntidadTipoEnum.USUARIO,
            entidadId: usuario.id,
            accion,
            usuarioNombre: usuarioActivo.nombre,
            descripcion,
        });
        return { mensaje: 'Usuario modificado correctamente' };
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        historial_service_1.HistorialService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map