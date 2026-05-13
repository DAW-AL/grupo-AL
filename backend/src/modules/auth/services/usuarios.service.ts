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


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async buscarUsuarioActivoPorNombre(nombre: string): Promise<Usuario | null> {
    return await this.usuariosRepository.findOneBy({
      estado: EstadosUsuariosEnum.ACTIVO,
      nombre,
    });
  }

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

  async registrarUsuario(dto: CrearUsuarioDto): Promise<{ id: number }> {
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
    return { id: usuario.id };
  }

  async modificarUsuario(id: number, dto: ModificarUsuarioDto): Promise<void> {
    const usuario = await this.usuariosRepository.findOneBy({ id });

    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

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

    await this.usuariosRepository.save(usuario);
  }
}