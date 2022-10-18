import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'userModule/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  userId: any;

  url = environment.BASE_URL;
  getdata = "http://localhost:8000/data/";

  constructor(private http: HttpClient) { }

  getId() {
    return localStorage.getItem('id')
  }

  addUserlist(data: User) {
    return this.http.post(this.url + "/data/addUser", data);
  }

  adduser(data: User) {
    return this.http.post(this.url + "/data/signUp", data);
  }

  loginUser(data: User) {
    return this.http.post(this.url + `/data/loginUser`, data);
  }

  getData() {
    return this.http.get(this.getdata);
  }

  getUser(id: any) {
    return this.http.get(this.getdata + id)
  }

  updateUser(id: string, body: User) {
    return this.http.put(this.getdata + id, body)
  }

  deleteUser(id: string) {
    return this.http.delete(this.getdata + id);
  }


}
