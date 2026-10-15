import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { TuiNavigation } from '@taiga-ui/layout';
import { MOCK_CURRENT_USER, MOCK_NOTIFICATIONS } from '@mock/mock-data';
import { UI } from '@shared/ui';

interface NavItem {
  label: string;
  icon: string;
  link: string;
}

interface NavGroup {
  label: string;
  icon: string;
  items: NavItem[];
}

@Component({
  selector: 'app-shell',
  imports: [...UI, RouterOutlet, TuiNavigation],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected readonly darkMode = inject(TUI_DARK_MODE);
  protected readonly theme = computed(() => (this.darkMode() ? 'dark' : 'light'));
  protected readonly expanded = signal(true);
  protected readonly notificationsOpen = signal(false);
  protected readonly userMenuOpen = signal(false);

  protected readonly user = MOCK_CURRENT_USER;
  protected readonly notifications = MOCK_NOTIFICATIONS.slice(0, 5);

  protected readonly nav: NavGroup[] = [
    {
      label: 'Sales',
      icon: '@tui.shopping-cart',
      items: [
        { label: 'Customers', icon: '@tui.contact', link: '/customers' },
        { label: 'Orders', icon: '@tui.receipt', link: '/orders' },
      ],
    },
    {
      label: 'Inventory',
      icon: '@tui.package',
      items: [
        { label: 'Products', icon: '@tui.box', link: '/products' },
        { label: 'Categories', icon: '@tui.tags', link: '/products/categories' },
      ],
    },
    {
      label: 'Purchasing',
      icon: '@tui.truck',
      items: [
        { label: 'Suppliers', icon: '@tui.factory', link: '/suppliers' },
        { label: 'Purchase orders', icon: '@tui.clipboard-list', link: '/purchasing' },
      ],
    },
    {
      label: 'Finance',
      icon: '@tui.landmark',
      items: [{ label: 'Invoices', icon: '@tui.file-text', link: '/invoices' }],
    },
    {
      label: 'HR',
      icon: '@tui.users',
      items: [{ label: 'Employees', icon: '@tui.id-card', link: '/employees' }],
    },
    {
      label: 'Work',
      icon: '@tui.folder-kanban',
      items: [
        { label: 'Projects', icon: '@tui.folder', link: '/projects' },
        { label: 'Tasks', icon: '@tui.list-checks', link: '/tasks' },
      ],
    },
    {
      label: 'Insights',
      icon: '@tui.chart-pie',
      items: [
        { label: 'Reports', icon: '@tui.chart-column', link: '/reports' },
        { label: 'Audit log', icon: '@tui.history', link: '/audit' },
      ],
    },
    {
      label: 'Administration',
      icon: '@tui.settings',
      items: [
        { label: 'Users', icon: '@tui.user-cog', link: '/users' },
        { label: 'Roles', icon: '@tui.shield', link: '/users/roles' },
        { label: 'Automation', icon: '@tui.workflow', link: '/automation' },
        { label: 'Webhooks', icon: '@tui.webhook', link: '/webhooks' },
      ],
    },
  ];
}
