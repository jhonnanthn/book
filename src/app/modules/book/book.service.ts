import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestApi } from 'src/app/http-interceptor/http-request.service';
import { Book } from 'src/app/shared/models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookUrl = 'book';

  constructor(
    private request: RequestApi,
    private http: HttpClient
  ) {}

  fetchAll(params?: Observable<Params>): Observable<Book[]> {
    return this.request.get<Book[]>(`${this.bookUrl}`, params);
  }

  fetchById(id: string): Observable<Book> {
    return this.request.get<Book>(`${this.bookUrl}/${id}`);
  }
}