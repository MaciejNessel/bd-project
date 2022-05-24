import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  submit() {
    if(this.form.value.password!=this.form.value.repassword){
      alert('Hasła się nie zgadzają!')
    }
    else{
      const user: User = {
        userName: this.form.value.userName,
        email: this.form.value.email,
        password: this.form.value.password,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
      }
      this.authService.registerNew(user);
    }
  }
}
