import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  register(username:string, email: string, password: string): Observable<any> {
    const payload = {
      username: username,
      email: email,
      password: password,
    };
    return this.http.post(`${baseUrl}user/register`, payload);
  }

  edit(data: any):Observable<any> {
    return this.http.patch(`${baseUrl}user/edit`, data)
  }
}
