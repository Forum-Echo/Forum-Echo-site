import { Component, OnInit } from '@angular/core';
import {PostService} from "../../http/services/post.service";

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

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(result => {
      this.response = result;
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
