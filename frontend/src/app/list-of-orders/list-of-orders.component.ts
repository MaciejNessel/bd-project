import { Component, OnInit } from '@angular/core';
import {OrderHistory} from "../models/order-history";
import {CartService} from "../services/cart.service";
import {Item} from "../models/item";
import {ServerService} from "../services/server.service";

@Component({
  selector: 'app-list-of-orders',
  templateUrl: './list-of-orders.component.html',
  styleUrls: ['./list-of-orders.component.css']
})
export class ListOfOrdersComponent implements OnInit {
  limit = 1;
  currentPage = 1;
  maxNumOfPages = null;

  orderList :OrderHistory[] = [
  ]

  constructor(private server: ServerService) {
    this.loadMore();
  }


  ngOnInit(): void {
  }

  loadMore() {
    const body = {
      page: this.currentPage,
      limit: this.limit
    }
    this.server.fetchOrders(body).subscribe({
      next: data => {
        this.orderList = this.orderList.concat(data.history);
        this.maxNumOfPages = data.pageAmount;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
    this.currentPage++;
  }
}
