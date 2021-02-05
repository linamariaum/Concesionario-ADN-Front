import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators";

const BODY_REQUEST = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:act="http://action.trm.services.generic.action.superfinanciera.nexura.sc.com.co/">
<soapenv:Header/>
    <soapenv:Body>
        <act:queryTCRM>
        </act:queryTCRM>
    </soapenv:Body>
</soapenv:Envelope>
`;

@Injectable({
    providedIn: 'root', 
})
export class TRMService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'text/xml',
        })
    };

    constructor(private http: HttpClient) {}

    async consultar(): Promise<any> {
        let parser = new DOMParser();
        let doc = parser.parseFromString(BODY_REQUEST, "text/xml");
        return await this.http
            .post<any>('https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl', 
                doc, 
                this.httpOptions)
            .pipe(retry(1), catchError(this.handleError))
            .toPromise();
    }

    // consultare(): Observable<any> {
    //     return this.http
    //         .post<any>('https://www.superfinanciera.gov.co/SuperfinancieraWebServiceTRM/TCRMServicesWebService/TCRMServicesWebService?wsdl', BODY_REQUEST, this.httpOptions);
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