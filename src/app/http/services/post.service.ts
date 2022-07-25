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
    return this.http.get(`${baseUrl}post/id/${post_id}`);
  }

  getAllPosts():Observable<any>  {
    return this.http.get(`${baseUrl}post/all`);
  }

  newPost(data: any): Observable<any> {
    return this.http.post(`${baseUrl}post/new`, data);
  }

  editPost(post_id: string, title: string, content: string): Observable<any> {
    const payload = {
      post_id: post_id,
      title: title,
      content: content,
    }

    return this.http.patch(`${baseUrl}post/edit`, payload);
  }

  delPost(post_id: string): Observable<Object> {
    return this.http.delete(`${baseUrl}post/del/${post_id}`);
  }
}
