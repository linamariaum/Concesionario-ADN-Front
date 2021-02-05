import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleTextToolbar() {
    return element(by.css('app-toolbar h1')).getText() as Promise<string>;
  }

  getTitleTextHome() {
    return element(by.css('app-home h2')).getText() as Promise<string>;
  }
}
