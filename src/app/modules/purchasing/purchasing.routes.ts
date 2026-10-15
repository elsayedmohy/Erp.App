import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./purchase-orders-list/purchase-orders-list').then((m) => m.PurchaseOrdersList),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./purchase-order-form/purchase-order-form').then((m) => m.PurchaseOrderForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./purchase-order-detail/purchase-order-detail').then((m) => m.PurchaseOrderDetail),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () =>
      import('./purchase-order-form/purchase-order-form').then((m) => m.PurchaseOrderForm),
  },
] satisfies Routes;
