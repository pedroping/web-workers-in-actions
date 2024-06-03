import { Routes } from '@angular/router';
import { WelcomePageComponent } from './page/welcome-page.component';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./page/welcome-page.component')).WelcomePageComponent,
  },
] as Routes;
