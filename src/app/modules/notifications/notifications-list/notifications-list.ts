import { Component } from '@angular/core';
import { MOCK_NOTIFICATIONS } from '@mock/mock-data';
import { EmptyState } from '@shared/components/empty-state/empty-state';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-notifications-list',
  imports: [...UI, PageHeader, EmptyState],
  templateUrl: './notifications-list.html',
  styleUrl: './notifications-list.scss',
})
export class NotificationsList {
  protected readonly notifications = MOCK_NOTIFICATIONS;
  protected readonly icons: Record<string, string> = {
    'inventory.low_stock': '@tui.package',
    'invoice.overdue': '@tui.file-warning',
    'task.assigned': '@tui.list-checks',
    'task.comment': '@tui.message-square',
    'order.created': '@tui.shopping-cart',
  };
}
