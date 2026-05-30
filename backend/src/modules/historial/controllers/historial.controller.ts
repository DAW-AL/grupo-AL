import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../gestion/guards/roles.guard';
import { Roles } from '../../gestion/decorators/roles.decorator';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
import { HistorialService } from '../services/historial.service';
import { EntidadTipoEnum, HistorialCambio } from '../entities/historial-cambio.entity';


@ApiBearerAuth()
@Roles(RolUsuarioEnum.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @ApiOperation({ summary: 'Obtener Historial de cambios' })
  @Get()
  async obtenerTodos(): Promise<HistorialCambio[]> {
    return this.historialService.obtenerTodos();
  }
}
