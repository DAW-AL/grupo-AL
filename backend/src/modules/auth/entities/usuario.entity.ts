import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EstadosUsuariosEnum } from '../enums/estados-usuarios.enum';
import { RolUsuarioEnum } from '../enums/rol-usuario.enum';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  clave!: string;

  @Column({ type: 'enum', enum: EstadosUsuariosEnum })
  estado!: EstadosUsuariosEnum;

  @Column({ type: 'enum', enum: RolUsuarioEnum, default: RolUsuarioEnum.USER })
  rol!: RolUsuarioEnum;
}
