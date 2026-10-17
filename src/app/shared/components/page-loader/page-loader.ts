import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiLoader, tuiLoaderOptionsProvider } from '@taiga-ui/core';


@Component({
  selector: 'page-loader',
  imports: [TuiLoader],

  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiLoaderOptionsProvider({ size: 'xl' })],
  template: `<div class="page-loader">
    <tui-loader></tui-loader>
  </div>`,
  styles: `
    .page-loader {
      min-height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    tui-loader {
      min-inline-size: 3.5rem;
      --tui-thickness: 0.5rem;
    }
  `,
})
export class PageLoader {}
