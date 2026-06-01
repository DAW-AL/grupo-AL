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
exports.EstadisticasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const proyecto_entity_1 = require("../entities/proyecto.entity");
const typeorm_2 = require("typeorm");
const cliente_entity_1 = require("../entities/cliente.entity");
const tarea_entity_1 = require("../entities/tarea.entity");
const estados_proyectos_enum_1 = require("../enums/estados-proyectos.enum");
const estados_clientes_enum_1 = require("../enums/estados-clientes.enum");
const estados_tareas_enum_1 = require("../enums/estados-tareas.enum");
let EstadisticasService = class EstadisticasService {
    proyectoRepository;
    clienteRepository;
    tareaRepository;
    constructor(proyectoRepository, clienteRepository, tareaRepository) {
        this.proyectoRepository = proyectoRepository;
        this.clienteRepository = clienteRepository;
        this.tareaRepository = tareaRepository;
    }
    async getProyectos() {
        const proyectos = await this.proyectoRepository.find();
        return proyectos;
    }
    async getClientes() {
        const clientes = await this.clienteRepository.find();
        return clientes;
    }
    async getTareas() {
        const tareas = await this.tareaRepository.find();
        return tareas;
    }
    async findAll() {
        let proyecto = {};
        let cliente = {};
        let tarea = {};
        const proyectos = await this.getProyectos();
        const totalProyectosActivos = proyectos.filter((v) => v.estado === estados_proyectos_enum_1.EstadosProyectosEnum.ACTIVO);
        const totalProyectosfinalizados = proyectos.filter((v) => v.estado === estados_proyectos_enum_1.EstadosProyectosEnum.FINALIZADO);
        const totalProyectosBajas = proyectos.filter((v) => v.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA);
        proyecto['numeros'] = {
            total: proyectos.length,
            totalActivos: totalProyectosActivos.length,
            totalFinalizados: totalProyectosfinalizados.length,
            totalBajas: totalProyectosBajas.length,
        };
        const clientes = await this.getClientes();
        const totalClientesActivos = clientes.filter((v) => v.estado === estados_clientes_enum_1.EstadosClientesEnum.ACTIVO);
        const totalClientesBaja = clientes.filter((v) => v.estado === estados_clientes_enum_1.EstadosClientesEnum.BAJA);
        cliente['numeros'] = {
            total: clientes.length,
            totalActivos: totalClientesActivos.length,
            totalBajas: totalClientesBaja.length,
        };
        const tareas = await this.getTareas();
        const totalTareasPendientes = tareas.filter((v) => v.estado === estados_tareas_enum_1.Estados_Tareas.PENDIENTE);
        const totalTareasFinalizadas = tareas.filter((v) => v.estado === estados_tareas_enum_1.Estados_Tareas.FINALIZADA);
        const totalTareasBajas = tareas.filter((v) => v.estado === estados_tareas_enum_1.Estados_Tareas.BAJA);
        tarea['numeros'] = {
            total: tareas.length,
            totalPendientes: totalTareasPendientes.length,
            totalFinalizadas: totalTareasFinalizadas.length,
            totalBajas: totalTareasBajas.length,
        };
        proyecto['porcentajes'] = {
            activos: totalProyectosActivos.length > 0
                ? ((100 / proyectos.length) * totalProyectosActivos.length).toFixed(0)
                : '0',
            finalizados: totalProyectosfinalizados.length > 0
                ? ((100 / proyectos.length) *
                    totalProyectosfinalizados.length).toFixed(0)
                : '0',
            bajas: totalProyectosBajas.length > 0
                ? ((100 / proyectos.length) * totalProyectosBajas.length).toFixed(0)
                : '0',
        };
        cliente['porcentajes'] = {
            activos: totalClientesActivos.length > 0
                ? ((100 / clientes.length) * totalClientesActivos.length).toFixed(0)
                : '0',
            bajas: totalClientesBaja.length > 0
                ? ((100 / clientes.length) * totalClientesBaja.length).toFixed(0)
                : '0',
        };
        tarea['porcentajes'] = {
            pendientes: totalTareasPendientes.length > 0
                ? ((100 / tareas.length) * totalTareasPendientes.length).toFixed(0)
                : '0',
            finalizadas: totalTareasFinalizadas.length > 0
                ? ((100 / tareas.length) * totalTareasFinalizadas.length).toFixed(0)
                : '0',
            bajas: totalTareasBajas.length > 0
                ? ((100 / tareas.length) * totalTareasBajas.length).toFixed(0)
                : '0',
        };
        return {
            proyecto,
            cliente,
            tarea,
        };
    }
};
exports.EstadisticasService = EstadisticasService;
exports.EstadisticasService = EstadisticasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proyecto_entity_1.Proyecto)),
    __param(1, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __param(2, (0, typeorm_1.InjectRepository)(tarea_entity_1.Tarea)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EstadisticasService);
//# sourceMappingURL=estadisticas.service.js.map