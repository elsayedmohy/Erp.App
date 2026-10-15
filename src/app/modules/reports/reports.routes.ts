import { Routes } from '@angular/router';
import { ReportsLayout } from './reports-layout/reports-layout';

export default [
  {
    path: '',
    component: ReportsLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sales' },
      {
        path: 'sales',
        loadComponent: () => import('./sales-report/sales-report').then((m) => m.SalesReport),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./inventory-report/inventory-report').then((m) => m.InventoryReport),
      },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./invoices-report/invoices-report').then((m) => m.InvoicesReport),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./tasks-report/tasks-report').then((m) => m.TasksReport),
      },
    ],
  },
] satisfies Routes;
