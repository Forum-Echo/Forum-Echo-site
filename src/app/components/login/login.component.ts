import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  isToggleOn = false;
  passwordType = "password";

  constructor(private authService: AuthService, public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    console.log('debug')
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
        if (localStorage.getItem('token')) {
          return window.location.reload();
        }
        localStorage.setItem('token', result.access_token);
        this.router.navigate([`/`]).then(() => {
          window.location.reload();
        });
      });
    }
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '100%'
    });
  }

  togglePass(){
    this.isToggleOn = !this.isToggleOn;
    this.passwordType = this.isToggleOn ? "text" : "password";
  }
}
