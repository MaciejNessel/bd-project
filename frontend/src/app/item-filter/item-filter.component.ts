import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../services/cart.service";
import {Item} from "../models/item";
import {sizesArray} from "../models/item-sizes";
import {gendersArray} from "../models/item-genders";

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.css']
})
export class ItemFilterComponent implements OnInit {
  sizesArray = sizesArray;
  gendersArray = gendersArray;
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: CartService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameInput: [null, [Validators.required]],
      typeInput: [null, [Validators.required]],
      sizeInput: [null, [Validators.required]],
      quantityInput: [null, [Validators.required]],
      genderInput: [null, [Validators.required]],
      priceMinInput: [null, [Validators.required]],
      priceMaxInput: [null, [Validators.required]],
    });
  }

  get item() {
    return {
      name: this.form.value.nameInput,
      type: this.form.value.typeInput,
      size: this.form.value.sizeInput,
      gender: this.form.value.genderInput,
      price_min: this.form.value.priceMinInput,
      price_max: this.form.value.priceMinInput,
    };
  }

  submit() {
    console.log(this.item);

  }
}
