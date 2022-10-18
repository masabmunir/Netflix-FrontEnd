import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserImagesService } from '../sharedservice/user-images.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addImage: FormGroup;
  displayStyle = "none";
  imagist: any;
  collection: any = [];
  imageSrc: string;
  isUpdate: boolean = false;
  imgId :any = 0

  constructor(private userImages: UserImagesService,
    private myFormBuilder: FormBuilder) { }

  formControl() {
    this.addImage = this.myFormBuilder.group({
      imageTitle: ["", Validators.required],
      imageDesc: ["", Validators.required],
      imageURl: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.userData();
    this.formControl();
  }

  userData() {
    this.userImages.getData().subscribe(res => {
      console.log("resUser", res);
      this.imagist = res;
    }, (err) => {
      console.log("error is " + err)
    })

  }

  dellUser(item: any) {
    this.collection.splice(item - 1, 1);
    this.userImages.delUser(item).subscribe((res) => {
      console.log(res);
      this.userData();
    });
  }

  // Modal Code Start

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  closeModal(){
    this.displayStyle = "none";
  }
  //Modal Code End


  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result as string;

      reader.readAsDataURL(file);
      console.log('working', this.imageSrc)
    }
  }

  // For Post Data 

  saveData() {
    this.userImages.addData({
      imageTitle: this.addImage.controls['imageTitle'].value,
      imageDesc: this.addImage.controls['imageDesc'].value,
      imageURl: this.imageSrc
    }).subscribe((res) => {
      this.userData();
      this.addImage.reset();
    }, (err) => {
      console.log(err)
    })
  }


  updateView(img: any) {
    this.imgId = img._id;
    console.log('update id', this.imgId)
    this.isUpdate = true;
    this.addImage.controls['imageTitle'].setValue(img.imageTitle)
    this.addImage.controls['imageDesc'].setValue(img.imageDesc)
    this.imageSrc = img.imageURl
    this.openPopup()
  }

  updateData() {
    console.log('update');
    this.isUpdate = false;
    this.userImages.update_Data(this.imgId, {
      imageTitle: this.addImage.controls['imageTitle'].value,
      imageDesc: this.addImage.controls['imageDesc'].value,
      imageURl: this.imageSrc
    }).subscribe((res: any) => {
      console.log(res);
      this.userData();
    },(err)=>{
      console.log("Not Working" + err)
    })

  }
}