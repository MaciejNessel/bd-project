import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Item} from "../models/item";
import {Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  public headers = new HttpHeaders();
  public token: String = "";
  public user_id: any = "user_id";

  constructor(private http: HttpClient) {
    this.headers.set("Content-Type", "application/json");
    this.headers.set("Accept", "*/*");
  }

  fetchNextItems(body: Object){
    return this.http.post<Item[]>('http://localhost:2137/item', body);
  }

  fetchOrders(body: any): Observable<any>{
    body.user_id = this.user_id;
    return this.http.post<any>('http://localhost:2137/order', body, { headers: {'auth-token': this.token.toString()}});
  }

  createOrder(body: any){
    console.log(body);
    this.http.post<any>('http://localhost:2137/order/create', body, { headers: {'auth-token': this.token.toString()}}).subscribe({
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
    return this.http.post<any>('http://localhost:2137/item/create', newItem, { headers: {'auth-token': this.token.toString()}});
  }

  login(body: {password: String; userName: String}) : Observable<any>{
    let headers = new HttpHeaders();
    return this.http.post<any>('http://localhost:2137/user/login', body,
      {observe: 'response', withCredentials: true, headers: headers});
  }

  auth(token: String) {
    this.token = token;
    return this.http.get<any>('http://localhost:2137/user/auth',
      {observe: 'response', withCredentials: true, headers: {'auth-token': token.toString()}});
  }

  register(body: any){
    let headers = new HttpHeaders();
    return this.http.post<any>('http://localhost:2137/user/register', body,
      {observe: 'response', withCredentials: true, headers: headers});
  }

}
