import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss']
}) 
export class AppearanceComponent implements OnInit {

  constructor(
    private readonly overlay: OverlayContainer,
  ) { }

  getTheme(): boolean {
    return !!localStorage.getItem('darkmode')
  }

  toggleControl = new FormControl(false);

  theme: string | null = localStorage.getItem('theme');

  @HostBinding('class') className = '';

  ngOnInit(): void {
    this.toggleControl.setValue(this.theme === 'darkmode')

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkmode';
      this.className = darkMode ? darkClassName : '';

      if (darkMode) {
        localStorage.setItem('theme', 'darkmode');
        this.overlay.getContainerElement().classList.add(darkClassName);
        return;
      }
      localStorage.setItem('theme', 'lightmode');

      this.overlay.getContainerElement().classList.remove(darkClassName);
    });
  }
}
