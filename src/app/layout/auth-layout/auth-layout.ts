import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, TuiIcon],
  template: `
    <div class="brand">
      <tui-icon icon="@tui.layout-dashboard" />
      <strong>ERP Dashboard</strong>
    </div>
    <router-outlet />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      min-block-size: 100vh;
      padding: 1rem;
      box-sizing: border-box;
      background: var(--tui-background-base-alt);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font: var(--tui-typography-heading-h5);
    }
  `,
})
export class AuthLayout {}
