import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../http/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

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

  constructor(private authService: AuthService, public dialog: MatDialog, private router:Router) { }

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
        return;
      });
      this.error = 'No Connection to Backend!'
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
