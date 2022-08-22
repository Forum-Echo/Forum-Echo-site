import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService} from "../../http/services/user.service";
import { HttpErrorResponse} from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) { }

  formGroup!: FormGroup;

  result: any;

  switchVar: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  forgotPassword(): void {
    if (!this.formGroup.valid) return;

    this.userService.forgotPassword(this.formGroup.value.email).subscribe(async () => {
      await this.router.navigate(['/']);
      this.snackbar.open('We have sent you an email!', '', { duration: 3000 });
    }, (e: HttpErrorResponse) => {
      this.snackbar.open(`${e.error}`, '', { duration: 3000 });
    });
  }
}
