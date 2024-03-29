import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserdataService } from '../sharedservice/userdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private myFormBuilder:FormBuilder,
              private router:Router,
              private userdata:UserdataService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formControls();
  }

  formControls() {
    this.loginForm = this.myFormBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit(){
     this.userdata.loginUser(this.loginForm.value).subscribe((res : any)=>{
      if(res.message === "login successfully")this.router.navigateByUrl('/list/home');
      this.toastr.success(" Welcome " + res.userdata.name);
      console.log(res)

      localStorage.setItem('id', res.userdata._id);
      localStorage.setItem('token', res.userdata.tokens[res.userdata.tokens.length-1].token);
     },
     error=>{
      console.log(error);
      this.toastr.error(" Please Write correct Details ")
     })

  }

}
