import { Component, computed, input } from '@angular/core';
import { TuiBadge, TuiStatus } from '@taiga-ui/kit';

const APPEARANCE: Record<string, string> = {
  // positive
  Active: 'positive',
  Completed: 'positive',
  Delivered: 'positive',
  Paid: 'positive',
  Received: 'positive',
  Done: 'positive',
  Succeeded: 'positive',
  Enabled: 'positive',
  // in progress / info
  Confirmed: 'info',
  Shipped: 'info',
  Sent: 'info',
  InProgress: 'info',
  Running: 'info',
  // warning
  Pending: 'warning',
  OnHold: 'warning',
  High: 'warning',
  Medium: 'warning',
  // negative
  Cancelled: 'negative',
  Overdue: 'negative',
  Blocked: 'negative',
  Failed: 'negative',
  Urgent: 'negative',
  // neutral
  Draft: 'neutral',
  Planned: 'neutral',
  ToDo: 'neutral',
  Low: 'neutral',
  Disabled: 'neutral',
};

@Component({
  selector: 'app-status-badge',
  imports: [TuiBadge, TuiStatus],
  template: `<span tuiBadge tuiStatus [appearance]="appearance()" [size]="size()">{{
    status()
  }}</span>`,
})
export class StatusBadge {
  readonly status = input.required<string>();
  readonly size = input<'s' | 'm' | 'l' | 'xl'>('l');
  protected readonly appearance = computed(() => APPEARANCE[this.status()] ?? 'neutral');
}
