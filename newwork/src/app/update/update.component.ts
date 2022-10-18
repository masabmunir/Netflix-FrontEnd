import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserdataService } from '../sharedservice/userdata.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  Update: FormGroup
  constructor(private myFormBuilder: FormBuilder,
    private router: ActivatedRoute,
    private userdata: UserdataService,
    private routerURL:Router,) { }

  formControl() {
    this.Update = this.myFormBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      role: ["", Validators.required],
      contact: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.formControl();
    this.userdata.getUser(this.router.snapshot.params['id']).subscribe((res:any) => {
    console.log(res)
    this.Update.setValue({
      name: res.name,
      email: res.email,
      role: res.role,
      contact: res.contact
    })   
    })
  }

  updateData(){
    this.userdata.updateUser(this.router.snapshot.params['id'],this.Update.value).subscribe((result)=>{
      this.routerURL.navigateByUrl('/list/home');
      console.log(result)
    })
  }
}
