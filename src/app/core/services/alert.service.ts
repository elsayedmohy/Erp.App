import { inject, Injectable } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';
import { TuiPushService } from '@taiga-ui/kit';
import { switchMap, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  protected readonly notifications = inject(TuiNotificationService);
  protected readonly push = inject(TuiPushService);

  show(content: string, type: string, icon: string, action: () => void) {
    this.push
      .open(content, {
        type: type,
        icon: icon,
      })
      .pipe(
        take(1),
        tap(() => action()),
      )
      .subscribe();
  }
  success(message: string): void {
    this.notifications
      .open(message, {
        appearance: 'positive',
      })
      .subscribe();
  }

  error(message: string): void {
    this.notifications
      .open(message, {
        appearance: 'negative',
      })
      .subscribe();
  }
}
