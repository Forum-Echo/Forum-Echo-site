import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PostService } from "../../http/services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewPostComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  newPost() {
    if (this.formGroup.valid) {
      this.postService.newPost(this.formGroup.value).subscribe(() => {
        this.router.navigate([`/`]);
        this.snackBar.open('Post submitted!', '', { duration: 3000 });
      // Error Catching
      }, (e: HttpErrorResponse) => {
        // Catch unauthorized users
        if (e.status === 401) {
          const snackbar = this.snackBar.open('Not logged in!', 'Go to login', { duration: 3000 });
          snackbar.onAction().subscribe(() => {
            this.router.navigate(['/login']);
          })
          return;
        }
        // Catch unverified users
        if (e.status === 403) {
          this.snackBar.open('Please verify your account first!', '', { duration: 3000 });
          return;
        }
        // Catch parameters
        if (e.status === 400) {
          // Catch already existing titles
          if (e.error.message === 'title_already_exists') {
            this.snackBar.open('Title already exists!', '', { duration: 3000 });
            return;
          }
          // Catch already existing content
          if (e.error.message === 'content_already_exists') {
            this.snackBar.open('Content already exists!', '', { duration: 3000 });
            return;
          }
          // Catch too long title
          if (e.error.message === 'title_too_long') {
            this.snackBar.open('Title too long!', '', { duration: 3000 });
            return;
          }
          // Catch too long title
          if (e.error.message === 'content_too_long') {
            this.snackBar.open('Content too long!', '', { duration: 3000 });
            return;
          }
          return;
        }
        this.snackBar.open(`Error: ${e.message}`, '', { duration: 3000 });
      });
    }
  }
}
