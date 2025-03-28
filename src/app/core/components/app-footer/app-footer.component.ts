import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppFooterComponent implements OnInit {
  year = 0;
  emailLinkText = 'protrav@uiowa.edu';
  emailDistributionList = 'protrav@uiowa.edu';
  emailSubject = 'Questions about ProTrav';
  emailHref = `mailto:${
    this.emailDistributionList
  }?subject=${this.emailSubject.replace(' ', '%20')}`;

  ngOnInit() {
    const today = new Date();
    this.year = today.getFullYear();
  }
}
