import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TuiError } from '@taiga-ui/core';
import { catchError, EMPTY, filter, finalize, switchMap, tap } from 'rxjs';
import { AlertService } from '@core/services/alert.service';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { ErrorState } from '@shared/components/error-state/error-state';
import { PageHeader } from '@shared/components/page-header/page-header';
import { PageLoader } from '@shared/components/page-loader/page-loader';
import { UI } from '@shared/ui';
import { CustomersService } from '../data/customers.service';
import { CustomerRequest } from '../data/model';
import { requiredText } from '@shared/forms/form-utils';
import { entityForm } from '@shared/forms/entity-form';
import { FieldError } from '@shared/forms/field-error';

type Field = keyof CustomerRequest;

function notBlank(c: AbstractControl): ValidationErrors | null {
  return typeof c.value === 'string' && c.value.trim() ? null : { required: true };
}

const MESSAGES: Record<string, (e: any) => string> = {
  required: () => 'This field is required.',
  email: () => 'Enter a valid email address.',
  maxlength: (e) => `Maximum ${e.requiredLength} characters.`,
  pattern: () => 'Invalid format.',
  server: (msg: string) => msg,
};

@Component({
  selector: 'app-customer-form',
  imports: [...UI, PageHeader, PageLoader, ErrorState, FieldError],
  templateUrl: './customer-form.html',
  styles: `
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .field_wide {
      grid-column: 1 / -1;
    }
  `,
})
export class CustomerForm {
  private readonly service = inject(CustomersService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly id = input<string>();
  protected readonly isEdit = computed(() => !!this.id());

  protected readonly loading = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly saving = signal(false);
  protected readonly formError = signal<string | null>(null);

  protected readonly fields: {
    key: keyof CustomerRequest;
    label: string;
    placeholder: string;
    type?: string;
    max: number;
    wide?: boolean;
  }[] = [
    { key: 'name', label: 'Name', placeholder: 'Acme Corp', max: 200 },
    { key: 'email', label: 'Email', placeholder: 'info@acme.com', type: 'email', max: 256 },
    { key: 'phoneNumber', label: 'Phone', placeholder: '01012345678', type: 'tel', max: 20 },
    { key: 'taxId', label: 'Tax ID', placeholder: '123-456-789', max: 50 },
    { key: 'address', label: 'Address', placeholder: '12 Tahrir St', max: 300, wide: true },
    { key: 'city', label: 'City', placeholder: 'Cairo', max: 100 },
    { key: 'country', label: 'Country', placeholder: 'Egypt', max: 100 },
  ];

  protected readonly form = new FormGroup({
    name: requiredText(200),
    email: requiredText(256, Validators.email),
    phoneNumber: requiredText(20, Validators.pattern(/^\+?[0-9\s-]{7,20}$/)),
    taxId: requiredText(50),
    address: requiredText(300),
    city: requiredText(100),
    country: requiredText(100),
  });

  protected readonly state = entityForm({
    form: this.form,
    id: this.id,
    load: (id) => this.service.getById(id),
    create: (p) => this.service.create(p),
    update: (id, p) => this.service.update(id, p),
    onSaved: (saved, { id, created }) => {
      this.alert.success(created ? 'Customer created.' : 'Customer updated.');
      void this.router.navigate(['/customers', id ?? saved.id]);
    },
  });
}
