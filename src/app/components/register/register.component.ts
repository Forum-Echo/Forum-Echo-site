import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../http/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../component-styles/login-register.scss', '../../component-styles/errors.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;

  isToggleOn = false;
  passwordType = "password";

  username: string = '';
  email: string = '';
  password: string = '';
  spinner: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  register() {
    if (this.formGroup.valid) {
      this.spinner = true;
      this.userService.register(this.formGroup.value).subscribe(() => {
        this.router.navigate([`/login`]);
        this.snackBar.open('Please confirm your email', '', { duration: 3000 });
      // Error Catching
      }, (e: HttpErrorResponse) => {
        this.spinner = false;
        // Catch too long usernames
        if (e.status === 400) {
          this.snackBar.open('Username too long!', '', { duration: 3000 });
          return;
        }
        // Catch already existing usernames / emails
        if (e.status === 409) {
          // Catch already existing username
          if (e.error.message === 'user_already_exists') {
            this.snackBar.open('Username already exists!', '', { duration: 3000 });
            return;
          }
          // Catch already existing email
          if (e.error.message === 'email_already_exists') {
            this.snackBar.open('Email already exists!', '', { duration: 3000 });
            return;
          }
          return;
        }
        this.snackBar.open(`Error: ${e.message}`, '', { duration: 3000 });
      });
    }
  }

  togglePass(){
    this.isToggleOn = !this.isToggleOn;
    this.passwordType = this.isToggleOn ? "text" : "password";
  }

  switchToLogin() {
    this.router.navigate(['/login']);
  }
}
