import { Routes } from '@angular/router';

export default [
  { path: '', pathMatch: 'full', redirectTo: 'rules' },
  {
    path: 'rules',
    loadComponent: () => import('./rules-list/rules-list').then((m) => m.RulesList),
  },
  {
    path: 'rules/new',
    loadComponent: () => import('./rule-form/rule-form').then((m) => m.RuleForm),
  },
  { path: 'rules/:id', redirectTo: 'rules/:id/edit', pathMatch: 'full' },
  {
    path: 'rules/:id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./rule-form/rule-form').then((m) => m.RuleForm),
  },
  { path: 'runs', loadComponent: () => import('./runs-list/runs-list').then((m) => m.RunsList) },
  {
    path: 'runs/:id',
    loadComponent: () => import('./run-detail/run-detail').then((m) => m.RunDetail),
  },
] satisfies Routes;
