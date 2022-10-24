import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthGuard } from './auth/auth.guard';
import { AuthserviceService } from './sharedservice/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
url:any='';
  constructor(private authService: AuthserviceService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.url = this.router.url.split('/');
    this.url = this.url[this.url.length]
    if (this.authService.isAuthenticated() && this.url) {
      this.router.navigate([this.url])
    }
  }
}
