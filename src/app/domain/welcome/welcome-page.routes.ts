import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./welcome-page/welcome-page.component'))
        .WelcomePageComponent,
  },
] as Routes;
