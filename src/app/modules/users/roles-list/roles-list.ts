import { Component, signal } from '@angular/core';
import { MOCK_ROLES } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-roles-list',
  imports: [...UI, PageHeader, ConfirmDialog],
  template: `
    <div class="page">
      <app-page-header
        heading="Roles"
        subtitle="Roles group permissions that are assigned to users"
        [breadcrumbs]="[
          { label: 'Administration' },
          { label: 'Users', link: '/users' },
          { label: 'Roles' },
        ]"
      >
        <a tuiButton size="m" iconStart="@tui.plus" routerLink="new">New role</a>
      </app-page-header>

      <div class="grid-3">
        @for (role of roles; track role.id) {
          <section tuiCardLarge appearance="outline-grayscale">
            <header tuiHeader="h5">
              <h3 tuiTitle>
                {{ role.name }}
                <span tuiSubtitle>{{ role.usersCount }} users</span>
              </h3>
              <div tuiAccessories>
                <a
                  tuiIconButton
                  appearance="flat-grayscale"
                  size="xs"
                  iconStart="@tui.pencil"
                  [routerLink]="[role.id, 'edit']"
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
            </header>
            <div class="chips">
              @for (permission of role.permissions; track permission) {
                <span tuiChip size="xs" appearance="neutral">{{
                  permission === '*' ? 'All permissions' : permission
                }}</span>
              }
            </div>
          </section>
        }
      </div>

      <app-confirm-dialog
        [(open)]="confirmOpen"
        heading="Delete role?"
        message="Users with this role will lose its permissions."
      />
    </div>
  `,
  styles: `
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
  `,
})
export class RolesList {
  protected readonly roles = MOCK_ROLES;
  protected readonly confirmOpen = signal(false);
}
