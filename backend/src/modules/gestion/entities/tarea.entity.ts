import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estados_Tareas } from '../enums/estados-tareas.enum';
import { Proyecto } from './proyecto.entity';

@Entity({ name: 'tareas' })
export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column({
    type: 'enum',
    enum: Estados_Tareas,
  })
  estado!: Estados_Tareas;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas)
  @JoinColumn({ name: 'id_proyecto' })
  proyecto!: Proyecto;
}
