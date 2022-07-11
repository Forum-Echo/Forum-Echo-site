import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private readonly authService: AuthService,
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
      localStorage.setItem('user_id', '62c002d34b96f31dbb8113ec')
      const formValue = this.formGroup.value;

      const user_id = localStorage.getItem('user_id');

      const payload = {
        new_username: formValue.username,
        new_password: formValue.new_password,
        old_password: formValue.old_password,
        user_id: user_id,
      };
      console.log(payload);
      this.edit.edit(payload).subscribe(result => {
        console.log(result);
      })
    }
  }

  logOut() {
    return this.authService.logout();
  }
}
