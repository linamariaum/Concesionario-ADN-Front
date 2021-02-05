import { Component, OnInit, ViewChild } from '@angular/core';

import { MotocicletaService } from '../../shared/service/motocicleta.service';
import { Motocicleta } from '../../shared/model/motocicleta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Alert } from '@core/modelo/alert';
import { MatDialog } from '@angular/material/dialog';
import { EditarMotocicletaComponentDialog } from '../editar-motocicleta/editar-motocicleta.component';

@Component({
  selector: 'app-listar-motocicleta',
  templateUrl: './listar-motocicleta.component.html',
  styleUrls: ['./listar-motocicleta.component.scss']
})
export class ListarMotocicletaComponent implements OnInit {
  public listaMotocicletas: Motocicleta[] = [];
  dataSource: MatTableDataSource<Motocicleta>;
  columnsToDisplay: string[] = ['placa', 'marca', 'modelo', 'color', 'precio', 'disponible', 'editar'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  spinner: boolean = true;

  constructor(protected motocicletaService: MotocicletaService, public dialogSource: MatDialog) { }

  async ngOnInit() {
    await this.cargarMotos();
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
          const resultado = JSON.parse(data);
          resultado.forEach((element) => {
            let moto: Motocicleta = {
              placa: element.placa,
              marca: element.marca,
              modelo: element.modelo,
              color: element.color,
              precio: element.precio,
              disponible: element.disponible ? 'Si':'No'
            };
            this.listaMotocicletas.push(moto);  
          });
          this.init(this.listaMotocicletas);
        } else {
          Alert.mostrarAlertInfo('Información','No se encontraron motocicletas registradas.');
        }        
        this.spinner = false;
      }, (error) => {
        this.spinner = false;
        const mensaje = JSON.parse(error.error);
        Alert.mostrarAlertInfo('Información', `${mensaje.mensaje}`);
        //console.error(error)
      }
  );
  }

  editar(moto: Motocicleta){
    const dialogRef = this.dialogSource.open(EditarMotocicletaComponentDialog, {
      data: { moto: moto },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaMotocicletas = [];
        this.spinner = true;
        this.cargarMotos();
      }
    });    
  }

}