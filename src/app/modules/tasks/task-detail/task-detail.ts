import { Component, signal } from '@angular/core';
import { MOCK_TASK_COMMENTS, MOCK_TASK_STATUSES, MOCK_TASKS } from '@mock/mock-data';
import { ConfirmDialog } from '@shared/components/confirm-dialog/confirm-dialog';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-task-detail',
  imports: [...UI, PageHeader, StatusBadge, ConfirmDialog],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail {
  protected readonly task = MOCK_TASKS[0];
  protected readonly comments = MOCK_TASK_COMMENTS;
  protected readonly statuses = MOCK_TASK_STATUSES;
  protected readonly deleteOpen = signal(false);
  protected readonly deleteCommentOpen = signal(false);
  protected newComment = '';
}
