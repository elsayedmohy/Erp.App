import { Component, inject, signal } from '@angular/core';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { MOCK_ORDER_STATUSES } from '@mock/mock-data';
import { DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { TuiDialogService } from '@taiga-ui/core';
import { AlertService } from '@core/services/alert.service';
import { listState } from '@shared/data/list-state';
import { OrdersService } from '../data/orders.service';
import { OrderQuery, OrderStatus } from '../data/models';
import { CustomersService } from '../../customers/data/customers.service';
import { EmptyState } from '@shared/components/empty-state/empty-state';
import { ErrorState } from '@shared/components/error-state/error-state';
import { TableSkeleton } from '@shared/ui/skeleton/table-skeleton';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { filter, map, switchMap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { Customer } from '../../customers/data/model';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Column } from '../../models';

@Component({
  selector: 'app-orders-list',
  imports: [...UI, PageHeader, FilterBar, DataTable, EmptyState, ErrorState, TableSkeleton],
  template: `
    <div class="page">
      <app-page-header
        heading="Sales orders"
        subtitle="Customer orders and fulfilment status"
        [breadcrumbs]="[{ label: 'Sales' }, { label: 'Orders' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New order</a>
      </app-page-header>
      <app-filter-bar
        placeholder="Search by order number"
        [value]="query().search ?? ''"
        (search)="onSearch($event)"
      >
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All statuses" [formControl]="statusControl" />
          <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m" [stringify]="stringify">
          <input tuiSelect placeholder="All customers" [formControl]="customerControl" />
          <tui-data-list-wrapper *tuiDropdown [items]="customers()" />
        </tui-textfield>
      </app-filter-bar>
      @let s = orders;
      @if (s.initialLoading()) {
        <app-table-skeleton [columns]="columns" [rows]="query().pageSize" />
      } @else if (s.error() && !s.data()) {
        <app-error-state [message]="s.error()!" (retry)="s.reload()" />
      } @else if (s.data(); as page) {
        @if (s.error()) {
          <div tuiNotification appearance="negative" size="m" class="inline-error">
            {{ s.error() }}
            <button tuiLink type="button" (click)="s.reload()">Retry</button>
          </div>
        }

        @if (page.total === 0) {
          @if (query().search) {
            <app-empty-state
              icon="@tui.search-x"
              heading="No matching products"
              [message]="'Nothing matches “' + query().search + '”.'"
            >
              <button
                tuiButton
                type="button"
                size="s"
                appearance="secondary"
                (click)="onSearch('')"
              >
                Clear search
              </button>
            </app-empty-state>
          } @else {
            <app-empty-state
              icon="@tui.contact"
              heading="No products yet"
              message="Create your first product."
            >
              <a tuiButton size="s" iconStart="@tui.plus" routerLink="new">New product</a>
            </app-empty-state>
          }
        } @else {
          <app-data-table
            [class.refreshing]="s.loading()"
            [columns]="columns"
            [rows]="page.items"
            [page]="page.page"
            [pageSize]="page.pageSize"
            [total]="page.total"
            (deleteRow)="onDelete($event)"
            (pageChange)="onPage($event)"
            baseRoute="/orders"
          />
        }
      }
    </div>
  `,
})
export class OrdersList {
  private readonly service = inject(OrdersService);
  private readonly customerService = inject(CustomersService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alert = inject(AlertService);

  protected readonly query = signal<OrderQuery>({
    page: 1,
    pageSize: 20,
  });

  protected readonly orders = listState(this.query, (q) => this.service.list(q));
  protected readonly statuses = MOCK_ORDER_STATUSES;
  protected readonly customers = toSignal(this.customerService.list().pipe(map((r) => r.items)), {
    initialValue: [],
  });
  customerControl = new FormControl<Customer | null>(null);
  statusControl = new FormControl<OrderStatus | null>(null);
  protected readonly columns: Column[] = [
    { key: 'id', label: 'Order #', type: 'strong' },
    { key: 'customerName', label: 'Customer' },
    { key: 'orderDate', label: 'Date' },
    { key: 'paymentMethod', label: 'Payment' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];

  constructor() {
    this.customerControl.valueChanges.subscribe((value) => {
      this.changeCustomer(value);
    });

    this.statusControl.valueChanges.subscribe((value) => {
      this.changeStatus(value);
    });
  }

  protected onSearch(search: string): void {
    this.query.update((q) => ({ ...q, search: search || undefined, page: 1 }));
  }

  protected changeCustomer(c: Customer | null): void {
    this.query.update((q) => ({ ...q, customerId: c?.id || undefined, page: 1 }));
  }

  protected changeStatus(status: OrderStatus | null): void {
    this.query.update((q) => ({ ...q, status: status || undefined, page: 1 }));
  }

  protected onPage(e: { page: number; pageSize: number }): void {
    this.query.update((q) => ({ ...q, ...e }));
  }

  protected onDelete(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete order ?',
        size: 's',
        data: { content: 'The order will be deleted.', yes: 'Delete', no: 'Cancel' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('order deleted.');
          this.orders.reload();
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }

  protected readonly stringify: TuiStringHandler<Customer> = (cat: Customer) =>
    this.customers().find((item) => item.id === cat.id)?.name ?? '';
}
