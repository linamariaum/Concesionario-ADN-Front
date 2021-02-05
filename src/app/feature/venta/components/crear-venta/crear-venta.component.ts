import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Alert } from "@core/modelo/alert";
import { VentaService } from "@venta/shared/service/venta.service";

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 8;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 10;
const VALOR_MINIMO_MOTOCICLETA = 10000000;

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html',
  styleUrls: ['./crear-venta.component.scss']
})
export class CrearVentaComponent implements OnInit {
  ventaForm: FormGroup;
  constructor(protected ventaService: VentaService, private router: Router) { }

  ngOnInit() {
    this.construirFormularioVenta();
  }
  
  private construirFormularioVenta() {
    this.ventaForm = new FormGroup({
      placa: new FormControl('', [Validators.required, Validators.minLength(6),
                                                        Validators.maxLength(6), Validators.pattern('[A-z]{3}[0-9]{2}[A-z]{1}')]),
      clienteInput: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO), Validators.min(VALOR_MINIMO_MOTOCICLETA)])
    });
  }

  guardar() {
    const placa = this.ventaForm.get('placa').value.toUpperCase();
    const cliente = this.ventaForm.get('clienteInput').value;
    return this.ventaService.crear(placa, cliente).then(
      async (data) => {
          console.log(data)
        if (data) {
          //retornado correctamente
          Alert.mostrarAlertSuccess('Creado','Venta generada exitosamente.');
          this.router.navigate(['/venta/listar']);
        }
      }, (error) => {
        Alert.mostrarAlertInfo('Información', `${error.error.mensaje}`);
        //console.error(error);
      }
    );
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.ventaForm.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
      if (control.errors.required) {
        return 'Campo requerido. ';
      }
      if (control.errors.pattern) {
        return 'Formato de placa incorrecto. '
      }
      if (control.errors.min) {
        return 'No cumple con el valor mínimo requerido. '
      }
      return 'No cumple con la logitud permitida. '
    } else {
      return error;
    }
  }

}
