import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../sharedservice/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  empData: any;
  collection: any = [];
  searchText:any
  
  constructor(private router: Router,
    private usernames: UserdataService) {
    this.userData()
  }

  ngOnInit(): void {
  }

  userData() {
    this.usernames.getData().subscribe(res => {
      console.log(res);
      this.empData = res;
    }, (err) => {
      console.log("error is " + err)
    }
    )
  }

  delUser(item: any) {
    this.collection.splice(item - 1, 1);
    this.usernames.deleteUser(item).subscribe((res) => {
      console.log(res);
      this.userData();
    });
  }
}
