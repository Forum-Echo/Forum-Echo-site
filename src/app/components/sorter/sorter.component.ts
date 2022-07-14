import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {

  constructor( ){}
  ngOnInit():void { }


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
  }

}
