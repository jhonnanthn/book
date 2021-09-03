import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book.routing.module';
import { BookComponent } from './book.component';
import { BookService } from './book.service';

@NgModule({
  imports: [
    CommonModule,
    //ProductDetailsModule,
    BookRoutingModule,
    //ShopModule,
  ],
  declarations: [
    BookComponent,
  ],
  providers: [
    BookService
  ],
  exports: [BookComponent]
})

export class BookModule { }