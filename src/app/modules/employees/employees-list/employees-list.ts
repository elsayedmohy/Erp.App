import { Component } from '@angular/core';
import { MOCK_DEPARTMENTS, MOCK_EMPLOYEES } from '@mock/mock-data';
import { DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { Column } from '../../models';

@Component({
  selector: 'app-employees-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Employees"
        subtitle="Staff directory, departments and positions"
        [breadcrumbs]="[{ label: 'HR' }, { label: 'Employees' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New employee</a>
      </app-page-header>
      <app-filter-bar placeholder="Search by name or email">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All departments" [(ngModel)]="department" />
          <tui-data-list-wrapper *tuiDropdown [items]="departments" />
        </tui-textfield>
      </app-filter-bar>
      <app-data-table
        [columns]="columns"
        [rows]="employees"
        baseRoute="/employees"
        deleteMessage="The employee will be archived (soft delete)."
      />
    </div>
  `,
})
export class EmployeesList {
  protected readonly employees = MOCK_EMPLOYEES;
  protected readonly departments = MOCK_DEPARTMENTS.map((d) => d.name);
  protected department: string | null = null;
  protected readonly columns: Column[] = [
    { key: 'firstName', label: 'First name', type: 'person' },
    { key: 'lastName', label: 'Last name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'position', label: 'Position' },
    { key: 'hireDate', label: 'Hire date' },
    { key: 'salary', label: 'Salary', type: 'money' },
  ];
}
