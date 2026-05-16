import { EstadosClientesEnum } from '../../enums/estados-clientes.enum';
export declare class ListClienteDTO {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
    estado: EstadosClientesEnum;
}
