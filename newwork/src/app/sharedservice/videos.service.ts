import { Injectable } from '@angular/core';
import { videos } from 'userModule/user.video';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserVideoService {

  constructor(private http: HttpClient) { }



  getVideos(){

    return this.http.get("http://localhost:8000/getVideos");

  }

  postVideos(vid:videos){
    return this.http.post("http://localhost:8000/postVideos",vid)
  }

  delUser(id: string) {
    return this.http.delete(`http://localhost:8000/deleteVideos/${id}`);
  }

  updateData(id: string, body: videos){
    return this.http.put(`http://localhost:8000/updateVideos/${id}`, body)
  }
}
