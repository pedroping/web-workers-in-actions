import { Component, inject } from '@angular/core';
import { WebWorkesTestService } from 'src/app/core/services/web-workes-test.service';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
})
export class WelcomePageComponent {
  private readonly webWorkesTestService = inject(WebWorkesTestService);
}
