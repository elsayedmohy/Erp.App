import { Component } from '@angular/core';
import { MOCK_ROLE_NAMES, MOCK_USERS } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-users-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Users"
        subtitle="People who can sign in to the ERP"
        [breadcrumbs]="[{ label: 'Administration' }, { label: 'Users' }]"
      >
        <a tuiButton appearance="secondary" size="m" iconStart="@tui.shield" routerLink="roles"
          >Manage roles</a
        >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New user</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by name or email">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All roles" [(ngModel)]="role" />
          <tui-data-list-wrapper *tuiDropdown [items]="roles" />
        </tui-textfield>
      </app-filter-bar>
      <app-data-table
        [columns]="columns"
        [rows]="users"
        baseRoute="/users"
        [actions]="['edit', 'delete']"
      />
    </div>
  `,
})
export class UsersList {
  protected readonly users = MOCK_USERS;
  protected readonly roles = MOCK_ROLE_NAMES;
  protected role: string | null = null;
  protected readonly columns: Column[] = [
    { key: 'firstName', label: 'First name', type: 'strong' },
    { key: 'lastName', label: 'Last name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];
}
