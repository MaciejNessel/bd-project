import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(login: String, password: String) {
    console.log(login, password);
  }

  registerNew(user: User) {

  }
}
