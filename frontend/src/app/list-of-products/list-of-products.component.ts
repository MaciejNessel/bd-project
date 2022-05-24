import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart.service";
import {ItemFilterPaginationService} from "../services/item-filter-pagination.service";

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})

export class ListOfProductsComponent implements OnInit {
  actualPage:Number = 0;

  constructor(public productsService: CartService, public itemPaginationService: ItemFilterPaginationService) {
  }

  ngOnInit(): void {
    this.itemPaginationService.loadMore();
  }

}
