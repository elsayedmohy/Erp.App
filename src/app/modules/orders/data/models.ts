import { PageQuery, PaymentMethod } from '../../models';

export interface OrderQuery extends PageQuery {
  status?: OrderStatus | null;
  customerId?: string | null;
  from?: string | null;
  to?: string | null;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  totalAmount: number;
}

export interface OrderDetails {
  id: string;
  customerId: string;
  invoiceId: string;
  customerName: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  totalAmount: number;
  lines: OrderLine[];
}

export interface CreateOrderRequest {
  customerId: string;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  lines: OrderLineRequest[];
  orderDate?: string | null;
}

export interface UpdateOrderRequest {
  paymentMethod: PaymentMethod;
  shippingAddress: string;
}

export interface UpdateOrderStatusRequest {
  status: string ;
}

export interface OrderLineRequest {
  productId: string;
  quantity: number;
  discount: number;
}

export interface OrderLine {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
