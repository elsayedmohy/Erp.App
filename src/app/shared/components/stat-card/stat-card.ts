import { Component, input } from '@angular/core';
import { UI } from '../../ui';

@Component({
  selector: 'app-stat-card',
  imports: [...UI],
  template: `
    <div tuiCardLarge appearance="outline-grayscale" class="card">
      <div class="top">
        <span class="muted">{{ label() }}</span>
        <div tuiAvatar size="s" appearance="accent" [tuiAvatar]="icon()"></div>
      </div>
      <strong class="value">{{ value() }}</strong>
      @if (trend()) {
        <span tuiBadge [appearance]="positive() ? 'positive' : 'negative'" size="s">{{
          trend()
        }}</span>
      }
    </div>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0.5rem;
      block-size: 100%;
      box-sizing: border-box;
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .value {
      font: var(--tui-typography-heading-h4);
    }
  `,
})
export class StatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly icon = input('@tui.chart-line');
  readonly trend = input('');
  readonly positive = input(true);
}
