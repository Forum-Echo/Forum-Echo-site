import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../../environments/environment";
import { Observable, } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}user/register`, data);
  }

  editUser(data: any):Observable<any> {
    return this.http.patch(`${baseUrl}user/edit`, data)
  }

  delUser(): Observable<any> {
    return this.http.delete(`${baseUrl}user/del`)
  }

  getUser(): Observable<any> {
    return this.http.get(`${baseUrl}user/get`)
  }

  getUserById(user_id: string): Observable<any> {
    return this.http.get(`${baseUrl}user/getUser/${user_id}`);
  }

  verifyUser(userId: string): Observable<any> {
    return this.http.patch(`${baseUrl}user/verify`, { token: userId  });
  }
}
