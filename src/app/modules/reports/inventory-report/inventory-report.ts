import { Component } from '@angular/core';
import { TuiAxes, TuiBarChart } from '@taiga-ui/addon-charts';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-inventory-report',
  imports: [...UI, StatCard, DataTable, TuiAxes, TuiBarChart],
  template: `
    <div class="page">
      <div class="filters">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <label tuiLabel>Category</label>
          <input tuiSelect [(ngModel)]="category" />
          <tui-data-list-wrapper *tuiDropdown [items]="categories" />
        </tui-textfield>
        <label tuiLabel>
          <input tuiSwitch type="checkbox" size="s" [(ngModel)]="lowStock" />
          Low stock only
        </label>
      </div>

      <div class="grid-3">
        <app-stat-card label="Products" value="50" icon="@tui.box" />
        <app-stat-card label="Units in stock" value="1,184" icon="@tui.package" />
        <app-stat-card
          label="Below reorder level"
          value="6"
          icon="@tui.triangle-alert"
          trend="+2"
          [positive]="false"
        />
      </div>

      <section tuiCardLarge appearance="outline-grayscale">
        <header tuiHeader="h5"><h3 tuiTitle>Stock vs reorder level</h3></header>
        <tui-axes
          class="chart"
          [axisXLabels]="productNames"
          [axisYLabels]="['0', '25', '50']"
          [horizontalLines]="2"
        >
          <tui-bar-chart [max]="50" [value]="stockValues" />
        </tui-axes>
      </section>

      <app-data-table
        [columns]="columns"
        [rows]="products"
        baseRoute="/products"
        [actions]="[]"
        [extraActions]="[{ icon: '@tui.package-plus', label: 'Adjust stock', path: 'stock' }]"
      />
    </div>
  `,
  styles: `
    .filters {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .filters tui-textfield {
      min-inline-size: 16rem;
    }
    .chart {
      block-size: 16rem;
    }
  `,
})
export class InventoryReport {
  protected readonly products = MOCK_PRODUCTS;
  protected readonly categories = MOCK_CATEGORIES.map((c) => c.name);
  protected readonly productNames = MOCK_PRODUCTS.map((p) => p.sku);
  protected readonly stockValues = [
    MOCK_PRODUCTS.map((p) => p.stockQuantity),
    MOCK_PRODUCTS.map((p) => p.reorderLevel),
  ];
  protected category: string | null = null;
  protected lowStock = false;
  protected readonly columns: Column[] = [
    { key: 'name', label: 'Product', type: 'strong' },
    { key: 'sku', label: 'SKU', type: 'mono' },
    { key: 'category', label: 'Category' },
    { key: 'stockQuantity', label: 'In stock', type: 'stock' },
    { key: 'reorderLevel', label: 'Reorder level', type: 'number' },
  ];
}
