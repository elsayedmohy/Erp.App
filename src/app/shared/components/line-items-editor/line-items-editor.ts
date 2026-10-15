import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import type { LineItem } from '@core/models';
import { UI } from '../../ui';

/**
 * Static line-items grid used by purchase orders, sales orders and invoices.
 * Rows are rendered from `items`; add/remove buttons are UI only.
 */
@Component({
  selector: 'app-line-items-editor',
  imports: [...UI, DecimalPipe],
  templateUrl: './line-items-editor.html',
  styleUrl: './line-items-editor.scss',
})
export class LineItemsEditor {
  readonly items = input<LineItem[]>([]);
  readonly products = input<string[]>([]);
  /** 'product' → product select; 'description' → free text (manual invoices) */
  readonly itemMode = input<'product' | 'description'>('product');
  readonly priceLabel = input('Unit price');
  readonly showDiscount = input(false);
  readonly showTax = input(false);
  readonly taxRates = input<string[]>([]);
  readonly total = input(0);
}
