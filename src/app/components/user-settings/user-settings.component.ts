import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../http/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { UserService } from "../../http/services/user.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  formGroup!: FormGroup;
  isToggleOn = false;
  passwordType = "password";

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly edit: UserService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
    });
  }

  editUser() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;

      const payload = {
        new_username: formValue.username,
        new_password: formValue.new_password,
        old_password: formValue.old_password,
      };
      this.edit.edit(payload).subscribe(result => {
        // console.log(result);
      })
    }
  }

  logOut() {
    this.router.navigate(['/login'])
    return this.authService.logout();
  }

  delUser() {
    return this.userService.del();
  }

  togglePass(){
    this.isToggleOn = !this.isToggleOn;
    this.passwordType = this.isToggleOn ? "text" : "password";
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  toLogin() {
    this.router.navigate(['login']);
  }

  toRegister() {
    this.router.navigate(['register'])
  }
}
