import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./orders-list/orders-list').then((m) => m.OrdersList) },
  { path: 'new', loadComponent: () => import('./order-form/order-form').then((m) => m.OrderForm) },
  {
    path: ':id',
    loadComponent: () => import('./order-detail/order-detail').then((m) => m.OrderDetail),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./order-form/order-form').then((m) => m.OrderForm),
  },
] satisfies Routes;
