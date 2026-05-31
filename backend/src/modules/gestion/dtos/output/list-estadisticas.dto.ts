import { ApiProperty } from '@nestjs/swagger';

export class ListarEstadisticasDto {
  @ApiProperty()
  proyecto!: object;

  @ApiProperty()
  cliente!: object;

  @ApiProperty()
  tarea!: object;
}
