import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  response: any;
  
  upDown ={upvote: false, downvote: false};
  
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

  voteUp = () => {
    this.upDown = {upvote: !this.upDown.upvote, downvote: false};
    const upVoteName = this.emptyFilledPath[this.upDown.upvote ? 'filled' : 'empty'];
    console.log(upVoteName);
    return upVoteName;
  }
  voteDown= () => {
    this.upDown = {upvote: false, downvote: !this.upDown.downvote};
    const downVoteName = this.emptyFilledPath[this.upDown.downvote ? 'filled': 'empty']
    console.log(downVoteName);
    return downVoteName;
  }
  
  
}
