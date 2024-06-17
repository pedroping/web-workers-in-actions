import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domain/welcome/welcome-page.routes'),
  },
  {
    path: 'help',
    loadChildren: () => import('./domain/help/help-routes'),
  },
];
