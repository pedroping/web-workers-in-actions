import { AfterViewChecked, AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WebWorkesTestService } from './core/services/web-workes-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements AfterViewInit {
  private readonly webWorkesTestService = inject(WebWorkesTestService);

  title = 'web-workers-in-action';

  ngAfterViewInit(): void {
    this.webWorkesTestService.startDomain();
  }
}
