import { Component, OnInit } from '@angular/core';
import { MotocicletaService } from '../../shared/service/motocicleta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Motocicleta } from '@motocicleta/shared/model/Motocicleta';

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
  constructor(protected motocicletaServices: MotocicletaService) { }

  ngOnInit() {
    this.construirFormularioMotocicleta();
  }
  
  private construirFormularioMotocicleta() {
    this.motocicletaForm = new FormGroup({
      placa: new FormControl('', [Validators.required, Validators.minLength(6),
                                                            Validators.maxLength(6)]),
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
      this.motocicletaForm.get('placa').value,
      this.motocicletaForm.get('marca').value, 
      this.motocicletaForm.get('modelo').value,
      this.motocicletaForm.get('color').value,
      this.motocicletaForm.get('precio').value);    
    // {
    //   placa: this.motocicletaForm.get('placa').value,
    //   marca: this.motocicletaForm.get('marca').value,
    //   modelo: this.motocicletaForm.get('modelo').value,
    //   color: this.motocicletaForm.get('color').value,
    //   precio: this.motocicletaForm.get('precio').value
    // }
    console.log(moto)
    return this.motocicletaServices.crear(moto).then(
      async (data) => {
        if (data) {
          //exception
        } else {
          //retornado correctamente
        }
      }, (error) => {
        console.error(error);
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

}
