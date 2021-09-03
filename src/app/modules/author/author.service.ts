import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestApi } from 'src/app/http-interceptor/http-request.service';
import { Author } from 'src/app/shared/models/author';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = 'author';

  constructor(
    private request: RequestApi,
    private http: HttpClient
  ) {}

  fetchAll(params?: Observable<Params>): Observable<Author[]> {
    return this.request.get<Author[]>(`${this.productUrl}`, params);
  }

  fetchById(id: string): Observable<Author> {
    return this.request.get<Author>(`${this.productUrl}/${id}`);
  }
}