import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  constructor() {
    this.isSidebarShowEvent.next(true)
    this.isImageShownEvent.next(false);
  }

  isSidebarShowEvent = new Subject<boolean>();
  isSidebarShow = true;

  isImageShownEvent = new Subject<boolean>()
  isImageShown = false;


  toggleSidebar() {
    this.isSidebarShow = !this.isSidebarShow
    if (!this.isSidebarShow) {
      this.isSidebarShowEvent.next(false)
    } else {
      this.isSidebarShowEvent.next(true)
    }
  }


}
