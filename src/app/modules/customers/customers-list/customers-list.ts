import { Component, inject, signal } from '@angular/core';
import { type Column, DataTable } from '@shared/components/data-table/data-table';
import { EmptyState } from '@shared/components/empty-state/empty-state';
import { ErrorState } from '@shared/components/error-state/error-state';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { listState } from '@shared/data/list-state';
import { TableSkeleton } from '@shared/ui/skeleton/table-skeleton';
import { UI } from '@shared/ui';
import { CustomersService } from '../data/customers.service';
import { CustomerQuery } from '../data/model';
import { AlertService } from '@core/services/alert.service';
import { TuiDialogService } from '@taiga-ui/core';
import { filter, switchMap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { TUI_CONFIRM } from '@taiga-ui/kit';

@Component({
  selector: 'app-customers-list',
  imports: [...UI, PageHeader, FilterBar, DataTable, TableSkeleton, EmptyState, ErrorState],
  templateUrl: 'customer-list.html',
  styles: `
    .inline-error {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
  `,
})
export class CustomersList {
  private readonly service = inject(CustomersService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alert = inject(AlertService);

  protected readonly query = signal<CustomerQuery>({ page: 1, pageSize: 20 });
  protected readonly customers = listState(this.query, (q) => this.service.list(q));

  protected readonly columns: Column[] = [
    { key: 'name', label: 'Name', type: 'strong' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'taxId', label: 'Tax ID', type: 'mono' },
  ];

  protected onSearch(search: string): void {
    this.query.update((q) => ({ ...q, search: search || undefined, page: 1 }));
  }

  protected onPage(e: { page: number; pageSize: number }): void {
    this.query.update((q) => ({ ...q, ...e }));
  }

  protected onDelete(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete customer?',
        size: 's',
        data: { content: 'The customer will be archived.', yes: 'Delete', no: 'Cancel' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('Customer deleted.');
          this.customers.reload();
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }
}
