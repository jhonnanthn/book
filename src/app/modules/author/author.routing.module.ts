import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorComponent } from "./author.component";

const ROUTES: Routes = [
    { path: '', component: AuthorComponent},
    //{ path: '/author/:author', component: AuthorDetailsComponent, loadChildren: () => import('../../shared/components/author-details/author.module').then(m => m.AuthorDetailsModule)},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})

export class ProductRoutingModule { }