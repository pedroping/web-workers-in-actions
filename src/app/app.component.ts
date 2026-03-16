import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ChangeLangComponent } from '@core/component/change-lang.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChangeLangComponent],
})
export class AppComponent implements OnInit {
  title = 'web-workers-in-action';
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (environment.isWebComponent) this.router.navigateByUrl('/');
  }
}
