import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiDayRange } from '@taiga-ui/cdk';
import { MOCK_PROJECT_STATUSES, MOCK_USERS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-project-form',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit project' : 'New project'"
        [breadcrumbs]="[
          { label: 'Work' },
          { label: 'Projects', link: '/projects' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <tui-textfield>
          <label tuiLabel>Name</label>
          <input tuiInput formControlName="name" placeholder="Warehouse Upgrade" />
        </tui-textfield>
        <tui-textfield>
          <label tuiLabel>Description</label>
          <textarea
            tuiTextarea
            formControlName="description"
            placeholder="Modernize inventory receiving and tracking."
          ></textarea>
        </tui-textfield>
        <div class="grid-2">
          <tui-textfield tuiChevron>
            <label tuiLabel>Owner</label>
            <input tuiComboBox formControlName="owner" />
            <tui-data-list-wrapper *tuiDropdown [items]="users | tuiFilterByInput" />
          </tui-textfield>
          <tui-textfield tuiChevron>
            <label tuiLabel>Status</label>
            <input tuiSelect formControlName="status" />
            <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
          </tui-textfield>
        </div>
        <tui-textfield>
          <label tuiLabel>Start – due date</label>
          <input tuiInputDateRange formControlName="dates" />
          <tui-calendar-range *tuiDropdown />
        </tui-textfield>
        <tui-textfield multi tuiChevron>
          <label tuiLabel>Members</label>
          <input tuiInputChip tuiSelectLike formControlName="members" />
          <tui-input-chip *tuiItem />
          <tui-data-list-wrapper *tuiDropdown tuiMultiSelectGroup [items]="users" />
        </tui-textfield>
        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/projects">Cancel</a>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update' : 'Create project' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class ProjectForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly users = MOCK_USERS.map((u) => `${u.firstName} ${u.lastName}`);
  protected readonly statuses = MOCK_PROJECT_STATUSES;
  protected readonly form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    owner: new FormControl<string | null>(null),
    status: new FormControl<string | null>('Planned'),
    dates: new FormControl<TuiDayRange | null>(null),
    members: new FormControl<string[]>([]),
  });
}
