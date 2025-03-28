import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ImpersonationService {
  constructor(
    private router: Router,
    private readonly httpClient: HttpClient,
    private readonly userService: UserService,
    private readonly toastr: ToastService
  ) {}

  impersonate(hawkIdToBeImpersonated: string, univIdToBeImpersonated: string) {
    if (!hawkIdToBeImpersonated) {
      return;
    }
    const request = {
      hawkId: hawkIdToBeImpersonated,
      univId: univIdToBeImpersonated,
    };
    this.httpClient.post('account/impersonation', request).subscribe((x) => {
      if (x) {
        this.userService.getUser().subscribe(() => {
          this.router.navigateByUrl('', { replaceUrl: true });
        });
      } else {
        this.toastr.error(`You cannot impersonate ${hawkIdToBeImpersonated}.`);
      }
    });
  }

  stopImpersonate() {
    this.httpClient.post('account/impersonation/stop', null).subscribe((x) => {
      if (x) {
        this.userService.getUser().subscribe(() => {
          this.router.navigateByUrl('');
        });
      } else {
        this.toastr.error(`You failed in stopping impersonation.`);
      }
    });
  }
}
