import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../http/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../component-styles/login-register.scss',
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  isToggleOn = false;
  passwordType = "password";

  spinner: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.spinner = true;
      this.authService.login(this.formGroup.value).subscribe(async result => {
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('user_id', result.id);
        await this.router.navigate([`/`]);
        this.snackBar.open('You successfully logged in!', '', {
          duration: 3000
        });
      }, (e: HttpErrorResponse) => { // Error Handling
        this.spinner = false;
        // Catch wrong credentials
        if (e.status === 401) {
          this.snackBar.open('Wrong credentials!', '',
            { duration: 3000 }
          );
          return;
        }
        // Catch unverified users
        if (e.status === 403) {
          this.snackBar.open('Please verify your account first!', '',
            { duration: 3000 }
          );
          return;
        }
        this.snackBar.open(`Error: ${e.message}`, '',
          { duration: 3000 }
        );
      });
    }
  }

  togglePass(){
    this.isToggleOn = !this.isToggleOn;
    this.passwordType = this.isToggleOn ? "text" : "password";
  }
}
