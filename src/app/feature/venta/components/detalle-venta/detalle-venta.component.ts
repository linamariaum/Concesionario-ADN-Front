import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-detalle-venta',
    templateUrl: 'detalle-venta.component.html',
  })
  export class DetalleVentaComponentDialog implements OnInit {
    title: string;
    cliente: string;
    ventaForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DetalleVentaComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
        this.title = 'Detalle de la venta';
        this.cliente = this.data.venta.cliente;
        const datepipe: DatePipe = new DatePipe('en-US');
        let fecha = datepipe.transform(this.data.venta.fecha, 'MMM dd,yyyy');
        let fechaEntrega = datepipe.transform(this.data.venta.fechaEntrega, 'MMM dd,yyyy');
        this.ventaForm = new FormGroup({
            fecha: new FormControl({ value: fecha, disabled: true }),
            placa: new FormControl({ value: this.data.venta.moto.placa, disabled: true }),
            marca: new FormControl({ value: this.data.venta.moto.marca, disabled: true }),
            modelo: new FormControl({ value: this.data.venta.moto.modelo, disabled: true }),
            color: new FormControl({ value: this.data.venta.moto.color, disabled: true }),
            precio: new FormControl({ value: this.data.venta.moto.precio, disabled: true }),
            fechaEntrega: new FormControl({ value: fechaEntrega, disabled: true })
          });
    }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

  }