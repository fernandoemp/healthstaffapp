import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isUserLoggedIn: boolean;
  // openixApi: string;
  public userLogged!: User;
  public username: string;

  constructor(private _http: HttpClient, private _router: Router) {
    this.getUserLoggedIn();
    // this.openixApi = environment.openixApi;
    this.isUserLoggedIn = false;
    this.username = '';
  }

  userLogin(username: string, password: string) {
    // let httpOption = {
    //   headers: new HttpHeaders({
    //     'content-type': 'application/json'
    //   })
    // };
    // const body = ({ 'username': username, 'password': password });
    // return this._http.post(`${this.openixApi}/login`, body, httpOption);
  }

  setUserLoggedIn() {
    // this.userLogged = JSON.parse(localStorage.getItem('currentUser')!);
    // this.isUserLoggedIn = true;
    // this.getUsername();
  }

  getUserLoggedIn() {
    // this.userLogged = JSON.parse(localStorage.getItem('currentUser')!);
    // if(this.userLogged !== null){
    //   this.isUserLoggedIn = true;
    //   this.getUsername();
    // }
  }
  
  getUsername() {
    // let email = this.userLogged.email;
    // let array = email.split('');
    // let index = array.findIndex(element => element === '@');
    // this.username = email.substring(0, index);
  }

  userLogout(): void {
    localStorage.clear();
    this.isUserLoggedIn = false;
    this._router.navigate(['login']);
  }
}

 