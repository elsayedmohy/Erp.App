import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MOCK_PERMISSIONS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-role-form',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit role' : 'New role'"
        [breadcrumbs]="[
          { label: 'Administration' },
          { label: 'Roles', link: '/users/roles' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <tui-textfield>
          <label tuiLabel>Role name</label>
          <input tuiInput formControlName="name" placeholder="InventoryManager" />
        </tui-textfield>
        <tui-textfield multi tuiChevron>
          <label tuiLabel>Permissions</label>
          <input tuiInputChip tuiSelectLike formControlName="permissions" />
          <tui-input-chip *tuiItem />
          <tui-data-list-wrapper *tuiDropdown tuiMultiSelectGroup [items]="permissions" />
        </tui-textfield>
        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/users/roles">Cancel</a>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update' : 'Save' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class RoleForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly permissions = MOCK_PERMISSIONS;
  protected readonly form = new FormGroup({
    name: new FormControl(''),
    permissions: new FormControl<string[]>([]),
  });
}
