import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiDay } from '@taiga-ui/cdk';
import { MOCK_PRODUCTS, MOCK_PURCHASE_ORDERS, MOCK_SUPPLIERS } from '@mock/mock-data';
import { LineItemsEditor } from '@shared/components/line-items-editor/line-items-editor';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-purchase-order-form',
  imports: [...UI, PageHeader, LineItemsEditor],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit purchase order' : 'New purchase order'"
        [breadcrumbs]="[
          { label: 'Purchasing' },
          { label: 'Purchase orders', link: '/purchasing' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <div class="grid-2">
          <tui-textfield tuiChevron>
            <label tuiLabel>Supplier</label>
            <input tuiComboBox formControlName="supplier" />
            <tui-data-list-wrapper *tuiDropdown [items]="suppliers | tuiFilterByInput" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Expected delivery date</label>
            <input tuiInputDate formControlName="expectedDelivery" />
            <tui-calendar *tuiDropdown />
          </tui-textfield>
        </div>

        <header tuiHeader="h5"><h3 tuiTitle>Line items</h3></header>
<!--        <app-line-items-editor-->
<!--          [items]="lines"-->
<!--          [products]="products"-->
<!--          priceLabel="Unit cost"-->
<!--          [total]="total"-->
<!--        />-->

        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/purchasing">Cancel</a>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update order' : 'Submit order' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class PurchaseOrderForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly suppliers = MOCK_SUPPLIERS.map((s) => s.companyName);
  protected readonly products = MOCK_PRODUCTS.map((p) => p.name);
  protected readonly lines = MOCK_PURCHASE_ORDERS[1].lines;
  protected readonly total = MOCK_PURCHASE_ORDERS[1].totalAmount;
  protected readonly form = new FormGroup({
    supplier: new FormControl<string | null>(null),
    expectedDelivery: new FormControl<TuiDay | null>(null),
  });
}
