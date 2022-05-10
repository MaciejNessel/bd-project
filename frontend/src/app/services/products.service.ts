import { Injectable } from '@angular/core';
import {Item} from "../models/Item";
import {HttpClient} from '@angular/common/http';
import {cartItem} from "../models/CartItem";


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  items: Item[] = [];
  itemsInCart: cartItem[] = [];
  noItemsInCart: number = 0;
  resultPrice: number = 0;

  constructor(private http: HttpClient) {
    this.fetchItems().then(res => {})
  }

  async fetchItems(){
    this.http.get<Item[]>('http://localhost:2137/item')
      .subscribe((data: Item[]) => {
          // @ts-ignore
          this.items = data.response},
      (error => {console.log(error)}))
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

  makeOrder() {
    if(this.itemsInCart.length<1){
      alert("Nie dodano żadnych produktów do koszyka!");
    }
    const itemsToBuy = []
    for(let i of this.itemsInCart){
      itemsToBuy.push({
        product_id: i.item._id,
        quantity: i.quantity
      })
    }
    const body = {
      user_id: "const",
      products: itemsToBuy
    }
    console.log("Order made.");
    console.log(body);
    this.itemsInCart = []
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

  getQuantity(item: Item) {
    for(let i of this.itemsInCart){
      if(i.item==item){
        return i.quantity;
      }
    }
    return 0;
  }
}
