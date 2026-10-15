import { Component } from '@angular/core';
import { MOCK_CURRENT_USER } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-profile',
  imports: [...UI, PageHeader],
  template: `
    <div class="page">
      <app-page-header
        heading="My profile"
        subtitle="Your account details and active session"
        [breadcrumbs]="[{ label: 'Home', link: '/dashboard' }, { label: 'Profile' }]"
      >
        <a tuiButton appearance="secondary" size="m" iconStart="@tui.log-out" routerLink="/login"
          >Logout</a
        >
      </app-page-header>

      <div class="grid-2">
        <section tuiCardLarge appearance="outline-grayscale">
          <div tuiCell size="l">
            <div tuiAvatar size="l" appearance="accent">{{ user.initials }}</div>
            <span tuiTitle>
              {{ user.name }}
              <span tuiSubtitle>{{ user.email }}</span>
            </span>
          </div>
          <dl class="dl">
            <dt>Roles</dt>
            <dd>
              @for (role of user.roles; track role) {
                <span tuiChip size="xs" appearance="accent">{{ role }}</span>
              }
            </dd>
            <dt>Token type</dt>
            <dd>Bearer</dd>
            <dt>Session expires</dt>
            <dd>2026-10-15 10:00 UTC</dd>
          </dl>
        </section>

        <form tuiCardLarge appearance="outline-grayscale" tuiForm="m">
          <header tuiHeader>
            <h3 tuiTitle>Change password</h3>
          </header>
          <tui-textfield>
            <label tuiLabel>Current password</label>
            <input tuiInput type="password" />
          </tui-textfield>
          <tui-textfield>
            <label tuiLabel>New password</label>
            <input tuiInput type="password" />
          </tui-textfield>
          <footer>
            <button tuiButton size="m" type="button">Update password</button>
          </footer>
        </form>
      </div>
    </div>
  `,
})
export class Profile {
  protected readonly user = MOCK_CURRENT_USER;
}
