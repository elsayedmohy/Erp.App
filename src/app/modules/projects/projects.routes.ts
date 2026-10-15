import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./projects-list/projects-list').then((m) => m.ProjectsList),
  },
  {
    path: 'new',
    loadComponent: () => import('./project-form/project-form').then((m) => m.ProjectForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./project-form/project-form').then((m) => m.ProjectForm),
  },
] satisfies Routes;
