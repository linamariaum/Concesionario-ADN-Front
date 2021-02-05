import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Mostrar el titulo de la app', () => {
    page.navigateTo();
    expect(page.getTitleTextToolbar()).toEqual('Concesionario ADN');
  });

  it('Mostrar el bienvedido home', () => {
    page.navigateTo();
    expect(page.getTitleTextHome()).toEqual('Bienvenido');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
