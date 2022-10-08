import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {

  @Output() outputSortingOptions = new EventEmitter<Array<boolean>>();

  selection = [true, false];

  ngOnInit(): void {
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
