import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../models/Item";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() item!: Item
  constructor() { }

  ngOnInit(): void {
  }

}
