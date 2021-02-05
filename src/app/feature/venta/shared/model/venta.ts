import { Motocicleta } from "@motocicleta/shared/model/Motocicleta";

export class Venta {
    fecha: string;
    moto: Motocicleta;
    cliente: string;
    fechaEntrega: string;

    constructor(fecha: string, moto: Motocicleta, cedulaCliente: string, fechaEntrega: string) {
        this.fecha = fecha;
        this.moto = moto;
        this.cliente = cedulaCliente;
        this.fechaEntrega = fechaEntrega;
    }
}