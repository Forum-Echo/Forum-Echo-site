import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  response: any;
  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.client
      .get('http://localhost:3000/post')
      .subscribe(data => {
        this.response = data;
        console.log(data);
      });
  }
}
