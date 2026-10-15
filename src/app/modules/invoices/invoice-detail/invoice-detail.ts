import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiDay } from '@taiga-ui/cdk';
import { MOCK_CUSTOMERS, MOCK_INVOICES, MOCK_PAYMENT_METHODS } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-invoice-detail',
  imports: [...UI, DecimalPipe, PageHeader, StatusBadge, ConfirmDialog],
  templateUrl: './invoice-detail.html',
  styleUrl: './invoice-detail.scss',
})
export class InvoiceDetail {
  protected readonly invoice = MOCK_INVOICES[1];
  protected readonly customer = MOCK_CUSTOMERS[1];
  protected readonly paymentMethods = MOCK_PAYMENT_METHODS;
  protected readonly payOpen = signal(false);
  protected readonly deleteOpen = signal(false);
  protected readonly payForm = new FormGroup({
    paymentDate: new FormControl<TuiDay | null>(null),
    paymentMethod: new FormControl<string | null>(null),
  });
}
