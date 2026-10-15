import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_EXPORT_JOBS } from '@mock/mock-data';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';

@Component({
  selector: 'app-reports-layout',
  imports: [...UI, RouterOutlet, PageHeader, StatusBadge],
  templateUrl: './reports-layout.html',
})
export class ReportsLayout {
  protected readonly jobs = MOCK_EXPORT_JOBS;
  protected readonly exportOpen = signal(false);
  protected readonly jobsOpen = signal(false);
  protected readonly reportTypes = ['sales', 'inventory', 'invoices', 'tasks'];
  protected exportReport = 'sales';
}
