import { Component, input } from '@angular/core';
import { UI } from '../../ui';

export interface Crumb {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-page-header',
  imports: [...UI],
  template: `
    @if (breadcrumbs().length) {
      <tui-breadcrumbs size="l">
        @for (crumb of breadcrumbs(); track crumb.label) {
          @if (crumb.link) {
            <a *tuiItem tuiLink [routerLink]="crumb.link">{{ crumb.label }}</a>
          } @else {
            <span *tuiItem>{{ crumb.label }}</span>
          }
        }
      </tui-breadcrumbs>
    }
    <header tuiHeader="h3">
      <hgroup tuiTitle>
        <h1>{{ heading() }}</h1>
        @if (subtitle()) {
          <p tuiSubtitle>{{ subtitle() }}</p>
        }
      </hgroup>
      <div tuiAccessories class="actions">
        <ng-content />
      </div>
    </header>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  `,
})
export class PageHeader {
  readonly heading = input.required<string>();
  readonly subtitle = input('');
  readonly breadcrumbs = input<Crumb[]>([]);
}
