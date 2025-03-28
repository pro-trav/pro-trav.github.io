import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { UiowaHeaderModule } from '@uiowa/uiowa-header';
import {
  SessionExpirationAlert,
  SessionInterruptService,
} from 'session-expiration-alert';

import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppToastsComponent } from './components/app-toasts/app-toasts.component';
import { ImpersonationComponent } from './components/impersonation/impersonation.component';
import { AppErrorHandler } from './services/app-error-handler';
import { httpCacheControlInterceptor } from './services/http-cache-control.interceptor';
import { SessionInterruptorService } from './services/session-interruptor.service';
import { unauthorizedInterceptor } from './services/unauthorized.interceptor';

@NgModule({
  declarations: [
    AppFooterComponent,
    AccessDeniedComponent,
    ImpersonationComponent,
    AppToastsComponent,
  ],
  exports: [
    UiowaHeaderModule,
    AppFooterComponent,
    AccessDeniedComponent,
    ImpersonationComponent,
    AppToastsComponent,
  ],
  imports: [
    CommonModule,
    UiowaHeaderModule,
    RouterModule,
    FormsModule,
    NgbToastModule,
    SessionExpirationAlert,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    { provide: SessionInterruptService, useClass: SessionInterruptorService },
    provideHttpClient(
      withInterceptors([unauthorizedInterceptor, httpCacheControlInterceptor])
    ),
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    core: CoreModule
  ) {
    if (core) {
      throw new Error('Core Module can only be imported in AppModule.');
    }
  }
}
