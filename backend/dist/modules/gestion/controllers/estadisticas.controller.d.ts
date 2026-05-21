import { EstadisticasService } from '../services/estadisticas.service';
export declare class EstadisticasController {
    private readonly estadisticasServicios;
    constructor(estadisticasServicios: EstadisticasService);
    findAll(): Promise<{
        proyecto: {};
        cliente: {};
        tarea: {};
    }>;
}
