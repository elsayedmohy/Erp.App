// Shape-only interfaces used by the UI. These mirror the schema in LEVEL1–3.md.

// Level 1
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
export interface Role {
  id: number;
  name: string;
  permissions: string[];
  usersCount: number;
}
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
}
export interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
}
export interface Category {
  id: number;
  name: string;
  productsCount: number;
}
export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  costPrice: number;
  stockQuantity: number;
  reorderLevel: number;
}
export interface LineItem {
  product: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  taxRate?: number;
}
export interface PurchaseOrder {
  id: number;
  supplier: string;
  orderDate: string;
  expectedDelivery: string;
  status: 'Pending' | 'Received' | 'Cancelled';
  totalAmount: number;
  lines: LineItem[];
}
export interface SalesOrder {
  id: number;
  customer: string;
  orderDate: string;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  paymentMethod: string;
  shippingAddress: string;
  totalAmount: number;
  lines: LineItem[];
}
export interface Invoice {
  id: number;
  number: string;
  customer: string;
  invoiceDate: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  totalAmount: number;
  paidAt?: string;
  lines: LineItem[];
}
export interface Department {
  id: number;
  name: string;
}
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  salary: number;
}

// Level 2
export interface Project {
  id: number;
  name: string;
  description: string;
  owner: string;
  startDate: string;
  dueDate: string;
  status: 'Planned' | 'Active' | 'OnHold' | 'Completed';
  tasksCount: number;
  progress: number;
}
export interface ProjectMember {
  name: string;
  role: string;
}
export interface Task {
  id: number;
  project: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  dueDate: string;
  status: 'ToDo' | 'InProgress' | 'Blocked' | 'Done';
}
export interface TaskComment {
  id: number;
  author: string;
  body: string;
  createdAt: string;
}

// Level 3
export interface AutomationRule {
  id: number;
  name: string;
  trigger: string;
  action: string;
  target: string;
  enabled: boolean;
  updatedAt: string;
}
export interface AutomationRun {
  id: number;
  rule: string;
  eventId: string;
  status: 'Succeeded' | 'Failed' | 'Running';
  startedAt: string;
  completedAt: string;
  errorSummary?: string;
}
export interface AppNotification {
  id: number;
  type: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}
export interface NotificationPreference {
  eventType: string;
  inApp: boolean;
  email: boolean;
}
export interface AuditLog {
  id: number;
  actor: string;
  action: string;
  entityType: string;
  entityId: number;
  occurredAt: string;
  correlationId: string;
  before: string;
  after: string;
}
export interface WebhookEndpoint {
  id: number;
  url: string;
  eventTypes: string[];
  enabled: boolean;
  createdAt: string;
}
export interface WebhookDelivery {
  id: number;
  event: string;
  eventId: string;
  status: 'Delivered' | 'Failed' | 'Pending';
  attemptCount: number;
  lastResponseCode: number | null;
  nextAttemptAt: string;
}
export interface StatItem {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
  icon: string;
}
