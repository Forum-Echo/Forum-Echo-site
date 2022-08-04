import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PostService } from "../../http/services/post.service";
import { AuthService } from "../../http/services/auth.service";
import { VoteService } from "../../http/services/vote.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/http/services/user.service';

export interface DialogData {
  authorId: string;
  postId: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() sortingOptions: boolean[] = [];
  response: any = [];

  emptyFilledPath = {
    empty: "assets/pictures/Arrow.png",
    filled: "assets/pictures/Arrow-filled.png"
  };

  constructor(private postService: PostService, private authService: AuthService, private voteService: VoteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initPosts();
  }

  initPosts(): void {
    this.postService.getAllPosts().subscribe(result => {
      this.response = result.reverse();
    })
  //   this.response = [
  //     {
  //         "_id": "62d72df5e7b8cb5d9e2a0a16",
  //         "title": "We respect european values!",
  //         "content": "Democracy is the only legitim form of gouvernment",
  //         "authorId": "62d5ccd3d60b05eb1951f3a4",
  //         "likedBy": [
  //             "62d5ccd3d60b05eb1951f3a4"
  //         ],
  //         "dislikedBy": [],
  //         "created": "2022-07-19T22:19:33.722Z",
  //         "updated": "2022-07-19T22:29:46.653Z",
  //         "__v": 55
  //     },
  //     {
  //         "_id": "62dc4408a931ef9f43167f51",
  //         "title": "Invoke article 7 on hungary!",
  //         "content": "We should apply article 7 on Hungary because of Orban blocking important EU reforms and not caring about eu values!",
  //         "authorId": "62d5ccd3d60b05eb1951f3a4",
  //         "likedBy": [
  //             "62d5ccd3d60b05eb1951f3a4"
  //         ],
  //         "dislikedBy": [],
  //         "created": "2022-07-23T18:55:04.659Z",
  //         "updated": null,
  //         "__v": 3
  //     },
  //     {
  //         "_id": "62dc44a4a931ef9f43167f5d",
  //         "title": "Help each other in the Gas",
  //         "content": "The European Union should form a front against the blackmailer in the Kremlin. We have to statically decrease the dependency on Russian Gas.",
  //         "authorId": "62d5ccd3d60b05eb1951f3a4",
  //         "likedBy": [],
  //         "dislikedBy": [],
  //         "created": "2022-07-23T18:57:40.598Z",
  //         "updated": null,
  //         "__v": 2
  //     }
  // ];
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

    console.log("Likes", this.response[i].likedBy);
    console.log("Disliked", this.response[i].dislikedBy);
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

    console.log("Likes", this.response[i].liked_by);
    console.log("Disliked", this.response[i].disliked_by);
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

  openFlagDialog(post: any): void {
    const dialogRef = this.dialog.open(FlagPostDialog, {
      width: '250px',
      data: {authorId: post.authorId, postId: post._id},
    });
  }
}
@Component({
  selector: 'dialog-flag-post-dialog',
  templateUrl: 'flag-post-dialog.html',
})
export class FlagPostDialog {
  constructor(
    public dialogRef: MatDialogRef<FlagPostDialog>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  getUserName(userId: string): any{
    this.userService.getUserById(userId).subscribe(result => {
      console.log(result);
    });
  }
}
