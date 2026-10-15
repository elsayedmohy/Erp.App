import { Component } from '@angular/core';
import { MOCK_WEBHOOK_DELIVERIES, MOCK_WEBHOOK_ENDPOINTS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-deliveries-list',
  imports: [...UI, PageHeader, StatusBadge],
  template: `
    <div class="page">
      <app-page-header
        heading="Deliveries"
        [subtitle]="endpoint.url"
        [breadcrumbs]="[
          { label: 'Administration' },
          { label: 'Webhooks', link: '/webhooks' },
          { label: 'Deliveries' },
        ]"
      >
        <button tuiButton appearance="secondary" size="m" iconStart="@tui.send" type="button">
          Send test
        </button>
      </app-page-header>

      <div class="table-wrap">
        <table tuiTable size="m" class="full-width">
          <thead>
            <tr>
              <th tuiTh>Delivery</th>
              <th tuiTh>Event</th>
              <th tuiTh>Event ID</th>
              <th tuiTh>Status</th>
              <th tuiTh class="num">Attempts</th>
              <th tuiTh class="num">Last response</th>
              <th tuiTh>Next attempt</th>
              <th tuiTh></th>
            </tr>
          </thead>
          <tbody tuiTbody>
            @for (d of deliveries; track d.id) {
              <tr>
                <td tuiTd>
                  <strong>#{{ d.id }}</strong>
                </td>
                <td tuiTd>
                  <span tuiChip size="xs" appearance="neutral">{{ d.event }}</span>
                </td>
                <td tuiTd>
                  <code>{{ d.eventId }}</code>
                </td>
                <td tuiTd><app-status-badge [status]="d.status" size="s" /></td>
                <td tuiTd class="num">{{ d.attemptCount }}</td>
                <td tuiTd class="num">{{ d.lastResponseCode ?? '—' }}</td>
                <td tuiTd>{{ d.nextAttemptAt }}</td>
                <td tuiTd>
                  @if (d.status === 'Failed') {
                    <button
                      tuiButton
                      appearance="secondary"
                      size="xs"
                      iconStart="@tui.rotate-ccw"
                      type="button"
                    >
                      Retry
                    </button>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <tui-table-pagination [total]="deliveries.length" />
    </div>
  `,
  styles: `
    .num {
      text-align: end;
    }
  `,
})
export class DeliveriesList {
  protected readonly endpoint = MOCK_WEBHOOK_ENDPOINTS[0];
  protected readonly deliveries = MOCK_WEBHOOK_DELIVERIES;
}
