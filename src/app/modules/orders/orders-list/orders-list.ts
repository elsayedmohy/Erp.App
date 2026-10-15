import { Component } from '@angular/core';
import type { TuiDayRange } from '@taiga-ui/cdk';
import { MOCK_CUSTOMERS, MOCK_ORDER_STATUSES, MOCK_ORDERS } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-orders-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Sales orders"
        subtitle="Customer orders and fulfilment status"
        [breadcrumbs]="[{ label: 'Sales' }, { label: 'Orders' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New order</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by order number">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All statuses" [(ngModel)]="status" />
          <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All customers" [(ngModel)]="customer" />
          <tui-data-list-wrapper *tuiDropdown [items]="customers" />
        </tui-textfield>
        <tui-textfield tuiTextfieldSize="m">
          <input tuiInputDateRange placeholder="From – To" [(ngModel)]="range" />
          <tui-calendar-range *tuiDropdown />
        </tui-textfield>
      </app-filter-bar>
      <app-data-table
        [columns]="columns"
        [rows]="orders"
        baseRoute="/orders"
        deleteMessage="Only orders in Pending status can be cancelled."
      />
    </div>
  `,
})
export class OrdersList {
  protected readonly orders = MOCK_ORDERS;
  protected readonly statuses = MOCK_ORDER_STATUSES;
  protected readonly customers = MOCK_CUSTOMERS.map((c) => c.name);
  protected status: string | null = null;
  protected customer: string | null = null;
  protected range: TuiDayRange | null = null;
  protected readonly columns: Column[] = [
    { key: 'id', label: 'Order #', type: 'strong' },
    { key: 'customer', label: 'Customer' },
    { key: 'orderDate', label: 'Date' },
    { key: 'paymentMethod', label: 'Payment' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];
}
