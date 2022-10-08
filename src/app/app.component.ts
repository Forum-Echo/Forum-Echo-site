import { OverlayContainer } from '@angular/cdk/overlay';
import { Component,  } from '@angular/core';
import { ChildrenOutletContexts } from "@angular/router";
import { slideInAnimation } from "./routing/animation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'ForumEcho';

  constructor(
    private contexts: ChildrenOutletContexts,
    private overlay: OverlayContainer) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  getDarkmode(): string | null {
    return localStorage.getItem('theme');
  }

  ngOnInit(): void {
    const darkClassName = 'darkmode';

    if (localStorage.getItem('theme') === 'darkmode') {
      this.overlay.getContainerElement().classList.add(darkClassName);
      return;
    }
    this.overlay.getContainerElement().classList.remove(darkClassName);
  }
}
