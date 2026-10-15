import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./employees-list/employees-list').then((m) => m.EmployeesList),
  },
  {
    path: 'new',
    loadComponent: () => import('./employee-form/employee-form').then((m) => m.EmployeeForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./employee-detail/employee-detail').then((m) => m.EmployeeDetail),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./employee-form/employee-form').then((m) => m.EmployeeForm),
  },
] satisfies Routes;
