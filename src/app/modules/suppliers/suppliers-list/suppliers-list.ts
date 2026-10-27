import { Component } from '@angular/core';
import { MOCK_SUPPLIERS } from '@mock/mock-data';
import { DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { Column } from '../../models';

@Component({
  selector: 'app-suppliers-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Suppliers"
        subtitle="Vendors you purchase stock from"
        [breadcrumbs]="[{ label: 'Purchasing' }, { label: 'Suppliers' }]"
      >
        <a
          tuiButton
          appearance="secondary"
          size="m"
          iconStart="@tui.clipboard-list"
          routerLink="/purchasing/new"
          >New purchase order</a
        >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New supplier</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by company or contact" />
      <app-data-table
        [columns]="columns"
        [rows]="suppliers"
        baseRoute="/suppliers"
        [actions]="['edit', 'delete']"
      />
    </div>
  `,
})
export class SuppliersList {
  protected readonly suppliers = MOCK_SUPPLIERS;
  protected readonly columns: Column[] = [
    { key: 'companyName', label: 'Company', type: 'strong' },
    { key: 'contactName', label: 'Contact', type: 'person' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'paymentTerms', label: 'Payment terms' },
  ];
}
