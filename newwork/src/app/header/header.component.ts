import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../sharedservice/authservice.service';
import { ToggleService } from '../sharedservice/toggle.service';
import { UserdataService } from '../sharedservice/userdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSidebarShow = true;

  menu: any;
  userName: any
  constructor(private userdata: UserdataService,
    private auth: AuthserviceService,
    private toggleSidebarService: ToggleService) {
      
    if (this.userdata.getId()) {
      this.userdata.getUser(this.userdata.getId()).subscribe((res: any) => {
        this.userName = res.name;
      })
    }
    this.toggleSidebarService.isSidebarShowEvent.subscribe((data) => {
      this.isSidebarShow = data
    })
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarService.toggleSidebar();
  }

  logOut() {
    this.auth.logOut();

  }
}
