import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { LoginService } from '@uiowa/uiowa-header';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

export const roleGuard: CanMatchFn = (route: Route, _: UrlSegment[]) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const loginService = inject(LoginService);

  const navigation = router.getCurrentNavigation();
  loginService.returnUri = navigation?.extractedUrl.toString() || '/';

  const roles = ((route.data || {})['roles'] || []) as Array<string>;
  return userService.user$.pipe(
    map((u) => {
      if (!u.isAuthenticated()) {
        loginService.login();
        return false;
      }
      if (!roles.includes(u.role)) {
        router.navigateByUrl('/access-denied');
        return false;
      }
      return true;
    })
  );
};
