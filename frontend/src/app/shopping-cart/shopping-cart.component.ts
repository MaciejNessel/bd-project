import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  constructor(public productsService: CartService) {
  }

  ngOnInit(): void {
  }

  makeOrder() {
    this.productsService.makeOrder();
  }
}
