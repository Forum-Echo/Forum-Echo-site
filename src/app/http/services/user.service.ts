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

  getUserById(user_id: string | null): Observable<any> {
    return this.http.get(`${baseUrl}user/getUser/${user_id}`);
  }

  verifyUser(token: string): Observable<any> {
    return this.http.patch(`${baseUrl}user/verify`, { token: token  });
  }

  resetPassword(token: string, new_password: string): Observable<any> {
    return this.http.patch(
      `${baseUrl}user/reset-password/`,
      { token: token, new_password: new_password }
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.get(`${baseUrl}user/forget-password/${email}`);
  }

  editProfile(bio: string, status: string, emoji: string): void {
    const userId = localStorage.getItem('user_id');
    
    // Patch the bio
    this.http.patch(
      `${baseUrl}user/profile/bio`,
      { content: bio, userId })
    .subscribe(() => {});

    // Patch the status
    this.http.patch(
      `${baseUrl}user/profile/status`,
      { emoji, content: status, userId }
    ).subscribe(() => {});
  }
}
