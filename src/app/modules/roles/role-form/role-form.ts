import { Component, computed, inject, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { RolesService } from '../data/roles.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { minItems, requiredText } from '@shared/forms/form-utils';
import { entityForm } from '@shared/forms/entity-form';
import { PermissionGroup, RoleResponse } from '../data/models';
import { ErrorState } from '@shared/components/error-state/error-state';
import { PageLoader } from '@shared/components/page-loader/page-loader';
import { FieldError } from '@shared/forms/field-error';
import { toSignal } from '@angular/core/rxjs-interop';



@Component({
  selector: 'app-role-form',
  imports: [...UI, PageHeader, PageLoader, ErrorState, FieldError],
  templateUrl: './role-form.html',
  styles: `
    .groups {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
      gap: 1rem;
    }
    .group {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }
    .group__head {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .item {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      padding-inline-start: 1.5rem;
    }
  `,
})
export class RoleForm {
  private readonly service = inject(RolesService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly id = input<string>();

  private readonly allPermissions = toSignal(this.service.permissions(), {
    initialValue: [] as string[],
  });

  protected readonly groups = computed<PermissionGroup[]>(() => {
    const map = new Map<string, string[]>();
    for (const code of this.allPermissions()) {
      const module = code.split('.')[0];
      map.set(module, [...(map.get(module) ?? []), code]);
    }
    return [...map].map(([module, codes]) => ({ module, label: humanize(module), codes }));
  });

  protected readonly form = new FormGroup({
    name: requiredText(50),
    permissions: new FormControl<string[]>([], { nonNullable: true, validators: [minItems(1)] }),
  });

  protected readonly state = entityForm({
    form: this.form,
    id: this.id,
    load: (id) => this.service.getById(id),
    toFormValue: (r: RoleResponse) => ({ name: r.name, permissions: [...r.permissions] }),
    create: (p) => this.service.create(p),
    update: (id, p) => this.service.update(id, p),
    onSaved: (_, { created }) => {
      this.alert.success(created ? 'Role created.' : 'Role updated.');
      void this.router.navigate(['/roles']);
    },
  });

  private get selected(): string[] {
    return this.form.controls.permissions.value;
  }

  protected isChecked(code: string): boolean {
    return this.selected.includes(code);
  }

  protected allChecked(g: PermissionGroup): boolean {
    return g.codes.every((c) => this.selected.includes(c));
  }

  protected someChecked(g: PermissionGroup): boolean {
    return !this.allChecked(g) && g.codes.some((c) => this.selected.includes(c));
  }

  protected toggle(code: string, checked: boolean): void {
    console.log(code, checked);
    this.set(checked ? [...this.selected, code] : this.selected.filter((c) => c !== code));
  }

  protected toggleGroup(g: PermissionGroup, checked: boolean): void {
    const rest = this.selected.filter((c) => !g.codes.includes(c));
    this.set(checked ? [...rest, ...g.codes] : rest);
  }

  protected groupValue(g: PermissionGroup): boolean | null {
    if (this.allChecked(g)) return true;
    return this.someChecked(g) ? null : false;
  }

  private set(value: string[]): void {
    const control = this.form.controls.permissions;
    control.setValue([...new Set(value)].sort());
    control.markAsDirty();
    control.markAsTouched();
  }
}

function humanize(s: string): string {
  const words = s.replace(/-/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}
