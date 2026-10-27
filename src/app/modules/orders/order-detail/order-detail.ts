import { Component, inject, input, signal } from '@angular/core';
import { PageHeader } from '@shared/components/page-header/page-header';
import { StatusBadge } from '@shared/components/status-badge/status-badge';
import { UI } from '@shared/ui';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { filter, switchMap } from 'rxjs';
import { toApiErrorResponse } from '@core/utils/api-error.util';
import { OrdersService } from '../data/orders.service';
import { TuiDialogService } from '@taiga-ui/core';
import { AlertService } from '@core/services/alert.service';
import { PageLoader } from '@shared/components/page-loader/page-loader';
import { ORDER_STATUSES } from '../../constants';
import { OrderDetails } from '../data/models';
import { LineItemsEditor } from '@shared/components/line-items-editor/line-items-editor';
import { ProductsService } from '../../products/data/products.service';

@Component({
  selector: 'app-order-detail',
  imports: [...UI, PageHeader, StatusBadge, PageLoader, LineItemsEditor],
  templateUrl: './order-detail.html',
  styles: `
    :host {
      .step {
        opacity: 1;
      }
    }
  `,
})
export class OrderDetail {
  private readonly service = inject(OrdersService);
  private readonly productService = inject(ProductsService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alert = inject(AlertService);
  readonly id = input.required<string>();
  protected readonly tab = signal(0);
  protected order = signal<OrderDetails | null>(null);
  protected readonly ORDER_STATUSES = ORDER_STATUSES;
  protected readonly loading = signal<boolean>(false);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.service.getById(this.id()).subscribe({
      next: (data) => {
        this.order.set(data);
        this.loading.set(false);
      },
      error: (err: any) => {
        this.loading.set(false);
        console.log(err);
      },
    });
  }

  protected cancelOrder(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Cancel Order ?',
        size: 's',
        data: { content: 'The order will be cancel.', yes: 'Cancel', no: 'Back' },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.delete(id)),
      )
      .subscribe({
        next: () => {
          this.alert.success('Order canceled.');
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }

  protected updateStatus(id: string, status: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: 'Update Order status ?',
        size: 's',
        data: {
          content: `Are you sure you want to update the order status to ${status}.`,
          yes: 'Update',
          no: 'Cancel',
        },
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.service.updateStatus(id, { status })),
      )
      .subscribe({
        next: (res) => {
          this.order.update((o) => (o ? { ...o, status: res.status } : o));
          this.alert.success('Order status updated.');
        },
        error: (e) => this.alert.error(toApiErrorResponse(e).message),
      });
  }
}
