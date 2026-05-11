import { ApiProperty } from '@nestjs/swagger';
import { EstadosClientesEnum } from '../../enums/estados-clientes.enum';

export class ListClienteDTO {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Ezequiel' })
  nombre!: string;

  @ApiProperty({ example: '+5491140319760' })
  telefono!: string;

  @ApiProperty({ example: 'grupoal@email.com' })
  emails!: string;

  @ApiProperty()
  estado!: EstadosClientesEnum;
}
