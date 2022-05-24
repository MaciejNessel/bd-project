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

  orderList :OrderHistory[] = [
    {
      order_id: "692137",
      date: "2022-02-02",
      status: "unpaid",
      products: [
        {
          id_: "id",
          name: "item first",
          quantity: 2,
          price: 2.50
        },
        {
          id_: "id2",
          name: "item second",
          quantity: 2,
          price: 2.50
        }
      ],
      resultPrice: 10.00
    },
    {
      order_id: "666400",
      date: "2022-02-19",
      status: "cancelled",
      products: [
        {
          id_: "id2",
          name: "item third",
          quantity: 3,
          price: 2.50
        }
      ],
      resultPrice: 7.50
    }
  ]

  constructor(private server: ServerService) {
    this.server.fetchOrders().subscribe({
      next: data => {
        console.log(data.history)
        this.orderList = data.history;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  ngOnInit(): void {
  }

}
