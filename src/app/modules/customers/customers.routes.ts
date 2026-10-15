import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./customers-list/customers-list').then((m) => m.CustomersList),
  },
  {
    path: 'new',
    loadComponent: () => import('./customer-form/customer-form').then((m) => m.CustomerForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./customer-detail/customer-detail').then((m) => m.CustomerDetail),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./customer-form/customer-form').then((m) => m.CustomerForm),
  },
] satisfies Routes;
