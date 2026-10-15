import { Component } from '@angular/core';
import { MOCK_AUTOMATION_RUNS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-run-detail',
  imports: [...UI, PageHeader, StatusBadge],
  template: `
    <div class="page">
      <app-page-header
        [heading]="'Run #' + run.id"
        [subtitle]="run.rule"
        [breadcrumbs]="[
          { label: 'Administration' },
          { label: 'Automation', link: '/automation' },
          { label: 'Runs', link: '/automation/runs' },
          { label: '#' + run.id },
        ]"
      />

      @if (run.errorSummary) {
        <div tuiNotification appearance="negative">
          <h3 tuiTitle>
            Run failed
            <span tuiSubtitle>{{ run.errorSummary }}</span>
          </h3>
        </div>
      }

      <section tuiCardLarge appearance="outline-grayscale">
        <dl class="dl">
          <dt>Status</dt>
          <dd><app-status-badge [status]="run.status" /></dd>
          <dt>Rule</dt>
          <dd>
            <a tuiLink routerLink="/automation/rules/2/edit">{{ run.rule }}</a>
          </dd>
          <dt>Event ID</dt>
          <dd>
            <code>{{ run.eventId }}</code>
          </dd>
          <dt>Started</dt>
          <dd>{{ run.startedAt }}</dd>
          <dt>Completed</dt>
          <dd>{{ run.completedAt }}</dd>
        </dl>
      </section>
    </div>
  `,
})
export class RunDetail {
  protected readonly run = MOCK_AUTOMATION_RUNS[1];
}
