import { Component, OnInit } from '@angular/core';
import { UserVideoService } from '../sharedservice/videos.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  addVideo: FormGroup
  vidlist: any
  vidSrc: string;
  isUpdate: boolean = false;
  url: any;
  format: any;
  collection: any = []
  vidId: any = 0
  displayStyle = "none";
  videos:any=[]
  searchText:any
    // For Pagination
    POSTS: Array<any> = []
    page: number = 1;
    count: number = 0;
    tableSize: number = 2;
    tableSizes: any = [3, 6, 9, 12];
    // End's Here

  constructor(public videoService: UserVideoService) { }

  ngOnInit() {
    this.videoService.getVideos().subscribe(res => {
      console.log("Movies Data is" + res)
      this.videos = res;
    }, (err) => {
      console.log("Something went wrong while getting data" + err)
    })
  }
  getData(){
    this.videoService.getVideos().subscribe(res => {
      console.log("Movies Data is" + res)
      this.videos = res;
    }, (err) => {
      console.log("Something went wrong while getting data" + err)
    })
  }



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

saveData() {
  this.videoService.postVideos({
    title: this.addVideo.controls['title'].value,
    genre: this.addVideo.controls['genre'].value,
    poster: "poster"
  }).subscribe(res => {
    console.log("res is " + res)
    this.getData();
    this.addVideo.reset();
  }, (err) => {
    console.log("Not Getting Response" + err)
  })
}


updateData() {
  this.isUpdate = false;
  this.videoService.updateData(this.vidId, {
    title: this.addVideo.controls['title'].value,
    genre: this.addVideo.controls['genre'].value,
    poster: this.url

  }).subscribe((res: any) => {
    console.log(res);
    this.getData();
  }, (err) => {
    console.log("Not Working" + err)
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

dellUser(item: any) {
  this.collection.splice(item - 1, 1)
  this.videoService.delUser(item).subscribe(res => {
    console.log(res)
    this.getData();
  })
}

// Update View

updateView(vid: any) {
  this.vidId = vid._id;
  this.isUpdate = true;
  this.addVideo.controls['title'].setValue(vid.title),
    this.addVideo.controls['genre'].setValue(vid.genre),
    this.addVideo.controls['videoUrl'].setValue(vid.poster),
    this.openPopup()
}
onTableDataChange(event: any) {
  let startIndex = (event - 1) * this.tableSize
  let endingIndex = event * this.tableSize
  let myArr = this.POSTS.filter((item: any, index: any) => { if (index >= startIndex && index < endingIndex) return item })
  this.vidlist = myArr.sort(function (a: any, b: any) {
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

