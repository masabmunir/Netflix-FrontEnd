import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserMoviesService } from '../sharedservice/user-movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  addMovie: FormGroup
  movlist: any
  displayStyle = "none";
  movSrc: string;
  isUpdate: boolean = false;
  url: any;
  format: any;
  collection: any = []
  movId: any = 0
  searchText:any

   // For Pagination
   POSTS: Array<any> = []
   page: number = 1;
   count: number = 0;
   tableSize: number = 2;
   tableSizes: any = [3, 6, 9, 12];
   // End's Here

  constructor(private myFormBuilder: FormBuilder,
    private userMovies: UserMoviesService) { }

  ngOnInit(): void {
    this.formControl();
    this.getData();
  }

  formControl() {
    this.addMovie = this.myFormBuilder.group({
      moviesTitle: ['', Validators.required],
      moviesDetail: ['', Validators.required],
      moviesCategories: ['', Validators.required],
      moviesURl: ['', Validators.required],
    })
  }

  // For Getting Data of Movies
  getData() {
    this.userMovies.getMovies().subscribe((res:any) => {
      console.log("Movies Data is" + res)
      this.movlist = res;
      this.POSTS=res;
      this.count = res.length;
      this.onTableDataChange(this.page)
    }, (err) => {
      console.log("Something went wrong while getting data" + err)
    })
  }

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  // Posting Data of Movies

  saveData() {
    this.userMovies.postMovies({
      moviesTitle: this.addMovie.controls['moviesTitle'].value,
      moviesDetail: this.addMovie.controls['moviesDetail'].value,
      moviesCategories: this.addMovie.controls['moviesCategories'].value,
      moviesURl: this.url,
    }).subscribe(res => {
      console.log("res is " + res)
      this.getData();
      this.addMovie.reset();
    }, (err) => {
      console.log("Not Getting Response" + err)
    })
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

  // Delete Movies 

  dellUser(item: any) {
    this.collection.splice(item - 1, 1)
    this.userMovies.delUser(item).subscribe(res => {
      console.log(res)
      this.getData();
    })
  }

  // Update View 

  updateView(mov: any) {
    this.movId = mov._id;
    this.isUpdate = true;
    this.addMovie.controls['moviesTitle'].setValue(mov.moviesTitle),
      this.addMovie.controls['moviesDetail'].setValue(mov.moviesDetail),
      this.addMovie.controls['moviesCategories'].setValue(mov.moviesCategories),
      this.addMovie.controls['moviesURl'].setValue(mov.moviesURl),
      this.openPopup()
  }

  // For Updating Data
  updateData() {
    this.isUpdate = false;
    this.userMovies.updateData(this.movId, {
      moviesTitle: this.addMovie.controls['moviesTitle'].value,
      moviesDetail: this.addMovie.controls['moviesDetail'].value,
      moviesCategories: this.addMovie.controls['moviesCategories'].value,
      moviesURl: this.url

    }).subscribe((res: any) => {
      console.log(res);
      this.getData();
    }, (err) => {
      console.log("Not Working" + err)
    })
  
  }

  onTableDataChange(event: any) {
    let startIndex = (event - 1) * this.tableSize
    let endingIndex = event * this.tableSize
    let myArr = this.POSTS.filter((item: any, index: any) => { if (index >= startIndex && index < endingIndex) return item })
    this.movlist = myArr.sort(function (a: any, b: any) {
      var textA = a.moviesTitle.toUpperCase();
      var textB = b.moviesTitle.toUpperCase();
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

}

