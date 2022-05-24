import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {ServerService} from "./server.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: String = "";
  public firstName: String="";
  public lastName: String="";

  constructor(private server: ServerService, private router: Router) {
  }

  async login(login: String, password: String) {
    const body = {
      userName: login,
      password: password
    }
    this.server.login(body).subscribe(res => {
      this.token = res.headers.get('auth-token');
      this.server.auth(this.token).subscribe(
        res => {
          this.firstName = res.body.firstName;
          this.lastName = res.body.lastName;
          this.router.navigate(['/']);
        }
      );
    })
  }

  logOut(){
    this.token = "";
    this.router.navigate(['/']);
  }

  isLogged(){
    return this.token;
  }

  registerNew(user: User) {
  }
}
