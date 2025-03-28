import { Component, OnInit } from '@angular/core';
import { LoginService } from '@uiowa/uiowa-header';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.css'],
    standalone: false
})
export class AccessDeniedComponent implements OnInit {
  constructor(
    private readonly loginService: LoginService,
    public readonly userService: UserService
  ) {}

  ngOnInit() {}
  login() {
    this.loginService.login();
  }
  logout() {
    this.loginService.logout();
  }
}
