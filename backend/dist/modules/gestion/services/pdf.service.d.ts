import { Proyecto } from '../entities/proyecto.entity';
import { Cliente } from '../entities/cliente.entity';
import type { Response } from 'express';
export declare class PdfService {
    private crearDocumento;
    private agregarEncabezado;
    private agregarPiePagina;
    private agregarResumen;
    generarReporteProyectos(proyectos: Proyecto[], response: Response): Promise<void>;
    generarReporteClientes(clientes: Cliente[], response: Response): Promise<void>;
}
