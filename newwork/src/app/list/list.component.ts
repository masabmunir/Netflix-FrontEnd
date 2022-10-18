import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../sharedservice/toggle.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isSidebarShow = true;
  constructor(private toggleSidebarToggle: ToggleService) {
    this.toggleSidebarToggle.isSidebarShowEvent.subscribe((data) => {
      this.isSidebarShow = data
    })
  }

  ngOnInit(): void {

  }

}
