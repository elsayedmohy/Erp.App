import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./categories').then((m) => m.Categories),
  }
] satisfies Routes;
