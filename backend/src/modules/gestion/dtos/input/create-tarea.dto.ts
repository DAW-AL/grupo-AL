import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CrearTareaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descripcion!: string;
}
