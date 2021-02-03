import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { retry, catchError } from 'rxjs/operators';
//import { Observable, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const urlBase = environment.apiEndpoint;

@Injectable({
    providedIn: 'root', 
})
export class TRMService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
    };

    constructor(private http: HttpClient) {}

    // async consultar(): Promise<any> {
    //     return await this.http
    //         .post<any>('', this.httpOptions)
    //         .pipe(retry(1), catchError(this.handleError))
    //         .toPromise();
    //     }

    consultar(): Observable<any> {
        return this.http
            .post<any>(urlBase+'/TCRMServicesWebService?wsdl', this.httpOptions);
        }

        // Error handling
    // handleError(error) {
    //     let errorMessage;
    //     if (error.error instanceof ErrorEvent) {
    //     // Get client-side error
    //     errorMessage = error.error.message;
    //     } else {
    //     // Get server-side error
    //     errorMessage = error;
    //     }
    //     return throwError(errorMessage);
    // }
}