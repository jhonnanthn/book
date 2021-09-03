import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/models/book';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  route: ActivatedRoute;
  books: Book[];
  pageOfBooks: Array<any>;
  page: number = 1;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.find();
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfBooks = pageOfItems;
  }

  find (book?: string) {
    let parameters: any = {};
    if (book)
      parameters.filter = book;

    this.bookService.fetchAll(parameters)
      .subscribe(results =>
      {
        this.books = results
      });
  }
}
