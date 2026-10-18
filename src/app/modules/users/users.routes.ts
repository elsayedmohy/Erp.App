import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./users-list/users-list').then((m) => m.UsersList) },
  { path: 'new', loadComponent: () => import('./user-form/user-form').then((m) => m.UserForm) },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./user-form/user-form').then((m) => m.UserForm),
  },
] satisfies Routes;
