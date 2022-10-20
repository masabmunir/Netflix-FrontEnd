import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../sharedservice/userdata.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addUser:FormGroup
  empData: any;
  collection: any = [];
  searchText: any
  displayStyle = "none";
  // For Pagination
  POSTS : any = []
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];
  // End's Here

  constructor(private router: Router,
    private usernames: UserdataService,
    private myFormBuilder:FormBuilder) {
    this.userData();
  }

  ngOnInit(): void {
    this.formControl()
    this.userData();
   
  }

  formControl(){
    this.addUser = this.myFormBuilder.group({
      name:  ["", Validators.required],
      email: ["", Validators.required],
      role: ["", Validators.required],
      contact: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  userData() {
    this.usernames.getData().subscribe((res: any) => {
      console.log(res);
      this.count = res.length
      this.POSTS = res;
      this.onTableDataChange(this.page)
    }, (err) => {
      console.log("error is " + err)
    }
    )
  }

  saveData(){
    console.log(this.addUser.value);
    this.usernames.addUserlist(this.addUser.value).subscribe(
      (res)=>{
        this.userData();
        this.router.navigateByUrl('/list/home');
        console.log("res",res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  onTableDataChange(event: any) {
    let startIndex = (event - 1) * this.tableSize
    let endingIndex = event * this.tableSize
    let myArr = this.POSTS.filter((item: any, index: any) => { if (index >= startIndex && index < endingIndex) return item })
    this.empData = myArr.sort(function (a: any, b: any) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    this.page = event;
    // this.userData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.userData();
  }


  delUser(item: any) {
    this.collection.splice(item - 1, 1);
    this.usernames.deleteUser(item).subscribe((res) => {
      console.log(res);
      this.userData();
    });
  }

 // For Model open and Close

 openPopup() {
  this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
  console.log("working")
}
closeModal() {
  this.displayStyle = "none";
}

//Ends Here


}
