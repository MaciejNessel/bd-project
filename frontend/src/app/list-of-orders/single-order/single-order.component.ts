import {Component, Input, OnInit} from '@angular/core';
import {OrderHistory, StatusEnum} from "../../models/order-history";


@Component({
  selector: '[app-single-order]',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {
  @Input() order!: OrderHistory;
  status = ""
  constructor() { }

  ngOnInit(): void {
    switch (this.order.status){
      case "unpaid": this.status = "nieopłacone"; break;
      case "paid": this.status = "opłacone"; break;
      case "cancelled": this.status = "anulowane"; break;
    }

  }

}
