import { Component, inject, signal } from '@angular/core';
import { type Column, DataTable } from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { listState } from '@shared/data/list-state';
import { UserQuery } from '../users/data/models';
import { CategoriesService } from './data/categories.service';
import { EmptyState } from '@shared/components/empty-state/empty-state';
import { ErrorState } from '@shared/components/error-state/error-state';
import { TableSkeleton } from '@shared/ui/skeleton/table-skeleton';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { filter, switchMap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { TuiDialogService } from '@taiga-ui/core';
import { AlertService } from '@core/services/alert.service';
import { FormControl, FormGroup } from '@angular/forms';
import { minItems, requiredText } from '@shared/forms/form-utils';
import { entityForm } from '@shared/forms/entity-form';
import { RoleResponse } from '../roles/data/models';
import { Category, CreateCategoryRequest } from './data/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [...UI, PageHeader, DataTable, EmptyState, ErrorState, TableSkeleton],
  template: `
    <div class="page">
      <app-page-header
        heading="Categories"
        subtitle="Product categories used for filtering and reports"
        [breadcrumbs]="[{ label: 'Inventory' }, { label: 'Categories', link: '/categories' }]"
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
      @let c = categories;
      @if (c.initialLoading()) {
        <app-table-skeleton [columns]="columns" [rows]="5" />
      } @else if (c.error() && !c.data()) {
        <app-error-state [message]="c.error()!" (retry)="c.reload()" />
      } @else if (c.data(); as page) {
        @if (page.total === 0) {
          <app-empty-state
            icon="@tui.file-text"
            heading="No invoices yet"
            message="orders for this customer will appear here."
          />
        } @else {
          <app-data-table
            [class.refreshing]="c.loading()"
            [columns]="columns"
            [rows]="page.items"
            [page]="page.page"
            [pageSize]="page.pageSize"
            [total]="page.total"
            [actions]="['cedit','delete']"
            (editRow)="edit($event)"
            (deleteRow)="delete($event)"
          />
        }
      }
      <ng-template
        let-observer
        [tuiDialogOptions]="{ size: 's', label: 'New category' }"
        [(tuiDialog)]="dialogOpen"
      >
        <form tuiForm="m" [formGroup]="form" (ngSubmit)="state.submit()">
          <tui-textfield>
            <label tuiLabel>Name</label>
            <input formControlName="name" tuiInput placeholder="Accessories" />
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
            <button tuiButton size="m" type="submit" [disabled]="state.saving()">
              {{ state.saving() ? 'Saving…' : state.isEdit() ? 'Update' : 'Save' }}
            </button>

            <!--            <button tuiButton size="m" type="button" (click)="observer.complete()">Save</button>-->
          </footer>
        </form>
      </ng-template>
    </div>
  `,
})
export class Categories {
  protected readonly service = inject(CategoriesService);
  protected readonly dialogs = inject(TuiDialogService);
  protected readonly alert = inject(AlertService);
  protected readonly router = inject(Router);
  protected readonly query = signal<UserQuery>({ page: 1, pageSize: 20 });

  protected readonly categories = listState(this.query, (q) => this.service.list(q));
  protected id = signal<string>('');
  protected dialogOpen = signal(false);
  protected readonly columns: Column[] = [{ key: 'name', label: 'Name', type: 'strong' }];

  protected edit(id: string): void {
    this.dialogOpen.set(true);
    this.id.set(id);
  }
  protected delete(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete Category ?',
        size: 's',
        data: { content: 'The category will be deleted.', yes: 'Delete', no: 'Cancel' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('Category deleted.');
          this.categories.reload();
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }

  protected readonly form = new FormGroup({
    name: requiredText(50),
  });

  protected readonly state = entityForm({
    form: this.form,
    id: this.id,
    load: (id) => this.service.getById(id),
    toFormValue: (r: CreateCategoryRequest) => ({ name: r.name }),
    create: (p) => this.service.create(p),
    update: (id, p) => this.service.update(id, p),
    onSaved: (_, { created }) => {
      this.alert.success(created ? 'Category created.' : 'Category updated.');
      this.categories.reload();
      this.dialogOpen.set(false);
    },
  });
}
