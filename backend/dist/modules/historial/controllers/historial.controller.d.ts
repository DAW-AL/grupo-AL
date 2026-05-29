import { HistorialService } from '../services/historial.service';
import { HistorialCambio } from '../entities/historial-cambio.entity';
export declare class HistorialController {
    private readonly historialService;
    constructor(historialService: HistorialService);
    obtenerTodos(): Promise<HistorialCambio[]>;
}
