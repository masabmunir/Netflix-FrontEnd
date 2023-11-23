import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthserviceService } from '../sharedservice/authservice.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(public auth: AuthserviceService, public router: Router) {}
    canActivate() {

    if(this.auth.isAuthenticated()){   // if function has some value
      return true
    }

    this.router.navigate(['login'])
    return false
    
  }

}
