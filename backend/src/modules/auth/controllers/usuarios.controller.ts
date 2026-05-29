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
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../../gestion/guards/roles.guard';
import { Roles } from '../../gestion/decorators/roles.decorator';
import { RolUsuarioEnum } from '../enums/rol-usuario.enum';
import { UsuariosService } from '../services/usuarios.service';
import { CrearUsuarioDto } from '../dtos/input/crear-usuario.dto';
import { ModificarUsuarioDto } from '../dtos/input/modificar-usuario.dto';
import { ListUsuarioDto } from '../dtos/output/list-usuario.dto';

// ------------------------------------------------------------
// Todos los endpoints de este controller son solo para admin.
// @Roles y @UseGuards están a nivel de clase porque no hay
// ningún endpoint público en este controller.
// El orden AuthGuard → RolesGuard es importante:
//   1. AuthGuard verifica el token y popula req.usuario
//   2. RolesGuard lee req.usuario.rol y verifica que sea ADMIN
// ------------------------------------------------------------
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(RolUsuarioEnum.ADMIN)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // GET /usuarios — solo lectura, no necesita req.usuario
  @ApiOperation({ summary: 'Obtener Usuarios' })
  @Get()
  async listarUsuarios(): Promise<ListUsuarioDto[]> {
    return await this.usuariosService.listarUsuarios();
  }

  // GET /usuarios/:id — solo lectura, no necesita req.usuario
  @ApiOperation({ summary: 'Obtener un Usuario' })
  @Get(':id')
  async consultarUsuario(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ListUsuarioDto> {
    return await this.usuariosService.consultarUsuario(id);
  }

  // POST /usuarios
  // @Request() req da acceso al objeto request HTTP.
  // req.usuario es el payload del JWT guardado por AuthGuard:
  // { sub: number, nombre: string, rol: string }
  // Se pasa al service para que sepa quién creó el usuario
  // y pueda registrarlo en el historial.
  @ApiOperation({ summary: 'Registrar Usuarios' })
  @Post()
  async registrarUsuario(
    @Body() dto: CrearUsuarioDto,
    @Request() req,
  ): Promise<{ id: number }> {
    return await this.usuariosService.registrarUsuario(dto, req.usuario);
  }

  // PATCH /usuarios/:id — mismo patrón que registrarUsuario
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