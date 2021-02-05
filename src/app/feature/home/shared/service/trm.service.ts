import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators";

@Injectable({
    providedIn: 'root', 
})
export class TRMService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/xml',
        }),
        responseType: 'text',
    };

    constructor(private http: HttpClient) {}

    async consultar(): Promise<any> {
        return await this.http
            .post<any>('https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl', this.httpOptions)
            .pipe(retry(1), catchError(this.handleError))
            .toPromise();
    }

    // consultar(): Observable<any> {
    //     return this.http
    //         .post<any>(urlBase+'/TCRMServicesWebService?wsdl', this.httpOptions);
    //     }

    //Error handling
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