import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MOCK_AUTOMATION_ACTIONS,
  MOCK_AUTOMATION_TRIGGERS,
  MOCK_ROLE_NAMES,
  MOCK_USERS,
} from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-rule-form',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit rule' : 'New rule'"
        [breadcrumbs]="[
          { label: 'Administration' },
          { label: 'Automation', link: '/automation' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <tui-textfield>
          <label tuiLabel>Rule name</label>
          <input tuiInput formControlName="name" placeholder="Alert when stock is low" />
        </tui-textfield>

        <header tuiHeader="h5">
          <h3 tuiTitle>
            When…
            <span tuiSubtitle>The business event that starts this rule</span>
          </h3>
        </header>
        <tui-textfield tuiChevron>
          <label tuiLabel>Trigger</label>
          <input tuiSelect formControlName="trigger" />
          <tui-data-list-wrapper *tuiDropdown [items]="triggers" />
        </tui-textfield>

        <header tuiHeader="h5">
          <h3 tuiTitle>
            Then…
            <span tuiSubtitle>What should happen</span>
          </h3>
        </header>
        <div class="grid-2">
          <tui-textfield tuiChevron>
            <label tuiLabel>Action</label>
            <input tuiSelect formControlName="action" />
            <tui-data-list-wrapper *tuiDropdown [items]="actions" />
          </tui-textfield>
          @if (form.controls.action.value === 'NotifyUser') {
            <tui-textfield tuiChevron>
              <label tuiLabel>User</label>
              <input tuiComboBox formControlName="target" />
              <tui-data-list-wrapper *tuiDropdown [items]="users | tuiFilterByInput" />
            </tui-textfield>
          } @else {
            <tui-textfield tuiChevron>
              <label tuiLabel>Role</label>
              <input tuiSelect formControlName="target" />
              <tui-data-list-wrapper *tuiDropdown [items]="roles" />
            </tui-textfield>
          }
        </div>

        <label tuiLabel>
          <input tuiSwitch type="checkbox" formControlName="enabled" />
          Enabled
        </label>

        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/automation/rules">Cancel</a>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update rule' : 'Create rule' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class RuleForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly triggers = MOCK_AUTOMATION_TRIGGERS;
  protected readonly actions = MOCK_AUTOMATION_ACTIONS;
  protected readonly roles = MOCK_ROLE_NAMES;
  protected readonly users = MOCK_USERS.map((u) => `${u.firstName} ${u.lastName}`);
  protected readonly form = new FormGroup({
    name: new FormControl(''),
    trigger: new FormControl<string | null>(null),
    action: new FormControl<string | null>('NotifyRole'),
    target: new FormControl<string | null>(null),
    enabled: new FormControl(true),
  });
}
