import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticasService } from '../services/estadisticas.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ListarEstadisticasDto } from '../dtos/output/list-estadisticas.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
import { RolesGuard } from '../guards/roles.guard';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasServicios: EstadisticasService) {}

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @ApiOperation({ summary: 'Obtener Estadisticas' })
  @ApiOkResponse({ type: ListarEstadisticasDto, isArray: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.estadisticasServicios.findAll();
  }
}
