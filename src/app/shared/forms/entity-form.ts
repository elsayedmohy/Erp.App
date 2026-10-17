import { Signal, computed, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { EMPTY, Observable, catchError, filter, finalize, switchMap, tap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { applyServerErrors, trimStrings } from './form-utils';

type RawValue<F extends FormGroup> = ReturnType<F['getRawValue']>;

export interface EntityFormConfig<F extends FormGroup, TEntity, TSaved, TPayload> {
  form: F;
  id: Signal<string | undefined>;
  load: (id: string) => Observable<TEntity>;
  create: (payload: TPayload) => Observable<TSaved>;
  update: (id: string, payload: TPayload) => Observable<TSaved>;
  toFormValue?: (entity: TEntity) => Parameters<F['reset']>[0];
  toPayload?: (value: RawValue<F>) => TPayload;
  onSaved: (saved: TSaved, ctx: { id: string | undefined; created: boolean }) => void;
}

export interface EntityFormState {
  isEdit: Signal<boolean>;
  loading: Signal<boolean>;
  loadError: Signal<string | null>;
  saving: Signal<boolean>;
  formError: Signal<string | null>;
  submit(): void;
}

export function entityForm<F extends FormGroup, TEntity, TSaved = TEntity, TPayload = RawValue<F>>(
  cfg: EntityFormConfig<F, TEntity, TSaved, TPayload>,
): EntityFormState {
  const loading = signal(false);
  const loadError = signal<string | null>(null);
  const saving = signal(false);
  const formError = signal<string | null>(null);

  toObservable(cfg.id)
    .pipe(
      filter((id): id is string => !!id),
      tap(() => {
        loading.set(true);
        loadError.set(null);
      }),
      switchMap((id) =>
        cfg.load(id).pipe(
          catchError((err) => {
            loadError.set(toApiErrorResponse(err).message);
            loading.set(false);
            return EMPTY;
          }),
        ),
      ),
      takeUntilDestroyed(),
    )
    .subscribe((entity) => {
      cfg.form.reset(cfg.toFormValue ? cfg.toFormValue(entity) : (entity as any));
      loading.set(false);
    });

  const submit = (): void => {
    if (saving()) return;
    if (cfg.form.invalid) {
      cfg.form.markAllAsTouched();
      return;
    }

    formError.set(null);
    saving.set(true);

    const id = cfg.id();
    const raw = cfg.form.getRawValue() as RawValue<F>;
    const payload = cfg.toPayload ? cfg.toPayload(raw) : (trimStrings(raw) as unknown as TPayload);
    const request$ = id ? cfg.update(id, payload) : cfg.create(payload);

    request$.pipe(finalize(() => saving.set(false))).subscribe({
      next: (saved) => {
        cfg.form.markAsPristine();
        cfg.onSaved(saved, { id, created: !id });
      },
      error: (err) => formError.set(applyServerErrors(cfg.form, err)),
    });
  };

  return {
    isEdit: computed(() => !!cfg.id()),
    loading: loading.asReadonly(),
    loadError: loadError.asReadonly(),
    saving: saving.asReadonly(),
    formError: formError.asReadonly(),
    submit,
  };
}
