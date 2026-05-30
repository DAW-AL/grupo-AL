import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticasService } from '../services/estadisticas.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ListarEstadisticasDto } from '../dtos/output/list-estadisticas.dto';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasServicios: EstadisticasService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener Estadisticas' })
  @ApiOkResponse({ type: ListarEstadisticasDto, isArray: true })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.estadisticasServicios.findAll();
  }
}
