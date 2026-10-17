import { Component, input, output } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { EmptyState } from '../empty-state/empty-state';

@Component({
  selector: 'app-error-state',
  imports: [EmptyState, TuiButton],
  host: { role: 'alert' },
  template: `
    <app-empty-state [icon]="icon()" [heading]="heading()" [message]="message()" class="error">
      @if (retryable()) {
        <button
          tuiButton
          type="button"
          size="s"
          appearance="secondary"
          iconStart="@tui.rotate-cw"
          (click)="retry.emit()"
        >
          {{ retryLabel() }}
        </button>
      }
      <ng-content />
    </app-empty-state>
  `,
  styles: `
    .error ::ng-deep .icon {
      color: var(--tui-status-negative);
    }
  `,
})
export class ErrorState {
  readonly icon = input('@tui.circle-alert');
  readonly heading = input("Couldn't load data");
  readonly message = input('');
  readonly retryable = input(true);
  readonly retryLabel = input('Try again');
  readonly retry = output<void>();
}
