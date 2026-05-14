import { EstadosClientesEnum } from '../../enums/estados-clientes.enum';
export declare class CreateClienteDto {
    nombre: string;
    telefono: string;
    email: string;
    estado: EstadosClientesEnum;
}
