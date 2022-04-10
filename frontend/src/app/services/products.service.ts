import { Injectable } from '@angular/core';
import {Item} from "../models/Item";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  items: Item[] = []

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
}
