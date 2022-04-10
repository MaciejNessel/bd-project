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

@NgModule({
  declarations: [
    AppComponent,
    ListOfProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
