import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthserviceService {

  constructor(private router:Router) {}

  public isAuthenticated() {

   return localStorage.getItem('token') != null;
   
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigateByUrl('login')
  
  }
}

