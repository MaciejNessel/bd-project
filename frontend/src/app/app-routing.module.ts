import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ListOfProductsComponent} from "./list-of-products/list-of-products.component";
import {ListOfOrdersComponent} from "./list-of-orders/list-of-orders.component";
import {ProductDetailsComponent} from "./list-of-products/product-details/product-details.component";
import {AddItemComponent} from "./add-item/add-item.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path:'', component:  ListOfProductsComponent},
  {path:'cart', component: ShoppingCartComponent},
  {path:'orders', component: ListOfOrdersComponent, canActivate: [AuthGuard]},
  {path:'products/:id', component: ProductDetailsComponent},
  {path:'add-new', component: AddItemComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
