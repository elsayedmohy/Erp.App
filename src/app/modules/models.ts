export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface PageQuery {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortDir?: SortDir;
}

export type SortDir = 'asc' | 'desc';
export type QueryValue = string | number | boolean | null | undefined;

export type PaymentMethod = 'Cash' | 'CreditCard';

export type ColumnType =
  | 'text'
  | 'strong'
  | 'money'
  | 'number'
  | 'badge'
  | 'person'
  | 'tags'
  | 'bool'
  | 'mono'
  | 'stock'
  | 'date'
  | 'datetime'
  | 'progress';

export interface Column<T = any> {
  key: string;
  label: string;
  type?: ColumnType;
  placeholder?: string;
  value?: (row: T) => unknown;
}
