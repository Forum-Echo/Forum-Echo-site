import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {

  constructor(private postComponent: PostsComponent){}
  ngOnInit():void { 
    this.sortPosts();
  }

  selection = [true, false];

  toggleSelection(i: number) {
    if(this.selection[i] != true) {
      //set selection to true
      this.selection[i] = true;
      //set all other values to false
      for(let j = 0; j < this.selection.length; j++ ){
        if(j != i) {
          this.selection[j] = false;
        }
      }
    }
    this.sortPosts();
  }

  sortPosts() {
    const sortIndex = this.selection.indexOf(true);
    const posts = this.postComponent.response;

    //enumerate the different sorting methods
    switch(sortIndex){
      case 0:
        posts.response.sort((a: any, b: any) => {
          return a.liked_by.length - a.disliked_by.length - (b.liked_by.length - b.disliked_by.length);
        });
        posts.reverse();
        break;
      case 1:
        posts.sort((a: any, b: any) => {
          return +new Date(a.creation_date) - +new Date(b.creation_date);
        });
        posts.reverse();
        break;
    }

  }

}
