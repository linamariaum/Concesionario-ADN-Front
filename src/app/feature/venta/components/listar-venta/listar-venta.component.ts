import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Alert } from '@core/modelo/alert';
import { Venta } from '../../shared/model/venta';
import { VentaService } from '../../shared/service/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleVentaComponentDialog } from '../detalle-venta/detalle-venta.component';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.scss']
})
export class ListarVentaComponent implements OnInit {
  public listaVentas: Venta[] = [];
  dataSource: MatTableDataSource<Venta>;
  columnsToDisplay: string[] = ['fecha', 'moto', 'cliente', 'fechaEntrega', 'detalle'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  spinner: boolean = true;

  constructor(protected ventaService: VentaService, public dialogSource: MatDialog) { }

  async ngOnInit() {
    await this.cargarVentas();
  }

  init(datos: Venta[]) {
    this.dataSource = new MatTableDataSource(datos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
  }

  async cargarVentas() {
    await this.ventaService.obtenerTodas().then(
      (data) => {
        if(data && data.length > 0) {
          const resultado = JSON.parse(data);
          resultado.forEach((element) => {
            let venta: Venta = {
              fecha: element.fecha,
              moto: element.moto,
              cliente: element.cliente,
              fechaEntrega: element.fechaEntrega
            };
            this.listaVentas.push(venta);  
          });
          this.init(this.listaVentas);
        } else {
          Alert.mostrarAlertInfo('Información','No se encontraron ventas registradas.');
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

  verDetalle(venta: Venta) {
    this.dialogSource.open(DetalleVentaComponentDialog, {
        data: { venta: venta },
    });
  }

}