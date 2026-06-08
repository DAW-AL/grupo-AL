import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// en qué entidad del sistema se hizo el cambio
export enum EntidadTipoEnum {
  PROYECTO = 'proyecto',
  CLIENTE = 'cliente',
  TAREA = 'tarea',
  USUARIO = 'usuario',
}

// qué tipo de operación se hizo
export enum AccionTipoEnum {
  CREAR = 'crear',
  MODIFICAR = 'modificar',
  ELIMINAR = 'eliminar',
  REACTIVAR = 'reactivar',
}

@Entity('historial_cambios')
export class HistorialCambio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: EntidadTipoEnum })
  entidad!: EntidadTipoEnum;

  @Column({ name: 'entidad_id' })
  entidadId!: number;

  @Column({ type: 'enum', enum: AccionTipoEnum })
  accion!: AccionTipoEnum;

  @Column({ type: 'varchar' })
  descripcion!: string;

  @Column({ name: 'usuario_nombre', type: 'varchar' })
  usuarioNombre!: string;

  @CreateDateColumn({ name: 'fecha_cambio' })
  fechaCambio!: Date;
}
