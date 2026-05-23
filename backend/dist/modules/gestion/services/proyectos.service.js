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
exports.ProyectosService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const proyecto_entity_1 = require("../entities/proyecto.entity");
const typeorm_2 = require("typeorm");
const estados_proyectos_enum_1 = require("../enums/estados-proyectos.enum");
const common_1 = require("@nestjs/common");
const list_proyecto_dto_1 = require("../dtos/output/list-proyecto.dto");
const proyecto_dto_1 = require("../dtos/output/proyecto.dto");
const list_tarea_dto_1 = require("../dtos/output/list-tarea.dto");
const clientes_service_1 = require("./clientes.service");
const list_cliente_dto_1 = require("../dtos/output/list-cliente.dto");
const tarea_entity_1 = require("../entities/tarea.entity");
const estados_tareas_enum_1 = require("../enums/estados-tareas.enum");
let ProyectosService = class ProyectosService {
    repository;
    clientesService;
    tareaRepository;
    constructor(repository, clientesService, tareaRepository) {
        this.repository = repository;
        this.clientesService = clientesService;
        this.tareaRepository = tareaRepository;
    }
    async crearProyecto(dto) {
        const proyecto = this.repository.create(dto);
        proyecto.estado = estados_proyectos_enum_1.EstadosProyectosEnum.ACTIVO;
        if (dto.idCliente) {
            const clienteActivo = await this.clientesService.existeClienteActivoPorId(dto.idCliente);
            if (!clienteActivo) {
                throw new common_1.BadRequestException('Se debe especificar un cliente activo para el proyecto');
            }
        }
        await this.repository.save(proyecto);
        return { id: proyecto.id };
    }
    async actualizarProyecto(id, dto) {
        const proyecto = await this.repository.findOne({
            where: { id },
            relations: ['cliente'],
        });
        if (!proyecto) {
            throw new common_1.BadRequestException('Proyecto no encontrado');
        }
        if (dto.idCliente) {
            const clienteActivo = await this.clientesService.existeClienteActivoPorId(dto.idCliente);
            if (!clienteActivo) {
                throw new common_1.BadRequestException('Se debe especificar un cliente activo para el proyecto');
            }
        }
        await this.validarCambioDeEstado(proyecto, dto);
        this.repository.merge(proyecto, dto);
        await this.repository.save(proyecto);
    }
    async obtenerProyectos() {
        const proyectos = await this.repository.find({
            relations: ['cliente'],
            order: { id: 'ASC' },
        });
        const dtoList = [];
        for (const p of proyectos) {
            const dto = new list_proyecto_dto_1.ListProyectoDTO();
            dto.id = p.id;
            dto.nombre = p.nombre;
            dto.estado = p.estado;
            if (p.cliente) {
                dto.cliente = new list_cliente_dto_1.ListClienteDTO();
                dto.cliente.id = p.cliente.id;
                dto.cliente.nombre = p.cliente.nombre;
                dto.cliente.estado = p.cliente.estado;
            }
            dtoList.push(dto);
        }
        return dtoList;
    }
    async obtenerProyecto(id) {
        const proyecto = await this.repository.findOne({
            where: { id },
            relations: ['cliente', 'tareas'],
            order: { tareas: { id: 'ASC' } },
        });
        if (!proyecto) {
            throw new common_1.NotFoundException('Proyecto no encontrado');
        }
        const dto = new proyecto_dto_1.ProyectoDTO();
        dto.nombre = proyecto.nombre;
        dto.estado = proyecto.estado;
        if (proyecto.cliente) {
            dto.cliente = proyecto.cliente.nombre;
        }
        const tareas = [];
        for (const t of proyecto.tareas) {
            const tareaDto = new list_tarea_dto_1.ListTareaDTO();
            tareaDto.id = t.id;
            tareaDto.descripcion = t.descripcion;
            tareaDto.estado = t.estado;
            tareas.push(tareaDto);
        }
        dto.tareas = tareas;
        return dto;
    }
    async existeProyectoPorIdCliente(idCliente) {
        const existe = await this.repository.exists({
            where: {
                cliente: { id: idCliente },
                estado: (0, typeorm_2.In)([
                    estados_proyectos_enum_1.EstadosProyectosEnum.ACTIVO,
                    estados_proyectos_enum_1.EstadosProyectosEnum.FINALIZADO,
                ]),
            },
        });
        return existe;
    }
    async darBajaProyecto(id) {
        const proyecto = await this.repository.findOne({
            where: { id },
        });
        if (!proyecto) {
            throw new common_1.NotFoundException('Proyecto no encontrado');
        }
        if (proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA)
            throw new common_1.BadRequestException('El proyecto ya esta dado de baja');
        if (proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.FINALIZADO)
            throw new common_1.BadRequestException('El proyecto se encuentra finalizado');
        proyecto.estado = estados_proyectos_enum_1.EstadosProyectosEnum.BAJA;
        await this.repository.save(proyecto);
    }
    async validarCambioDeEstado(proyecto, dto) {
        if (!dto.estado) {
            return;
        }
        if (proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.BAJA) {
            throw new common_1.BadRequestException('No se puede modificar un proyecto dado de BAJA');
        }
        if (proyecto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.FINALIZADO &&
            dto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.ACTIVO) {
            throw new common_1.BadRequestException('No se puede reactivar un proyecto');
        }
        if (dto.estado === estados_proyectos_enum_1.EstadosProyectosEnum.FINALIZADO) {
            const existenTareasPendientes = await this.tareaRepository.exists({
                where: {
                    proyecto: { id: proyecto.id },
                    estado: estados_tareas_enum_1.Estados_Tareas.pendiente,
                },
            });
            if (existenTareasPendientes) {
                throw new common_1.BadRequestException('No se puede finalizar un proyecto con tareas pendientes');
            }
        }
    }
};
exports.ProyectosService = ProyectosService;
exports.ProyectosService = ProyectosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proyecto_entity_1.Proyecto)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => clientes_service_1.ClientesService))),
    __param(2, (0, typeorm_1.InjectRepository)(tarea_entity_1.Tarea)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        clientes_service_1.ClientesService,
        typeorm_2.Repository])
], ProyectosService);
//# sourceMappingURL=proyectos.service.js.map