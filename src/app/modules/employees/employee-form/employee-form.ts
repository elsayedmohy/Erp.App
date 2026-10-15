import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import type { TuiDay } from '@taiga-ui/cdk';
import type { TuiFileLike } from '@taiga-ui/kit';
import { MOCK_DEPARTMENTS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-employee-form',
  imports: [...UI, PageHeader],
  templateUrl: './employee-form.html',
})
export class EmployeeForm {
  readonly mode = input<'create' | 'edit'>('create');
  protected readonly departments = MOCK_DEPARTMENTS.map((d) => d.name);
  protected readonly form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    department: new FormControl<string | null>(null),
    position: new FormControl(''),
    hireDate: new FormControl<TuiDay | null>(null),
    salary: new FormControl<number | null>(null),
    photo: new FormControl<TuiFileLike | null>(null),
  });
}
