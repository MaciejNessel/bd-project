import { Injectable } from '@angular/core';
import {Item} from "../models/item";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {cartItem} from "../models/cart-item";
import {catchError, Observable, throwError} from "rxjs";
import {OrderNew} from "../models/order-new";


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  items: Item[] = [];
  itemsInCart: cartItem[] = [];
  noItemsInCart: number = 0;
  resultPrice: number = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  private user_id: any = "user_id";

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

  fetchOrders(): Observable<any>{
    const body = {
      user_id: this.user_id
    }
    return this.http.post<any>('http://localhost:2137/order', body);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

    makeOrderSend(body: any){
    console.log(body);
    this.http.post<OrderNew>('http://localhost:2137/order/create', body).subscribe({
      next: data => {
        console.log(data)
        alert("Zamówienie zostało poprawnie złożone");
      },
        error: error => {
        console.error('There was an error!', error);
      }
    });
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
    console.log("OrderHistory made.");
    console.log(body);
    this.makeOrderSend(body);
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

  addItem(newItem: Item) {
    this.http.post<Item>('http://localhost:2137/item/create', newItem).subscribe({
      next: data => {
        alert("Produkt został poprawnie wprowadzony.");
        console.log(data)
        console.log(newItem)
      },
      error: error => {
        alert("Wystąpiły komplikacje...");
        console.error('There was an error!', error);
      }
    });
  }
}
