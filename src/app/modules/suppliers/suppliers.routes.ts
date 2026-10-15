import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./suppliers-list/suppliers-list').then((m) => m.SuppliersList),
  },
  {
    path: 'new',
    loadComponent: () => import('./supplier-form/supplier-form').then((m) => m.SupplierForm),
  },
  { path: ':id', redirectTo: ':id/edit', pathMatch: 'full' },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./supplier-form/supplier-form').then((m) => m.SupplierForm),
  },
] satisfies Routes;
