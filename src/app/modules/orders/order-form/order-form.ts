import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiDay } from '@taiga-ui/cdk';
import { MOCK_CUSTOMERS, MOCK_ORDERS, MOCK_PAYMENT_METHODS, MOCK_PRODUCTS } from '@mock/mock-data';
import { LineItemsEditor } from '@shared/components/line-items-editor/line-items-editor';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-order-form',
  imports: [...UI, PageHeader, LineItemsEditor],
  templateUrl: './order-form.html',
})
export class OrderForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly customers = MOCK_CUSTOMERS.map((c) => c.name);
  protected readonly products = MOCK_PRODUCTS.map((p) => p.name);
  protected readonly paymentMethods = MOCK_PAYMENT_METHODS;
  protected readonly lines = MOCK_ORDERS[0].lines;
  protected readonly total = MOCK_ORDERS[0].totalAmount;
  protected readonly form = new FormGroup({
    customer: new FormControl<string | null>(null),
    orderDate: new FormControl<TuiDay | null>(null),
    paymentMethod: new FormControl<string | null>(null),
    shippingAddress: new FormControl(''),
  });
}
