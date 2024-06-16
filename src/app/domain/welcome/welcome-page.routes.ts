import { Route } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./page/welcome-page.component')).WelcomePageComponent,
  },
] as Routes;
