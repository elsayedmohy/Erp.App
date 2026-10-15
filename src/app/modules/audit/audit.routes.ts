import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./audit-list/audit-list').then((m) => m.AuditList) },
  {
    path: ':id',
    loadComponent: () => import('./audit-detail/audit-detail').then((m) => m.AuditDetail),
  },
] satisfies Routes;
