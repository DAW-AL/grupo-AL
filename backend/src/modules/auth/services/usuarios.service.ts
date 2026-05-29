import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entities/usuario.entity';
import { EstadosUsuariosEnum } from '../enums/estados-usuarios.enum';
import { CrearUsuarioDto } from '../dtos/input/crear-usuario.dto';
import { ModificarUsuarioDto } from '../dtos/input/modificar-usuario.dto';
import { ListUsuarioDto } from '../dtos/output/list-usuario.dto';
import { RolUsuarioEnum } from '../enums/rol-usuario.enum';
import { HistorialService } from '../../historial/services/historial.service';
import { AccionTipoEnum, EntidadTipoEnum } from '../../historial/entities/historial-cambio.entity';

// ------------------------------------------------------------
// INTERFAZ UsuarioActivo
// Define la forma del objeto que viene del JWT decodificado.
// El AuthGuard guarda el payload en req.usuario, y ese payload
// tiene exactamente estos tres campos.
// usuarioActivo es el admin que está ejecutando la acción,
// no el usuario que se está creando o modificando.
// ------------------------------------------------------------
interface UsuarioActivo {
  sub: number;
  nombre: string;
  rol: string;
}

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    // HistorialService se inyecta sin @Inject especial porque
    // no hay dependencia circular entre AuthModule e HistorialModule.
    // Para que funcione, AuthModule debe importar HistorialModule.
    private readonly historialService: HistorialService,
  ) {}

  // Método interno usado por AuthService para el login.
  // No recibe usuarioActivo ni registra historial porque
  // no modifica datos — solo consulta.
  async buscarUsuarioActivoPorNombre(nombre: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOneBy({
      estado: EstadosUsuariosEnum.ACTIVO,
      nombre,
    });
  }

  // Solo lectura, no registra historial.
  async listarUsuarios(): Promise<ListUsuarioDto[]> {
    const usuarios = await this.usuariosRepository.find({
      order: { id: 'ASC' },
    });

    return usuarios.map((u) => {
      const dto = new ListUsuarioDto();
      dto.id = u.id;
      dto.nombre = u.nombre;
      dto.estado = u.estado;
      dto.rol = u.rol;
      return dto;
    });
  }

  // Solo lectura, no registra historial.
  async consultarUsuario(id: number): Promise<ListUsuarioDto> {
    const usuario = await this.usuariosRepository.findOneBy({ id });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const dto = new ListUsuarioDto();
    dto.id = usuario.id;
    dto.nombre = usuario.nombre;
    dto.estado = usuario.estado;
    dto.rol = usuario.rol;
    return dto;
  }

  // ------------------------------------------------------------
  // registrarUsuario
  // usuarioActivo es el admin que crea el nuevo usuario.
  // Se registra después del save() para asegurar que solo
  // se loguea si la operación tuvo éxito.
  // usuario.id está disponible después del save() porque
  // TypeORM lo completa automáticamente con el valor generado por PostgreSQL.
  // ------------------------------------------------------------
  async registrarUsuario(dto: CrearUsuarioDto, usuarioActivo: UsuarioActivo): Promise<{ id: number }> {
    const nombreExistente = await this.usuariosRepository.findOneBy({
      nombre: dto.nombre,
    });

    if (nombreExistente) {
      throw new BadRequestException('Ya existe un usuario con ese nombre');
    }

    const usuario = this.usuariosRepository.create({
      nombre: dto.nombre,
      clave: await bcrypt.hash(dto.clave, 10),
      estado: EstadosUsuariosEnum.ACTIVO,
      rol: dto.rol ?? RolUsuarioEnum.USER,
    });

    await this.usuariosRepository.save(usuario);

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.USUARIO,
      entidadId: usuario.id,
      accion: AccionTipoEnum.CREAR,
      usuarioNombre: usuarioActivo.nombre,
      descripcion: `${usuarioActivo.nombre} registró el usuario "${usuario.nombre}"`,
    });

    return { id: usuario.id };
  }

  // ------------------------------------------------------------
  // modificarUsuario
  // Se guarda nombreAnterior AL INICIO, antes de cualquier modificación,
  // porque el nombre puede cambiar dentro de este mismo método (dto.nombre).
  // Si se guardara después del bloque de cambios, ya tendría el nombre nuevo
  // y la descripción del historial perdería el nombre original.
  //
  // La acción registrada depende del estado:
  // - Si dto.estado === 'BAJA' → se registra como ELIMINAR
  // - Cualquier otro cambio → se registra como MODIFICAR
  // ------------------------------------------------------------
  async modificarUsuario(id: number, dto: ModificarUsuarioDto, usuarioActivo: UsuarioActivo): Promise<{ mensaje: string }> {
    const usuario = await this.usuariosRepository.findOneBy({ id });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    // Se guarda ANTES de cualquier modificación para preservar el nombre original
    const nombreAnterior = usuario.nombre;

    if (dto.nombre && dto.nombre !== usuario.nombre) {
      const nombreExistente = await this.usuariosRepository.findOneBy({
        nombre: dto.nombre,
      });
      if (nombreExistente) {
        throw new BadRequestException('Ya existe un usuario con ese nombre');
      }
      usuario.nombre = dto.nombre;
    }

    if (dto.clave) {
      usuario.clave = await bcrypt.hash(dto.clave, 10);
    }

    if (dto.rol) {
      usuario.rol = dto.rol;
    }

    if (dto.estado) {
      usuario.estado = dto.estado;
    }

    // save() siempre antes del registrar() para asegurar que
    // solo se loguea si la operación tuvo éxito
    await this.usuariosRepository.save(usuario);

    // Si el estado cambió a BAJA se registra como ELIMINAR,
    // igual que en darDeBaja() de proyectos y clientes
    const accion = (dto.estado === EstadosUsuariosEnum.BAJA)
      ? AccionTipoEnum.ELIMINAR
      : AccionTipoEnum.MODIFICAR;

    const descripcion = (dto.estado === EstadosUsuariosEnum.BAJA)
      ? `${usuarioActivo.nombre} dio de baja el usuario "${nombreAnterior}"`
      : `${usuarioActivo.nombre} modificó el usuario "${nombreAnterior}"`;

    await this.historialService.registrar({
      entidad: EntidadTipoEnum.USUARIO,
      entidadId: usuario.id,
      accion,
      usuarioNombre: usuarioActivo.nombre,
      descripcion,
    });

    return { mensaje: 'Usuario modificado correctamente' };
  }
}