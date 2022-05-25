import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {ServerService} from "./server.service";
import {Router} from "@angular/router";
import {AppCookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: String = "";
  public firstName: String="";
  public lastName: String="";

  constructor(private server: ServerService, private router: Router, private cookieService: AppCookieService) {
    this.token = this.cookieService.get('auth-token');
    if(this.token){
      this.server.auth(this.token).subscribe(
        res => {
          this.firstName = res.body.firstName;
          this.lastName = res.body.lastName;
          this.router.navigate(['/']);
        }
      );
    }
  }

  async login(login: String, password: String) {
    const body = {
      userName: login,
      password: password
    }
    this.server.login(body).subscribe(res => {
      this.token = res.headers.get('auth-token');
      this.cookieService.set('auth-token', this.token.toString());
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
    this.cookieService.remove('auth-token');
  }

  isLogged(){
    return this.token;
  }

  registerNew(user: User) {
    this.server.register(user).subscribe(res=>{
      if(!res.body.status){
        alert(res.body.message);
      }
      else{
        alert("Użytkownik dodany poprawnie.");
        this.router.navigate(['login']);
      }
    });
  }

}
