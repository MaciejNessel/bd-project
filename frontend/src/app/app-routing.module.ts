import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ListOfProductsComponent} from "./list-of-products/list-of-products.component";

const routes: Routes = [
  {path:'', component:  ListOfProductsComponent},
  {path:'cart', component: ShoppingCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
