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
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  totalAmount: number;
}

export interface OrderDetailsResponse {
  id: string;
  customerId: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: string;
  totalAmount: number;
  lines: OrderLineResponse[];
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
  status: OrderStatus;
}

export interface OrderLineRequest {
  productId: string;
  quantity: number;
  discount: number;
}

export interface OrderLineResponse {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
