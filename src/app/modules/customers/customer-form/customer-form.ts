import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-customer-form',
  imports: [...UI, PageHeader],
  templateUrl: './customer-form.html',
})
export class CustomerForm {
  /** Set from route data: 'edit' on /customers/:id/edit */
  readonly mode = input<'create' | 'edit'>('create');

  protected readonly form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    taxId: new FormControl(''),
  });
}
