import { PartialType } from '@nestjs/swagger';
import { CrearTareaDto } from './create-tarea.dto';

export class ActualizarTareaDto extends PartialType(CrearTareaDto) {}
