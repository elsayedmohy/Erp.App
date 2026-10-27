import { Component } from '@angular/core';
import {
  MOCK_PO_STATUSES,
  MOCK_PRODUCTS,
  MOCK_PURCHASE_ORDERS,
  MOCK_SUPPLIERS,
} from '@mock/mock-data';
import { LineItemsEditor } from '@shared/components/line-items-editor/line-items-editor';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-purchase-order-detail',
  imports: [...UI, PageHeader, StatusBadge, LineItemsEditor],
  template: `
    <div class="page">
      <app-page-header
        [heading]="'Purchase order #' + order.id"
        [subtitle]="order.supplier"
        [breadcrumbs]="[
          { label: 'Purchasing' },
          { label: 'Purchase orders', link: '/purchasing' },
          { label: '#' + order.id },
        ]"
      >
        <button
          tuiButton
          appearance="secondary"
          size="m"
          tuiChevron
          type="button"
          tuiDropdownAuto
          [tuiDropdown]="statusMenu"
        >
          Update status
        </button>
        <ng-template #statusMenu>
          <tui-data-list>
            @for (s of statuses; track s) {
              <button tuiOption type="button">{{ s }}</button>
            }
          </tui-data-list>
        </ng-template>
        <a
          tuiButton
          appearance="secondary"
          size="m"
          iconStart="@tui.pencil"
          [routerLink]="['/purchasing', order.id, 'edit']"
          >Edit</a
        >
      </app-page-header>

      <div class="grid-3">
        <section tuiCardLarge appearance="outline-grayscale" class="span-2">
          <header tuiHeader="h5"><h3 tuiTitle>Line items</h3></header>
<!--          <app-line-items-editor-->
<!--            [items]="order.lines"-->
<!--            [products]="products"-->
<!--            priceLabel="Unit cost"-->
<!--            [total]="order.totalAmount"-->
<!--          />-->
        </section>
        <section tuiCardLarge appearance="outline-grayscale">
          <header tuiHeader="h5"><h3 tuiTitle>Summary</h3></header>
          <dl class="dl">
            <dt>Status</dt>
            <dd><app-status-badge [status]="order.status" /></dd>
            <dt>Order date</dt>
            <dd>{{ order.orderDate }}</dd>
            <dt>Expected</dt>
            <dd>{{ order.expectedDelivery }}</dd>
            <dt>Supplier</dt>
            <dd>{{ supplier.companyName }}</dd>
            <dt>Contact</dt>
            <dd>{{ supplier.contactName }}</dd>
            <dt>Terms</dt>
            <dd>{{ supplier.paymentTerms }}</dd>
          </dl>
        </section>
      </div>
    </div>
  `,
})
export class PurchaseOrderDetail {
  protected readonly order = MOCK_PURCHASE_ORDERS[1];
  protected readonly supplier = MOCK_SUPPLIERS[1];
  protected readonly products = MOCK_PRODUCTS.map((p) => p.name);
  protected readonly statuses = MOCK_PO_STATUSES;
}
