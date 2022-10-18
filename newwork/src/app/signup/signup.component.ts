import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserdataService } from '../sharedservice/userdata.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: FormGroup;
  constructor(
              private userService:UserdataService,
              private router:Router,
              private myFormBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.formControls();
  }

  formControls() {
    this.signup = this.myFormBuilder.group({
      name:  ["", Validators.required],
      email: ["", Validators.required],
      role: ["", Validators.required],
      contact: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
 
  SaveData(){ 
     this.userService.adduser(this.signup.value).subscribe(
      (res)=>{
        this.router.navigateByUrl('/login');
        console.log("res",res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
