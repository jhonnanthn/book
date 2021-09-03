import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestApi {
    headers: HttpHeaders;
    apiUrl = environment.api;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders ({
            'Content-Type':  'application/json',
            'Accept': 'application/json'
        });
    }

    get<T>(endpoint: string, params?: any): Observable<any> {
        return this.http
            .get<T>(`${this.apiUrl}${endpoint}`, {
                headers: this.headers,
                params
            })
            .pipe(catchError(this.handleError));
    }

    getServiceWithDynamicQueryTerm(url: string, key: string, val: string): Observable<any> {
        return this.http
            .get(url + "/?" + key + "=" + val, {
                headers: this.headers
            })
            .pipe(catchError(this.handleError));
    }

    post(endpoint: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .post(`${this.apiUrl}${endpoint}`, body,
                { headers: this.headers }
            )
            .pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errorMessage);
    }

}