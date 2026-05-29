export declare enum EntidadTipoEnum {
    PROYECTO = "proyecto",
    CLIENTE = "cliente",
    TAREA = "tarea",
    USUARIO = "usuario"
}
export declare enum AccionTipoEnum {
    CREAR = "crear",
    MODIFICAR = "modificar",
    ELIMINAR = "eliminar"
}
export declare class HistorialCambio {
    id: number;
    entidad: EntidadTipoEnum;
    entidadId: number;
    accion: AccionTipoEnum;
    descripcion: string;
    usuarioNombre: string;
    fechaCambio: Date;
}
