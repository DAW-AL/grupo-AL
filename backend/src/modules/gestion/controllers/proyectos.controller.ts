import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
  Req,
  Res,
  Patch,
} from '@nestjs/common';
import { CreateProyectoDto } from '../dtos/input/create-proyecto.dto';
import { UpdateProyectoDto } from '../dtos/input/update-proyecto.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { ListProyectoDTO } from '../dtos/output/list-proyecto.dto';
import { ProyectoDTO } from '../dtos/output/proyecto.dto';
import { ProyectosService } from '../services/proyectos.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { EstadosProyectosEnum } from '../enums/estados-proyectos.enum';
import type { Response } from 'express';

@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @ApiOperation({
    summary: 'Generar reporte PDF de proyectos',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Get('reporte')
  async generarReporte(@Res() response: Response): Promise<void> {
    return this.proyectosService.generarReporteProyectos(response);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un Proyecto' })
  @UseGuards(AuthGuard)
  @Post()
  async crearProyecto(
    @Body() dto: CreateProyectoDto,
    @Request() req,
  ): Promise<{ id: number }> {
    return await this.proyectosService.crearProyecto(dto, req.usuario);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Modificar un proyecto' })
  @Put(':id')
  async actualizarProyecto(
    @Body() dto: UpdateProyectoDto,
    @Param('id') id: number,
    @Request() req,
  ): Promise<void> {
    await this.proyectosService.actualizarProyecto(id, dto, req.usuario);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener Proyectos' })
  @ApiOkResponse({ type: ListProyectoDTO, isArray: true })
  @ApiQuery({
    name: 'estado',
    required: false,
    enum: EstadosProyectosEnum,
  })
  @UseGuards(AuthGuard)
  @Get()
  async obtenerProyectos(
    @Query('estado') estado?: EstadosProyectosEnum,
  ): Promise<ListProyectoDTO[]> {
    return await this.proyectosService.obtenerProyectos(estado);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener un proyecto' })
  @Get(':id')
  async obtenerProyecto(@Param('id') id: number): Promise<ProyectoDTO> {
    return await this.proyectosService.obtenerProyecto(id);
  }

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar un Proyecto' })
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async darBajaProyecto(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return await this.proyectosService.darBajaProyecto(id, req.usuario);
  }

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @ApiOperation({ summary: 'Reactivar un Proyecto' })
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id/reactivar')
  async reactivarProyecto(
    @Param('id', ParseIntPipe) id: number,
    @Request() Req,
  ): Promise<void> {
    return await this.proyectosService.reactivarProyecto(id, Req.usuario);
  }
}
