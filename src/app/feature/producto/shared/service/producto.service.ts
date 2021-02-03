import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';


@Injectable()
export class ProductoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Producto[]>(`${environment.apiEndpoint}/tiposFamilia`, this.http.optsName('consultar productos'));
  }

  public guardar(producto: Producto) {
    return this.http.doPost<Producto, boolean>(`${environment.apiEndpoint}/productos`, producto,
                                                this.http.optsName('crear/actualizar productos'));
  }

  public eliminar(producto: Producto) {
    return this.http.doDelete<boolean>(`${environment.apiEndpoint}/productos/${producto.id}`,
                                                 this.http.optsName('eliminar productos'));
  }
}
