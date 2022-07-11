import { Component, OnInit } from '@angular/core';
import {NewPostService} from "../../services/newpost.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {coerceStringArray} from "@angular/cdk/coercion";
import {Router} from "@angular/router";
import {routes} from "../../app-routing.module";

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewPostComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private newPostService: NewPostService, private router: Router) { }

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
      this.newPostService.newPost(this.formGroup.value).subscribe(result => {
        this.router.navigate([`/`]).then(() => {
          window.location.reload();
        });
      });
    }

  }
}
