import {
  AbstractControl,
  FormArray,
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


export function requiredNumber(
  initialValue = 0,
  ...validators: ValidatorFn[]
): FormControl<number> {
  return new FormControl(initialValue, {
    nonNullable: true,
    validators: [Validators.required, ...validators],
  });
}

export function strongPassword(c: AbstractControl): ValidationErrors | null {
  const v = c.value as string;
  if (!v) return null;
  return /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v) && /[^a-zA-Z\d]/.test(v)
    ? null
    : { weakPassword: true };
}

export function minItems(min = 1): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const length = c instanceof FormArray ? c.length : Array.isArray(c.value) ? c.value.length : 0;
    return length >= min ? null : { minItems: { required: min, actual: length } };
  };
}


const MESSAGES: Record<string, (e: any) => string> = {
  required: () => 'This field is required.',
  email: () => 'Enter a valid email address.',
  minlength: (e) => `Minimum ${e.requiredLength} characters.`,
  maxlength: (e) => `Maximum ${e.requiredLength} characters.`,
  weakPassword: () => 'Use upper and lower case letters, a number and a symbol.',
  min: (e) => `Must be at least ${e.min}.`,
  max: (e) => `Must be at most ${e.max}.`,
  pattern: () => 'Invalid format.',
  server: (msg: string) => msg,
  minItems: (e) =>
    e.required === 1 ? 'Add at least one item.' : `Add at least ${e.required} items.`,
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
