import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Motocicleta } from '../model/Motocicleta';

const urlMapping = '/motos';
const urlBase = environment.apiEndpoint;

@Injectable({
    providedIn: 'root', 
})
export class MotocicletaService {
    private urlApi = urlBase + urlMapping;

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
    };

    constructor(private http: HttpClient) {}

    async obtenerTodas(): Promise<any> {
        return await this.http
          .get<any[]>(this.urlApi, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError))
          .toPromise();
    }

    async obtenerPorPlaca(placa: string): Promise<Motocicleta> {
        return this.http
          .get<Motocicleta>(this.urlApi + '/' + placa, this.httpOptions)
          .pipe(retry(1), catchError(this.handleError))
          .toPromise();
    }

    async crear(moto: Motocicleta): Promise<any> {
    return await this.http
        .post<any>(this.urlApi, JSON.stringify(moto), this.httpOptions)
        .pipe(retry(1), catchError(this.handleError))
        .toPromise();
    }

    async actualizar(
        placa: string,
        moto: Motocicleta
      ): Promise<any> {
        return await this.http
          .put(this.urlApi + '/' + placa, moto, this.httpOptions)
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