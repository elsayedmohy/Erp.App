import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Shell } from './layout/shell/shell';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/login/login').then((m) => m.Login),
      },
    ],
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/profile/profile').then((m) => m.Profile),
      },
      // Level 1
      { path: 'users', loadChildren: () => import('./modules/users/users.routes') },
      { path: 'roles', loadChildren: () => import('./modules/roles/roles.routes') },
      { path: 'customers', loadChildren: () => import('./modules/customers/customers.routes') },
      { path: 'products', loadChildren: () => import('./modules/products/products.routes') },
      { path: 'categories', loadChildren: () => import('./modules/categories/categories.routes') },
      { path: 'suppliers', loadChildren: () => import('./modules/suppliers/suppliers.routes') },
      { path: 'purchasing', loadChildren: () => import('./modules/purchasing/purchasing.routes') },
      { path: 'orders', loadChildren: () => import('./modules/orders/orders.routes') },
      { path: 'invoices', loadChildren: () => import('./modules/invoices/invoices.routes') },
      { path: 'employees', loadChildren: () => import('./modules/employees/employees.routes') },
      // Level 2
      { path: 'projects', loadChildren: () => import('./modules/projects/projects.routes') },
      { path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.routes') },
      // Level 3
      { path: 'reports', loadChildren: () => import('./modules/reports/reports.routes') },
      { path: 'automation', loadChildren: () => import('./modules/automation/automation.routes') },
      {
        path: 'notifications',
        loadChildren: () => import('./modules/notifications/notifications.routes'),
      },
      { path: 'audit', loadChildren: () => import('./modules/audit/audit.routes') },
      { path: 'webhooks', loadChildren: () => import('./modules/webhooks/webhooks.routes') },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
