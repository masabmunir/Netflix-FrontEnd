import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

 updateImage:FormGroup

  constructor() { }

  ngOnInit(): void {
  }
  onFileSelected(event:any){

  }
  onSubmit(){

  }
}
