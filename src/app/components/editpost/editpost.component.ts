import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../http/services/post.service";

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  formGroup!: FormGroup;

  title: string = '';
  content: string = '';

  post_id: string = ''; //TODO: Get route parameter

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private readonly postService: PostService
  ) { }

  ngOnInit(): void {
    this.getOldPost();
    this.initForm();
  }

  getOldPost(): any {
    return this.postService.getOnePost(this.post_id).subscribe(result => {
      this.title = result.title;
      this.content = result.content;
    });
  }

  editPost() {
    const form = this.formGroup.value;
    const payload = {
      post_id: this.post_id,
      title: form.title,
      content: form.content,
    }

    if (this.formGroup.valid) {
      this.postService.editPost(payload);
    }
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      content: new FormControl(this.content, [Validators.required]),
    });
  }

}
