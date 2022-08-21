import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../http/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  token: string = this.router.url.slice(8);

  error: any = false;
  result: any;

  ngOnInit(): void {
    // Send verification to server
    this.userService.verifyUser(this.token).subscribe((result) => {
      this.result = result;
    }, (e: HttpErrorResponse) => {
      this.error = `${e.message} ${e.error.message}`;
    });
  }

}
