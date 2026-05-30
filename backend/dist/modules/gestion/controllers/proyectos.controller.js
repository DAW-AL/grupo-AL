"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectosController = void 0;
const common_1 = require("@nestjs/common");
const create_proyecto_dto_1 = require("../dtos/input/create-proyecto.dto");
const update_proyecto_dto_1 = require("../dtos/input/update-proyecto.dto");
const swagger_1 = require("@nestjs/swagger");
const list_proyecto_dto_1 = require("../dtos/output/list-proyecto.dto");
const proyectos_service_1 = require("../services/proyectos.service");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const rol_usuario_enum_1 = require("../../auth/enums/rol-usuario.enum");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ProyectosController = class ProyectosController {
    proyectosService;
    constructor(proyectosService) {
        this.proyectosService = proyectosService;
    }
    async crearProyecto(dto, req) {
        return await this.proyectosService.crearProyecto(dto, req.usuario);
    }
    async actualizarProyecto(dto, id, req) {
        await this.proyectosService.actualizarProyecto(id, dto, req.usuario);
    }
    async obtenerProyectos() {
        return await this.proyectosService.obtenerProyectos();
    }
    async obtenerProyecto(id) {
        return await this.proyectosService.obtenerProyecto(id);
    }
    async darBajaProyecto(id, req) {
        return await this.proyectosService.darBajaProyecto(id, req.usuario);
    }
};
exports.ProyectosController = ProyectosController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un Proyecto' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proyecto_dto_1.CreateProyectoDto, Object]),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "crearProyecto", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Modificar un proyecto' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_proyecto_dto_1.UpdateProyectoDto, Number, Object]),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "actualizarProyecto", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener Proyectos' }),
    (0, swagger_1.ApiOkResponse)({ type: list_proyecto_dto_1.ListProyectoDTO, isArray: true }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "obtenerProyectos", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un proyecto' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "obtenerProyecto", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuarioEnum.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un Proyecto' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "darBajaProyecto", null);
exports.ProyectosController = ProyectosController = __decorate([
    (0, common_1.Controller)('proyectos'),
    __metadata("design:paramtypes", [proyectos_service_1.ProyectosService])
], ProyectosController);
//# sourceMappingURL=proyectos.controller.js.map