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
exports.TareaController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tarea_service_1 = require("../services/tarea.service");
const create_tarea_dto_1 = require("../dtos/input/create-tarea.dto");
const update_tarea_dto_1 = require("../dtos/input/update-tarea.dto");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const rol_usuario_enum_1 = require("../../auth/enums/rol-usuario.enum");
const roles_guard_1 = require("../guards/roles.guard");
let TareaController = class TareaController {
    tareaServicios;
    constructor(tareaServicios) {
        this.tareaServicios = tareaServicios;
    }
    findAll(proyecto_id) {
        return this.tareaServicios.findAll(proyecto_id);
    }
    findOne(id) {
        return this.tareaServicios.findOne(id);
    }
    create(proyecto_id, crearTarea, req) {
        return this.tareaServicios.create(proyecto_id, crearTarea, req.usuario);
    }
    update(id, actualizarTarea, req) {
        return this.tareaServicios.update(id, actualizarTarea, req.usuario);
    }
    delete(id, req) {
        return this.tareaServicios.delete(id, req.usuario);
    }
};
exports.TareaController = TareaController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener tareas' }),
    (0, common_2.Get)('/:proyecto_id/tarea'),
    (0, swagger_1.ApiParam)({
        name: 'proyecto_id',
        type: Number,
        description: 'ID del proyecto',
    }),
    __param(0, (0, common_2.Param)('proyecto_id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una tarea' }),
    (0, common_2.Get)('/tarea/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la tarea' }),
    __param(0, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una tarea' }),
    (0, common_2.Post)(':proyecto_id/tarea/'),
    (0, swagger_1.ApiParam)({
        name: 'proyecto_id',
        type: Number,
        description: 'ID del proyecto',
    }),
    __param(0, (0, common_2.Param)('proyecto_id', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_tarea_dto_1.CrearTareaDto, Object]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Modificar una tarea' }),
    (0, common_2.Patch)('/tareas/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la tarea' }),
    __param(0, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Body)()),
    __param(2, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tarea_dto_1.ActualizarTareaDto, Object]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuarioEnum.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una tarea' }),
    (0, common_2.Delete)('/tareas/:id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la tarea' }),
    __param(0, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "delete", null);
exports.TareaController = TareaController = __decorate([
    (0, common_1.Controller)('proyectos'),
    __metadata("design:paramtypes", [tarea_service_1.TareaService])
], TareaController);
//# sourceMappingURL=tareas.controller.js.map