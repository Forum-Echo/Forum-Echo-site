import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../../environments/environment";

@Injectable({
  'providedIn': 'root',
})
export class VoteService {

  constructor(private http: HttpClient) {}

  upvote(post_id: string) {
    const payload: object = { type: true, post_id: post_id };
    return this.http.patch(`${baseUrl}post/vote`, payload);
  }

  downvote(post_id: string) {
    const payload: object = { type: false, post_id: post_id };
    return this.http.patch(`${baseUrl}post/vote`, payload);
  }
}
