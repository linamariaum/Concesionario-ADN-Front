import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { MotocicletaPage } from '../page/motocicleta/motocicleta.po';

describe('workspace-project Motocicleta', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let motocicleta: MotocicletaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        motocicleta = new MotocicletaPage();
    });

    it('Deberia listar motocicletas', () => {
        page.navigateTo();
        navBar.clickBotonMotocicletas();
        motocicleta.clickBotonListarMotocicletas();

        expect(motocicleta.obtenerMensaje()).toEqual('No hay motos en la base de datos');
    });

    it('Deberia crear motocicleta', () => {
        const PLACA = 'DHU43B';
        const MARCA = 'Bajaj';
        const MODELO = '2017';
        const COLOR = 'Negro';
        const PRECIO = 6520000;

        page.navigateTo();
        navBar.clickBotonMotocicletas();
        motocicleta.clickBotonCrearMotocicletas();
        motocicleta.ingresarPlaca(PLACA);
        motocicleta.ingresarMarca(MARCA);
        motocicleta.ingresarModelo(MODELO);
        motocicleta.ingresarColor(COLOR);
        motocicleta.ingresarPrecio(PRECIO);
        motocicleta.botonGuardar();

        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });
    
});
