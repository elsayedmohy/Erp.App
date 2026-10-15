import { Routes } from '@angular/router';

export default [
  { path: '', loadComponent: () => import('./tasks-list/tasks-list').then((m) => m.TasksList) },
  { path: 'new', loadComponent: () => import('./task-form/task-form').then((m) => m.TaskForm) },
  {
    path: ':id',
    loadComponent: () => import('./task-detail/task-detail').then((m) => m.TaskDetail),
  },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./task-form/task-form').then((m) => m.TaskForm),
  },
] satisfies Routes;
