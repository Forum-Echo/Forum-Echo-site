import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../http/services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../http/services/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogData } from "../posts/posts.component";


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['../../component-styles/errors.scss', '../../component-styles/data-request.scss', './user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  formGroup!: FormGroup;
  isToggleOn = false;
  passwordType = "password";

  username: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly edit: UserService,
    private snackBar: MatSnackBar,
    private readonly router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getOldUser();
    this.initForm('');
  }

  getOldUser(): void {
    this.userService.getUser().subscribe(result => {
      this.username = result.username;

      this.initForm(result.username);
    });
  }

  initForm(username: string) {
    this.formGroup = new FormGroup({
      username: new FormControl(username, [Validators.required]),
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
      this.edit.editUser(payload).subscribe(result => {
        this.snackBar.open('Saved!');
      });
    }
  }

  openSnackBar() {
    this.snackBar.open('We sent you an email!', '', {
      duration: 3000
    });
  }

  togglePass() {
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
