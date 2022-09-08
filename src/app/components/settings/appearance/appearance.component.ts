import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss']
}) 
export class AppearanceComponent implements OnInit {

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  getTheme(): boolean {
    return !!localStorage.getItem('darkmode')
  }

  ngOnInit(): void {
  }

  toggleTheme(): void {
    !localStorage.getItem('darkmode') ?
      localStorage.setItem('darkmode', 'on') : localStorage.removeItem('darkmode');
  }

}
