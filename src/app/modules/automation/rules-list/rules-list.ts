import { Component, signal } from '@angular/core';
import { MOCK_AUTOMATION_RULES } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { AutomationTabs } from '../automation-tabs';

@Component({
  selector: 'app-rules-list',
  imports: [...UI, PageHeader, ConfirmDialog, AutomationTabs],
  template: `
    <div class="page">
      <app-page-header
        heading="Workflow automation"
        subtitle="Rules that react to business events"
        [breadcrumbs]="[{ label: 'Administration' }, { label: 'Automation' }]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="/automation/rules/new">New rule</a>
      </app-page-header>
      <app-automation-tabs />

      <div class="table-wrap">
        <table tuiTable size="m" class="full-width">
          <thead>
            <tr>
              <th tuiTh>Enabled</th>
              <th tuiTh>Name</th>
              <th tuiTh>Trigger</th>
              <th tuiTh>Action</th>
              <th tuiTh>Target</th>
              <th tuiTh>Updated</th>
              <th tuiTh></th>
            </tr>
          </thead>
          <tbody tuiTbody>
            @for (rule of rules; track rule.id) {
              <tr>
                <td tuiTd><input tuiSwitch type="checkbox" size="s" [ngModel]="rule.enabled" /></td>
                <td tuiTd>
                  <strong>{{ rule.name }}</strong>
                </td>
                <td tuiTd>
                  <span tuiChip size="xs" appearance="info">{{ rule.trigger }}</span>
                </td>
                <td tuiTd>
                  <span tuiChip size="xs" appearance="neutral">{{ rule.action }}</span>
                </td>
                <td tuiTd>{{ rule.target }}</td>
                <td tuiTd>{{ rule.updatedAt }}</td>
                <td tuiTd>
                  <div class="row-actions">
                    <a
                      tuiIconButton
                      appearance="flat-grayscale"
                      size="xs"
                      iconStart="@tui.history"
                      routerLink="/automation/runs"
                      >Runs</a
                    >
                    <a
                      tuiIconButton
                      appearance="flat-grayscale"
                      size="xs"
                      iconStart="@tui.pencil"
                      [routerLink]="['/automation/rules', rule.id, 'edit']"
                      >Edit</a
                    >
                    <button
                      tuiIconButton
                      appearance="flat-destructive"
                      size="xs"
                      iconStart="@tui.trash-2"
                      type="button"
                      (click)="confirmOpen.set(true)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <app-confirm-dialog [(open)]="confirmOpen" heading="Delete rule?" />
    </div>
  `,
  styles: `
    .row-actions {
      display: flex;
      gap: 0.25rem;
      justify-content: flex-end;
    }
  `,
})
export class RulesList {
  protected readonly rules = MOCK_AUTOMATION_RULES;
  protected readonly confirmOpen = signal(false);
}
