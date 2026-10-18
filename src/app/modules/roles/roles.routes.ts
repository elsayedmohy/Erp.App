import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('../roles/roles-list/roles-list').then((m) => m.RolesList),
  },
  {
    path: 'new',
    loadComponent: () => import('../roles/role-form/role-form').then((m) => m.RoleForm),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('../roles/role-form/role-form').then((m) => m.RoleForm),
  },

] satisfies Routes;
