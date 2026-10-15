import { DecimalPipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { UI } from '../../ui';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { EmptyState } from '../empty-state/empty-state';
import { StatusBadge } from '../status-badge/status-badge';

export type ColumnType =
  | 'text'
  | 'strong'
  | 'money'
  | 'number'
  | 'badge'
  | 'person'
  | 'tags'
  | 'bool'
  | 'mono'
  | 'stock'
  | 'progress';

export interface Column {
  key: string;
  label: string;
  type?: ColumnType;
}

export type RowAction = 'view' | 'edit' | 'delete';

export interface ExtraAction {
  icon: string;
  label: string;
  /** Appended to `${baseRoute}/${row.id}` — e.g. 'stock' → /products/1/stock */
  path: string;
}

/**
 * Generic presentational table: columns, row actions and a pagination footer.
 * Row actions are router links; delete only opens the confirm dialog.
 */
@Component({
  selector: 'app-data-table',
  imports: [...UI, DecimalPipe, StatusBadge, ConfirmDialog, EmptyState],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable {
  readonly columns = input.required<Column[]>();
  readonly rows = input.required<readonly object[]>();
  readonly baseRoute = input('');
  readonly actions = input<RowAction[]>(['view', 'edit', 'delete']);
  readonly extraActions = input<ExtraAction[]>([]);
  readonly selectable = input(false);
  readonly total = input<number | null>(null);
  readonly deleteMessage = input('This record will be permanently removed.');

  protected readonly page = signal(0);
  protected readonly size = signal(10);
  protected readonly confirmOpen = signal(false);

  protected cell(row: object, key: string): any {
    return (row as Record<string, unknown>)[key];
  }
}
