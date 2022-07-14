import { Component, Injectable, OnInit } from '@angular/core';
import { PostService } from "../../http/services/post.service";
import { AuthService } from "../../http/services/auth.service";
import { VoteService } from "../../http/services/vote.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
@Injectable({ providedIn: 'root' })
export class PostsComponent implements OnInit {
  response: any;

  emptyFilledPath = {
    empty: "assets/pictures/Arrow.png",
    filled: "assets/pictures/Arrow-filled.png"
  };

  postsLoaded: boolean = false;

  constructor(private postService: PostService, private authService: AuthService, private voteService: VoteService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(result => {
      this.response = result;
    });
    this.postsLoaded = true;
  }

  //Voting functions
  voteUp = (i: number) => {
    if(this.response[i].disliked_by.includes(localStorage.getItem('user_id'))){
      //remove element
      const userIndex = this.response[i].disliked_by.indexOf(localStorage.getItem('user_id'));
      this.response[i].disliked_by.splice(userIndex, 1);
    }
    if(!this.response[i].liked_by.includes(localStorage.getItem('user_id'))){
      // append element
      this.response[i].liked_by.push(localStorage.getItem('user_id'));
    }
    else {
      //remove element
      const userIndex = this.response[i].liked_by.indexOf(localStorage.getItem('user_id'));
      this.response[i].liked_by.splice(userIndex, 1);
    }

    this.voteService.upvote(this.response[i]._id, localStorage.getItem('user_id')).subscribe(result => console.log(result));

    console.log("Likes", this.response[i].liked_by);
    console.log("Disliked", this.response[i].disliked_by);
  }

  voteDown = (i: number) => {
    if(this.response[i].liked_by.includes(localStorage.getItem('user_id'))){
      //remove element
      const userIndex = this.response[i].liked_by.indexOf(localStorage.getItem('user_id'));
      this.response[i].liked_by.splice(userIndex, 1);
    }
    if(!this.response[i].disliked_by.includes(localStorage.getItem('user_id'))){
      // append element
      this.response[i].disliked_by.push(localStorage.getItem('user_id'));
    }
    else {
      //remove element
      const userIndex = this.response[i].disliked_by.indexOf(localStorage.getItem('user_id'));
      this.response[i].disliked_by.splice(userIndex, 1);
    }

    this.voteService.downvote(this.response[i]._id, localStorage.getItem('user_id')).subscribe(result => console.log(result));

    console.log("Likes", this.response[i].liked_by);
    console.log("Disliked", this.response[i].disliked_by);
  }

  // Display vote types
  getUpvote = (i: number) => this.response[i].liked_by.includes(localStorage.getItem('user_id')) ? 'filled' : 'empty';
  getDownvote = (i: number) => this.response[i].disliked_by.includes(localStorage.getItem('user_id')) ? 'filled': 'empty';

  // Display large numbers of votes in a nice manner
  displayVotes(post: any){
    const votes = post.liked_by.length- post.disliked_by.length;
    if(votes < 1000){
      return votes;
    }
    else if (votes < 1000000){
        return (votes/1000).toFixed(1)+ "K";
    }
    else {
        return (votes/1000000).toFixed(1) + "M";
    }
  }


  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  //if the user is the author, he can edit the given post
  isAuthor(author_id: string) {
    return author_id === localStorage.getItem('user_id');
  }
}
