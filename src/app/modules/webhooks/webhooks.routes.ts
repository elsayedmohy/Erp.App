import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./endpoints-list/endpoints-list').then((m) => m.EndpointsList),
  },
  {
    path: 'new',
    loadComponent: () => import('./endpoint-form/endpoint-form').then((m) => m.EndpointForm),
  },
  { path: ':id', redirectTo: ':id/edit', pathMatch: 'full' },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./endpoint-form/endpoint-form').then((m) => m.EndpointForm),
  },
  {
    path: ':id/deliveries',
    loadComponent: () => import('./deliveries-list/deliveries-list').then((m) => m.DeliveriesList),
  },
] satisfies Routes;
