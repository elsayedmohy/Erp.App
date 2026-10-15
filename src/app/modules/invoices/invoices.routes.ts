import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./invoices-list/invoices-list').then((m) => m.InvoicesList),
  },
  {
    path: 'new',
    loadComponent: () => import('./invoice-form/invoice-form').then((m) => m.InvoiceForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./invoice-detail/invoice-detail').then((m) => m.InvoiceDetail),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./invoice-form/invoice-form').then((m) => m.InvoiceForm),
  },
] satisfies Routes;
