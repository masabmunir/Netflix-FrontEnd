import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Images } from 'userModule/userImages'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserImagesService {

  constructor(private http: HttpClient) { }

  url = environment.BASE_URL;
  get_data = "http://localhost:8000";

  // Post data in WebPage

  getData() {
    return this.http.get(this.url);
  }

  // Post Data in Page

  addData(img:Images){
    return this.http.post(this.url+"/addImage",img);
  }

  // Delete Data from Webpage

  delUser(id: string) {
    return this.http.delete(this.get_data+`/${id}`);
  }

  // Update Data 

  update_Data(id: string, body: Images){
    return this.http.put(this.url+`/${id}`, body);
  }
}
