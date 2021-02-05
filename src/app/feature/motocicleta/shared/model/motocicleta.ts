export class Motocicleta {
    placa: string;
    marca: string;
    modelo: string;
    color: string;
    precio: number;
    disponible: string;

    constructor(placa: string, marca: string, modelo: string, color: string, precio: number) {
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.color = color;
        this.precio = precio;
    }
}