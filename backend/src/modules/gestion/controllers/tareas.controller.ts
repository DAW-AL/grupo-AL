import { Controller, UseGuards } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TareaService } from '../services/tarea.service';
import { CrearTareaDto } from '../dtos/input/create-tarea.dto';
import { ActualizarTareaDto } from '../dtos/input/update-tarea.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
import { RolesGuard } from '../guards/roles.guard';

@Controller('proyectos/:proyecto_id/tarea')
export class TareaController {
  constructor(private readonly tareaServicios: TareaService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
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
  @Get(':id')
  @ApiParam({
    name: 'proyecto_id',
    type: Number,
    description: 'ID del proyecto',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  findOne(
    @Param('proyecto_id', ParseIntPipe) proyecto_id: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tareaServicios.findOne(proyecto_id, id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiParam({
    name: 'proyecto_id',
    type: Number,
    description: 'ID del proyecto',
  })
  create(
    @Param('proyecto_id', ParseIntPipe) proyecto_id: number,
    @Body() crearTarea: CrearTareaDto,
  ) {
    return this.tareaServicios.create(proyecto_id, crearTarea);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiParam({
    name: 'proyecto_id',
    type: Number,
    description: 'ID del proyecto',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  update(
    @Param('proyecto_id', ParseIntPipe) proyecto_id: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() actualizarTarea: ActualizarTareaDto,
  ) {
    return this.tareaServicios.update(proyecto_id, id, actualizarTarea);
  }

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiParam({
    name: 'proyecto_id',
    type: Number,
    description: 'ID del proyecto',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  delete(
    @Param('proyecto_id', ParseIntPipe) proyecto_id: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tareaServicios.delete(proyecto_id, id);
  }
}
