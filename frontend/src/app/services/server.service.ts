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
