import { Component, inject } from '@angular/core';
import { MOCK_CURRENT_USER } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { AuthService } from '@core/auth/auth.service';
import { TokenService } from '@core/auth/token.service';

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
        <button
          tuiButton
          appearance="secondary"
          size="m"
          iconStart="@tui.log-out"
          (click)="auth.logout()"
        >
          Logout
        </button>
      </app-page-header>
      @if (user(); as user) {
        <div class="grid-2">
          <section tuiCardLarge appearance="outline-grayscale">
            <div tuiCell size="l">
              <div tuiAvatar size="l" appearance="accent">
                {{ user.firstName.charAt(0) + user.lastName.charAt(0) }}
              </div>
              <span tuiTitle>
                {{ user.firstName }} {{ user.lastName }}
                <span tuiSubtitle>{{ user.email }}</span>
              </span>
            </div>
            <dl class="dl">
              <dt>Roles</dt>
              <dd>
                <span tuiChip size="xs" appearance="accent">{{ user.role.name }}</span>
              </dd>
              <dt>Token type</dt>
              <dd>Bearer</dd>
              <dt>Session expires</dt>
              <dd>2026-10-15 10:00 UTC</dd>
            </dl>
          </section>

<!--          <form tuiCardLarge appearance="outline-grayscale" tuiForm="m">-->
<!--            <header tuiHeader>-->
<!--              <h3 tuiTitle>Change password</h3>-->
<!--            </header>-->
<!--            <tui-textfield>-->
<!--              <label tuiLabel>Current password</label>-->
<!--              <input tuiInput type="password" />-->
<!--            </tui-textfield>-->
<!--            <tui-textfield>-->
<!--              <label tuiLabel>New password</label>-->
<!--              <input tuiInput type="password" />-->
<!--            </tui-textfield>-->
<!--            <footer>-->
<!--              <button tuiButton size="m" type="button">Update password</button>-->
<!--            </footer>-->
<!--          </form>-->
        </div>
      }
    </div>
  `,
})
export class Profile {
  protected auth = inject(AuthService);
  protected token = inject(TokenService);
  protected readonly user = this.token.userSignal;
}
