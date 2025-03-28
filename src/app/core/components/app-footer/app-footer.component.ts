import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppFooterComponent implements OnInit {
  year = 0;
  emailLinkText = 'Business Services IT';
  emailDistributionList = 'FBIS-DL_Developer@iowa.uiowa.edu';
  emailSubject = 'Questions about the OrderManager Website';
  emailHref = `mailto:${
    this.emailDistributionList
  }?subject=${this.emailSubject.replace(' ', '%20')}`;

  ngOnInit() {
    const today = new Date();
    this.year = today.getFullYear();
  }
}
