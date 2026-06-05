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
const historial_service_1 = require("../../historial/services/historial.service");
const historial_cambio_entity_1 = require("../../historial/entities/historial-cambio.entity");
const estados_proyectos_enum_1 = require("../enums/estados-proyectos.enum");
let TareaService = class TareaService {
    tareaRepositorio;
    proyectoServices;
    historialService;
    constructor(tareaRepositorio, proyectoServices, historialService) {
        this.tareaRepositorio = tareaRepositorio;
        this.proyectoServices = proyectoServices;
        this.historialService = historialService;
    }
    async findAll(proyecto_id) {
        await this.proyectoServices.obtenerProyecto(proyecto_id);
        const tareas = await this.tareaRepositorio.find({
            where: { proyecto: { id: proyecto_id } },
            relations: {
                proyecto: true,
            },
        });
        return tareas;
    }
    async findOne(id) {
        const tarea = await this.tareaRepositorio.findOne({
            where: {
                id: id,
            },
            relations: {
                proyecto: true,
            },
        });
        if (!tarea) {
            throw new common_1.NotFoundException(`No se encontro tarea con id: ${id}`);
        }
        return tarea;
    }
    async create(proyecto_id, crearTarea, usuarioActivo) {
        const proyecto = await this.proyectoServices.obtenerProyecto(proyecto_id);
        if (proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA) {
            throw new common_1.BadRequestException('El proyecto asociado a la tarea esta de baja');
        }
        const nuevaTarea = this.tareaRepositorio.create({
            ...crearTarea,
            estado: estados_tareas_enum_1.Estados_Tareas.PENDIENTE,
            proyecto: { id: proyecto_id },
        });
        const tareaGuardada = await this.tareaRepositorio.save(nuevaTarea);
        await this.historialService.registrar({
            entidad: historial_cambio_entity_1.EntidadTipoEnum.TAREA,
            entidadId: tareaGuardada.id,
            accion: historial_cambio_entity_1.AccionTipoEnum.CREAR,
            usuarioNombre: usuarioActivo.nombre,
            descripcion: `${usuarioActivo.nombre} creó la tarea "${tareaGuardada.descripcion}" en el proyecto ${proyecto_id}`,
        });
        return tareaGuardada;
    }
    async update(id, actualizarTarea, usuarioActivo) {
        const tareaModificar = await this.tareaRepositorio.findOne({
            where: { id },
            relations: ['proyecto'],
        });
        if (!tareaModificar) {
            throw new common_1.NotFoundException('La tarea no existe');
        }
        if (tareaModificar.proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA) {
            throw new common_1.BadRequestException('No se puede modificar una tarea cuyo proyecto este de baja');
        }
        if (actualizarTarea.estado === estados_tareas_enum_1.Estados_Tareas.BAJA) {
            if (actualizarTarea.descripcion) {
                const tareaActualizada = await this.tareaRepositorio.update(id, { descripcion: actualizarTarea.descripcion });
                if (tareaActualizada.affected === 0) {
                    throw new common_1.NotFoundException('No se pudo actualizar la tarea');
                }
            }
            const resultado = await this.delete(id, usuarioActivo);
            return resultado;
        }
        const tareaActualizada = await this.tareaRepositorio.update(id, actualizarTarea);
        if (tareaActualizada.affected === 0) {
            throw new common_1.NotFoundException('No se pudo actualizar la tarea');
        }
        const tarea = await this.findOne(id);
        await this.historialService.registrar({
            entidad: historial_cambio_entity_1.EntidadTipoEnum.TAREA,
            entidadId: id,
            accion: historial_cambio_entity_1.AccionTipoEnum.MODIFICAR,
            usuarioNombre: usuarioActivo.nombre,
            descripcion: `${usuarioActivo.nombre} modificó la tarea "${tarea.descripcion}"`,
        });
        return tarea;
    }
    async reactivarTarea(id, usuarioActivo) {
        const tarea = await this.tareaRepositorio.findOne({
            where: { id },
            relations: ['proyecto'],
        });
        if (!tarea)
            throw new common_1.BadRequestException('Tarea no encontrada');
        if (tarea.proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA) {
            throw new common_1.BadRequestException('El proyecto asociado a la tarea esta de baja');
        }
        if (tarea.estado === estados_tareas_enum_1.Estados_Tareas.PENDIENTE) {
            throw new common_1.BadRequestException('La tarea aun esta en estado pendiente');
        }
        tarea.estado = estados_tareas_enum_1.Estados_Tareas.PENDIENTE;
        await this.tareaRepositorio.save(tarea);
        await this.historialService.registrar({
            entidad: historial_cambio_entity_1.EntidadTipoEnum.TAREA,
            entidadId: tarea.id,
            accion: historial_cambio_entity_1.AccionTipoEnum.MODIFICAR,
            usuarioNombre: usuarioActivo.nombre,
            descripcion: `${usuarioActivo.nombre} reactivó la teare "${tarea.descripcion}"`,
        });
        return {
            id: tarea.id,
            descripcion: tarea.descripcion,
            estado: tarea.estado,
        };
    }
    async delete(id, usuarioActivo) {
        const buscarTarea = await this.findOne(id);
        if (buscarTarea.estado === estados_tareas_enum_1.Estados_Tareas.BAJA) {
            throw new common_1.NotFoundException('La tarea ya esta dada de baja');
        }
        const eliminarTarea = await this.tareaRepositorio.update(id, {
            estado: estados_tareas_enum_1.Estados_Tareas.BAJA,
        });
        if (eliminarTarea.affected === 0) {
            throw new common_1.NotFoundException('No se pudo eliminar la tarea');
        }
        await this.historialService.registrar({
            entidad: historial_cambio_entity_1.EntidadTipoEnum.TAREA,
            entidadId: id,
            accion: historial_cambio_entity_1.AccionTipoEnum.ELIMINAR,
            usuarioNombre: usuarioActivo.nombre,
            descripcion: `${usuarioActivo.nombre} dio de baja la tarea "${buscarTarea.descripcion}"`,
        });
        return {
            message: `Se elimino la tarea con id: ${id}`,
        };
    }
};
exports.TareaService = TareaService;
exports.TareaService = TareaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tarea_entity_1.Tarea)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        proyectos_service_1.ProyectosService,
        historial_service_1.HistorialService])
], TareaService);
//# sourceMappingURL=tarea.service.js.map