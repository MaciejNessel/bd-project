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
  limit: Number = 12;
  currentPage = 0;
  bodyFiltered = {};

  constructor(private server: ServerService, private router: Router) {
    this.loadMore();
  }

  async loadMore() {
    const currBodyFiltered : any = this.bodyFiltered;
    const last = this.items;
    this.currentPage += 1;

    currBodyFiltered.page = this.currentPage;
    currBodyFiltered.limit = this.limit;
    console.log(currBodyFiltered);
    await this.server.fetchNextItems(currBodyFiltered).subscribe((data: Item[]) => {
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
    this.items = [];
    body.page = this.currentPage;
    body.limit = this.limit;

    let bodyResult = Object.fromEntries(Object.entries(body).filter(([_, v]) => v != null && v != "Wybierz..."));
    this.bodyFiltered = bodyResult;

    this.server.fetchNextItems(bodyResult).subscribe((data: Item[]) => {
        // @ts-ignore
        this.items = data.response},
      (error => {console.log(error)}));
  }

  reset() {
  }
}
