import { Component, OnInit, ViewChild } from '@angular/core';

import { MotocicletaService } from '../../shared/service/motocicleta.service';
import { Motocicleta } from '../../shared/model/motocicleta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-motocicleta',
  templateUrl: './listar-motocicleta.component.html',
  styleUrls: ['./listar-motocicleta.component.scss']
})
export class ListarMotocicletaComponent implements OnInit {
  public listaMotocicletas: Motocicleta[] = [];
  dataSource: MatTableDataSource<Motocicleta>;
  columnsToDisplay: string[] = ['placa', 'marca', 'modelo', 'color', 'precio'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  spinner: boolean = true;

  constructor(protected motocicletaService: MotocicletaService) { }

  async ngOnInit() {
    await this.cargarMotos();
    this.init(this.listaMotocicletas);
  }

  init(datos: Motocicleta[]) {
    this.dataSource = new MatTableDataSource(datos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
  }

  async cargarMotos() {
    await this.motocicletaService.obtenerTodas().then(
      (data) => {
        if(data && data.length > 0) {
          data.forEach((element) => {
            let moto: Motocicleta = {
              placa: element.placa,
              marca: element.marca,
              modelo: element.modelo,
              color: element.color,
              precio: element.precio
            };
            this.listaMotocicletas.push(moto);
          });
        }
        this.spinner = false;
      }, (error) => {
        this.spinner = false;
        console.error(error);
      }
  );
  }

}