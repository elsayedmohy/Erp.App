import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { PAYMENT_METHODS } from '../../constants';
import { ProductsService } from '../../products/data/products.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { minItems, requiredText } from '@shared/forms/form-utils';
import { entityForm } from '@shared/forms/entity-form';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { OrdersService } from '../data/orders.service';
import { CustomersService } from '../../customers/data/customers.service';
import { Column, PaymentMethod } from '../../models';
import { OrderLine } from '../data/models';
import { ErrorState } from '@shared/components/error-state/error-state';
import { PageLoader } from '@shared/components/page-loader/page-loader';
import { LineItemsEditor } from '@shared/components/line-items-editor/line-items-editor';
import { TuiDateFormat, TuiDialogService } from '@taiga-ui/core';
import { Product } from '../../products/data/models';
import { ProductPickerDialogComponent } from '../product-dialog/product-picker-dialog';

@Component({
  selector: 'app-order-form',
  imports: [...UI, PageHeader, ErrorState, PageLoader, LineItemsEditor, TuiDateFormat],
  templateUrl: './order-form.html',
})
export class OrderForm {
  private readonly service = inject(OrdersService);
  private readonly customersService = inject(CustomersService);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly id = input<string>();
  protected readonly isEdit = computed(() => !!this.id());

  protected readonly loading = signal(false);

  protected readonly fields: Column[] = [
    { key: 'shippingAddress', label: 'shipping Address', placeholder: 'shipping Address' },
    { key: 'orderDate', label: 'Order Date', placeholder: 'Order Date', type: 'date' },
  ];
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      console.log(value);
    });
  }

  protected readonly form = new FormGroup({
    customerId: requiredText(200),
    orderDate: requiredText(200),
    paymentMethod: new FormControl<PaymentMethod>('Cash', {
      nonNullable: true,
    }),
    shippingAddress: new FormControl<string>('', { nonNullable: true }),
    lines: new FormControl<OrderLine[]>([], { nonNullable: true, validators: [minItems(1)] }),
  });

  protected readonly state = entityForm({
    form: this.form,
    id: this.id,
    load: (id) => this.service.getById(id),
    create: (p) => this.service.create(p),
    update: (id, p) => this.service.update(id, p),
    onSaved: (saved, { id, created }) => {
      this.alert.success(created ? 'Order created.' : 'Order updated.');
      void this.router.navigate(['/orders', id ?? saved.id]);
    },
  });
  protected readonly customers = toSignal(this.customersService.list().pipe(map((r) => r.items)), {
    initialValue: [],
  });
  protected readonly products = toSignal(
    this.productsService.list(null).pipe(map((r) => r.items)),
    {
      initialValue: [],
    },
  );

  protected readonly stringify: TuiStringHandler<string> = (id: string) =>
    this.customers().find((item) => item.id === id)?.name ?? '';
  protected readonly paymentMethods = PAYMENT_METHODS;
}
