import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthserviceService } from './sharedservice/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthserviceService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['list'])
    }
  }
}
