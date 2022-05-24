import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {cartItem} from "../models/cart-item";
import {catchError, Observable, throwError} from "rxjs";
import {OrderNew} from "../models/order-new";
import {ServerService} from "./server.service";
import {ItemFilterPaginationService} from "./item-filter-pagination.service";


@Injectable({
  providedIn: 'root'
})

export class CartService {
  itemsInCart: cartItem[] = [];
  noItemsInCart: number = 0;
  resultPrice: number = 0;

  private user_id: any = this.server.user_id;

  constructor(public server: ServerService, private itemFilterPaginationService: ItemFilterPaginationService) {
  }

  makeOrder() {
    if(this.itemsInCart.length<1){
      alert("Nie dodano żadnych produktów do koszyka!");
      return;
    }
    const itemsToBuy = []
    for(let i of this.itemsInCart){
      console.log(i);
      itemsToBuy.push({
        item_id: i.item._id,
        quantity: i.quantity,
        size: i.item.size
      })
    }
    const body = {
      user_id: this.user_id,
      products: itemsToBuy
    }
    this.server.createOrder(body);
    this.itemsInCart = []
    this.countResultCartInfo();
    this.itemFilterPaginationService.reset();
  }


  addToCart(item: Item) {
    for (let i of this.itemsInCart){
      if(i.item == item){
        this.increaseNoItemInCart(item);
        return;
      }
    }
    this.itemsInCart.push({
      item: item,
      quantity: 1
    });
    this.countResultCartInfo();
  }

  removeItemFromCart(item: Item) {
    for(let i=0; i<this.itemsInCart.length; i++){
      if(this.itemsInCart[i].item == item){
        this.itemsInCart.splice(i, 1);
        this.countResultCartInfo();
        return;
      }
    }
    alert("Wystąpił błąd.");
  }

  increaseNoItemInCart(item: Item) {
    for(let i=0; i<this.itemsInCart.length; i++){
      if(this.itemsInCart[i].item == item){
        if(this.itemsInCart[i].quantity + 1 <= this.itemsInCart[i].item.quantity_in_stock){
          this.itemsInCart[i].quantity += 1;
        }
        else{
         alert("Nie ma wystarczająco towaru na magazynie.");
        }
        this.countResultCartInfo();
        return;
      }
    }
    alert("Wystąpił błąd.");
  }

  decreaseNoItemInCart(item: Item) {
    for(let i=0; i<this.itemsInCart.length; i++){
      if(this.itemsInCart[i].item == item){
        this.itemsInCart[i].quantity -= 1;
        if(this.itemsInCart[i].quantity<1){
          this.itemsInCart.splice(i, 1);
        }
        this.countResultCartInfo();
        return;
      }
    }
    alert("Wystąpił błąd.");
  }

  countResultCartInfo(){
    let resultPrice = 0;
    let resultQuantity = 0;
    for(let i of this.itemsInCart){
      resultPrice += i.item.price * i.quantity;
      resultQuantity += i.quantity;
    }
    resultPrice.toFixed(2);
    this.resultPrice = resultPrice;
    this.noItemsInCart = resultQuantity;
  }

  getQuantityItemInCart(item: Item) {
    for(let i of this.itemsInCart){
      if(i.item==item){
        return i.quantity;
      }
    }
    return 0;
  }

}
