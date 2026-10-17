import { Component, computed, inject, input, signal } from '@angular/core';
import { MOCK_INVOICES, MOCK_ORDERS } from '@mock/mock-data';
import { type Column, DataTable } from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../data/customers.service';
import { Customer, CustomerQuery } from '../data/model';
import { PageLoader } from '@shared/components/page-loader/page-loader';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { filter, switchMap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { AlertService } from '@core/services/alert.service';
import { TuiDialogService } from '@taiga-ui/core';
import { InvoiceQuery } from '../../invoices/data/models';
import { listState } from '@shared/data/list-state';
import { EmptyState } from '@shared/components/empty-state/empty-state';
import { ErrorState } from '@shared/components/error-state/error-state';
import { TableSkeleton } from '@shared/ui/skeleton/table-skeleton';
import { InvoiceService } from '../../invoices/data/invoice.service';
import { OrderQuery } from '../../orders/data/models';
import { OrdersService } from '../../orders/data/orders.service';

@Component({
  selector: 'app-customer-detail',
  imports: [...UI, PageHeader, DataTable, PageLoader, EmptyState, ErrorState, TableSkeleton],
  templateUrl: './customer-detail.html',
})
export class CustomerDetail {
  private readonly customerService = inject(CustomersService);
  private readonly invoiceService = inject(InvoiceService);
  private readonly orderService = inject(OrdersService);
  readonly id = input.required<string>();
  protected readonly tab = signal(0);
  protected customer = signal<Customer | null>(null);
  private readonly invoicesOpened = signal(false);
  private readonly invoicesPaging = signal({ page: 1, pageSize: 10 });
  protected readonly invoicesQuery = computed<InvoiceQuery | null>(() =>
    this.invoicesOpened()
      ? { ...this.invoicesPaging(), customerId: this.id(), sortBy: 'invoiceDate', sortDir: 'desc' }
      : null,
  );
  protected readonly invoices = listState(this.invoicesQuery, (q) => this.invoiceService.list(q));

  private readonly ordersOpened = signal(false);
  private readonly ordersPaging = signal({ page: 1, pageSize: 10 });
  protected readonly ordersQuery = computed<OrderQuery | null>(() =>
    this.ordersOpened()
      ? { ...this.ordersPaging(), customerId: this.id(), sortBy: 'orderDate', sortDir: 'desc' }
      : null,
  );
  protected readonly orders = listState(this.ordersQuery, (q) => this.orderService.list(q));

  protected dialogs = inject(TuiDialogService);
  protected alert = inject(AlertService);
  protected readonly loading = signal<boolean>(false);

  protected readonly orderColumns: Column[] = [
    { key: 'id', label: 'Order #', type: 'strong' },
    { key: 'orderDate', label: 'Date' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];
  protected readonly invoiceColumns: Column[] = [
    { key: 'invoiceDate', label: 'Date', type: 'strong' },
    { key: 'dueDate', label: 'Due' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];

  ngOnInit() {
    this.load();
  }

  protected onTabChange(index: number): void {
    this.tab.set(index);
    if (index === ORDERS_TAB) this.ordersOpened.set(true);
    if (index === INVOICES_TAB) this.invoicesOpened.set(true);
  }

  protected onInvoicesPage(e: { page: number; pageSize: number }): void {
    this.invoicesPaging.set(e);
  }

  protected onOrdersPage(e: { page: number; pageSize: number }): void {
    this.ordersPaging.set(e);
  }

  load() {
    this.loading.set(true);
    this.customerService.getById(this.id()).subscribe({
      next: (data) => {
        this.customer.set(data);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.loading.set(false);
        console.log(err);
      },
    });
  }

  protected delete(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete customer?',
        size: 's',
        data: { content: 'The customer will be archived.', yes: 'Delete', no: 'Cancel' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.customerService.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('Customer deleted.');
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }
}
const INVOICES_TAB = 2;
const ORDERS_TAB = 1;
