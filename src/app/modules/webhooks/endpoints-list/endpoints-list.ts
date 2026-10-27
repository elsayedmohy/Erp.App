import { Component } from '@angular/core';
import { MOCK_WEBHOOK_ENDPOINTS } from '@mock/mock-data';
import { DataTable } from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { Column } from '../../models';

@Component({
  selector: 'app-endpoints-list',
  imports: [...UI, PageHeader, DataTable],
  template: `
    <div class="page">
      <app-page-header
        heading="Webhooks"
        subtitle="HTTPS endpoints that receive signed event deliveries"
        [breadcrumbs]="[{ label: 'Administration' }, { label: 'Webhooks' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New endpoint</a>
      </app-page-header>
      <app-data-table
        [columns]="columns"
        [rows]="endpoints"
        baseRoute="/webhooks"
        [actions]="['edit', 'delete']"
        [extraActions]="[{ icon: '@tui.list', label: 'Deliveries', path: 'deliveries' }]"
        deleteMessage="The endpoint will be disabled and removed. Pending deliveries are cancelled."
      />
    </div>
  `,
})
export class EndpointsList {
  protected readonly endpoints = MOCK_WEBHOOK_ENDPOINTS;
  protected readonly columns: Column[] = [
    { key: 'url', label: 'URL', type: 'mono' },
    { key: 'eventTypes', label: 'Events', type: 'tags' },
    { key: 'enabled', label: 'Status', type: 'bool' },
    { key: 'createdAt', label: 'Created' },
  ];
}
