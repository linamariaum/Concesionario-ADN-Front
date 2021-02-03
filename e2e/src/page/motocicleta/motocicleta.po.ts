import { by, element } from 'protractor';

export class ProductoPage {
    private linkCrearMotocicleta = element(by.id('linkCrearMotocicleta'));
    private linkListarMotocicletas = element(by.id('linkListarMotocicleta'));
    private listaMotocicletas = element.all(by.css('ul.motocicletas li'));

    async clickBotonCrearMotocicletas() {
        await this.linkCrearMotocicleta.click();
    }
    
    async clickBotonListarMotocicletas() {
        await this.linkListarMotocicletas.click();
    }

    async contarMotocicletas() {
        return this.listaMotocicletas.count();
    }
}