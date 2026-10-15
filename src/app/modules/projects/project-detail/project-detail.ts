import { Component, signal } from '@angular/core';
import {
  MOCK_PROJECT_MEMBERS,
  MOCK_PROJECT_STATUSES,
  MOCK_PROJECTS,
  MOCK_TASKS,
} from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { DataTable, type Column } from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-project-detail',
  imports: [...UI, PageHeader, DataTable, StatCard, StatusBadge, ConfirmDialog],
  templateUrl: './project-detail.html',
  styles: `
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      gap: 1rem;
    }
    .members {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  `,
})
export class ProjectDetail {
  protected readonly project = MOCK_PROJECTS[0];
  protected readonly tasks = MOCK_TASKS.filter((t) => t.project === MOCK_PROJECTS[0].name);
  protected readonly members = MOCK_PROJECT_MEMBERS;
  protected readonly statuses = MOCK_PROJECT_STATUSES;
  protected readonly tab = signal(0);
  protected readonly deleteOpen = signal(false);
  protected readonly taskColumns: Column[] = [
    { key: 'title', label: 'Task', type: 'strong' },
    { key: 'assignee', label: 'Assignee', type: 'person' },
    { key: 'priority', label: 'Priority', type: 'badge' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'dueDate', label: 'Due' },
  ];
}
