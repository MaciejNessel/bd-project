import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../services/products.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public productService: ProductsService) { }

  ngOnInit(): void {
  }

  getCart(){
    this.router.navigate(['/cart']);
  }

  getProductList() {
    this.router.navigate(['/']);
  }
}
