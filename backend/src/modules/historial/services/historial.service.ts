import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AccionTipoEnum,
  EntidadTipoEnum,
  HistorialCambio,
} from '../entities/historial-cambio.entity';

// Define la forma del objeto que recibe registrar().
interface RegistrarCambioDto {
  entidad: EntidadTipoEnum;
  entidadId: number;
  accion: AccionTipoEnum;
  usuarioNombre: string;
  descripcion: string;
}

@Injectable()
export class HistorialService {
  constructor(
    @InjectRepository(HistorialCambio)
    private readonly repository: Repository<HistorialCambio>,
  ) {}

  async registrar(dto: RegistrarCambioDto): Promise<void> {
    const cambio = this.repository.create(dto);
    await this.repository.save(cambio);
  }

  async obtenerTodos(): Promise<HistorialCambio[]> {
    return this.repository.find({
      order: { fechaCambio: 'DESC' },
    });
  }
}
