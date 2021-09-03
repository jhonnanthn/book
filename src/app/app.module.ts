import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LibraryComponent } from './modules/library/library.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BookComponent } from './modules/book/book.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { RequestApi } from './http-interceptor/http-request.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    LibraryComponent,
    NavbarComponent,
    FooterComponent,
    BookComponent,
    PageNotFoundComponent
  ],
  providers: [
    RequestApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
