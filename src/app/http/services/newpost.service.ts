import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewPostService {

  constructor(private http: HttpClient) { }

  newPost(data: any): Observable<any> {
    return this.http.post(`${baseUrl}post/new`, data);
  }
}
