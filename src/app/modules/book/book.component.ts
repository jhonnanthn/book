import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/shared/models/book';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BookService } from './book.service';
import $ from "jquery";
import 'jquery-mask-plugin';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  route: ActivatedRoute;
  books: Book[];
  book: Book;
  pageOfBooks: Array<any>;
  page: number = 1;
  closeResult: string;

	public constructor(
    private notifyService : NotificationService,
    private bookService: BookService,
    private modalService: NgbModal) { 
      this.book = {
        author: {
          fullName: '',
          birthday: {
            year: undefined,
            month: undefined,
            day: undefined
          },
          cpf: '',
        },
        publisher: '',
        title: '',
        year: undefined
      };
    }

  ngOnInit(): void {
    this.find();
    $('#txtBookBirthday').mask('9999-99-99');
  }

  ngAfterViewInit() {
    $('#txtBookBirthday').mask('9999-99-99');
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

  add(book: Book) {
    if (!book.title)
      return this.showErrorNotifications("Name is required", "");
    if (!book.author.cpf || !this.validateCpf(book.author.cpf))
      return this.showErrorNotifications("CFP invalid", "");
    if (!book.author.fullName)
      return this.showErrorNotifications("Author is required", "");
    if (!book.publisher)
      return this.showErrorNotifications("Publisher is required", "");
    if (!book.year || book.year.toString().length != 4)
      return this.showErrorNotifications("Year invalid", "");
    if (!book.author.birthday)
      return this.showErrorNotifications("Birthday invalid", "");

    let day: string = book.author.birthday.day > 10 ? book.author.birthday.day : `0${book.author.birthday.day}`;
    let month: string = book.author.birthday.month > 10 ? book.author.birthday.month : `0${book.author.birthday.month}`;

    book.author.birthday = `${book.author.birthday.year}-${month}-${day}`;
    if (!this.validateDate(book.author.birthday))
      return this.showErrorNotifications("Birthday invalid", "");
    
    book.author.fullName = book.author.fullName.toUpperCase();
    book.author.cpf = book.author.cpf.replace(/[^0-9]/g, '');

    this.bookService.add(book)
      .subscribe(() =>
      {
        this.showNotifications("Added book!", "Book successfully added");
        this.find();
        this.modalService.dismissAll();
        this.book = {
          author: {
            fullName: '',
            birthday: '',
            cpf: '',
          },
          publisher: '',
          title: '',
          year: undefined
        };
      }, () => {
        return this.showErrorNotifications("Failed to save the informations", "");
      });
  }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private validateCpf(cpf){
    cpf = cpf.replace(/\D/g, '');
    if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9,10].forEach(function(j){
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
            soma += parseInt(e) * ((j+2)-(i+1));
        });
        r = soma % 11;
        r = (r <2)?0:11-r;
        if(r != cpf.substring(j, j+1)) result = false;
    });
    return result;
  }

  private validateDate(testdate) {
    let date_regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    return date_regex.test(testdate);
  }

  showNotifications(message: string, title: string){
    this.notifyService.showSuccess(message, title)
  }

  showErrorNotifications(message: string, title: string){
    this.notifyService.showError(message, title)
  }
}
