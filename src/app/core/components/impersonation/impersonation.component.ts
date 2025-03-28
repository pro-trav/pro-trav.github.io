import { Component, OnInit } from '@angular/core';
import { ImpersonationService } from '../../services/impersonation.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-impersonation',
    templateUrl: './impersonation.component.html',
    styleUrls: ['./impersonation.component.css'],
    standalone: false
})
export class ImpersonationComponent implements OnInit {
  hawkId = '';
  constructor(
    public readonly userService: UserService,
    private readonly impersonationService: ImpersonationService
  ) {}

  ngOnInit() {}
  impersonate() {
    if (!this.hawkId) {
      return;
    }
    this.impersonationService.impersonate(this.hawkId.trim(), '');
  }

  stopImpersonate() {
    this.impersonationService.stopImpersonate();
  }
}
