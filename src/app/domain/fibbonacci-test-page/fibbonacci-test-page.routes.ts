import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./page/fibbonacci-test-page.component'))
        .FibbonacciTestPageComponent,
  },
] as Routes;
