import { Component } from '@angular/core';
import { MOCK_CUSTOMERS } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-customers-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Customers"
        subtitle="Manage customer accounts"
        [breadcrumbs]="[{ label: 'Sales' }, { label: 'Customers' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New customer</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by name, email or tax ID" />
      <app-data-table
        [columns]="columns"
        [rows]="customers"
        baseRoute="/customers"
        deleteMessage="The customer will be archived (soft delete)."
      />
    </div>
  `,
})
export class CustomersList {
  protected readonly customers = MOCK_CUSTOMERS;
  protected readonly columns: Column[] = [
    { key: 'name', label: 'Name', type: 'strong' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'taxId', label: 'Tax ID', type: 'mono' },
  ];
}
