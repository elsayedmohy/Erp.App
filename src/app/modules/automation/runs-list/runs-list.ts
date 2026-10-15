import { Component } from '@angular/core';
import type { TuiDayRange } from '@taiga-ui/cdk';
import { MOCK_AUTOMATION_RULES, MOCK_AUTOMATION_RUNS } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { AutomationTabs } from '../automation-tabs';

@Component({
  selector: 'app-runs-list',
  imports: [...UI, PageHeader, FilterBar, DataTable, AutomationTabs],
  template: `
    <div class="page">
      <app-page-header
        heading="Workflow automation"
        subtitle="Execution history of automation rules"
        [breadcrumbs]="[
          { label: 'Administration' },
          { label: 'Automation', link: '/automation' },
          { label: 'Runs' },
        ]"
      />
      <app-automation-tabs />
      <app-filter-bar placeholder="Search by event ID">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All rules" [(ngModel)]="rule" />
          <tui-data-list-wrapper *tuiDropdown [items]="rules" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="All statuses" [(ngModel)]="status" />
          <tui-data-list-wrapper *tuiDropdown [items]="statuses" />
        </tui-textfield>
        <tui-textfield tuiTextfieldSize="m">
          <input tuiInputDateRange placeholder="From – To" [(ngModel)]="range" />
          <tui-calendar-range *tuiDropdown />
        </tui-textfield>
      </app-filter-bar>
      <app-data-table
        [columns]="columns"
        [rows]="runs"
        baseRoute="/automation/runs"
        [actions]="['view']"
      />
    </div>
  `,
})
export class RunsList {
  protected readonly runs = MOCK_AUTOMATION_RUNS;
  protected readonly rules = MOCK_AUTOMATION_RULES.map((r) => r.name);
  protected readonly statuses = ['Succeeded', 'Failed', 'Running'];
  protected rule: string | null = null;
  protected status: string | null = null;
  protected range: TuiDayRange | null = null;
  protected readonly columns: Column[] = [
    { key: 'id', label: 'Run #', type: 'strong' },
    { key: 'rule', label: 'Rule' },
    { key: 'eventId', label: 'Event', type: 'mono' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'startedAt', label: 'Started' },
    { key: 'completedAt', label: 'Completed' },
  ];
}
