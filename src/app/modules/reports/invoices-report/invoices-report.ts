import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TuiRingChart } from '@taiga-ui/addon-charts';
import type { TuiDayRange } from '@taiga-ui/cdk';
import {
  MOCK_INVOICE_AGING,
  MOCK_INVOICE_STATUSES,
  MOCK_INVOICES_BY_STATUS,
} from '@mock/mock-data';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-invoices-report',
  imports: [...UI, DecimalPipe, StatCard, TuiRingChart],
  template: `
    <div class="page">
      <div class="filters">
        <tui-textfield tuiTextfieldSize="m">
          <label tuiLabel>Period</label>
          <input tuiInputDateRange [(ngModel)]="range" />
          <tui-calendar-range *tuiDropdown />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <label tuiLabel>Status</label>
          <input tuiSelect [(ngModel)]="status" />
          <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
        </tui-textfield>
      </div>

      <div class="grid-3">
        <app-stat-card label="Invoiced" value="$112,400" icon="@tui.file-text" />
        <app-stat-card label="Collected" value="$84,130" icon="@tui.circle-check" trend="+6.0%" />
        <app-stat-card
          label="Outstanding"
          value="$28,270"
          icon="@tui.clock"
          trend="+2.3%"
          [positive]="false"
        />
      </div>

      <div class="grid-3">
        <section tuiCardLarge appearance="outline-grayscale">
          <header tuiHeader="h5"><h3 tuiTitle>By status</h3></header>
          <div class="ring">
            <tui-ring-chart size="l" [value]="byStatus.values" />
            <ul class="legend">
              @for (label of byStatus.labels; track label; let i = $index) {
                <li>
                  <span
                    class="dot"
                    [style.background]="'var(--tui-chart-categorical-0' + i + ')'"
                  ></span>
                  {{ label }} <strong>{{ byStatus.values[i] }}</strong>
                </li>
              }
            </ul>
          </div>
        </section>

        <section tuiCardLarge appearance="outline-grayscale" class="span-2">
          <header tuiHeader="h5"><h3 tuiTitle>Aging</h3></header>
          <table tuiTable size="m" class="full-width">
            <thead>
              <tr>
                <th tuiTh>Bucket</th>
                <th tuiTh class="num">Invoices</th>
                <th tuiTh class="num">Amount</th>
              </tr>
            </thead>
            <tbody tuiTbody>
              @for (row of aging; track row.bucket) {
                <tr>
                  <td tuiTd>{{ row.bucket }}</td>
                  <td tuiTd class="num">{{ row.count }}</td>
                  <td tuiTd class="num">$ {{ row.total | number: '1.2-2' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </section>
      </div>
    </div>
  `,
  styles: `
    .filters {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .filters tui-textfield {
      min-inline-size: 16rem;
    }
    .ring {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .legend {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .dot {
      display: inline-block;
      inline-size: 0.625rem;
      block-size: 0.625rem;
      margin-inline-end: 0.375rem;
      border-radius: 50%;
    }
    .num {
      text-align: end;
    }
  `,
})
export class InvoicesReport {
  protected readonly byStatus = MOCK_INVOICES_BY_STATUS;
  protected readonly aging = MOCK_INVOICE_AGING;
  protected readonly statuses = MOCK_INVOICE_STATUSES;
  protected range: TuiDayRange | null = null;
  protected status: string | null = null;
}
