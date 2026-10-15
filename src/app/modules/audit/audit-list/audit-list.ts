import { Component } from '@angular/core';
import type { TuiDayRange } from '@taiga-ui/cdk';
import {
  MOCK_AUDIT_ACTIONS,
  MOCK_AUDIT_ENTITY_TYPES,
  MOCK_AUDIT_LOGS,
  MOCK_USERS,
} from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-audit-list',
  imports: [...UI, PageHeader, FilterBar, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Audit log"
        subtitle="Append-only history of security-relevant and business-critical changes"
        [breadcrumbs]="[{ label: 'Insights' }, { label: 'Audit log' }]"
      />
      <app-filter-bar placeholder="Entity ID">
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="Actor" [(ngModel)]="actor" />
          <tui-data-list-wrapper *tuiDropdown [items]="actors" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="Entity type" [(ngModel)]="entityType" />
          <tui-data-list-wrapper *tuiDropdown [items]="entityTypes" />
        </tui-textfield>
        <tui-textfield tuiChevron tuiTextfieldSize="m">
          <input tuiSelect placeholder="Action" [(ngModel)]="action" />
          <tui-data-list-wrapper *tuiDropdown [items]="actions" />
        </tui-textfield>
        <tui-textfield tuiTextfieldSize="m">
          <input tuiInputDateRange placeholder="From – To" [(ngModel)]="range" />
          <tui-calendar-range *tuiDropdown />
        </tui-textfield>
      </app-filter-bar>
      <app-data-table
        [columns]="columns"
        [rows]="logs"
        baseRoute="/audit"
        [actions]="['view']"
        [total]="1248"
      />
    </div>
  `,
})
export class AuditList {
  protected readonly logs = MOCK_AUDIT_LOGS;
  protected readonly actors = MOCK_USERS.map((u) => `${u.firstName} ${u.lastName}`);
  protected readonly entityTypes = MOCK_AUDIT_ENTITY_TYPES;
  protected readonly actions = MOCK_AUDIT_ACTIONS;
  protected actor: string | null = null;
  protected entityType: string | null = null;
  protected action: string | null = null;
  protected range: TuiDayRange | null = null;
  protected readonly columns: Column[] = [
    { key: 'occurredAt', label: 'When' },
    { key: 'actor', label: 'Actor', type: 'person' },
    { key: 'action', label: 'Action', type: 'strong' },
    { key: 'entityType', label: 'Entity' },
    { key: 'entityId', label: 'Entity ID', type: 'mono' },
    { key: 'correlationId', label: 'Correlation', type: 'mono' },
  ];
}
