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
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const create_cliente_dto_1 = require("../dtos/input/create-cliente.dto");
const swagger_1 = require("@nestjs/swagger");
const list_cliente_dto_1 = require("../dtos/output/list-cliente.dto");
const update_cliente_dto_1 = require("../dtos/input/update-cliente.dto");
const estados_clientes_enum_1 = require("../enums/estados-clientes.enum");
const clientes_service_1 = require("../services/clientes.service");
const auth_guard_1 = require("../../auth/guards/auth.guard");
const rol_usuario_enum_1 = require("../../auth/enums/rol-usuario.enum");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
let ClientesController = class ClientesController {
    clientesService;
    constructor(clientesService) {
        this.clientesService = clientesService;
    }
    async generarReporte(response) {
        return this.clientesService.generarReporteClientes(response);
    }
    async crearCliente(dto, req) {
        return await this.clientesService.crearCliente(dto, req.usuario);
    }
    async actualizarDatos(id, dto, req) {
        return await this.clientesService.actualizarCliente(id, dto, req.usuario);
    }
    async darDeBaja(id, req) {
        return await this.clientesService.darDeBaja(id, req.usuario);
    }
    async reactivarCliente(id, req) {
        return await this.clientesService.reactivarCliente(id, req.usuario);
    }
    async obtenerClientes(estado) {
        return await this.clientesService.obtenerClientes(estado);
    }
    async obtenerCliente(id) {
        return await this.clientesService.obtenerCliente(id);
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuarioEnum.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Generar reporte PDF de clientes',
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('reporte'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "generarReporte", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un Cliente' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto, Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "crearCliente", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar datos de un Cliente' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del cliente a actualizar',
        example: 1,
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cliente_dto_1.UpdateClienteDto, Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "actualizarDatos", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuarioEnum.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Dar de baja un Cliente' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "darDeBaja", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(rol_usuario_enum_1.RolUsuarioEnum.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Reactivar un Cliente dado de baja' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del cliente a reactivar',
        example: 1,
    }),
    (0, common_1.Patch)(':id/reactivar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "reactivarCliente", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOkResponse)({ type: list_cliente_dto_1.ListClienteDTO, isArray: true }),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener lista de Clientes' }),
    (0, swagger_1.ApiQuery)({
        name: 'estado',
        required: false,
        enum: estados_clientes_enum_1.EstadosClientesEnum,
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "obtenerClientes", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un Cliente' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "obtenerCliente", null);
exports.ClientesController = ClientesController = __decorate([
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map