import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebWorkesTestService } from '@core/services/web-workes-test/web-workes-test.service';
import { TranslateDirective } from '@shared/directive/translate.directive';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateDirective],
})
export class WelcomePageComponent {
  private readonly webWorkesTestService = inject(WebWorkesTestService);

  countToBigNumMain() {
    this.webWorkesTestService.countToBigNumMain();
  }

  countToBigNumWorker() {
    this.webWorkesTestService.countToBigNumWorker();
  }

  fibbonacciOnMain() {
    this.webWorkesTestService.fibbonacciSequenceMain();
  }

  fibbonacciOnWorkers() {
    this.webWorkesTestService.fibbonacciSequenceWorker();
  }
}
