import { Component, OnInit } from '@angular/core';
import {OrderHistory} from "../models/order-history";
import {ProductsService} from "../services/products.service";
import {Item} from "../models/item";

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
      status: 0,
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
      status: 3,
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

  constructor(private productService: ProductsService) {
    this.productService.fetchOrders().subscribe({
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
