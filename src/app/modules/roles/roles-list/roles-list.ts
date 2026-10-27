import { Component, inject } from '@angular/core';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { TuiDialogService } from '@taiga-ui/core';
import { AlertService } from '@core/services/alert.service';
import { UserResponse } from '../../users/data/models';
import { TUI_CONFIRM, TuiPin } from '@taiga-ui/kit';
import { filter, map, switchMap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { RolesService } from '../data/roles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoleResponse } from '../data/models';
import { Column } from '../../models';

@Component({
  selector: 'app-roles-list',
  imports: [...UI, PageHeader, TuiPin],
  template: `
    <div class="page">
      <app-page-header
        heading="Roles"
        subtitle="Roles group permissions that are assigned to users"
        [breadcrumbs]="[{ label: 'Administration' }, { label: 'Roles' }]"
      >
        <button tuiButton size="m" iconStart="@tui.plus" routerLink="new">New role</button>
      </app-page-header>

      <div class="grid-3">
        @for (role of roles(); track role.id) {
          <section tuiCardLarge appearance="outline-grayscale">
            <header tuiHeader="h5">
              <h3 tuiTitle>
                {{ role.name }}
                <!--                <span tuiSubtitle>{{ role }} users</span>-->
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
                  (click)="delete(role.id)"
                >
                  Delete
                </button>
              </div>
            </header>
            @if (role.name == 'Admin') {
              <div class="groups">
                <span appearance="positive" tuiBadge>
                  <strong>All Permissions</strong>
                </span>
              </div>
            } @else {
              <div class="groups">
                @for (g of groups(role); track g.module) {
                  <section class="group">
                    <label class="group__head">
                      <div tuiPin style="margin-top: 10px"></div>
                      <strong>{{ g.label }}</strong>
                    </label>
                    @for (code of g.codes; track code) {
                      <label class="item">
                        {{ code.split('.')[1] }}
                      </label>
                    }
                  </section>
                }
              </div>
            }
          </section>
        }
      </div>
    </div>
  `,
  styles: `
    .groups {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
      gap: 1rem;
    }
    .group {
      display: flex;
      flex-direction: column;
    }
    .group__head {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .item {
      display: flex;
      align-items: center;
      padding-inline-start: 1.5rem;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }
  `,
})
export class RolesList {
  readonly service = inject(RolesService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alert = inject(AlertService);
  protected roles = toSignal(this.service.list().pipe(map((r) => r.items)), {
    initialValue: [],
  });

  protected groups(role: RoleResponse) {
    const map = new Map<string, string[]>();
    for (const code of role.permissions) {
      const module = code.split('.')[0];
      map.set(module, [...(map.get(module) ?? []), code]);
    }
    return [...map].map(([module, codes]) => ({
      module,
      label: this.service.humanize(module),
      codes,
    }));
  }

  protected role: string | null = null;
  protected readonly columns: Column<UserResponse>[] = [
    { key: 'name', label: 'Name', type: 'person', value: (u) => `${u.firstName} ${u.lastName}` },
    { key: 'role', label: 'Role', value: (u) => u.role.name },
    { key: 'email', label: 'Email' },
  ];

  protected delete(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Delete role ?',
        size: 's',
        data: { content: 'The role will be archived.', yes: 'Delete', no: 'Cancel' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('Role deleted.');
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }
}
