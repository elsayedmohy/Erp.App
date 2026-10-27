import { Component } from '@angular/core';
import { MOCK_PO_STATUSES, MOCK_PURCHASE_ORDERS, MOCK_SUPPLIERS } from '@mock/mock-data';
import { DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { Column } from '../../models';
@Component({
  selector: 'app-purchase-orders-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Purchase orders"
        subtitle="Stock ordered from suppliers"
        [breadcrumbs]="[{ label: 'Purchasing' }, { label: 'Purchase orders' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New purchase order</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by PO number">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All suppliers" [(ngModel)]="supplier" />
          <tui-data-list-wrapper *tuiDropdown [items]="suppliers" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All statuses" [(ngModel)]="status" />
          <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
        </tui-textfield>
      </app-filter-bar>
      <app-data-table
        [columns]="columns"
        [rows]="orders"
        baseRoute="/purchasing"
        [actions]="['view', 'edit']"
      />
    </div>
  `,
})
export class PurchaseOrdersList {
  protected readonly orders = MOCK_PURCHASE_ORDERS;
  protected readonly suppliers = MOCK_SUPPLIERS.map((s) => s.companyName);
  protected readonly statuses = MOCK_PO_STATUSES;
  protected supplier: string | null = null;
  protected status: string | null = null;
  protected readonly columns: Column[] = [
    { key: 'id', label: 'PO #', type: 'strong' },
    { key: 'supplier', label: 'Supplier' },
    { key: 'orderDate', label: 'Order date' },
    { key: 'expectedDelivery', label: 'Expected delivery' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];
}
