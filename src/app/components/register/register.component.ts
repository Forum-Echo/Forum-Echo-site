import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../http/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../component-styles/login-register.scss', '../../component-styles/errors.scss', './register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;

  isToggleOn = false;
  passwordType = "password";

  username: string = '';
  email: string = '';
  password: string = '';

  error: any;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  register() {
    if (this.formGroup.valid) {
      this.userService.register(this.formGroup.value).subscribe(result => {
        if (result.success) {
          this.router.navigate([`/login`]);
        } else {
          this.error = result.error;
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

  switchToLogin() {
    this.router.navigate(['/login']);
  }
}
