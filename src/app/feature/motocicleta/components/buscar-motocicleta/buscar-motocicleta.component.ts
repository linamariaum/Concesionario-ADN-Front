import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Motocicleta } from "@motocicleta/shared/model/Motocicleta";

@Component({
    selector: 'app-buscar-motocicleta',
    templateUrl: './buscar-motocicleta.component.html',
    styleUrls: ['./buscar-motocicleta.component.scss']
  })
  export class BuscarMotocicletaComponent implements OnInit {
    placa: FormControl;
    dataSource: MatTableDataSource<Motocicleta>;
    columnsToDisplay: string[] = ['placa', 'marca', 'modelo', 'color', 'precio'];
    spinner: boolean = false;

    ngOnInit() {
        this.placa = new FormControl('', [Validators.required, Validators.minLength(6),
            Validators.maxLength(6)]);
    }

    buscar() {
        this.spinner = true;
    }

  }