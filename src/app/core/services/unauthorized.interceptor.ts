import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@uiowa/uiowa-header';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function unauthorizedInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loginService = inject(LoginService);
  const router = inject(Router);
  return next(request).pipe(
    catchError((err) => {
      if (err.status === 401) {
        loginService.returnUri = router.url;
        loginService.login();
      }
      throw err;
    })
  );
}
