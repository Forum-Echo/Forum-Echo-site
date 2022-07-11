import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  response: any;

  emptyFilledPath = {
    empty: "assets/pictures/Arrow.png",
    filled: "assets/pictures/Arrow-filled.png"
  }

  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.client
      .get('http://localhost:3000/post')
      .subscribe(data => {
        this.response = data;
        console.log(data);
      });
  }

  voteUp = (i: number) => {
    this.response[i] = {upvote: !this.response[i].upvote, downvote: false};
  }
  voteDown= (i: number) => {
    this.response[i] = {upvote: false, downvote: !this.response[i].downvote};
  }

  getUpvote = (i: number) => this.response[i].upvote ? 'filled' : 'empty';
  getDownvote = (i: number) => this.response[i].downvote ? 'filled': 'empty';
}
