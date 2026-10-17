import { Component, inject, signal } from '@angular/core';
import { ROLE_NAMES } from '@mock/mock-data';
import { type Column, DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { EmptyState } from '@shared/components/empty-state/empty-state';
import { ErrorState } from '@shared/components/error-state/error-state';
import { TableSkeleton } from '@shared/ui/skeleton/table-skeleton';
import { TuiDialogService } from '@taiga-ui/core';
import { AlertService } from '@core/services/alert.service';
import { listState } from '@shared/data/list-state';
import { UsersService } from '../data/users.service';
import { UserQuery, UserResponse } from '../data/models';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { filter, switchMap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';

@Component({
  selector: 'app-users-list',
  imports: [...UI, PageHeader, FilterBar, DataTable, EmptyState, ErrorState, TableSkeleton],
  templateUrl: 'users-list.html',
})
export class UsersList {
  private readonly service = inject(UsersService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alert = inject(AlertService);

  protected readonly query = signal<UserQuery>({ page: 1, pageSize: 20 });
  protected readonly users = listState(this.query, (q) => this.service.list(q));
  protected readonly roles = ROLE_NAMES;
  protected role: string | null = null;
  protected readonly columns: Column<UserResponse>[] = [
    { key: 'name', label: 'Name', type: 'person', value: (u) => `${u.firstName} ${u.lastName}` },
    { key: 'role', label: 'Role', value: (u) => u.role.name },
    { key: 'email', label: 'Email' },
  ];

  protected onSearch(search: string): void {
    this.query.update((q) => ({ ...q, search: search || undefined, page: 1 }));
  }

  protected onPage(e: { page: number; pageSize: number }): void {
    this.query.update((q) => ({ ...q, ...e }));
  }

  protected onDelete(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete user ?',
        size: 's',
        data: { content: 'The user will be archived.', yes: 'Delete', no: 'Cancel' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('User deleted.');
          this.users.reload();
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }
}
