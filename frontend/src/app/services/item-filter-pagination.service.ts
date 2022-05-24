import {Injectable} from '@angular/core';
import {ServerService} from "./server.service";
import {Item} from "../models/item";
import {FilterItem} from "../models/filterItem";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ItemFilterPaginationService {
  items: Item[] = [];
  limit: Number = 3;
  currentPage = 0;
  constructor(private server: ServerService, private router: Router) {
    this.loadMore();
  }

  async loadMore() {
    const last = this.items;
    this.currentPage += 1;
    const body = {
      page: this.currentPage,
      limit: this.limit
    };
    await this.server.fetchNextItems(body).subscribe((data: Item[]) => {
        // @ts-ignore
        this.items = this.items.concat(data.response)
      },
      (error => {
        console.log(error)
      }));
    return this.items == last;
  }

  newFilter(body: any) {
    this.currentPage = 1;
    body.page = this.currentPage;
    body.limit = this.limit;
    console.log(body);
    let bodyResult = Object.fromEntries(Object.entries(body).filter(([_, v]) => v != null && v != "Wybierz..."));
    this.server.fetchNextItems(bodyResult).subscribe((data: Item[]) => {
        // @ts-ignore
        this.items = data.response},
      (error => {console.log(error)}));
  }

  reset() {
  }
}
