import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PostService } from "../../http/services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
      this.postService.newPost(this.formGroup.value).subscribe(result => {
        this.router.navigate([`/`]);
        this.snackBar.open('Post submitted!', '', {
          duration: 3000
        });
      });
    }
  }
}
