import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiDay } from '@taiga-ui/cdk';
import { MOCK_CUSTOMERS, MOCK_INVOICES, MOCK_TAX_RATES } from '@mock/mock-data';
import { LineItemsEditor } from '@shared/components/line-items-editor/line-items-editor';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-invoice-form',
  imports: [...UI, PageHeader, LineItemsEditor],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit invoice' : 'New invoice'"
        [breadcrumbs]="[
          { label: 'Finance' },
          { label: 'Invoices', link: '/invoices' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <div class="grid-3">
          <tui-textfield tuiChevron>
            <label tuiLabel>Customer</label>
            <input tuiComboBox formControlName="customer" />
            <tui-data-list-wrapper *tuiDropdown [items]="customers | tuiFilterByInput" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Invoice date</label>
            <input tuiInputDate formControlName="invoiceDate" />
            <tui-calendar *tuiDropdown />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Due date</label>
            <input tuiInputDate formControlName="dueDate" />
            <tui-calendar *tuiDropdown />
          </tui-textfield>
        </div>

        <header tuiHeader="h5"><h3 tuiTitle>Line items</h3></header>
        <app-line-items-editor
          [items]="lines"
          itemMode="description"
          [showTax]="true"
          [taxRates]="taxRates"
          [total]="total"
        />

        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/invoices">Cancel</a>
          <button tuiButton appearance="secondary" size="m" type="button">Save as draft</button>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update invoice' : 'Generate invoice' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class InvoiceForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly customers = MOCK_CUSTOMERS.map((c) => c.name);
  protected readonly taxRates = MOCK_TAX_RATES;
  protected readonly lines = MOCK_INVOICES[3].lines;
  protected readonly total = MOCK_INVOICES[3].totalAmount;
  protected readonly form = new FormGroup({
    customer: new FormControl<string | null>(null),
    invoiceDate: new FormControl<TuiDay | null>(null),
    dueDate: new FormControl<TuiDay | null>(null),
  });
}
