import { Repository } from 'typeorm';
import { AccionTipoEnum, EntidadTipoEnum, HistorialCambio } from '../entities/historial-cambio.entity';
interface RegistrarCambioDto {
    entidad: EntidadTipoEnum;
    entidadId: number;
    accion: AccionTipoEnum;
    usuarioNombre: string;
    descripcion: string;
}
export declare class HistorialService {
    private readonly repository;
    constructor(repository: Repository<HistorialCambio>);
    registrar(dto: RegistrarCambioDto): Promise<void>;
    obtenerTodos(): Promise<HistorialCambio[]>;
}
export {};
