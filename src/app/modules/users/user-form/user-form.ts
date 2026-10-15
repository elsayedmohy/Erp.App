import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MOCK_ROLE_NAMES } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-user-form',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit user' : 'New user'"
        [breadcrumbs]="[
          { label: 'Administration' },
          { label: 'Users', link: '/users' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <div class="grid-2">
          <tui-textfield>
            <label tuiLabel>First name</label>
            <input tuiInput formControlName="firstName" placeholder="John" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Last name</label>
            <input tuiInput formControlName="lastName" placeholder="Doe" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Email</label>
            <input
              tuiInput
              formControlName="email"
              type="email"
              placeholder="john.doe@company.com"
            />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>{{ mode() === 'edit' ? 'New password (optional)' : 'Password' }}</label>
            <input tuiInput formControlName="password" type="password" />
            <tui-icon tuiPassword />
          </tui-textfield>
          <tui-textfield tuiChevron>
            <label tuiLabel>Role</label>
            <input tuiSelect formControlName="role" />
            <tui-data-list-wrapper *tuiDropdown [items]="roles" />
          </tui-textfield>
        </div>
        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/users">Cancel</a>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update' : 'Save' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class UserForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly roles = MOCK_ROLE_NAMES;
  protected readonly form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl<string | null>(null),
  });
}
