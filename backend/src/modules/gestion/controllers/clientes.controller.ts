import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ListClienteDTO } from '../dtos/output/list-cliente.dto';
import { UpdateClienteDto } from '../dtos/input/update-cliente.dto';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
import { ClientesService } from '../services/clientes.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolUsuarioEnum } from '../../auth/enums/rol-usuario.enum';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';


@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear un Cliente' })
  @Post()
  async crearCliente(@Body() dto: CreateClienteDto, @Request() req, ): Promise<{ id: number }> {
    return await this.clientesService.crearCliente(dto, req.usuario);
  }
  

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar datos de un Cliente' })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente a actualizar',
    example: 1,
  })
  @Patch(':id')
  async actualizarDatos(
    @Param('id') id: number,
    @Body() dto: UpdateClienteDto,
    @Request() req,
  ): Promise<{ id: number; nombre: string; email: string; telefono: string }> {
    return await this.clientesService.actualizarCliente(id, dto, req.usuario);
  }

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Dar de baja un Cliente' })
  @Delete(':id')
  async darDeBaja(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ id: number; nombre: string; estado: EstadosClientesEnum }> {
    return await this.clientesService.darDeBaja(id, req.usuario);
  }

  @ApiBearerAuth()
  @Roles(RolUsuarioEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Reactivar un Cliente dado de baja' })
  @ApiParam({
    name: 'id',
    description: 'ID del cliente a reactivar',
    example: 1,
  })
  @Patch(':id/reactivar')
  async reactivarCliente(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ id: number; nombre: string; estado: EstadosClientesEnum }> {
    return await this.clientesService.reactivarCliente(id, req.usuario);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ListClienteDTO, isArray: true })
  @ApiOperation({ summary: 'Obtener lista de Clientes' })
  @ApiQuery({
    name: 'estado',
    required: false,
    enum: EstadosClientesEnum,
  })
  @UseGuards(AuthGuard)
  @Get()
  async obtenerClientes(
    @Query('estado') estado: EstadosClientesEnum,
  ): Promise<ListClienteDTO[]> {
    return await this.clientesService.obtenerClientes(estado);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener un Cliente' })
  @Get(':id')
  async obtenerCliente(@Param('id') id: number) {
    return await this.clientesService.obtenerCliente(id);
  }
}
