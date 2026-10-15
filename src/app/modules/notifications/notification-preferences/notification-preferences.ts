import { Component } from '@angular/core';
import { MOCK_NOTIFICATION_PREFERENCES } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-notification-preferences',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        heading="Notification preferences"
        subtitle="Choose how you want to be notified"
        [breadcrumbs]="[
          { label: 'Notifications', link: '/notifications' },
          { label: 'Preferences' },
        ]"
      >
        <button tuiButton size="m" type="button">Save preferences</button>
      </app-page-header>

      <section tuiCardLarge appearance="outline-grayscale">
        <table tuiTable size="l" class="full-width">
          <thead>
            <tr>
              <th tuiTh>Event</th>
              <th tuiTh class="center">In-app</th>
              <th tuiTh class="center">Email</th>
            </tr>
          </thead>
          <tbody tuiTbody>
            @for (pref of preferences; track pref.eventType) {
              <tr>
                <td tuiTd>{{ pref.eventType }}</td>
                <td tuiTd class="center">
                  <input tuiSwitch type="checkbox" size="s" [ngModel]="pref.inApp" />
                </td>
                <td tuiTd class="center">
                  <input tuiSwitch type="checkbox" size="s" [ngModel]="pref.email" />
                </td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      <div tuiNotification appearance="info" size="s">
        Email delivery is retried automatically if it fails. It never blocks the action that
        triggered it.
      </div>
    </div>
  `,
  styles: `
    .center {
      text-align: center;
    }
  `,
})
export class NotificationPreferences {
  protected readonly preferences = MOCK_NOTIFICATION_PREFERENCES;
}
