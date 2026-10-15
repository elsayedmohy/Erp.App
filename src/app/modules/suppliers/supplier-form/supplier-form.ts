import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MOCK_PAYMENT_TERMS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-supplier-form',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        [heading]="mode() === 'edit' ? 'Edit supplier' : 'New supplier'"
        [breadcrumbs]="[
          { label: 'Purchasing' },
          { label: 'Suppliers', link: '/suppliers' },
          { label: mode() === 'edit' ? 'Edit' : 'New' },
        ]"
      />
      <form tuiCardLarge appearance="outline-grayscale" tuiForm="m" [formGroup]="form">
        <div class="grid-2">
          <tui-textfield>
            <label tuiLabel>Company name</label>
            <input tuiInput formControlName="companyName" placeholder="TechParts Inc" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Contact name</label>
            <input tuiInput formControlName="contactName" placeholder="Mark Lee" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Email</label>
            <input tuiInput formControlName="email" type="email" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>Phone</label>
            <input tuiInput formControlName="phone" type="tel" />
          </tui-textfield>
        </div>
        <tui-textfield>
          <label tuiLabel>Address</label>
          <input tuiInput formControlName="address" />
        </tui-textfield>
        <tui-textfield tuiChevron>
          <label tuiLabel>Payment terms</label>
          <input tuiSelect formControlName="paymentTerms" />
          <tui-data-list-wrapper *tuiDropdown [items]="paymentTerms" />
        </tui-textfield>
        <footer>
          <a tuiButton appearance="secondary" size="m" routerLink="/suppliers">Cancel</a>
          <button tuiButton size="m" type="button">
            {{ mode() === 'edit' ? 'Update' : 'Save' }}
          </button>
        </footer>
      </form>
    </div>
  `,
})
export class SupplierForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly paymentTerms = MOCK_PAYMENT_TERMS;
  protected readonly form = new FormGroup({
    companyName: new FormControl(''),
    contactName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    paymentTerms: new FormControl<string | null>(null),
  });
}
