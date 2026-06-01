import { Controller, ForbiddenException, UseGuards } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { TareaService } from '../services/tarea.service';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Estados_Tareas } from '../enums/estados-tareas.enum';

@Controller('proyectos')
export class TareaController {
  constructor(private readonly tareaServicios: TareaService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener tareas' })
  @Get('/:proyecto_id/tarea')
  @ApiParam({
    name: 'proyecto_id',
    type: Number,
    description: 'ID del proyecto',
  })
  findAll(@Param('proyecto_id', ParseIntPipe) proyecto_id: number) {
    return this.tareaServicios.findAll(proyecto_id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener una tarea' })
  @Get('/tarea/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tareaServicios.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear una tarea' })
  @Post(':proyecto_id/tarea/')
  @ApiParam({
    name: 'proyecto_id',
    type: Number,
    description: 'ID del proyecto',
  })
  create(
    @Param('proyecto_id', ParseIntPipe) proyecto_id: number,
    @Body() crearTarea: CrearTareaDto,
    @Request() req,
  ) {
    return this.tareaServicios.create(proyecto_id, crearTarea, req.usuario);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Modificar una tarea' })
  @Patch('/tareas/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarTarea: ActualizarTareaDto,
    @Request() req,
  ) {

    if (actualizarTarea.estado !== undefined && req.usuario.rol !== 'admin') {
      throw new ForbiddenException('No tenés permisos para hacer eso :(');
    }

    return this.tareaServicios.update(id, actualizarTarea, req.usuario);
  }

  //AGREGUE ESTA NUEVA FORMA DE DAR DE ALTA UNA TAREA QUE ESTUVO COMO BAJA
  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Reactivar una tarea dada de baja' })
  @ApiParam({
    name: 'id',
    description: 'ID de la tarea a reactivar',
    example: 1,
  })
  @Patch('/tareas/:id/reactivar')
  async reactivarCliente(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ id: number; descripcion: string; estado: Estados_Tareas }> {
    return await this.tareaServicios.reactivarTarea(id, req.usuario);
  }

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @Delete('/tareas/:id')
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tareaServicios.delete(id, req.usuario);
  }
}
