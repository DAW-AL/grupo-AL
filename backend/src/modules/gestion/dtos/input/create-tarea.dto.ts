import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Estados_Tareas } from "../../enums/estados-tareas.enum"

export class CrearTareaDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    descripcion!: string

    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(Estados_Tareas)
    estado!: Estados_Tareas

}