import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../http/services/post.service";

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {

  formGroup!: FormGroup;

  title: string = '';
  content: string = '';

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private readonly postService: PostService
  ) { }

  post_id: string = this.router.url.slice(10);

  ngOnInit(): void {
    this.getOldPost();

    this.initForm();
  }

  getOldPost(): any {
    return this.postService.getOnePost(this.post_id).subscribe(result => {
      this.title = result.title;
      this.content = result.content;

      this.initForm();
    });
  }

  editPost() {
    if (this.formGroup.valid) {
      const form = this.formGroup.value;

      this.postService.editPost(this.post_id, form.title, form.conten).subscribe(result => {
        this.router.navigate([`/`]);
      });
    }
  }

  deletePost() {
    return this.postService.delPost(this.post_id);
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      content: new FormControl(this.content, [Validators.required]),
    });
  }

}
