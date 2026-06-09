import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../../gestion/guards/roles.guard';
import { Roles } from '../../gestion/decorators/roles.decorator';
import { RolUsuarioEnum } from '../enums/rol-usuario.enum';
import { UsuariosService } from '../services/usuarios.service';
import { CrearUsuarioDto } from '../dtos/input/crear-usuario.dto';
import { ModificarUsuarioDto } from '../dtos/input/modificar-usuario.dto';
import { ListUsuarioDto } from '../dtos/output/list-usuario.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(RolUsuarioEnum.ADMIN)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Obtener Usuarios' })
  @Get()
  async listarUsuarios(): Promise<ListUsuarioDto[]> {
    return await this.usuariosService.listarUsuarios();
  }

  @ApiOperation({ summary: 'Obtener un Usuario' })
  @Get(':id')
  async consultarUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ListUsuarioDto> {
    return await this.usuariosService.consultarUsuario(id);
  }

  @ApiOperation({ summary: 'Registrar Usuarios' })
  @Post()
  async registrarUsuario(
    @Body() dto: CrearUsuarioDto,
    @Request() req,
  ): Promise<{ id: number }> {
    return await this.usuariosService.registrarUsuario(dto, req.usuario);
  }

  @ApiOperation({ summary: 'Modificar Usuarios' })
  @Patch(':id')
  async modificarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ModificarUsuarioDto,
    @Request() req,
  ): Promise<{ mensaje: string }> {
    return await this.usuariosService.modificarUsuario(id, dto, req.usuario);
  }
}
