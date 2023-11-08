import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./domain/welcome-page/welcome-page.routes'),
  },
];
