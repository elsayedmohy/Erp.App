import { Component, inject, signal } from '@angular/core';
import { type Column, DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { TuiDialogService, tuiItemsHandlersProvider } from '@taiga-ui/core';
import { AlertService } from '@core/services/alert.service';
import { listState } from '@shared/data/list-state';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { CategoriesService } from '../../categories/data/categories.service';
import { Product, ProductQuery } from '../data/models';
import { ProductsService } from '../data/products.service';
import { EmptyState } from '@shared/components/empty-state/empty-state';
import { ErrorState } from '@shared/components/error-state/error-state';
import { TableSkeleton } from '@shared/ui/skeleton/table-skeleton';
import { Category } from '../../categories/data/models';
import { FormControl } from '@angular/forms';
import { TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-products-list',
  imports: [...UI, PageHeader, FilterBar, DataTable, EmptyState, ErrorState, TableSkeleton],
  templateUrl: 'products-list.html',
})
export class ProductsList {
  private readonly service = inject(ProductsService);
  private readonly categoryService = inject(CategoriesService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alert = inject(AlertService);

  protected readonly query = signal<ProductQuery>({
    page: 1,
    pageSize: 20,
  });

  protected readonly products = listState(this.query, (q) => this.service.list(q));
  protected readonly categories = toSignal(this.categoryService.list().pipe(map((r) => r.items)), {
    initialValue: [],
  });
  categoryControl = new FormControl<Category | null>(null);
  protected lowStockOnly = false;
  protected readonly columns: Column<Product>[] = [
    { key: 'name', label: 'Name', type: 'strong' },
    { key: 'sku', label: 'SKU', type: 'mono' },
    { key: 'categoryId', label: 'Category' },
    { key: 'unitPrice', label: 'Unit price', type: 'money' },
    { key: 'costPrice', label: 'Cost price', type: 'money' },
    { key: 'stockQuantity', label: 'Stock', type: 'stock' },
    { key: 'reorderLevel', label: 'Reorder level', type: 'number' },
  ];

  constructor() {
    this.categoryControl.valueChanges.subscribe((value) => {
        this.changeCat(value);
    });
  }

  protected onSearch(search: string): void {
    this.query.update((q) => ({ ...q, search: search || undefined, page: 1 }));
  }

  protected changeCat(cat: Category | null): void {
      this.query.update((q) => ({ ...q, categoryId: cat?.id || undefined, page: 1 }));
  }

  protected onPage(e: { page: number; pageSize: number }): void {
    this.query.update((q) => ({ ...q, ...e }));
  }

  protected onDelete(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete product ?',
        size: 's',
        data: { content: 'The product will be deleted.', yes: 'Delete', no: 'Cancel' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('product deleted.');
          this.products.reload();
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }

  protected readonly stringify: TuiStringHandler<Category> = (cat: Category) =>
    this.categories().find((item) => item.id === cat.id)?.name ?? '';
}
