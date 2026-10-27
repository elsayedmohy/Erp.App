import { DecimalPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { UI } from '../../ui';
import { OrderLine, OrderLineRequest } from '../../../modules/orders/data/models';
import { Product } from '../../../modules/products/data/models';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import { ProductPickerDialogComponent } from '../../../modules/orders/product-dialog/product-picker-dialog';

@Component({
  selector: 'app-line-items-editor',
  imports: [...UI, DecimalPipe],
  templateUrl: './line-items-editor.html',
  styleUrl: './line-items-editor.scss',
})
export class LineItemsEditor {
  private readonly dialogs = inject(TuiDialogService);
  readonly view = input(false);
  readonly items = input<OrderLine[]>([]);
   newLines = signal<OrderLineRequest[]>([]);
  readonly products = input<Product[]>([]);
  readonly itemMode = input<'product' | 'description'>('product');
  readonly priceLabel = input('Unit price');
  readonly showDiscount = input(false);
  readonly showTax = input(false);
  readonly taxRates = input<string[]>([]);
  readonly total = input(0);

  protected selectedProduct = signal<Product[] | null>(null);

  protected chooseProduct(): void {
    this.dialogs
      .open<Product[]>(new PolymorpheusComponent(ProductPickerDialogComponent), {
        label: 'Choose product',
        size: 'l',
        data: this.products(),
      })
      .subscribe((products) => {
        this.selectedProduct.update((p) => (p ? [...p , ...products] : [...products]));
        const lines = products.map((p) => ({
          productId: p.id,
          quantity: p.stockQuantity,
          discount: 0,
        }));
        this.newLines.update((l) => [...l, ...lines]);
      });
  }


}
