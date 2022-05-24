import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfProductsComponent } from './list-of-products/list-of-products.component';
import { ProductCardComponent } from './list-of-products/product-card/product-card.component';
import { ProductDetailsComponent } from './list-of-products/product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { ListOfOrdersComponent } from './list-of-orders/list-of-orders.component';
import { AddItemComponent } from './add-item/add-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SingleOrderComponent } from './list-of-orders/single-order/single-order.component';
import { ItemFilterComponent } from './item-filter/item-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ListOfProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    HeaderComponent,
    ListOfOrdersComponent,
    AddItemComponent,
    SingleOrderComponent,
    ItemFilterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
