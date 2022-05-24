import {Injectable} from '@angular/core';
import {ServerService} from "./server.service";
import {Item} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ItemPaginationService {
  items: Item[] = [];
  itemsPerPage: Number = 1;
  currentPage = 0;
  constructor(private server: ServerService) { }

  loadMore(){
    this.currentPage+=1;
    const body = {
      page: this.currentPage,
      limit: this.itemsPerPage
    };
    this.server.fetchNextItems(body).subscribe((data: Item[]) => {
        if(data.respo)
        // @ts-ignore
        this.items = this.items.concat(data.response)},
      (error => {console.log(error)}));
  }
}
