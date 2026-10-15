import { Component, input } from '@angular/core';
import { UI } from '../../ui';

/** Search box + projected filter controls, laid out in one row. */
@Component({
  selector: 'app-filter-bar',
  imports: [...UI],
  template: `
    <tui-textfield iconStart="@tui.search" tuiTextfieldSize="m" class="search">
      <input tuiInput [placeholder]="placeholder()" />
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
}
