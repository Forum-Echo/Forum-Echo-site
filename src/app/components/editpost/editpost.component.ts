import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../http/services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {

  formGroup!: FormGroup;

  title: string = '';
  content: string = '';
  error: any;

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private snackBar: MatSnackBar,
  ) { }

  post_id: string = this.router.url.slice(10);

  ngOnInit(): void {
    this.initForm('', '');

    this.getOldPost();
  }

  getOldPost(): void {
    this.postService.getOnePost(this.post_id).subscribe(result => {
      this.initForm(result.title, result.content);
    });
  }

  editPost(): void {
    if (this.formGroup.valid) {
      const form = this.formGroup.value;

      this.postService.editPost(this.post_id, form.title, form.conten).subscribe(result => {
        this.snackBar.open('Post saved!', '', {
          duration: 3000
        })
        this.router.navigate([`/`]);
      });
    }
  }

  deletePost(): void {
    this.postService.delPost(this.post_id).subscribe(result => {
      this.snackBar.open('Post deleted!', '', {
        duration: 3000
      })
      this.router.navigate(['/']);
    });
  }

  initForm(title: string, content: string) {
    this.formGroup = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      content: new FormControl(content, [Validators.required]),
    });
  }
}
