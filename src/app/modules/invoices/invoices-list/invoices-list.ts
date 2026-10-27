import { Component } from '@angular/core';
import type { TuiDayRange } from '@taiga-ui/cdk';
import { MOCK_CUSTOMERS, MOCK_INVOICE_STATUSES, MOCK_INVOICES } from '@mock/mock-data';
import { DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { Column } from '../../models';

@Component({
  selector: 'app-invoices-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Invoices"
        subtitle="Billing, payments and overdue tracking"
        [breadcrumbs]="[{ label: 'Finance' }, { label: 'Invoices' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New invoice</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by invoice number">
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
        [rows]="invoices"
        baseRoute="/invoices"
        [actions]="['view', 'delete']"
        deleteMessage="Only Draft invoices can be deleted."
      />
    </div>
  `,
})
export class InvoicesList {
  protected readonly invoices = MOCK_INVOICES;
  protected readonly statuses = MOCK_INVOICE_STATUSES;
  protected readonly customers = MOCK_CUSTOMERS.map((c) => c.name);
  protected status: string | null = null;
  protected customer: string | null = null;
  protected range: TuiDayRange | null = null;
  protected readonly columns: Column[] = [
    { key: 'number', label: 'Invoice', type: 'strong' },
    { key: 'customer', label: 'Customer' },
    { key: 'invoiceDate', label: 'Invoice date' },
    { key: 'dueDate', label: 'Due date' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];
}
