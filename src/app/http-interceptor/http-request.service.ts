import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestApi {
    headers: HttpHeaders;
    apiUrl = environment.api;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders ({
        });
    }

    get<T>(endpoint: string, params?: any): Observable<any> {
        console.log(params);
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

    private handleError(err: HttpErrorResponse) {

        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {

            errorMessage = `An error occurred: ${err.error.message}`;
        } else {

            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}