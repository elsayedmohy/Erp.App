import { Component, input } from '@angular/core';
import { UI } from '../../ui';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';

/** Search box + projected filter controls, laid out in one row. */
@Component({
  selector: 'app-filter-bar',
  imports: [...UI],
  template: `
    <tui-textfield iconStart="@tui.search" tuiTextfieldSize="m" class="search">
      <input
        tuiInput
        maxlength="100"
        [value]="value()"
        [placeholder]="placeholder()"
        (input)="term$.next($any($event.target).value)"
      />
    </tui-textfield>
    <ng-content />
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }
    :host ::ng-deep > * {
      min-inline-size: 12rem;
    }
    .search {
      flex: 1 1 16rem;
    }
  `,
})
export class FilterBar {
  readonly placeholder = input('Search…');
  readonly value = input('');
  protected readonly term$ = new Subject<string>();

  readonly search = outputFromObservable(
    this.term$.pipe(
      map((v) => v.trim()),
      debounceTime(300),
      distinctUntilChanged(),
    ),
  );
}
