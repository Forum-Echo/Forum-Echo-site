import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-button',
  templateUrl: './about-button.component.html',
  styleUrls: ['./about-button.component.css']
})
export class AboutButtonComponent {

  showAbout = false;
  toggleAbout() {
    this.showAbout = !this.showAbout;
  }

}
