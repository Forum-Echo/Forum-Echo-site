import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private readonly http: HttpClient) {
  }

  getOnePost(post_id: string) {
    this.http.get('');
  }

  getAllPosts():Observable<any>  {
    return this.http.get(`${baseUrl}post`);
  }
}
