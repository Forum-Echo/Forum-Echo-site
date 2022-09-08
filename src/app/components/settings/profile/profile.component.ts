import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/http/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    ) { }

  formGroup!: FormGroup;

  getUser(): void {
    this.userService.getUserById(localStorage.getItem('user_id')).subscribe((result) => {
      this.initForm(result.bio, result.status)
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.initForm('', '');
  }

  initForm(bio: string, status: string) {
    this.formGroup = new FormGroup({
      bio: new FormControl(bio, []),
      status: new FormControl(status, []),
    });
  }

  editProfile(): void {
    if (this.formGroup.valid) {
      this.userService.editProfile(this.formGroup.value.bio, this.formGroup.value.status, '');

      this.snackBar.open('User Profile updated!', '', { duration: 3000 });
    }
  }
}
