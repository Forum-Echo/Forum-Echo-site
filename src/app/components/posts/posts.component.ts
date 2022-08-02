import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostService } from "../../http/services/post.service";
import { AuthService } from "../../http/services/auth.service";
import { VoteService } from "../../http/services/vote.service";
import {UserService} from "../../http/services/user.service";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() sortingOptions: boolean[] = [];
  response: any = [];
  usernames: string[] = [];

  emptyFilledPath = {
    empty: "assets/pictures/Arrow.png",
    filled: "assets/pictures/Arrow-filled.png"
  };

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private voteService: VoteService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.initPosts();
  }

  initPosts(): void {
    this.postService.getAllPosts().subscribe(result => {
      this.response = result.reverse();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortPosts();
  }

  sortPosts() {
    const sortIndex = this.sortingOptions.indexOf(true);
    const posts = this.response;
    // enumerate the different sorting methods
    switch(sortIndex){
      case 0:
        posts.sort((a: any, b: any) => {
          return +new Date(a.created) - +new Date(b.created);
        });
        posts.reverse();
        break;
      case 1:
        posts.sort((a: any, b: any) => {
          return a.likedBy.length - a.dislikedBy.length - (b.likedBy.length - b.dislikedBy.length);
        });
        posts.reverse();
        break;
    }

  }

  //Voting functions
  voteUp = (i: number) => {
    if(this.response[i].dislikedBy.includes(localStorage.getItem('user_id'))){
      //remove element
      const userIndex = this.response[i].dislikedBy.indexOf(localStorage.getItem('user_id'));
      this.response[i].dislikedBy.splice(userIndex, 1);
    }
    if(!this.response[i].likedBy.includes(localStorage.getItem('user_id'))){
      // append element
      this.response[i].likedBy.push(localStorage.getItem('user_id'));
    }
    else {
      //remove element
      const userIndex = this.response[i].likedBy.indexOf(localStorage.getItem('user_id'));
      this.response[i].likedBy.splice(userIndex, 1);
    }

    this.voteService.upvote(this.response[i]._id).subscribe(result => console.log(result));
  }

  voteDown = (i: number) => {
    if(this.response[i].likedBy.includes(localStorage.getItem('user_id'))){
      //remove element
      const userIndex = this.response[i].likedBy.indexOf(localStorage.getItem('user_id'));
      this.response[i].likedBy.splice(userIndex, 1);
    }
    if(!this.response[i].dislikedBy.includes(localStorage.getItem('user_id'))){
      // append element
      this.response[i].dislikedBy.push(localStorage.getItem('user_id'));
    }
    else {
      //remove element
      const userIndex = this.response[i].dislikedBy.indexOf(localStorage.getItem('user_id'));
      this.response[i].dislikedBy.splice(userIndex, 1);
    }

    this.voteService.downvote(this.response[i]._id).subscribe(result => console.log(result));
  }

  // Display vote types
  getUpvote = (i: number) => this.response[i].likedBy.includes(localStorage.getItem('user_id')) ? 'filled' : 'empty';
  getDownvote = (i: number) => this.response[i].dislikedBy.includes(localStorage.getItem('user_id')) ? 'filled': 'empty';

  // Display large numbers of votes in a nice manner
  displayVotes(post: any){
    const votes = post.likedBy.length- post.dislikedBy.length;
    if(votes < 1000){
      return votes;
    }
    else if (votes < 1000000){
        return (votes / 1000).toFixed(1)+ "K";
    }
    else {
        return (votes / 1000000).toFixed(1) + "M";
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  // if the user is the author, he can edit the given post
  isAuthor(author_id: string) {
    return author_id === localStorage.getItem('user_id');
  }

  getUser(userId: string): any {
    this.userService.getUserById(userId).subscribe(result => {
      console.log(result)
    });
  }
}
