import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CrearTareaDto } from './create-tarea.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Estados_Tareas } from '../../enums/estados-tareas.enum';

export class ActualizarTareaDto extends PartialType(CrearTareaDto) {
  @IsOptional()
  @ApiProperty()
  @IsEnum(Estados_Tareas)
  estado!: Estados_Tareas;
}
