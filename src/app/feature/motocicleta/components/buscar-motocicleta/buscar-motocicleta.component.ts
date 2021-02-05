import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Alert } from "@core/modelo/alert";
import { Motocicleta } from "@motocicleta/shared/model/Motocicleta";
import { MotocicletaService } from "@motocicleta/shared/service/motocicleta.service";

@Component({
    selector: 'app-buscar-motocicleta',
    templateUrl: './buscar-motocicleta.component.html',
    styleUrls: ['./buscar-motocicleta.component.scss']
  })
  export class BuscarMotocicletaComponent implements OnInit {
    placaInput: FormGroup;
    motocicleta: Motocicleta[];
    dataSource: MatTableDataSource<Motocicleta>;
    columnsToDisplay: string[] = ['placa', 'marca', 'modelo', 'color', 'precio', 'disponible'];
    spinner: boolean = false;

    constructor(private motocicletaService: MotocicletaService) {}

    ngOnInit() {
      this.motocicleta = [];
      this.placaInput = new FormGroup({
        placa : new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.maxLength(6), Validators.pattern('[A-z]{3}[0-9]{2}[A-z]{1}')])
      });
    }

    init(datos: Motocicleta[]) {
      this.dataSource = new MatTableDataSource(datos);
    }

    async buscar() {
      this.motocicleta = [];
      const placa = this.placaInput.get('placa').value.toUpperCase();
      this.spinner = true;
      await this.motocicletaService.obtenerPorPlaca(placa).then(
        (data) => {
          if(data) {
            const resultado = JSON.parse(data);
            let moto: Motocicleta = {
              placa: resultado.placa,
              marca: resultado.marca,
              modelo: resultado.modelo,
              color: resultado.color,
              precio: resultado.precio,
              disponible: resultado.disponible ? 'Si':'No'
            };
            this.motocicleta.push(moto);
            this.init(this.motocicleta);
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

    public getError(controlName: string): string {
      let error = '';
      const control = this.placaInput.get(controlName);
      if (control.touched && control.errors != null) {
        error = JSON.stringify(control.errors);
        if (control.errors.required) {
          return 'Campo requerido. ';
        }
        if (control.errors.min) {
          return 'No cumple con el valor mínimo permitido. '
        }
        if (control.errors.pattern) {
          return 'Formato de placa incorrecto. '
        }
        return 'No cumple con la logitud permitida. '
      } else {
        return error;
      }
    }

  }