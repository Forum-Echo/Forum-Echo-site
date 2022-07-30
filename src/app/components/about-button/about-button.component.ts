import { Component, HostListener, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-about-button',
  templateUrl: './about-button.component.html',
  styleUrls: ['./about-button.component.scss']
})
export class AboutButtonComponent {

  showAbout = false;

  @HostBinding('attr.tabindex') tabindex = '0';
  @HostListener('blur')  
  toggleAbout() {
    this.showAbout = !this.showAbout;
  }


}
