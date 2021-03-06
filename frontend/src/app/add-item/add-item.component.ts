import { Component, OnInit } from '@angular/core';
import {sizesArray} from "../models/item-sizes";
import {gendersArray} from "../models/item-genders";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../services/cart.service";
import {Item} from "../models/item";
import {ServerService} from "../services/server.service";
import {categoriesArray} from "../models/categories";


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  sizesArray = sizesArray;
  gendersArray = gendersArray;
  form!: FormGroup;
  categoriesArray = categoriesArray;

  constructor(private formBuilder: FormBuilder, private server: ServerService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameInput: ['', [Validators.required]],
      descriptionInput: ['', [Validators.required]],
      typeInput: ['', [Validators.required]],
      sizeInput: ['', [Validators.required]],
      quantityInput: ['', [Validators.required]],
      genderInput: ['', [Validators.required]],
      priceInput: ['', [Validators.required]],
      imgInput: ['', [Validators.required]]
    });
  }

  get newItem(): Item {
    return {
      _id: -1,
      name: this.form.value.nameInput,
      description: this.form.value.descriptionInput,
      type: this.form.value.typeInput,
      size: this.form.value.sizeInput,
      quantity_in_stock: this.form.value.quantityInput,
      gender: this.form.value.genderInput,
      price: this.form.value.priceInput,
      imageURL: this.form.value.imgInput
    };
  }

  submit() {
    console.log(this.newItem);
    if (this.form.invalid){
      alert("Uzupełnij wszystkie pola prawidłowymi danymi.");
      return;
    } else{
      this.server.createItem(this.newItem).subscribe({
        next: data => {
          if(data.status){
            alert("Produkt został poprawnie wprowadzony.");
            this.form.reset();
          }else{
            alert("Wystąpił problem..." + data.message.toString());
          }
        },
        error: error => {
          alert("Wystąpił problem..." + + error.message);
        }
      });
    }
  }
}
