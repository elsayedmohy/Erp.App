import { Component, signal } from '@angular/core';
import { MOCK_PROJECT_STATUSES, MOCK_PROJECTS, MOCK_USERS } from '@mock/mock-data';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { FilterBar } from '@shared/components/filter-bar/filter-bar';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-projects-list',
  imports: [...UI, PageHeader, FilterBar, DataTable, StatusBadge],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
})
export class ProjectsList {
  protected readonly projects = MOCK_PROJECTS;
  protected readonly statuses = MOCK_PROJECT_STATUSES;
  protected readonly owners = MOCK_USERS.map((u) => `${u.firstName} ${u.lastName}`);
  protected status: string | null = null;
  protected owner: string | null = null;
  /** 0 = cards, 1 = table */
  protected readonly view = signal(0);
  protected readonly columns: Column[] = [
    { key: 'name', label: 'Project', type: 'strong' },
    { key: 'owner', label: 'Owner', type: 'person' },
    { key: 'startDate', label: 'Start' },
    { key: 'dueDate', label: 'Due' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'progress', label: 'Progress', type: 'progress' },
  ];
}
