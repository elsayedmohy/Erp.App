import { Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { requiredNumber, requiredText } from '@shared/forms/form-utils';
import { entityForm } from '@shared/forms/entity-form';
import { ProductsService } from '../data/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../categories/data/categories.service';
import { map } from 'rxjs';
import { ErrorState } from '@shared/components/error-state/error-state';
import { PageLoader } from '@shared/components/page-loader/page-loader';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { Column } from '../../models';

@Component({
  selector: 'app-product-form',
  imports: [...UI, PageHeader, ErrorState, PageLoader],
  templateUrl: './product-form.html',
})
export class ProductForm {
  private readonly service = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly id = input<string>();
  protected readonly isEdit = computed(() => !!this.id());

  protected readonly loading = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal<string | null>(null);

  protected readonly fields: Column[] = [
    { key: 'name', label: 'Name', placeholder: 'Product Name' },
    { key: 'sku', label: 'sku', placeholder: 'sku-0000000' },
    { key: 'costPrice', label: 'Cost Price', placeholder: '100', type: 'number' },
    { key: 'unitPrice', label: 'Unit Price', placeholder: '100', type: 'number' },
  ];

  protected readonly form = new FormGroup({
    name: requiredText(200),
    categoryId: requiredText(200),
    sku: requiredText(200),
    costPrice: requiredNumber(),
    unitPrice: requiredNumber(),
    stockQuantity: new FormControl<number | null>(null),
    reorderLevel: new FormControl<number | null>(null),
  });

  protected readonly state = entityForm({
    form: this.form,
    id: this.id,
    load: (id) => this.service.getById(id),
    create: (p) => this.service.create(p),
    update: (id, p) => this.service.update(id, p),
    onSaved: (saved, { id, created }) => {
      this.alert.success(created ? 'Product created.' : 'Product updated.');
      void this.router.navigate(['/products', id ?? saved.id]);
    },
  });
  protected readonly categories = toSignal(
    this.categoriesService.list().pipe(map((r) => r.items)),
    {
      initialValue: [],
    },
  );
  protected readonly stringify: TuiStringHandler<string> = (id: string) =>
    this.categories().find((item) => item.id === id)?.name ?? '';
}
