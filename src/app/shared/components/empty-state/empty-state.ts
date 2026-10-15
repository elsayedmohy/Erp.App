import { Component, input } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-empty-state',
  imports: [TuiIcon],
  template: `
    <tui-icon [icon]="icon()" class="icon" />
    <strong>{{ heading() }}</strong>
    <span class="muted">{{ message() }}</span>
    <ng-content />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 3rem 1rem;
      text-align: center;
    }
    .icon {
      font-size: 2.5rem;
      color: var(--tui-text-tertiary);
    }
  `,
})
export class EmptyState {
  readonly icon = input('@tui.inbox');
  readonly heading = input('Nothing here yet');
  readonly message = input('');
}
