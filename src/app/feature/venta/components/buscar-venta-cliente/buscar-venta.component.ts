import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Alert } from "@core/modelo/alert";
import { Venta } from "@venta/shared/model/venta";
import { VentaService } from "@venta/shared/service/venta.service";

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 8;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 10;
const VALOR_MINIMO_MOTOCICLETA = 10000000;

@Component({
    selector: 'app-buscar-venta',
        templateUrl: './buscar-venta.component.html',
            styleUrls: ['./buscar-venta.component.scss']
})
export class BuscarVentaComponent implements OnInit {
    clienteInput: FormGroup;
    ventas: Venta[];
    dataSource: MatTableDataSource<Venta>;
    columnsToDisplay: string[] = ['fecha', 'fechaEntrega', 'placa', 'marca', 'modelo', 'color', 'precio'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    spinner: boolean = false;

    constructor(private ventaService: VentaService) { }

    ngOnInit() {
        this.ventas = [];
        this.clienteInput = new FormGroup({
            cliente: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
            Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO), Validators.min(VALOR_MINIMO_MOTOCICLETA)])
        });
    }

    init(datos: Venta[]) {
        this.dataSource = new MatTableDataSource(datos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
    }

    async buscar() {
        this.ventas = [];
        const cedulaCliente = this.clienteInput.get('cliente').value;
        this.spinner = true;
        await this.ventaService.obtenerPorCliente(cedulaCliente).then(
            (data) => {
                const resultado = JSON.parse(data);
                if (resultado.length > 0) {
                    resultado.forEach((element) => {
                        let venta: Venta = {
                            fecha: element.fecha,
                            moto: element.moto,
                            cliente: element.cliente,
                            fechaEntrega: element.fechaEntrega
                        };
                        this.ventas.push(venta);
                    });
                    this.spinner = false;
                    this.init(this.ventas);
                } else {
                    this.spinner = false;
                    Alert.mostrarAlertInfo('Información', 'No se encontraron ventas registradas.');
                }
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
        const control = this.clienteInput.get(controlName);
        if (control.touched && control.errors != null) {
            error = JSON.stringify(control.errors);
            if (control.errors.required) {
                return 'Campo requerido. ';
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