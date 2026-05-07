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
exports.TareaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tarea_entity_1 = require("../entities/tarea.entity");
const estados_tareas_enum_1 = require("../enums/estados-tareas.enum");
const proyectos_service_1 = require("./proyectos.service");
let TareaService = class TareaService {
    tareaRepositorio;
    proyectoServices;
    constructor(tareaRepositorio, proyectoServices) {
        this.tareaRepositorio = tareaRepositorio;
        this.proyectoServices = proyectoServices;
    }
    async findAll(proyecto_id) {
        await this.proyectoServices.obtenerProyecto(proyecto_id);
        const tareas = await this.tareaRepositorio.find({
            where: { proyecto: { id: proyecto_id } }
        });
        return tareas;
    }
    async findOne(proyecto_id, id) {
        await this.proyectoServices.obtenerProyecto(proyecto_id);
        const tarea = await this.tareaRepositorio.findOne({
            where: {
                id: id,
                proyecto: { id: proyecto_id }
            }
        });
        if (!tarea) {
            throw new common_1.NotFoundException(`No se encontro tarea con id: ${id}`);
        }
        ;
        return tarea;
    }
    async create(proyecto_id, crearTarea) {
        await this.proyectoServices.obtenerProyecto(proyecto_id);
        const nuevaTarea = this.tareaRepositorio.create({
            ...crearTarea,
            proyecto: { id: proyecto_id }
        });
        return await this.tareaRepositorio.save(nuevaTarea);
    }
    async update(proyecto_id, id, actualizarTarea) {
        await this.proyectoServices.obtenerProyecto(proyecto_id);
        const tareaActualizada = await this.tareaRepositorio.update(id, actualizarTarea);
        if (tareaActualizada.affected === 0) {
            throw new common_1.NotFoundException("No se pudo actualizar la tarea");
        }
        return this.findOne(proyecto_id, id);
    }
    async delete(proyecto_id, id) {
        await this.proyectoServices.obtenerProyecto(proyecto_id);
        const buscarTarea = await this.findOne(proyecto_id, id);
        if (buscarTarea.estado === estados_tareas_enum_1.Estados_Tareas.baja) {
            throw new common_1.NotFoundException("La tarea ya esta dada de baja");
        }
        const eliminarTarea = await this.tareaRepositorio.update(id, {
            estado: estados_tareas_enum_1.Estados_Tareas.baja
        });
        if (eliminarTarea.affected === 0) {
            throw new common_1.NotFoundException("No se pudo eliminar la tarea");
        }
        ;
        return {
            message: `Se elimino la tarea con id: ${id}`
        };
    }
    ;
};
exports.TareaService = TareaService;
exports.TareaService = TareaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tarea_entity_1.Tarea)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        proyectos_service_1.ProyectosService])
], TareaService);
//# sourceMappingURL=tarea.service.js.map