import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./notifications-list/notifications-list').then((m) => m.NotificationsList),
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./notification-preferences/notification-preferences').then(
        (m) => m.NotificationPreferences,
      ),
  },
] satisfies Routes;
