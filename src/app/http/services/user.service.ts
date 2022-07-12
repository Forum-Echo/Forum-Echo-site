import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  edit(data: any) {
    return this.http.patch(`${baseUrl}user/edit`, data)
  }
}
