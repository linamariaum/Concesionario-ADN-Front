import { by, element } from 'protractor';

export class MotocicletaPage {
    private linkCrearMotocicleta = element(by.id('linkCrearMotocicleta'));
    private linkListarMotocicletas = element(by.id('linkListarMotocicleta'));
    private inputPlaca = element(by.id('placaMotocicleta'));
    private inputMarca = element(by.id('marcaMotocicleta'));
    private inputModelo = element(by.id('modeloMotocicleta'));
    private inputColor = element(by.id('colorMotocicleta'));
    private inputPrecio = element(by.id('precioMotocicleta'));
    private buttonGuardar = element(by.id('guardarMotocicletaBoton'));
    private mensaje = element(by.id('swal2-content'))

    async obtenerMensaje() {
        await this.mensaje.getText();
    }    
    
    async clickBotonCrearMotocicletas() {
        await this.linkCrearMotocicleta.click();
    }

    async clickBotonListarMotocicletas() {
        await this.linkListarMotocicletas.click();
    }

    async ingresarPlaca(placa) {
        await this.inputPlaca.clear();
        await this.inputPlaca.sendKeys(placa);
    }

    async ingresarMarca(marca) {
        await this.inputMarca.clear();
        await this.inputMarca.sendKeys(marca);
    }

    async ingresarModelo(modelo) {
        await this.inputModelo.clear();
        await this.inputModelo.sendKeys(modelo);
    }

    async ingresarColor(color) {
        await this.inputColor.clear();
        await this.inputColor.sendKeys(color);
    }

    async ingresarPrecio(precio) {
        await this.inputPrecio.clear();
        await this.inputPrecio.sendKeys(precio);
    }

    async botonGuardar() {
        await this.buttonGuardar.click();
    }  

}
