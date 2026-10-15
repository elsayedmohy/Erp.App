import { Component, signal } from '@angular/core';
import { MOCK_CATEGORIES } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-categories',
  imports: [...UI, PageHeader, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Categories"
        subtitle="Product categories used for filtering and reports"
        [breadcrumbs]="[
          { label: 'Inventory' },
          { label: 'Products', link: '/products' },
          { label: 'Categories' },
        ]"
      >
        <button
          tuiButton
          size="m"
          iconStart="@tui.plus"
          type="button"
          (click)="dialogOpen.set(true)"
        >
          New category
        </button>
      </app-page-header>
      <app-data-table [columns]="columns" [rows]="categories" [actions]="['delete']" />

      <ng-template
        let-observer
        [tuiDialogOptions]="{ size: 's', label: 'New category' }"
        [(tuiDialog)]="dialogOpen"
      >
        <form tuiForm="m">
          <tui-textfield>
            <label tuiLabel>Name</label>
            <input tuiInput placeholder="Accessories" />
          </tui-textfield>
          <footer>
            <button
              tuiButton
              appearance="secondary"
              size="m"
              type="button"
              (click)="observer.complete()"
            >
              Cancel
            </button>
            <button tuiButton size="m" type="button" (click)="observer.complete()">Save</button>
          </footer>
        </form>
      </ng-template>
    </div>
  `,
})
export class Categories {
  protected readonly categories = MOCK_CATEGORIES;
  protected readonly dialogOpen = signal(false);
  protected readonly columns: Column[] = [
    { key: 'name', label: 'Name', type: 'strong' },
    { key: 'productsCount', label: 'Products', type: 'number' },
  ];
}
