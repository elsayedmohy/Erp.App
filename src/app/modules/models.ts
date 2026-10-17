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
