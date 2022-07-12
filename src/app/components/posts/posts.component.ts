import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import { AuthService } from "../../services/auth.service";

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

  constructor(    
    private readonly authService: AuthService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(result => {
      this.response = result;
    });
  }
  
  isLoggedIn() {
    return this.authService.isLoggedIn();
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
