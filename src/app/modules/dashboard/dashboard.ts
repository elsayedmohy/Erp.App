import { Component } from '@angular/core';
import { TuiAxes, TuiBarChart, TuiLineChart, TuiRingChart } from '@taiga-ui/addon-charts';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_INVOICES_BY_STATUS,
  MOCK_ORDERS,
  MOCK_PRODUCTS,
  MOCK_SALES_CHART,
  MOCK_SALES_CHART_LABELS,
  MOCK_TASKS_BY_STATUS,
} from '@mock/mock-data';
import { DataTable} from '@shared/components/data-table/data-table';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatCard } from '@shared/components/stat-card/stat-card';
import { UI } from '@shared/ui';
import { Column } from '../models';

@Component({
  selector: 'app-dashboard',
  imports: [
    ...UI,
    PageHeader,
    StatCard,
    DataTable,
    TuiAxes,
    TuiLineChart,
    TuiBarChart,
    TuiRingChart,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly stats = MOCK_DASHBOARD_STATS;
  protected readonly sales = MOCK_SALES_CHART;
  protected readonly salesLabels = MOCK_SALES_CHART_LABELS;
  protected readonly tasksByStatus = MOCK_TASKS_BY_STATUS;
  protected readonly invoicesByStatus = MOCK_INVOICES_BY_STATUS;
  protected readonly recentOrders = MOCK_ORDERS;
  protected readonly lowStock = MOCK_PRODUCTS.slice(1, 4);

  protected readonly orderColumns: Column[] = [
    { key: 'id', label: 'Order #', type: 'strong' },
    { key: 'customer', label: 'Customer' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'totalAmount', label: 'Total', type: 'money' },
  ];

  protected readonly stockColumns: Column[] = [
    { key: 'name', label: 'Product', type: 'strong' },
    { key: 'stockQuantity', label: 'In stock', type: 'number' },
    { key: 'reorderLevel', label: 'Reorder at', type: 'number' },
  ];
}
