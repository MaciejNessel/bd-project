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
  limit = 5;
  currentPage = 1;
  maxNumOfPages = 0;

  orderList :OrderHistory[] = [
  ]

  constructor(private server: ServerService) {
    this.load();
  }


  ngOnInit(): void {
  }

  load() {
    const body = {
      page: this.currentPage,
      limit: this.limit
    }
    this.server.fetchOrders(body).subscribe({
      next: data => {
        this.orderList = data.history;
        this.maxNumOfPages = data.pageAmount;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
    this.load();
  }

  nextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.maxNumOfPages);
    this.load();
  }

  changeCurrentPage(number: Number) {
    this.currentPage = Math.min(parseInt(number.valueOf().toString()), this.maxNumOfPages);
    this.currentPage = Math.max(this.currentPage, 1);
    this.load();
  }

  changeLimit(number: Number) {
    this.limit = parseInt(number.valueOf().toString());
    this.changeCurrentPage(1);
  }
}
