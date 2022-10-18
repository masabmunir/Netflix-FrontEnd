import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserdataService } from '../sharedservice/userdata.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  addUser:FormGroup;

  constructor(private myFormBuilder:FormBuilder,
              private userService:UserdataService,
              private router:Router,
              ) { }


  ngOnInit(): void {
    this.formControl();
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

  saveData(){
    console.log(this.addUser.value);
    this.userService.addUserlist(this.addUser.value).subscribe(
      (res)=>{
        this.router.navigateByUrl('/list/home');
        console.log("res",res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
