import { Component, computed, inject, input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ROLE_NAMES } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';
import { requiredText, strongPassword } from '@shared/forms/form-utils';
import { entityForm } from '@shared/forms/entity-form';
import { UsersService } from '../data/users.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { FieldError } from '@shared/forms/field-error';
import { ErrorState } from '@shared/components/error-state/error-state';
import { PageLoader } from '@shared/components/page-loader/page-loader';
import { toSignal } from '@angular/core/rxjs-interop';
import { PagedResult } from '../../models';
import { ApiService } from '@core/http/api.service';
import { map } from 'rxjs';
import { RolesService } from '../data/roles.service';
import { UserFieldDef, UserResponse } from '../data/models';
import { TuiStringHandler } from '@taiga-ui/cdk';



@Component({
  selector: 'app-user-form',
  imports: [...UI, PageHeader, FieldError, ErrorState, PageLoader],
  templateUrl: 'user-form.html',
})
export class UserForm {
  private readonly service = inject(UsersService);
  private readonly rolesService = inject(RolesService);
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);
  readonly id = input<string>();

  protected readonly roles = toSignal(this.rolesService.list().pipe(map((r) => r.items)), {
    initialValue: [],
  });

  protected readonly form = new FormGroup({
    firstName: requiredText(100),
    lastName: requiredText(100),
    email: requiredText(256, Validators.email),
    password: requiredText(100, Validators.minLength(8), strongPassword),
    roleId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly state = entityForm({
    form: this.form,
    id: this.id,
    load: (id) => this.service.getById(id),
    toFormValue: (u: UserResponse) => ({
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      roleId: u.role.id,
    }),
    create: (p) => this.service.create(p),
    update: (id, p) =>
      this.service.update(id, { firstName: p.firstName, lastName: p.lastName, roleId: p.roleId }),
    onSaved: (_, { created }) => {
      this.alert.success(created ? 'User created.' : 'User updated.');
      void this.router.navigate(['/users']);
    },
  });

  private readonly fields: UserFieldDef[] = [
    { key: 'firstName', label: 'First name', placeholder: 'Ahmed', max: 100 },
    { key: 'lastName', label: 'Last name', placeholder: 'Hassan', max: 100 },
    {
      key: 'email',
      label: 'Email',
      placeholder: 'ahmed@company.com',
      type: 'email',
      max: 256,
      lockedOnEdit: true,
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'At least 8 characters',
      type: 'password',
      max: 100,
      createOnly: true,
    },
  ];

  protected readonly visibleFields = computed(() =>
    this.state.isEdit() ? this.fields.filter((f) => !f.createOnly) : this.fields,
  );

  protected readonly stringify: TuiStringHandler<string> = (id) =>
    this.roles().find((item) => item.id === id)?.name ?? '';

  ngOnInit(): void {
    if (this.id()) {
      this.form.controls.password.disable();
      this.form.controls.email.disable();
    }
  }
}
