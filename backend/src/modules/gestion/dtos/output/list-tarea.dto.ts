import { ApiProperty } from '@nestjs/swagger';
import { Estados_Tareas } from '../../enums/estados-tareas.enum';
import { Proyecto } from '../../entities/proyecto.entity';

export class ListTareaDTO {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  descripcion!: string;

  @ApiProperty()
  estado!: Estados_Tareas;

  @ApiProperty()
  proyecto!: Proyecto;
}
