import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./help-page/help-page.component')).HelpPageComponent,
  },
] as Routes;
