import { Component } from '@angular/core';
import { TuiAxes, TuiBarChart } from '@taiga-ui/addon-charts';
import type { TuiDayRange } from '@taiga-ui/cdk';
import {
  MOCK_EMPLOYEES,
  MOCK_PROJECTS,
  MOCK_TASK_REPORT,
  MOCK_TASKS_BY_STATUS,
} from '@mock/mock-data';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-tasks-report',
  imports: [...UI, TuiAxes, TuiBarChart],
  template: `
    <div class="page">
      <div class="filters">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <label tuiLabel>Project</label>
          <input tuiSelect [(ngModel)]="project" />
          <tui-data-list-wrapper *tuiDropdown [items]="projects" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <label tuiLabel>Assignee</label>
          <input tuiSelect [(ngModel)]="assignee" />
          <tui-data-list-wrapper *tuiDropdown [items]="assignees" />
        </tui-textfield>
        <tui-textfield tuiTextfieldSize="m">
          <label tuiLabel>Period</label>
          <input tuiInputDateRange [(ngModel)]="range" />
          <tui-calendar-range *tuiDropdown />
        </tui-textfield>
      </div>

      <section tuiCardLarge appearance="outline-grayscale">
        <header tuiHeader="h5"><h3 tuiTitle>Tasks by status</h3></header>
        <tui-axes
          class="chart"
          [axisXLabels]="byStatus.labels"
          [axisYLabels]="['0', '25']"
          [horizontalLines]="1"
        >
          <tui-bar-chart [max]="25" [value]="byStatus.values" />
        </tui-axes>
      </section>

      <section tuiCardLarge appearance="outline-grayscale">
        <header tuiHeader="h5"><h3 tuiTitle>By project</h3></header>
        <table tuiTable size="m" class="full-width">
          <thead>
            <tr>
              <th tuiTh>Project</th>
              <th tuiTh class="num">To do</th>
              <th tuiTh class="num">In progress</th>
              <th tuiTh class="num">Blocked</th>
              <th tuiTh class="num">Done</th>
            </tr>
          </thead>
          <tbody tuiTbody>
            @for (row of rows; track row.project) {
              <tr>
                <td tuiTd>
                  <strong>{{ row.project }}</strong>
                </td>
                <td tuiTd class="num">{{ row.todo }}</td>
                <td tuiTd class="num">{{ row.inProgress }}</td>
                <td tuiTd class="num">{{ row.blocked }}</td>
                <td tuiTd class="num">{{ row.done }}</td>
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
      min-inline-size: 14rem;
    }
    .chart {
      block-size: 14rem;
    }
    .num {
      text-align: end;
    }
  `,
})
export class TasksReport {
  protected readonly byStatus = MOCK_TASKS_BY_STATUS;
  protected readonly rows = MOCK_TASK_REPORT;
  protected readonly projects = MOCK_PROJECTS.map((p) => p.name);
  protected readonly assignees = MOCK_EMPLOYEES.map((e) => `${e.firstName} ${e.lastName}`);
  protected project: string | null = null;
  protected assignee: string | null = null;
  protected range: TuiDayRange | null = null;
}
