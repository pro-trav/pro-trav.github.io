import { Injectable } from '@angular/core';
import { LoginService } from '@uiowa/uiowa-header';
import { SessionInterruptService } from 'session-expiration-alert';
import { UserService } from './user.service';

@Injectable()
export class SessionInterruptorService extends SessionInterruptService {
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService
  ) {
    super();
  }

  override continueSession() {
    this.userService.getUser();
  }
  override stopSession() {
    this.loginService.logout();
  }
  override onExpire(): void {
    this.loginService.login();
  }
}
