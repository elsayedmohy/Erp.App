import { Component, signal } from '@angular/core';
import { MOCK_ORDER_STATUSES, MOCK_ORDERS, MOCK_PRODUCTS } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { LineItemsEditor } from '@shared/components/line-items-editor/line-items-editor';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-order-detail',
  imports: [...UI, PageHeader, StatusBadge, LineItemsEditor, ConfirmDialog],
  templateUrl: './order-detail.html',
})
export class OrderDetail {
  protected readonly order = MOCK_ORDERS[1];
  protected readonly products = MOCK_PRODUCTS.map((p) => p.name);
  protected readonly statuses = MOCK_ORDER_STATUSES;
  /** Index of the current status in the stepper (display only). */
  protected readonly step = 1;
  protected readonly cancelOpen = signal(false);
}
