import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}user/register`, data);
  }

  edit(data: any):Observable<any> {
    return this.http.patch(`${baseUrl}user/edit`, data)
  }

  del(user_id: string | null): Observable<any> {
    const payload: object = { user_id: user_id};

    return this.http.delete(`${baseUrl}user/del`, payload)
  }
}
