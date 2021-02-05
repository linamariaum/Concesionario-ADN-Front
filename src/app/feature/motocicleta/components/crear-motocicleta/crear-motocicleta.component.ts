import { Component, OnInit } from '@angular/core';
import { MotocicletaService } from '../../shared/service/motocicleta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Motocicleta } from '@motocicleta/shared/model/Motocicleta';
import { Router } from '@angular/router';
import { Alert } from '@core/modelo/alert';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const VALOR_MINIMO_MOTOCICLETA = 1000;

@Component({
  selector: 'app-crear-motocicleta',
  templateUrl: './crear-motocicleta.component.html',
  styleUrls: ['./crear-motocicleta.component.scss']
})
export class CrearMotocicletaComponent implements OnInit {
  motocicletaForm: FormGroup;
  constructor(protected motocicletaServices: MotocicletaService, private router: Router) { }

  ngOnInit() {
    this.construirFormularioMotocicleta();
  }
  
  private construirFormularioMotocicleta() {
    this.motocicletaForm = new FormGroup({
      placa: new FormControl('', [Validators.required, Validators.minLength(6),
                                                        Validators.maxLength(6), Validators.pattern('[A-z]{3}[0-9]{2}[A-z]{1}')]),
      marca: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      modelo: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      color: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      precio: new FormControl('', [Validators.required, Validators.min(VALOR_MINIMO_MOTOCICLETA)]),
    });
  }

  guardar() {
    const moto: Motocicleta = new Motocicleta(
      this.motocicletaForm.get('placa').value.toUpperCase(),
      this.motocicletaForm.get('marca').value, 
      this.motocicletaForm.get('modelo').value,
      this.motocicletaForm.get('color').value,
      this.motocicletaForm.get('precio').value);
    return this.motocicletaServices.crear(moto).then(
      async (data) => {
        if (!data) {
          //retornado correctamente
          Alert.mostrarAlertSuccess('Creado','Motocicleta agregada correctamente.');
          this.router.navigate(['/motocicleta/listar']);
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
      if (control.errors.pattern) {
        return 'Formato de placa incorrecto. '
      }
      return 'No cumple con la logitud permitida. '
    } else {
      return error;
    }
  }

}
