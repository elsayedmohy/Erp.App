import { DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MOCK_EMPLOYEES, MOCK_TASKS } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-employee-detail',
  imports: [...UI, DecimalPipe, PageHeader, DataTable, ConfirmDialog],
  template: `
    <div class="page">
      <app-page-header
        [heading]="employee.firstName + ' ' + employee.lastName"
        [subtitle]="employee.position"
        [breadcrumbs]="[
          { label: 'HR' },
          { label: 'Employees', link: '/employees' },
          { label: employee.firstName + ' ' + employee.lastName },
        ]"
      >
        <a
          tuiButton
          appearance="secondary"
          size="m"
          iconStart="@tui.pencil"
          [routerLink]="['/employees', employee.id, 'edit']"
          >Edit</a
        >
        <button
          tuiButton
          appearance="destructive"
          size="m"
          iconStart="@tui.trash-2"
          type="button"
          (click)="confirmOpen.set(true)"
        >
          Delete
        </button>
      </app-page-header>

      <div class="grid-3">
        <section tuiCardLarge appearance="outline-grayscale" class="profile">
          <div tuiAvatar size="xxl" appearance="accent">
            {{ employee.firstName[0] }}{{ employee.lastName[0] }}
          </div>
          <h2 tuiTitle class="center">
            {{ employee.firstName }} {{ employee.lastName }}
            <span tuiSubtitle>{{ employee.position }} · {{ employee.department }}</span>
          </h2>
          <div class="contacts">
            <a tuiButton appearance="secondary" size="s" iconStart="@tui.mail">Email</a>
            <a tuiButton appearance="secondary" size="s" iconStart="@tui.phone">Call</a>
          </div>
        </section>

        <section tuiCardLarge appearance="outline-grayscale" class="span-2">
          <header tuiHeader="h5"><h3 tuiTitle>Employment details</h3></header>
          <dl class="dl">
            <dt>Email</dt>
            <dd>{{ employee.email }}</dd>
            <dt>Phone</dt>
            <dd>{{ employee.phone }}</dd>
            <dt>Department</dt>
            <dd>{{ employee.department }}</dd>
            <dt>Position</dt>
            <dd>{{ employee.position }}</dd>
            <dt>Hire date</dt>
            <dd>{{ employee.hireDate }}</dd>
            <dt>Salary</dt>
            <dd>$ {{ employee.salary | number: '1.2-2' }}</dd>
          </dl>
        </section>
      </div>

      <section tuiCardLarge appearance="outline-grayscale">
        <header tuiHeader="h5"><h3 tuiTitle>Assigned tasks</h3></header>
        <app-data-table
          [columns]="taskColumns"
          [rows]="tasks"
          baseRoute="/tasks"
          [actions]="['view']"
        />
      </section>

      <app-confirm-dialog
        [(open)]="confirmOpen"
        heading="Delete employee?"
        message="The employee will be archived (soft delete)."
      />
    </div>
  `,
  styles: `
    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .center {
      text-align: center;
    }
    .contacts {
      display: flex;
      gap: 0.5rem;
    }
  `,
})
export class EmployeeDetail {
  protected readonly employee = MOCK_EMPLOYEES[0];
  protected readonly tasks = MOCK_TASKS.slice(0, 1);
  protected readonly confirmOpen = signal(false);
  protected readonly taskColumns: Column[] = [
    { key: 'title', label: 'Task', type: 'strong' },
    { key: 'project', label: 'Project' },
    { key: 'priority', label: 'Priority', type: 'badge' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'dueDate', label: 'Due' },
  ];
}
