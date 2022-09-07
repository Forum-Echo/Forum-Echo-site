import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/http/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private readonly userService: UserService) { }

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
    }
  }
}
