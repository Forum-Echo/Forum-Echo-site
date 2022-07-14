import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../http/services/auth.service";

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
