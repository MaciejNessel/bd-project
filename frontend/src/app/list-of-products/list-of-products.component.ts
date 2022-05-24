import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {ItemPaginationService} from "../services/item-pagination.service";

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})

export class ListOfProductsComponent implements OnInit {
  actualPage:Number = 0;

  constructor(public productsService: CartService, public itemPaginationService: ItemPaginationService) {
  }

  ngOnInit(): void {
    this.itemPaginationService.loadMore();
  }

}
