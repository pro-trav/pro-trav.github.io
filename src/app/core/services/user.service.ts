import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationUser } from '../models/application-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user = new BehaviorSubject<ApplicationUser>(new ApplicationUser());
  user$: Observable<ApplicationUser> = this._user.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  getUser(): Observable<ApplicationUser> {
    return this.httpClient.get<ApplicationUser>('account/user').pipe(
      tap({
        next: (x) => {
          this._user.next(
            new ApplicationUser(x.hawkId, x.originalUser, x.role)
          );
        },
        error: () => {
          this._user.next(new ApplicationUser());
        },
      })
    );
  }
}
