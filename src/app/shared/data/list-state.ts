import { Signal, computed, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Observable, catchError, map, of, switchMap, tap, filter } from 'rxjs';
import { PagedResult } from '../../modules/models';

export interface ListState<T> {
  data: Signal<T | undefined>;
  loading: Signal<boolean>;
  initialLoading: Signal<boolean>;
  error: Signal<string | null>;
  reload(): void;
}

export function listState<Q, T>(
  query: Signal<Q | null>,
  fetch: (q: Q) => Observable<T>,
): ListState<T> {
  const data = signal<T | undefined>(undefined);
  const loading = signal(true);
  const error = signal<string | null>(null);
  const reloadTick = signal(0);

  toObservable(computed(() => ({ q: query(), tick: reloadTick() })))
    .pipe(
      tap(({ q }) => {
        loading.set(q !== null);
        error.set(null);
      }),
      filter((x): x is { q: Q; tick: number } => x.q !== null),
      switchMap(({ q }) =>
        fetch(q).pipe(
          map((value) => ({ value })),
          catchError((err) => of({ err })),
        ),
      ),
      takeUntilDestroyed(),
    )
    .subscribe((res) => {
      if ('value' in res) data.set(res.value);
      else error.set(toMessage(res.err));
      loading.set(false);
    });

  return {
    data: data.asReadonly(),
    loading: loading.asReadonly(),
    initialLoading: computed(() => loading() && data() === undefined),
    error: error.asReadonly(),
    reload: () => reloadTick.update((n) => n + 1),
  };
}

export function placeholderPage<T>(rows = 8): PagedResult<T> {
  return {
    items: Array.from({ length: rows }, () => ({}) as T),
    page: 1,
    pageSize: rows,
    total: 0,
  };
}

function toMessage(err: unknown): string {
  const e = err as any;
  return e?.message ?? e?.error?.detail ?? 'Unexpected error.';
}
