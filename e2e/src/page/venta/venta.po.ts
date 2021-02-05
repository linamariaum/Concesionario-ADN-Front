import { by, element } from 'protractor';

export class VentaPage {
    private linkCrearVenta = element(by.id('linkCrearVenta'));
    private linkListarVentas = element(by.id('linkListarVenta'));
    private inputPlaca = element(by.id('placaMotocicletaVenta'));
    private inputCliente = element(by.id('clienteVenta'));
    private buttonGuardar = element(by.id('guardarVentaBoton'));
    
    async clickBotonCrearVenta() {
        await this.linkCrearVenta.click();
    }

    async clickBotonListarVentas() {
        await this.linkListarVentas.click();
    }

    async ingresarPlaca(placa) {
        await this.inputPlaca.clear();
        await this.inputPlaca.sendKeys(placa);
    }

    async ingresarCliente(cliente) {
        await this.inputCliente.clear();
        await this.inputCliente.sendKeys(cliente);
    }

    async botonGuardar() {
        await this.buttonGuardar.click();
    }

}