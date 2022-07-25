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
  error: any;

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
    this.postService.getOnePost(this.post_id).subscribe(result => {
      this.title = result.title;
      this.content = result.content;

      this.initForm();
      return result;
    });
  }

  editPost(): void {
    if (this.formGroup.valid) {
      const form = this.formGroup.value;

      this.postService.editPost(this.post_id, form.title, form.conten).subscribe(result => {
        this.router.navigate([`/`]);
      });
    }
  }

  deletePost(): void {
    this.postService.delPost(this.post_id).subscribe(result => {
      this.router.navigate(['/']).then(
        window.location.reload
      );
    });
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      content: new FormControl(this.content, [Validators.required]),
    });
  }
}
