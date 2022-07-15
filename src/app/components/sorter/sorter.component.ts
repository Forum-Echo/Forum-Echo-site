import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {PostService} from "../../http/services/post.service";

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {

  @Output() outputSortingOptions = new EventEmitter<Array<boolean>>();

  selection = [true, false];

  constructor(private postService: PostService ){}
  ngOnInit(): void {
    // this.outputSortingOptions.emit(this.selection);
  }
  toggleSelection(i: number) {

    if(!this.selection[i]) {
      //set selection to true
      this.selection[i] = true;
      //set all other values to false
      for(let j = 0; j < this.selection.length; j++ ){
        if(j != i) {
          this.selection[j] = false;
        }
      }
    }
    this.outputSortingOptions.emit(this.selection);
  }

}
