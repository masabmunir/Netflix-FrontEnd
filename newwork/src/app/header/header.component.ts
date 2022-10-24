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
  display:boolean = false; // For Logo Image shown in header
  isImagebarShown = false;
  menu: any;
  userName: any
  constructor(private userdata: UserdataService,
    private auth: AuthserviceService,
    private toggleSidebarService: ToggleService){

    if (this.userdata.getId()) {
      this.userdata.getUser(this.userdata.getId()).subscribe((res: any) => {
        this.userName = res.name;
      })
    }

    // Sidenav
    this.toggleSidebarService.isSidebarShowEvent.subscribe((data) => {
      this.isSidebarShow = data
    })

    // Logo Image 
    this.toggleSidebarService.display.subscribe((res)=>{
      this.display=res;
    })
    
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarService.toggleSidebar();
    this.toggleSidebarService.display.next(false) 
  }


  logOut() {
    this.auth.logOut();
  }

}
