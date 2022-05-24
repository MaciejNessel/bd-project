import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Item} from "../models/item";
import {Observable, throwError} from "rxjs";
import {OrderNew} from "../models/order-new";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public user_id: any = "user_id";


  constructor(private http: HttpClient) {
  }

  fetchNextItems(body: Object){
    return this.http.post<Item[]>('http://localhost:2137/item', body);
  }

  fetchOrders(body: any): Observable<any>{
    body.user_id = this.user_id;

    return this.http.post<any>('http://localhost:2137/order', body);
  }

  createOrder(body: any){
    console.log(body);
    this.http.post<any>('http://localhost:2137/order/create', body).subscribe({
      next: data => {
        if(data.status){
          alert("Zamówienie zostało poprawnie złożone.");
        }else{
          alert("Wystąpił problem ze złożeniem zamówienia... " + data.message);
        }
      },
      error: error => {
        alert("Wystąpił problem ze złożeniem zamówienia... " + error);
      }
    });
  }

  createItem(newItem: Item) {
    this.http.post<any>('http://localhost:2137/item/create', newItem).subscribe({
      next: data => {
        if(data.status){
          alert("Produkt został poprawnie wprowadzony.");
        }else{
          alert("Wystąpił problem...");
        }
      },
      error: error => {
        alert("Wystąpił problem...");
      }
    });
  }

  login(body: {password: String; userName: String}) : Observable<any>{
    return this.http.post<any>('http://localhost:2137/user/login', body);
  }
}
