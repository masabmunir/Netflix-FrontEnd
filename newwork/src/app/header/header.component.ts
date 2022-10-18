import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthserviceService } from '../sharedservice/authservice.service';
import { UserdataService } from '../sharedservice/userdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter;
  menu: any;
  userName: any

  constructor(private userdata: UserdataService,
    private auth: AuthserviceService) {
    if (this.userdata.getId()) {
      this.userdata.getUser(this.userdata.getId()).subscribe((res: any) => {
        this.userName = res.name;
      })
    }
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSideBarForMe.emit();
  }

  logOut() {
    this.auth.logOut();

  }
}
