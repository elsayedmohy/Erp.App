import { Component, signal } from '@angular/core';
import { MOCK_CUSTOMERS, MOCK_INVOICES, MOCK_ORDERS } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-customer-detail',
  imports: [...UI, PageHeader, DataTable, ConfirmDialog],
  templateUrl: './customer-detail.html',
})
export class CustomerDetail {
  protected readonly customer = MOCK_CUSTOMERS[0];
  protected readonly orders = MOCK_ORDERS.slice(0, 2);
  protected readonly invoices = MOCK_INVOICES.slice(0, 2);
  protected readonly tab = signal(0);
  protected readonly confirmOpen = signal(false);

  protected readonly orderColumns: Column[] = [
    { key: 'id', label: 'Order #', type: 'strong' },
    { key: 'orderDate', label: 'Date' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];
  protected readonly invoiceColumns: Column[] = [
    { key: 'number', label: 'Invoice', type: 'strong' },
    { key: 'dueDate', label: 'Due' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];
}
