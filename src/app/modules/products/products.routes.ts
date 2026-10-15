import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./products-list/products-list').then((m) => m.ProductsList),
  },
  {
    path: 'new',
    loadComponent: () => import('./product-form/product-form').then((m) => m.ProductForm),
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories').then((m) => m.Categories),
  },
  { path: ':id', redirectTo: ':id/edit', pathMatch: 'full' },
  {
    path: ':id/edit',
    data: { mode: 'edit' },
    loadComponent: () => import('./product-form/product-form').then((m) => m.ProductForm),
  },
  {
    path: ':id/stock',
    loadComponent: () =>
      import('./stock-adjustment/stock-adjustment').then((m) => m.StockAdjustment),
  },
] satisfies Routes;
