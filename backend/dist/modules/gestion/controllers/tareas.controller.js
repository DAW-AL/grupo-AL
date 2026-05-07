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
let TareaController = class TareaController {
    tareaServicios;
    constructor(tareaServicios) {
        this.tareaServicios = tareaServicios;
    }
    findAll(proyecto_id) {
        return this.tareaServicios.findAll(proyecto_id);
    }
    findOne(proyecto_id, id) {
        return this.tareaServicios.findOne(proyecto_id, id);
    }
    create(proyecto_id, crearTarea) {
        return this.tareaServicios.create(proyecto_id, crearTarea);
    }
    update(proyecto_id, id, actualizarTarea) {
        return this.tareaServicios.update(proyecto_id, id, actualizarTarea);
    }
    delete(proyecto_id, id) {
        return this.tareaServicios.delete(proyecto_id, id);
    }
};
exports.TareaController = TareaController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_2.Get)(),
    (0, swagger_1.ApiParam)({ name: 'proyecto_id', type: Number, description: 'ID del proyecto' }),
    __param(0, (0, common_2.Param)('proyecto_id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_2.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'proyecto_id', type: Number, description: 'ID del proyecto' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la tarea' }),
    __param(0, (0, common_2.Param)('proyecto_id', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_2.Post)(),
    (0, swagger_1.ApiParam)({ name: 'proyecto_id', type: Number, description: 'ID del proyecto' }),
    __param(0, (0, common_2.Param)('proyecto_id', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_tarea_dto_1.CrearTareaDto]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_2.Patch)(':id'),
    (0, swagger_1.ApiParam)({ name: 'proyecto_id', type: Number, description: 'ID del proyecto' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la tarea' }),
    __param(0, (0, common_2.Param)('proyecto_id', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_tarea_dto_1.ActualizarTareaDto]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_2.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'proyecto_id', type: Number, description: 'ID del proyecto' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la tarea' }),
    __param(0, (0, common_2.Param)('proyecto_id', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TareaController.prototype, "delete", null);
exports.TareaController = TareaController = __decorate([
    (0, common_1.Controller)('proyectos/:proyecto_id/tarea'),
    __metadata("design:paramtypes", [tarea_service_1.TareaService])
], TareaController);
//# sourceMappingURL=tareas.controller.js.map