import { CommonModule } from '@angular/common';
import {
  Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent {
  title = 'web-workers-in-action';
}
