import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/http/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
  }
  
  logOut() {
    this.router.navigate(['/login']);
    this.snackBar.open('You successfully logged out!', '', {
      duration: 3000
    });
    return this.authService.logout();
  }
}
