import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Product } from '../../products/data/models';


@Component({
  selector: 'app-product-picker-dialog',
  standalone: true,
  imports: [DecimalPipe, TuiButton],
  templateUrl: './product-picker-dialog.html',
  styleUrl: './product-picker-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPickerDialogComponent {
  protected readonly context = injectContext<TuiDialogContext<Product[], Product[]>>();

  protected readonly products = computed(() => this.context.data);

  protected readonly search = signal('');
  protected readonly selectedIds = signal(new Set<string>());

  protected readonly filteredProducts = computed(() => {
    const query = this.search().trim().toLowerCase();

    return this.products().filter((product) =>
      [product.name, product.sku, product.categoryId].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  });

  protected readonly selectedProducts = computed(() => {
    const ids = this.selectedIds();

    return this.products().filter((product) => ids.has(product.id));
  });

  protected readonly selectedCount = computed(() => this.selectedIds().size);

  protected readonly total = computed(() =>
    this.selectedProducts().reduce((sum, product) => sum + product.unitPrice, 0),
  );

  protected isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  protected toggleProduct(product: Product): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);

      if (next.has(product.id)) {
        next.delete(product.id);
      } else {
        next.add(product.id);
      }

      return next;
    });
  }

  protected toggleAll(checked: boolean): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);

      for (const product of this.filteredProducts()) {
        if (checked) {
          next.add(product.id);
        } else {
          next.delete(product.id);
        }
      }

      return next;
    });
  }

  protected readonly allFilteredSelected = computed(() => {
    const filtered = this.filteredProducts();

    return filtered.length > 0 && filtered.every((product) => this.selectedIds().has(product.id));
  });

  protected confirm(): void {
    this.context.completeWith(this.selectedProducts());
  }

  protected cancel(): void {
    this.context.$implicit.complete();
  }
}
