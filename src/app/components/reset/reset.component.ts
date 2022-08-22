import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../http/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  token: string = this.router.url.slice(7);

  error: any = false;
  result: any;

  formGroup!: FormGroup;

  isToggleOn: boolean = false;
  passwordType: string = "password";

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      controll_password: new FormControl('', [Validators.required]),
    });
  }

  resetPassword(): void {
    if (!this.formGroup.valid) return;

    // Check matching of passwords
    if (this.formGroup.value.password !== this.formGroup.value.controll_password) return;

    // Send request to server
    this.userService.resetPassword(this.token, this.formGroup.value.password).subscribe(async (result) => {
      this.result = result;

      await this.router.navigate(['/login']);
      this.snackBar.open('Password successfully reset!', '', {duration: 3000});
    }, (e: HttpErrorResponse) => {
      this.error = `${e.message} ${e.error.message}`;
    });
  }

  togglePass(): void {
    this.isToggleOn = !this.isToggleOn;
    this.passwordType = this.isToggleOn ? "text" : "password";
  }
}
