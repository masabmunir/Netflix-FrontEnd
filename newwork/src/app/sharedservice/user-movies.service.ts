import { Injectable } from '@angular/core';
import { Movies } from 'userModule/userMovies';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserMoviesService {

  constructor(private http: HttpClient) { }

  get_movies = "http://localhost:8000/movies";

  getMovies(){
    return this.http.get(this.get_movies);
  }

  postMovies(mov:Movies){
    return this.http.post(this.get_movies +"/addMovie",mov)
  }
  
  delUser(id: string) {
    return this.http.delete(this.get_movies+`/${id}`);
  }

  updateData(id: string, body: Movies){
    return this.http.put(this.get_movies+`/${id}`, body)
  }
}
