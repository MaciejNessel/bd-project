import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {ServerService} from "./server.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: String = "";

  constructor(private server: ServerService) { }

  login(login: String, password: String) {
    const body = {
      userName: login,
      password: password
    }
    this.server.login(body).subscribe(res=>{
      console.log(res);
    })
  }

  registerNew(user: User) {

  }

}
