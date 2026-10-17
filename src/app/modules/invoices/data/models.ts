import { PageQuery, PaymentMethod } from '../../models';

export interface InvoiceQuery extends PageQuery {
  status?: InvoiceStatus | null;
  customerId?: string | null;
  from?: string | null;
  to?: string | null;
}

export interface CreateInvoiceRequest {
  customerId: string;
  invoiceDate?: string | null;
  dueDate?: string | null;
  lines: InvoiceLineRequest[];
}

export interface UpdateInvoiceRequest {
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  lines: InvoiceLineRequest[];
}

export interface InvoiceLineRequest {
  productId?: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number | null;
}

export interface InvoiceLineResponse {
  id: string;
  productId: string | null;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  lineNet: number;
  lineTax: number;
  lineTotal: number;
}

export interface InvoiceDetailsResponse {
  id: string;
  orderId: string | null;
  customerId: string;
  customerName: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAt: string | null;
  paymentMethod: PaymentMethod | null;
  lines: InvoiceLineResponse[];
}

export interface Invoice {
  id: string;
  orderId: string | null;
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  totalAmount: number;
  paidAt: string | null;
}

export interface PayInvoiceRequest {
  paymentMethod: PaymentMethod;
  paymentDate?: string | null;
}

export type InvoiceStatus = 'Issued' | 'Paid' | 'Draft' | 'Cancelled';
