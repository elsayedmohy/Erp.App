import { Component } from '@angular/core';
import { UI } from '@shared/ui';

/** Rules / Runs tab strip shared by the automation list pages. */
@Component({
  selector: 'app-automation-tabs',
  imports: [...UI],
  template: `
    <tui-tabs>
      <a tuiTab routerLink="/automation/rules" routerLinkActive iconStart="@tui.workflow">Rules</a>
      <a tuiTab routerLink="/automation/runs" routerLinkActive iconStart="@tui.history"
        >Execution history</a
      >
    </tui-tabs>
  `,
})
export class AutomationTabs {}
