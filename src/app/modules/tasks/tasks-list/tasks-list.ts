import { Component } from '@angular/core';
import type { TuiDay } from '@taiga-ui/cdk';
import {
  MOCK_EMPLOYEES,
  MOCK_PROJECTS,
  MOCK_TASK_PRIORITIES,
  MOCK_TASK_STATUSES,
  MOCK_TASKS,
} from '@mock/mock-data';
import { DataTable } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { Column } from '../../models';

@Component({
  selector: 'app-tasks-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Tasks"
        subtitle="Work items across all projects"
        [breadcrumbs]="[{ label: 'Work' }, { label: 'Tasks' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New task</a>
      </app-page-header>

      <tui-segmented size="m" class="quick">
        <button type="button">All tasks</button>
        <button type="button">Assigned to me</button>
        <button type="button">Due this week</button>
      </tui-segmented>

      <app-filter-bar placeholder="Search tasks">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="Project" [(ngModel)]="project" />
          <tui-data-list-wrapper *tuiDropdown [items]="projects" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="Assignee" [(ngModel)]="assignee" />
          <tui-data-list-wrapper *tuiDropdown [items]="assignees" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="Status" [(ngModel)]="status" />
          <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="Priority" [(ngModel)]="priority" />
          <tui-data-list-wrapper *tuiDropdown [items]="priorities" />
        </tui-textfield>
        <tui-textfield tuiTextfieldSize="m">
          <input tuiInputDate placeholder="Due before" [(ngModel)]="dueBefore" />
          <tui-calendar *tuiDropdown />
        </tui-textfield>
      </app-filter-bar>

      <app-data-table [columns]="columns" [rows]="tasks" baseRoute="/tasks" [total]="57" />
    </div>
  `,
  styles: `
    .quick {
      align-self: flex-start;
    }
  `,
})
export class TasksList {
  protected readonly tasks = MOCK_TASKS;
  protected readonly projects = MOCK_PROJECTS.map((p) => p.name);
  protected readonly assignees = MOCK_EMPLOYEES.map((e) => `${e.firstName} ${e.lastName}`);
  protected readonly statuses = MOCK_TASK_STATUSES;
  protected readonly priorities = MOCK_TASK_PRIORITIES;
  protected project: string | null = null;
  protected assignee: string | null = null;
  protected status: string | null = null;
  protected priority: string | null = null;
  protected dueBefore: TuiDay | null = null;
  protected readonly columns: Column[] = [
    { key: 'title', label: 'Title', type: 'strong' },
    { key: 'project', label: 'Project' },
    { key: 'assignee', label: 'Assignee', type: 'person' },
    { key: 'priority', label: 'Priority', type: 'badge' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'dueDate', label: 'Due date' },
  ];
}
