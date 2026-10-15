import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiDay } from '@taiga-ui/cdk';
import {
  MOCK_EMPLOYEES,
  MOCK_PROJECTS,
  MOCK_TASK_PRIORITIES,
  MOCK_TASK_STATUSES,
} from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-task-form',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit task' : 'New task'"
        [breadcrumbs]="[
          { label: 'Work' },
          { label: 'Tasks', link: '/tasks' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <div class="grid-2">
          <tui-textfield tuiChevron>
            <label tuiLabel>Project</label>
            <input tuiSelect formControlName="project" />
            <tui-data-list-wrapper *tuiDropdown [items]="projects" />
          </tui-textfield>
          <tui-textfield tuiChevron>
            <label tuiLabel>Assignee</label>
            <input tuiComboBox formControlName="assignee" />
            <tui-data-list-wrapper *tuiDropdown [items]="assignees | tuiFilterByInput" />
          </tui-textfield>
        </div>
        <tui-textfield>
          <label tuiLabel>Title</label>
          <input tuiInput formControlName="title" placeholder="Add barcode scanning" />
        </tui-textfield>
        <tui-textfield>
          <label tuiLabel>Description</label>
          <textarea tuiTextarea formControlName="description"></textarea>
        </tui-textfield>
        <div class="grid-3">
          <label tuiLabel>
            Priority
            <tui-segmented size="m">
              @for (p of priorities; track p) {
                <label>
                  <input type="radio" formControlName="priority" [value]="p" />
                  {{ p }}
                </label>
              }
            </tui-segmented>
          </label>
          <tui-textfield tuiChevron>
            <label tuiLabel>Status</label>
            <input tuiSelect formControlName="status" />
            <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Due date</label>
            <input tuiInputDate formControlName="dueDate" />
            <tui-calendar *tuiDropdown />
          </tui-textfield>
        </div>
        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/tasks">Cancel</a>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update' : 'Create task' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class TaskForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly projects = MOCK_PROJECTS.map((p) => p.name);
  protected readonly assignees = MOCK_EMPLOYEES.map((e) => `${e.firstName} ${e.lastName}`);
  protected readonly priorities = MOCK_TASK_PRIORITIES;
  protected readonly statuses = MOCK_TASK_STATUSES;
  protected readonly form = new FormGroup({
    project: new FormControl<string | null>(null),
    assignee: new FormControl<string | null>(null),
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl('Medium'),
    status: new FormControl<string | null>('ToDo'),
    dueDate: new FormControl<TuiDay | null>(null),
  });
}
