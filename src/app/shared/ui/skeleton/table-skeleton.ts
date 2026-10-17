import { Component, computed, input } from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiSkeleton } from '@taiga-ui/kit';
import { Column } from '@shared/components/data-table/data-table';

const TEXT = ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Adipiscing elit', 'Sed do', 'Tempor incididunt'];

@Component({
  selector: 'app-table-skeleton',
  imports: [TuiTable, TuiSkeleton],
  template: `
    <div class="table-wrap" aria-busy="true">
      <span class="sr-only" role="status">Loading…</span>

      <table tuiTable size="m" class="table" aria-hidden="true">
        <thead>
          <tr>

            @for (col of columns(); track col.key) {
              <th tuiTh [tuiSkeleton]="true"></th>
            }
          </tr>
        </thead>

        <tbody tuiTbody>
          @for (r of rowIndexes(); track r) {
            <tr>
              @for (col of columns(); track col.key; let c = $index) {
                <td tuiTd [class.num]="isNumeric(col)">
                  @switch (col.type) {
                    @case ('badge') {
                      <span class="box box_pill" [tuiSkeleton]="true"></span>
                    }
                    @case ('bool') {
                      <span class="box box_pill" [tuiSkeleton]="true"></span>
                    }
                    @case ('person') {
                      <span class="inline">
                        <span class="box box_avatar" [tuiSkeleton]="true"></span>
                        <span [tuiSkeleton]="text(r, c)"></span>
                      </span>
                    }
                    @case ('tags') {
                      <span class="inline">
                        <span class="box box_pill box_pill-s" [tuiSkeleton]="true"></span>
                        <span class="box box_pill box_pill-s" [tuiSkeleton]="true"></span>
                      </span>
                    }
                    @case ('progress') {
                      <span class="box box_bar" [tuiSkeleton]="true"></span>
                    }
                    @case ('money') {
                      <span [tuiSkeleton]="'00,000.00'"></span>
                    }
                    @case ('number') {
                      <span [tuiSkeleton]="'0,000'"></span>
                    }
                    @case ('stock') {
                      <span [tuiSkeleton]="'000'"></span>
                    }
                    @default {
                      <span [tuiSkeleton]="text(r, c)"></span>
                    }
                  }
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>

    @if (withPagination()) {
      <div class="pagination"><span class="box box_pager" [tuiSkeleton]="true"></span></div>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .table {
      inline-size: 100%;
    }
    .num {
      text-align: end;
    }
    .narrow {
      inline-size: 2.5rem;
    }
    .actions-col {
      inline-size: 1%;
      white-space: nowrap;
    }

    .inline {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .inline_end {
      gap: 0.25rem;
      justify-content: flex-end;
    }

    .box {
      display: inline-block;
      vertical-align: middle;
    }
    .box_check {
      inline-size: 1rem;
      block-size: 1rem;
      border-radius: 0.25rem;
    }
    .box_pill {
      inline-size: 4.5rem;
      block-size: 1.25rem;
      border-radius: 1rem;
    }
    .box_pill-s {
      inline-size: 3rem;
    }
    .box_avatar {
      inline-size: 1.5rem;
      block-size: 1.5rem;
      border-radius: 50%;
    }
    .box_bar {
      inline-size: 8rem;
      block-size: 0.375rem;
      border-radius: 1rem;
    }
    .box_icon {
      inline-size: 1.5rem;
      block-size: 1.5rem;
      border-radius: 0.5rem;
    }
    .box_pager {
      inline-size: 100%;
      block-size: 2.5rem;
      border-radius: 0.75rem;
    }

    .pagination {
      margin-block-start: 0.75rem;
    }

    .sr-only {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
  `,
})
export class TableSkeleton {
  readonly columns = input.required<Column[]>();
  readonly rows = input(8);
  readonly withPagination = input(true);

  protected readonly rowIndexes = computed(() =>
    Array.from({ length: Math.min(Math.max(this.rows(), 1), 20) }, (_, i) => i),
  );

  protected isNumeric(col: Column): boolean {
    return col.type === 'money' || col.type === 'number' || col.type === 'stock';
  }

  protected text(row: number, col: number): string {
    return TEXT[(row * 3 + col) % TEXT.length];
  }
}
