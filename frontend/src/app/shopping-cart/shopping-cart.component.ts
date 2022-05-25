import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  constructor(public productsService: CartService, public auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  makeOrder() {
    if(!this.auth.token){
      alert("Zaloguj się aby złożyć zamówienie");
      this.router.navigate(['login']);
      return;
    }
    this.productsService.makeOrder();
  }
}
