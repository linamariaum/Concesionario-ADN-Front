import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from "@core/modelo/alert";
import { Motocicleta } from "@motocicleta/shared/model/Motocicleta";
import { MotocicletaService } from "@motocicleta/shared/service/motocicleta.service";

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const VALOR_MINIMO_MOTOCICLETA = 1000;

@Component({
    selector: 'app-editar-motocicleta',
    templateUrl: 'editar-motocicleta.component.html',
  })
  export class EditarMotocicletaComponentDialog implements OnInit {
    title: string;
    motocicletaForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EditarMotocicletaComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private motocicletaService: MotocicletaService) {}

    ngOnInit() {
        this.title = 'Actualizar motocicleta';        
        this.motocicletaForm = new FormGroup({
            placa: new FormControl({ value: this.data.moto.placa, disabled: true }),
            marca: new FormControl({ value: this.data.moto.marca, disabled: true }),
            modelo: new FormControl({ value: this.data.moto.modelo, disabled: true }),
            color: new FormControl({ value: this.data.moto.color, disabled: false }, 
                [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
            precio: new FormControl({ value: this.data.moto.precio, disabled: false }, [Validators.required, Validators.min(VALOR_MINIMO_MOTOCICLETA)]),
          });
    }

    actualizar() {
        const moto: Motocicleta = new Motocicleta(
          this.motocicletaForm.get('placa').value.toUpperCase(),
          this.motocicletaForm.get('marca').value,
          this.motocicletaForm.get('modelo').value,
          this.motocicletaForm.get('color').value,
          this.motocicletaForm.get('precio').value
        )
        return this.motocicletaService.actualizar(this.data.moto.placa, moto).then(
            async (data) => {
              if (data) {
                data = JSON.parse(data);
                Alert.mostrarAlertSuccess('Actualizado','Información de la motocicleta actualizada correctamente.');
              }
            }, (error) => {                
                const mensaje = JSON.parse(error.error);
                Alert.mostrarAlertError('Oops', `${mensaje.mensaje}`);
                //console.error(error);
            }
          );
    }

    public getError(controlName: string): string {
        let error = '';
        const control = this.motocicletaForm.get(controlName);
        if (control.touched && control.errors != null) {
          error = JSON.stringify(control.errors);
          if (control.errors.required) {
            return 'Campo requerido. ';
          }
          if (control.errors.min) {
            return 'No cumple con el valor mínimo permitido. '
          }
          return 'No cumple con la logitud permitida. '
        } else {
          return error;
        }
    }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

  }