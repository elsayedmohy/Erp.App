import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TuiAxes, TuiLineChart } from '@taiga-ui/addon-charts';
import type { TuiDayRange } from '@taiga-ui/cdk';
import { MOCK_SALES_CHART, MOCK_SALES_CHART_LABELS, MOCK_SALES_REPORT } from '@mock/mock-data';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-sales-report',
  imports: [...UI, DecimalPipe, StatCard, TuiAxes, TuiLineChart],
  template: `
    <div class="page">
      <div class="filters">
        <tui-textfield tuiTextfieldSize="m">
          <label tuiLabel>Period</label>
          <input tuiInputDateRange [(ngModel)]="range" />
          <tui-calendar-range *tuiDropdown />
        </tui-textfield>
        <tui-segmented size="m">
          <button type="button">Day</button>
          <button type="button">Week</button>
          <button type="button">Month</button>
        </tui-segmented>
      </div>

      <div class="grid-3">
        <app-stat-card label="Total sales" value="$146,740" icon="@tui.dollar-sign" trend="+8.2%" />
        <app-stat-card label="Orders" value="433" icon="@tui.shopping-cart" trend="+21" />
        <app-stat-card
          label="Average order"
          value="$338.89"
          icon="@tui.receipt"
          trend="-1.4%"
          [positive]="false"
        />
      </div>

      <section tuiCardLarge appearance="outline-grayscale">
        <header tuiHeader="h5"><h3 tuiTitle>Sales over time</h3></header>
        <tui-axes
          class="chart"
          [axisXLabels]="labels"
          [axisYLabels]="['0', '50k', '100k']"
          [horizontalLines]="2"
          [verticalLines]="11"
        >
          <tui-line-chart
            [value]="chart"
            [x]="0"
            [y]="0"
            [width]="11"
            [height]="100"
            [smoothingFactor]="40"
            [filled]="true"
          />
        </tui-axes>
      </section>

      <section tuiCardLarge appearance="outline-grayscale">
        <table tuiTable size="m" class="full-width">
          <thead>
            <tr>
              <th tuiTh>Period</th>
              <th tuiTh class="num">Orders</th>
              <th tuiTh class="num">Total</th>
            </tr>
          </thead>
          <tbody tuiTbody>
            @for (row of rows; track row.period) {
              <tr>
                <td tuiTd>{{ row.period }}</td>
                <td tuiTd class="num">{{ row.orders }}</td>
                <td tuiTd class="num">$ {{ row.total | number: '1.2-2' }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>
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
      min-inline-size: 18rem;
    }
    .chart {
      block-size: 16rem;
      color: var(--tui-chart-categorical-00);
    }
    .num {
      text-align: end;
    }
  `,
})
export class SalesReport {
  protected readonly chart = MOCK_SALES_CHART;
  protected readonly labels = MOCK_SALES_CHART_LABELS;
  protected readonly rows = MOCK_SALES_REPORT;
  protected range: TuiDayRange | null = null;
}
