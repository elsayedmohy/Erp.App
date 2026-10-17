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
  imports: [...UI, PageHeader, PageLoader, ErrorState, TuiError],
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
    key: Field;
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
    name: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.maxLength(200)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.email, Validators.maxLength(256)],
    }),
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.maxLength(20), Validators.pattern(/^\+?[0-9\s-]{7,20}$/)],
    }),
    taxId: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.maxLength(50)],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.maxLength(300)],
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.maxLength(100)],
    }),
    country: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.maxLength(100)],
    }),
  });

  constructor() {
    toObservable(this.id)
      .pipe(
        filter((id): id is string => !!id),
        tap(() => {
          this.loading.set(true);
          this.loadError.set(null);
        }),
        switchMap((id) =>
          this.service.getById(id).pipe(
            catchError((err) => {
              this.loadError.set(toApiErrorResponse(err).message);
              this.loading.set(false);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((customer) => {
        this.form.reset(customer);
        this.loading.set(false);
      });
  }

  protected errorFor(field: Field): string | null {
    const control = this.form.controls[field];
    if (!control.touched || !control.errors) return null;
    const [key, value] = Object.entries(control.errors)[0];
    return MESSAGES[key]?.(value) ?? 'Invalid value.';
  }

  protected submit(): void {
    if (this.saving()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formError.set(null);
    this.saving.set(true);

    const payload = trimAll(this.form.getRawValue());
    const id = this.id();
    const request$ = id ? this.service.update(id, payload) : this.service.create(payload);

    request$.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (saved) => {
        this.alert.success(id ? 'Customer updated.' : 'Customer created.');
        this.form.markAsPristine();
        void this.router.navigate(['/customers', id ?? saved.id]);
      },
      error: (err) => this.applyServerErrors(err),
    });
  }

  private applyServerErrors(err: unknown): void {
    const { message, errors } = toApiErrorResponse(err);
    let mapped = false;

    for (const e of errors ?? []) {
      const control = e.field ? this.controlFor(e.field) : null;
      if (!control) continue;
      control.setErrors({ ...control.errors, server: e.message });
      control.markAsTouched();
      mapped = true;
    }

    if (!mapped) this.formError.set(message);
  }

  private controlFor(field: string): AbstractControl | null {
    const name = field.replace(/^\$\./, '').toLowerCase();
    const key = Object.keys(this.form.controls).find((k) => k.toLowerCase() === name);
    return key ? this.form.get(key) : null;
  }
}

function trimAll<T extends Record<string, string>>(value: T): T {
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, v.trim()])) as T;
}
