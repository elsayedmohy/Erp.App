import { Component } from '@angular/core';
import { MOCK_AUDIT_LOGS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-audit-detail',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        [heading]="'Audit event #' + log.id"
        [subtitle]="log.action + ' · ' + log.entityType + ' #' + log.entityId"
        [breadcrumbs]="[
          { label: 'Insights' },
          { label: 'Audit log', link: '/audit' },
          { label: '#' + log.id },
        ]"
      />

      <section tuiCardLarge appearance="outline-grayscale">
        <dl class="dl">
          <dt>Actor</dt>
          <dd>{{ log.actor }}</dd>
          <dt>Action</dt>
          <dd>{{ log.action }}</dd>
          <dt>Entity</dt>
          <dd>{{ log.entityType }} #{{ log.entityId }}</dd>
          <dt>Occurred at</dt>
          <dd>{{ log.occurredAt }}</dd>
          <dt>Correlation ID</dt>
          <dd>
            <code>{{ log.correlationId }}</code>
          </dd>
        </dl>
      </section>

      <div class="grid-2">
        <section tuiCardLarge appearance="outline-grayscale">
          <header tuiHeader="h5"><h3 tuiTitle>Before</h3></header>
          <pre class="code-block">{{ log.before }}</pre>
        </section>
        <section tuiCardLarge appearance="outline-grayscale">
          <header tuiHeader="h5"><h3 tuiTitle>After</h3></header>
          <pre class="code-block">{{ log.after }}</pre>
        </section>
      </div>

      <div tuiNotification appearance="neutral" size="s">
        Audit records are read-only. Credentials, tokens and secrets are always redacted.
      </div>
    </div>
  `,
})
export class AuditDetail {
  protected readonly log = MOCK_AUDIT_LOGS[0];
}
