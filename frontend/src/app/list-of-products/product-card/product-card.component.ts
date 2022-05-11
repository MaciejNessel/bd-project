import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../models/item";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() item!: Item;
  quantity: number = 0;
  constructor(private productsService : ProductsService) {
  }

  ngOnInit(): void {
    this.quantity = this.item.quantity_in_stock;
    this.quantity -= this.productsService.getQuantity(this.item);
  }

  addToCart() {
    this.quantity = Math.max(this.quantity-1, 0);
    this.productsService.addToCart(this.item);
  }
}
