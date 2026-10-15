import { Component } from '@angular/core';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-products-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Products"
        subtitle="Inventory items, pricing and stock levels"
        [breadcrumbs]="[{ label: 'Inventory' }, { label: 'Products' }]"
      >
        <a tuiButton appearance="secondary" size="m" iconStart="@tui.tags" routerLink="categories"
          >Categories</a
        >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New product</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by name or SKU">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All categories" [(ngModel)]="category" />
          <tui-data-list-wrapper *tuiDropdown [items]="categories" />
        </tui-textfield>
        <label tuiLabel>
          <input tuiSwitch type="checkbox" size="s" [(ngModel)]="lowStockOnly" />
          Low stock only
        </label>
      </app-filter-bar>
      <app-data-table
        [columns]="columns"
        [rows]="products"
        baseRoute="/products"
        [actions]="['edit', 'delete']"
        [extraActions]="[{ icon: '@tui.package-plus', label: 'Adjust stock', path: 'stock' }]"
        deleteMessage="Products tied to existing orders cannot be deleted — archive them instead."
      />
    </div>
  `,
})
export class ProductsList {
  protected readonly products = MOCK_PRODUCTS;
  protected readonly categories = MOCK_CATEGORIES.map((c) => c.name);
  protected category: string | null = null;
  protected lowStockOnly = false;
  protected readonly columns: Column[] = [
    { key: 'name', label: 'Name', type: 'strong' },
    { key: 'sku', label: 'SKU', type: 'mono' },
    { key: 'category', label: 'Category' },
    { key: 'unitPrice', label: 'Unit price', type: 'money' },
    { key: 'costPrice', label: 'Cost price', type: 'money' },
    { key: 'stockQuantity', label: 'Stock', type: 'stock' },
    { key: 'reorderLevel', label: 'Reorder level', type: 'number' },
  ];
}
