import { Component, input, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MOCK_WEBHOOK_EVENTS, MOCK_WEBHOOK_SECRET } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-endpoint-form',
  imports: [...UI, PageHeader, ConfirmDialog],
  templateUrl: './endpoint-form.html',
})
export class EndpointForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly events = MOCK_WEBHOOK_EVENTS;
  protected readonly secret = MOCK_WEBHOOK_SECRET;
  /** Preview toggle for the "secret is shown once" panel. */
  protected readonly secretOpen = signal(false);
  protected readonly rotateOpen = signal(false);
  protected readonly form = new FormGroup({
    url: new FormControl(''),
    eventTypes: new FormControl<string[]>([]),
    enabled: new FormControl(true),
  });
}
