import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../services/cart.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public productService: CartService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  getCart(){
    this.router.navigate(['/cart']);
  }

  getProductList() {
    this.router.navigate(['/']);
  }

  getOrders() {
    this.router.navigate(['/orders']);
  }

  addNew() {
    this.router.navigate(['/add-new']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logOut();
  }
}
