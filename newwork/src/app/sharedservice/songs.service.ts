import { Injectable } from '@angular/core';
import { songs } from 'userModule/song.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class songService {

  constructor(private http: HttpClient) { }



  getSongs(){

    return this.http.get("http://localhost:8000/getSongs");

  }

  postSongs(vid:songs){
    return this.http.post("http://localhost:8000/postSongs",vid)
  }

  DeleteSongs(id: string) {
    return this.http.delete(`http://localhost:8000/deleteSongs/${id}`);
  }

  UpdateSongs(id: string, body: songs){
    return this.http.put(`http://localhost:8000/UpdateSongs/${id}`, body)
  }
}
