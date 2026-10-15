import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiFileLike } from '@taiga-ui/kit';
import { MOCK_CATEGORIES } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-product-form',
  imports: [...UI, PageHeader],
  templateUrl: './product-form.html',
})
export class ProductForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly categories = MOCK_CATEGORIES.map((c) => c.name);
  protected readonly form = new FormGroup({
    name: new FormControl(''),
    sku: new FormControl(''),
    category: new FormControl<string | null>(null),
    unitPrice: new FormControl<number | null>(null),
    costPrice: new FormControl<number | null>(null),
    stockQuantity: new FormControl<number | null>(null),
    reorderLevel: new FormControl<number | null>(null),
    image: new FormControl<TuiFileLike | null>(null),
  });
}
