import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Item} from "../models/Item";

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})

export class ListOfProductsComponent implements OnInit {
  constructor(public productsService: ProductsService) {
  }

  ngOnInit(): void {
  }

}
