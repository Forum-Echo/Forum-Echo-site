import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../http/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../component-styles/login-register.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  isToggleOn = false;
  passwordType = "password";

  error: any;

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
      this.authService.login(this.formGroup.value).subscribe(result => {
        if (result.access_token) {
          localStorage.setItem('token', result.access_token);
          localStorage.setItem('user_id', result.id);
          this.router.navigate([`/`]);
        } else {
          this.error = 'Wrong credentials';
        }
        this.snackBar.open('You successfully logged in!', '', {
          duration: 3000
        });
      });
    }
  }

  togglePass(){
    this.isToggleOn = !this.isToggleOn;
    this.passwordType = this.isToggleOn ? "text" : "password";
  }

  switchToRegister() {
    this.router.navigate(['/register']);
  }
}
