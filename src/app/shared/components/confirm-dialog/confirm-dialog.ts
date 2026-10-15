import { Component, input, model } from '@angular/core';
import { UI } from '../../ui';

/** Template-only confirmation dialog. Confirm/cancel just close it. */
@Component({
  selector: 'app-confirm-dialog',
  imports: [...UI],
  template: `
    <ng-template
      let-observer
      [tuiDialogOptions]="{ size: 's', label: heading() }"
      [(tuiDialog)]="open"
    >
      <p>{{ message() }}</p>
      <footer class="footer">
        <button
          tuiButton
          appearance="secondary"
          size="m"
          type="button"
          (click)="observer.complete()"
        >
          Cancel
        </button>
        <button
          tuiButton
          [appearance]="danger() ? 'destructive' : 'primary'"
          size="m"
          type="button"
          (click)="observer.complete()"
        >
          {{ confirmLabel() }}
        </button>
      </footer>
    </ng-template>
  `,
  styles: `
    .footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-block-start: 1.5rem;
    }
  `,
})
export class ConfirmDialog {
  readonly open = model(false);
  readonly heading = input('Are you sure?');
  readonly message = input('This action cannot be undone.');
  readonly confirmLabel = input('Delete');
  readonly danger = input(true);
}
