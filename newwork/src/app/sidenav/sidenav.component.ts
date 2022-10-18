import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { ToggleService } from '../sharedservice/toggle.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private toggleSidebarService: ToggleService) { }

  ngOnInit(): void {
  }
  
  
  toggleSidebar() {
    this.toggleSidebarService.toggleSidebar();
  }
}
