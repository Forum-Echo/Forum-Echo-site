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
  fileName: string = '';

  getUser(): void {
    this.userService.getUserById(localStorage.getItem('user_id')).subscribe((result) => {
      this.initForm(result.bio, result.status);
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

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      if (!file.type.startsWith('image')) {
        this.snackBar.open(
          `Wrong file type! Please user an image format instead of ${file.type}`,
          '', { duration: 3000 },
        );
        return;
      }

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("profile-picture", file);

      this.userService.uploadPicture(formData).subscribe(() => {
        this.snackBar.open(`${file.name} has been successfully uploaded!`, '',
          { duration: 3000 });
      });
    }
  }
}
