import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  toastr = inject(ToastService);

  override handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.toastr.error(
          `Developers have been notified and will resolve this issue soon.`,
          `System Error`
        );
      } else {
        if (error.error instanceof Object) {
          this.toastr.error(error.error.message || error.message || 'error');
        } else {
          this.toastr.error(error.error || error.message || 'error');
        }
      }
    } else if (error instanceof TypeError) {
      this.toastr.error(error.message, 'TypeScript Type error.');
    } else if (error instanceof Error) {
      if (/Loading chunk [\w]+ failed/.test(error.message)) {
        window.location.reload();
        return;
      }
      this.toastr.error(error.message);
    } else {
      this.toastr.error('Something unexpected happened...');
    }
    if (/localhost/.test(window.location.href)) {
      super.handleError(error);
    }
  }
}
