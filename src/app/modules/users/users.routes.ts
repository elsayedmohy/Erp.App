import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./users-list/users-list').then((m) => m.UsersList) },
  { path: 'new', loadComponent: () => import('./user-form/user-form').then((m) => m.UserForm) },
  {
    path: 'roles',
    loadComponent: () => import('./roles-list/roles-list').then((m) => m.RolesList),
  },
  {
    path: 'roles/new',
    loadComponent: () => import('./role-form/role-form').then((m) => m.RoleForm),
  },
  {
    path: 'roles/:id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./role-form/role-form').then((m) => m.RoleForm),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./user-form/user-form').then((m) => m.UserForm),
  },
] satisfies Routes;
