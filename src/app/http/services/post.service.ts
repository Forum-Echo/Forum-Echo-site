import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private readonly http: HttpClient) {}

  getOnePost(post_id: string | null): Observable<any> {
    return this.http.get(`${baseUrl}post/${post_id}`);
  }

  getAllPosts():Observable<any>  {
    return this.http.get(`${baseUrl}post/`);
  }

  newPost(data: any): Observable<any> {
    return this.http.post(`${baseUrl}post/new`, data);
  }

  editPost(data: any): Observable<any> {
    return this.http.patch(`${baseUrl}post/edit`, data);
  }
}
