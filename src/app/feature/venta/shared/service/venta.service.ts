import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Venta } from "../model/venta";

const urlMapping = '/ventas';
const urlBase = environment.apiEndpoint;

@Injectable({
    providedIn: 'root', 
})
export class VentaService {    
    private urlApi = urlBase + urlMapping;

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {}

    obtenerTodas(): Observable<Venta[]> {
        return this.http
          .get<Venta[]>(this.urlApi, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError));
    }

    async obtenerPorCliente(cliente: string): Promise<any> {
        return this.http
          .get<any>(this.urlApi + '/' + cliente, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError))
          .toPromise();
    }

    async crear(placa: string, cliente: string): Promise<any> {
        return await this.http
            .post<any>(this.urlApi + '/' + placa + '/' + cliente, this.httpOptions)
            .pipe(retry(1), catchError(this.handleError))
            .toPromise();
    }

    // Error handling
    handleError(error) {
        let errorMessage;
        if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
        } else {
        // Get server-side error
        errorMessage = error;
        }
        return throwError(errorMessage);
    }
    
}