import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MOCK_PRODUCTS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-stock-adjustment',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        heading="Adjust stock"
        [subtitle]="product.name + ' · ' + product.sku"
        [breadcrumbs]="[
          { label: 'Inventory' },
          { label: 'Products', link: '/products' },
          { label: product.name },
          { label: 'Adjust stock' },
        ]"
      />

      <div class="grid-3">
        <form
          tuiCardLarge
          appearance="outline-grayscale"
          tuiForm="m"
          class="span-2"
          [formGroup]="form"
        >
          <tui-segmented size="m">
            <button type="button">Restock (+)</button>
            <button type="button">Deduction (−)</button>
          </tui-segmented>
          <tui-textfield>
            <label tuiLabel>Quantity change</label>
            <input tuiInputNumber formControlName="quantity" [min]="-100000" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Reason</label>
            <textarea
              tuiTextarea
              formControlName="reason"
              placeholder="e.g. Supplier delivery, damaged in transit, stock count correction"
            ></textarea>
          </tui-textfield>
          <footer>
            <a tuiButton appearance="secondary" size="m" routerLink="/products">Cancel</a>
            <button tuiButton size="m" type="button">Apply</button>
          </footer>
        </form>

        <section tuiCardLarge appearance="outline-grayscale">
          <header tuiHeader="h5"><h3 tuiTitle>Current stock</h3></header>
          <dl class="dl">
            <dt>In stock</dt>
            <dd>
              <strong>{{ product.stockQuantity }}</strong>
            </dd>
            <dt>Reorder level</dt>
            <dd>{{ product.reorderLevel }}</dd>
            <dt>Category</dt>
            <dd>{{ product.category }}</dd>
          </dl>
          <div tuiNotification appearance="info" size="s">
            Positive values restock, negative values deduct.
          </div>
        </section>
      </div>
    </div>
  `,
})
export class StockAdjustment {
  protected readonly product = MOCK_PRODUCTS[0];
  protected readonly form = new FormGroup({
    quantity: new FormControl<number | null>(null),
    reason: new FormControl(''),
  });
}
