import { DecimalPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { UI } from '../../ui';
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

export interface Column<T = any> {
  key: string;
  label: string;
  type?: ColumnType;
  placeholder?: string;
  value?: (row: T) => unknown;
}

export type RowAction = 'view' | 'edit' | 'cedit' |'delete';

export interface ExtraAction {
  icon: string;
  label: string;
  path: string;
}

@Component({
  selector: 'app-data-table',
  imports: [...UI, DecimalPipe, StatusBadge, EmptyState],
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
  readonly deleteMessage = input('This record will be permanently removed.');

  protected readonly size = signal(10);
  readonly deleteRow = output<string>();
  readonly editRow = output<string>();

  readonly page = input(1);
  readonly pageSize = input(20);
  readonly total = input<number | null>(null);
  readonly pageChange = output<{ page: number; pageSize: number }>();

  protected cell(row: object, col: Column): any {
    return col.value ? col.value(row) : (row as Record<string, unknown>)[col.key];
  }

  protected prop(row: object, key: string): any {
    return (row as Record<string, unknown>)[key];
  }

  protected onPagination(e: { page: number; size: number }): void {
    const sizeChanged = e.size !== this.pageSize();
    this.pageChange.emit({ page: sizeChanged ? 1 : e.page + 1, pageSize: e.size });
  }
}
