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
  ) {}

  fetchAll(params?: Observable<Params>): Observable<Book[]> {
    return this.request.get<Book[]>(`${this.bookUrl}`, params);
  }

  fetchById(bookId: string): Observable<Book> {
    return this.request.get<Book>(`${this.bookUrl}/${bookId}`);
  }

  add(book: Book): Observable<Book> {
    if (book.bookId)
      return this.request.put(`${this.bookUrl}/${book.bookId}`, book);
    return this.request.post(`${this.bookUrl}`, book);
  }

  delete(bookId: string): Observable<void> {
    return this.request.delete(`${this.bookUrl}/${bookId}`);
  }
}