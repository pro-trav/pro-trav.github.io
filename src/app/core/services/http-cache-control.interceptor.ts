import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function httpCacheControlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const newReq = req.clone({
    headers: req.headers
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
      .set('If-Modified-Since', '0'),
  });

  return next(newReq);
}
