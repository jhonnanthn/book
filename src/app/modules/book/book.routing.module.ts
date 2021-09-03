import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookComponent } from "./book.component";

const ROUTES: Routes = [
    { path: '', component: BookComponent},
    //{ path: '/book/:book', component: BookDetailsComponent, loadChildren: () => import('../../shared/components/book-details/book.module').then(m => m.BookDetailsModule)},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class BookRoutingModule { }