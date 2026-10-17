import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { toApiErrorResponse } from '@core/utils/api-error.util';


export function notBlank(c: AbstractControl): ValidationErrors | null {
  return typeof c.value === 'string' && c.value.trim() ? null : { required: true };
}

export function requiredText(maxLength: number, ...validators: ValidatorFn[]): FormControl<string> {
  return new FormControl('', {
    nonNullable: true,
    validators: [notBlank, Validators.maxLength(maxLength), ...validators],
  });
}


const MESSAGES: Record<string, (e: any) => string> = {
  required: () => 'This field is required.',
  email: () => 'Enter a valid email address.',
  minlength: (e) => `Minimum ${e.requiredLength} characters.`,
  maxlength: (e) => `Maximum ${e.requiredLength} characters.`,
  min: (e) => `Must be at least ${e.min}.`,
  max: (e) => `Must be at most ${e.max}.`,
  pattern: () => 'Invalid format.',
  server: (msg: string) => msg,
};

export function errorMessage(control: AbstractControl | null): string | null {
  if (!control?.touched || !control.errors) return null;
  const [key, value] = Object.entries(control.errors)[0];
  return MESSAGES[key]?.(value) ?? 'Invalid value.';
}

export function applyServerErrors(form: FormGroup, err: unknown): string | null {
  const { message, errors } = toApiErrorResponse(err);
  if (!errors?.length) return message;

  const unmapped: string[] = [];
  for (const e of errors) {
    const control = e.field ? findControl(form, e.field) : null;
    if (!control) {
      unmapped.push(e.message);
      continue;
    }
    control.setErrors({ ...control.errors, server: e.message });
    control.markAsTouched();
  }
  return unmapped.length ? unmapped.join(' ') : null;
}

function findControl(form: FormGroup, field: string): AbstractControl | null {
  const name = field.replace(/^\$\./, '').toLowerCase();
  const key = Object.keys(form.controls).find((k) => k.toLowerCase() === name);
  return key ? form.controls[key] : null;
}


export function trimStrings<T>(value: T): T {
  if (typeof value === 'string') return value.trim() as T;
  if (Array.isArray(value)) return value.map(trimStrings) as T;
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, trimStrings(v)])) as T;
  }
  return value;
}
