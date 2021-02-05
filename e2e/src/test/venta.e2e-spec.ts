import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { VentaPage } from '../page/venta/venta.po';

describe('workspace-project Venta', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let venta: VentaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        venta = new VentaPage();
    });

    it('Deberia crear venta', () => {
        const PLACA = 'DHU43B';
        const CLIENTE = '4567890987';

        page.navigateTo();
        navBar.clickBotonVentas();
        venta.clickBotonCrearVenta();
        venta.ingresarPlaca(PLACA);
        venta.ingresarCliente(CLIENTE);
        venta.botonGuardar();

        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar ventas', () => {
        page.navigateTo();
        navBar.clickBotonVentas();
        venta.clickBotonListarVentas();

        //expect(4).toBe(producto.contarProductos());
    });
});