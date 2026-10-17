// ============================================================================
// DUMMY DATA — UI preview only.
// Every page reads its placeholder data from this single file.
// Delete this file (and the `@mock/mock-data` imports) once real services exist.
// ============================================================================

import type {
  AppNotification,
  AuditLog,
  AutomationRule,
  AutomationRun,
  Category,
  Department,
  Employee,
  Invoice,
  NotificationPreference,
  Product,
  Project,
  ProjectMember,
  PurchaseOrder,
  SalesOrder,
  StatItem,
  Supplier,
  Task,
  TaskComment,
  WebhookDelivery,
  WebhookEndpoint,
} from '../core/models';
import { Role, User } from '@core/auth/auth.models';
import { Customer } from '../modules/customers/data/model';

// ---------- Lookups (dropdown options) ----------
export const MOCK_ROLE_NAMES = ['Admin', 'Manager', 'InventoryManager', 'Accountant', 'Employee'];
export const MOCK_PAYMENT_TERMS = ['Net 15', 'Net 30', 'Net 60', 'Due on receipt'];
export const MOCK_PAYMENT_METHODS = ['CreditCard', 'BankTransfer', 'Cash', 'Cheque'];
export const MOCK_TAX_RATES = ['0%', '5%', '10%', '14%'];
export const MOCK_PROJECT_STATUSES = ['Planned', 'Active', 'OnHold', 'Completed'];
export const MOCK_TASK_STATUSES = ['ToDo', 'InProgress', 'Blocked', 'Done'];
export const MOCK_TASK_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
export const MOCK_ORDER_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
export const MOCK_PO_STATUSES = ['Pending', 'Received', 'Cancelled'];
export const MOCK_INVOICE_STATUSES = ['Draft', 'Sent', 'Paid', 'Overdue'];
export const MOCK_AUTOMATION_TRIGGERS = ['InventoryBelowReorderLevel', 'InvoiceOverdue'];
export const MOCK_AUTOMATION_ACTIONS = ['NotifyRole', 'NotifyUser'];
export const MOCK_WEBHOOK_EVENTS = [
  'order.created',
  'invoice.paid',
  'inventory.low_stock',
  'task.status_changed',
];
export const MOCK_AUDIT_ENTITY_TYPES = [
  'User',
  'Role',
  'Product',
  'Order',
  'Invoice',
  'Project',
  'Task',
  'AutomationRule',
  'WebhookEndpoint',
];
export const MOCK_AUDIT_ACTIONS = [
  'Created',
  'Updated',
  'Deleted',
  'StatusChanged',
  'StockAdjusted',
];
export const MOCK_PERMISSIONS = [
  'users.read',
  'users.write',
  'inventory.read',
  'inventory.write',
  'finance.read',
  'finance.write',
  'hr.read',
  'hr.write',
  'projects.manage',
  'reports.view',
];

// ---------- Level 1 ----------
export const MOCK_USERS: User[] = [
  { id: "1", firstName: 'Admin', lastName: 'User', email: 'admin@company.com', role: 'Admin' },
  { id: "2", firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', role: 'Manager' },
  {
    id: "3",
    firstName: 'Mona',
    lastName: 'Hassan',
    email: 'mona.hassan@company.com',
    role: 'Accountant',
  },
  {
    id: "4",
    firstName: 'Omar',
    lastName: 'Farouk',
    email: 'omar.farouk@company.com',
    role: 'InventoryManager',
  },
  {
    id: "5",
    firstName: 'Lina',
    lastName: 'Saleh',
    email: 'lina.saleh@company.com',
    role: 'Employee',
  },
];

export const MOCK_ROLES: Role[] = [
  { id: "1", name: 'Admin', permissions: ['*'], usersCount: 1 },
  {
    id: "2",
    name: 'Manager',
    permissions: ['projects.manage', 'reports.view', 'users.read'],
    usersCount: 3,
  },
  {
    id: "3",
    name: 'InventoryManager',
    permissions: ['inventory.read', 'inventory.write'],
    usersCount: 2,
  },
  { id: "4", name: 'Accountant', permissions: ['finance.read', 'finance.write'], usersCount: 2 },
  { id: "5", name: 'Employee', permissions: ['projects.read'], usersCount: 14 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'info@acme.com',
    phoneNumber: '+1-555-000-1234',
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    taxId: 'US123456789',
  },
  {
    id: '2',
    name: 'Globex Ltd',
    email: 'sales@globex.co.uk',
    phoneNumber: '+44-20-7946-0000',
    address: '1 King St',
    city: 'London',
    country: 'UK',
    taxId: 'GB987654321',
  },
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 1,
    companyName: 'TechParts Inc',
    contactName: 'Mark Lee',
    email: 'mark@techparts.com',
    phone: '+1-555-300-1111',
    address: '9 Silicon Ave, San Jose',
    paymentTerms: 'Net 30',
  },
  {
    id: 2,
    companyName: 'Office Supply Co',
    contactName: 'Anna Berg',
    email: 'anna@officesupply.com',
    phone: '+1-555-300-2222',
    address: '77 Paper Rd, Chicago',
    paymentTerms: 'Net 15',
  },
  {
    id: 3,
    companyName: 'Delta Logistics',
    contactName: 'Karim Adel',
    email: 'karim@deltalog.eg',
    phone: '+20-3-555-7777',
    address: 'Port Said St, Alexandria',
    paymentTerms: 'Net 60',
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Accessories', productsCount: 24 },
  { id: 2, name: 'Monitors', productsCount: 8 },
  { id: 3, name: 'Laptops', productsCount: 12 },
  { id: 4, name: 'Office Furniture', productsCount: 6 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Laptop Pro 15',
    sku: 'LP-15-001',
    category: 'Laptops',
    unitPrice: 1299.99,
    costPrice: 950,
    stockQuantity: 50,
    reorderLevel: 10,
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    sku: 'WM-200',
    category: 'Accessories',
    unitPrice: 29.99,
    costPrice: 12,
    stockQuantity: 6,
    reorderLevel: 20,
  },
  {
    id: 3,
    name: '27" 4K Monitor',
    sku: 'MN-27-4K',
    category: 'Monitors',
    unitPrice: 449,
    costPrice: 310,
    stockQuantity: 18,
    reorderLevel: 5,
  },
  {
    id: 4,
    name: 'Ergonomic Chair',
    sku: 'CH-ERG-01',
    category: 'Office Furniture',
    unitPrice: 349,
    costPrice: 220,
    stockQuantity: 3,
    reorderLevel: 4,
  },
  {
    id: 5,
    name: 'USB-C Dock',
    sku: 'DK-USBC-7',
    category: 'Accessories',
    unitPrice: 159,
    costPrice: 90,
    stockQuantity: 41,
    reorderLevel: 10,
  },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 1001,
    supplier: 'TechParts Inc',
    orderDate: '2026-09-02',
    expectedDelivery: '2026-09-20',
    status: 'Received',
    totalAmount: 19000,
    lines: [{ product: 'Laptop Pro 15', quantity: 20, unitPrice: 950 }],
  },
  {
    id: 1002,
    supplier: 'Office Supply Co',
    orderDate: '2026-10-01',
    expectedDelivery: '2026-10-18',
    status: 'Pending',
    totalAmount: 1540,
    lines: [
      { product: 'Wireless Mouse', quantity: 50, unitPrice: 12 },
      { product: 'Ergonomic Chair', quantity: 4, unitPrice: 235 },
    ],
  },
  {
    id: 1003,
    supplier: 'Delta Logistics',
    orderDate: '2026-10-05',
    expectedDelivery: '2026-11-01',
    status: 'Cancelled',
    totalAmount: 3100,
    lines: [{ product: '27" 4K Monitor', quantity: 10, unitPrice: 310 }],
  },
];

export const MOCK_ORDERS: SalesOrder[] = [
  {
    id: 5001,
    customer: 'Acme Corp',
    orderDate: '2026-10-10',
    status: 'Pending',
    paymentMethod: 'CreditCard',
    shippingAddress: '123 Main St, New York, USA',
    totalAmount: 2759.97,
    lines: [
      { product: 'Laptop Pro 15', quantity: 2, unitPrice: 1299.99, discount: 0 },
      { product: 'USB-C Dock', quantity: 1, unitPrice: 159, discount: 0 },
    ],
  },
  {
    id: 5002,
    customer: 'Globex Ltd',
    orderDate: '2026-10-08',
    status: 'Confirmed',
    paymentMethod: 'BankTransfer',
    shippingAddress: '1 King St, London, UK',
    totalAmount: 898,
    lines: [{ product: '27" 4K Monitor', quantity: 2, unitPrice: 449, discount: 0 }],
  },
  {
    id: 5003,
    customer: 'Nile Trading',
    orderDate: '2026-10-03',
    status: 'Shipped',
    paymentMethod: 'Cash',
    shippingAddress: '45 Tahrir Sq, Cairo, Egypt',
    totalAmount: 299.9,
    lines: [{ product: 'Wireless Mouse', quantity: 10, unitPrice: 29.99, discount: 0 }],
  },
  {
    id: 5004,
    customer: 'Initech',
    orderDate: '2026-09-28',
    status: 'Delivered',
    paymentMethod: 'CreditCard',
    shippingAddress: '500 Office Park, Austin, USA',
    totalAmount: 1047,
    lines: [{ product: 'Ergonomic Chair', quantity: 3, unitPrice: 349, discount: 0 }],
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 1,
    number: 'INV-2026-0101',
    customer: 'Acme Corp',
    invoiceDate: '2026-10-10',
    dueDate: '2026-11-09',
    status: 'Draft',
    totalAmount: 2759.97,
    lines: [
      { product: 'Laptop Pro 15', quantity: 2, unitPrice: 1299.99, taxRate: 0 },
      { product: 'USB-C Dock', quantity: 1, unitPrice: 159, taxRate: 0 },
    ],
  },
  {
    id: 2,
    number: 'INV-2026-0098',
    customer: 'Globex Ltd',
    invoiceDate: '2026-10-08',
    dueDate: '2026-11-07',
    status: 'Sent',
    totalAmount: 898,
    lines: [{ product: '27" 4K Monitor', quantity: 2, unitPrice: 449, taxRate: 0 }],
  },
  {
    id: 3,
    number: 'INV-2026-0090',
    customer: 'Initech',
    invoiceDate: '2026-09-28',
    dueDate: '2026-10-12',
    status: 'Paid',
    totalAmount: 1047,
    paidAt: '2026-10-05',
    lines: [{ product: 'Ergonomic Chair', quantity: 3, unitPrice: 349, taxRate: 0 }],
  },
  {
    id: 4,
    number: 'INV-2026-0071',
    customer: 'Umbrella GmbH',
    invoiceDate: '2026-08-20',
    dueDate: '2026-09-19',
    status: 'Overdue',
    totalAmount: 4120,
    lines: [{ product: 'Consulting services', quantity: 10, unitPrice: 412, taxRate: 0 }],
  },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Finance' },
  { id: 3, name: 'Sales' },
  { id: 4, name: 'Human Resources' },
  { id: 5, name: 'Operations' },
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 1,
    firstName: 'Sara',
    lastName: 'Ahmed',
    email: 'sara.ahmed@company.com',
    phone: '+20-555-123456',
    department: 'Engineering',
    position: 'Senior Developer',
    hireDate: '2026-06-13',
    salary: 8500,
  },
  {
    id: 2,
    firstName: 'Youssef',
    lastName: 'Nabil',
    email: 'youssef.nabil@company.com',
    phone: '+20-555-654321',
    department: 'Sales',
    position: 'Account Executive',
    hireDate: '2024-02-01',
    salary: 6200,
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Clark',
    email: 'emily.clark@company.com',
    phone: '+1-555-777-8888',
    department: 'Finance',
    position: 'Financial Analyst',
    hireDate: '2023-09-15',
    salary: 7100,
  },
  {
    id: 4,
    firstName: 'Ahmed',
    lastName: 'Samir',
    email: 'ahmed.samir@company.com',
    phone: '+20-555-112233',
    department: 'Operations',
    position: 'Warehouse Lead',
    hireDate: '2022-11-03',
    salary: 5400,
  },
];

// ---------- Level 2 ----------
export const MOCK_PROJECTS: Project[] = [
  {
    id: 24,
    name: 'Warehouse Upgrade',
    description: 'Modernize inventory receiving and tracking.',
    owner: 'John Doe',
    startDate: '2026-07-01',
    dueDate: '2026-10-30',
    status: 'Active',
    tasksCount: 12,
    progress: 58,
  },
  {
    id: 25,
    name: 'Finance Portal',
    description: 'Self-service invoice portal for customers.',
    owner: 'Mona Hassan',
    startDate: '2026-09-01',
    dueDate: '2027-01-15',
    status: 'Planned',
    tasksCount: 4,
    progress: 5,
  },
  {
    id: 26,
    name: 'HR Onboarding',
    description: 'Digitize the employee onboarding checklist.',
    owner: 'Lina Saleh',
    startDate: '2026-05-10',
    dueDate: '2026-08-30',
    status: 'Completed',
    tasksCount: 9,
    progress: 100,
  },
  {
    id: 27,
    name: 'Supplier Integration',
    description: 'EDI connection with key suppliers.',
    owner: 'Omar Farouk',
    startDate: '2026-06-15',
    dueDate: '2026-12-01',
    status: 'OnHold',
    tasksCount: 7,
    progress: 30,
  },
];

export const MOCK_PROJECT_MEMBERS: ProjectMember[] = [
  { name: 'John Doe', role: 'Owner' },
  { name: 'Sara Ahmed', role: 'Developer' },
  { name: 'Ahmed Samir', role: 'Member' },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 42,
    project: 'Warehouse Upgrade',
    title: 'Add barcode scanning',
    description: 'Scan item barcodes during receiving.',
    assignee: 'Sara Ahmed',
    priority: 'High',
    dueDate: '2026-08-15',
    status: 'InProgress',
  },
  {
    id: 43,
    project: 'Warehouse Upgrade',
    title: 'Label printer setup',
    description: 'Configure label printers at docks 1–3.',
    assignee: 'Ahmed Samir',
    priority: 'Medium',
    dueDate: '2026-10-20',
    status: 'ToDo',
  },
  {
    id: 44,
    project: 'Finance Portal',
    title: 'Design invoice view',
    description: 'Mockups for the customer invoice page.',
    assignee: 'Emily Clark',
    priority: 'Low',
    dueDate: '2026-11-01',
    status: 'ToDo',
  },
  {
    id: 45,
    project: 'Supplier Integration',
    title: 'EDI vendor contract',
    description: 'Waiting on legal review.',
    assignee: 'Omar Farouk',
    priority: 'Urgent',
    dueDate: '2026-10-01',
    status: 'Blocked',
  },
  {
    id: 46,
    project: 'HR Onboarding',
    title: 'Checklist templates',
    description: 'Create department templates.',
    assignee: 'Lina Saleh',
    priority: 'Medium',
    dueDate: '2026-08-01',
    status: 'Done',
  },
];

export const MOCK_TASK_COMMENTS: TaskComment[] = [
  {
    id: 1,
    author: 'Sara Ahmed',
    body: 'The scanner is ready for testing in the staging environment.',
    createdAt: '2026-10-12 14:20',
  },
  {
    id: 2,
    author: 'John Doe',
    body: 'Great — please share the test checklist with the warehouse team.',
    createdAt: '2026-10-12 15:02',
  },
  {
    id: 3,
    author: 'Ahmed Samir',
    body: 'We can test on dock 2 tomorrow morning.',
    createdAt: '2026-10-13 09:11',
  },
];

// ---------- Level 3 ----------
export const MOCK_DASHBOARD_STATS: StatItem[] = [
  {
    label: 'Revenue (30d)',
    value: '$48,320',
    trend: '+12.4%',
    positive: true,
    icon: '@tui.dollar-sign',
  },
  { label: 'Open orders', value: '37', trend: '+5', positive: true, icon: '@tui.shopping-cart' },
  { label: 'Low-stock products', value: '6', trend: '+2', positive: false, icon: '@tui.package' },
  {
    label: 'Overdue invoices',
    value: '$9,870',
    trend: '-3.1%',
    positive: true,
    icon: '@tui.file-warning',
  },
  { label: 'Open tasks', value: '28', trend: '-4', positive: true, icon: '@tui.list-checks' },
];

export const MOCK_SALES_CHART: [number, number][] = [
  [0, 32],
  [1, 41],
  [2, 38],
  [3, 52],
  [4, 47],
  [5, 60],
  [6, 58],
  [7, 71],
  [8, 66],
  [9, 80],
  [10, 76],
  [11, 88],
];
export const MOCK_SALES_CHART_LABELS = [
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
];

export const MOCK_TASKS_BY_STATUS = {
  labels: ['ToDo', 'InProgress', 'Blocked', 'Done'],
  values: [[14, 9, 3, 22]],
};
export const MOCK_INVOICES_BY_STATUS = {
  labels: ['Draft', 'Sent', 'Paid', 'Overdue'],
  values: [8, 15, 42, 5],
};

export const MOCK_SALES_REPORT = [
  { period: '2026-07', orders: 112, total: 38200 },
  { period: '2026-08', orders: 128, total: 41950 },
  { period: '2026-09', orders: 119, total: 40110 },
  { period: '2026-10', orders: 74, total: 26480 },
];
export const MOCK_INVOICE_AGING = [
  { bucket: 'Current', count: 15, total: 18400 },
  { bucket: '1–30 days', count: 3, total: 5200 },
  { bucket: '31–60 days', count: 1, total: 2550 },
  { bucket: '60+ days', count: 1, total: 2120 },
];
export const MOCK_TASK_REPORT = [
  { project: 'Warehouse Upgrade', todo: 4, inProgress: 3, blocked: 0, done: 5 },
  { project: 'Finance Portal', todo: 3, inProgress: 1, blocked: 0, done: 0 },
  { project: 'Supplier Integration', todo: 2, inProgress: 1, blocked: 2, done: 2 },
  { project: 'HR Onboarding', todo: 0, inProgress: 0, blocked: 0, done: 9 },
];
export const MOCK_EXPORT_JOBS = [
  {
    id: 'job_7f3a',
    report: 'sales',
    status: 'Completed',
    createdAt: '2026-10-14 10:02',
    expiresAt: '2026-10-15 10:02',
  },
  {
    id: 'job_8b1c',
    report: 'invoices',
    status: 'Running',
    createdAt: '2026-10-15 08:40',
    expiresAt: '—',
  },
];

export const MOCK_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 1,
    name: 'Alert when stock is low',
    trigger: 'InventoryBelowReorderLevel',
    action: 'NotifyRole',
    target: 'InventoryManager',
    enabled: true,
    updatedAt: '2026-10-01',
  },
  {
    id: 2,
    name: 'Overdue invoice reminder',
    trigger: 'InvoiceOverdue',
    action: 'NotifyUser',
    target: 'Mona Hassan',
    enabled: true,
    updatedAt: '2026-09-18',
  },
  {
    id: 3,
    name: 'Escalate overdue to finance',
    trigger: 'InvoiceOverdue',
    action: 'NotifyRole',
    target: 'Accountant',
    enabled: false,
    updatedAt: '2026-08-30',
  },
];

export const MOCK_AUTOMATION_RUNS: AutomationRun[] = [
  {
    id: 901,
    rule: 'Alert when stock is low',
    eventId: 'evt_01J9K2',
    status: 'Succeeded',
    startedAt: '2026-10-14 09:00:01',
    completedAt: '2026-10-14 09:00:02',
  },
  {
    id: 902,
    rule: 'Overdue invoice reminder',
    eventId: 'evt_01J9K8',
    status: 'Failed',
    startedAt: '2026-10-14 12:00:00',
    completedAt: '2026-10-14 12:00:04',
    errorSummary: 'Email provider timed out after 3 retries.',
  },
  {
    id: 903,
    rule: 'Alert when stock is low',
    eventId: 'evt_01J9M1',
    status: 'Running',
    startedAt: '2026-10-15 08:30:00',
    completedAt: '—',
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    type: 'inventory.low_stock',
    title: 'Low stock: Wireless Mouse',
    body: 'Stock (6) is below the reorder level (20).',
    createdAt: '10 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'invoice.overdue',
    title: 'Invoice INV-2026-0071 overdue',
    body: 'Umbrella GmbH — $4,120 due 2026-09-19.',
    createdAt: '1 h ago',
    read: false,
  },
  {
    id: 3,
    type: 'task.assigned',
    title: 'New task assigned',
    body: 'You were assigned "Label printer setup".',
    createdAt: 'Yesterday',
    read: false,
  },
  {
    id: 4,
    type: 'order.created',
    title: 'New order #5001',
    body: 'Acme Corp placed an order of $2,759.97.',
    createdAt: '2 days ago',
    read: true,
  },
  {
    id: 5,
    type: 'task.comment',
    title: 'New comment on "Add barcode scanning"',
    body: 'Ahmed Samir: We can test on dock 2 tomorrow morning.',
    createdAt: '2 days ago',
    read: true,
  },
];

export const MOCK_NOTIFICATION_PREFERENCES: NotificationPreference[] = [
  { eventType: 'Low stock alerts', inApp: true, email: true },
  { eventType: 'Invoice overdue', inApp: true, email: true },
  { eventType: 'Task assigned to me', inApp: true, email: false },
  { eventType: 'Comments on my tasks', inApp: true, email: false },
  { eventType: 'New sales orders', inApp: false, email: false },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 7001,
    actor: 'Admin User',
    action: 'Updated',
    entityType: 'Role',
    entityId: 2,
    occurredAt: '2026-10-15 08:12',
    correlationId: 'c-1a2b3c',
    before: '{\n  "permissions": ["projects.manage"]\n}',
    after: '{\n  "permissions": ["projects.manage", "reports.view"]\n}',
  },
  {
    id: 7002,
    actor: 'Omar Farouk',
    action: 'StockAdjusted',
    entityType: 'Product',
    entityId: 2,
    occurredAt: '2026-10-14 16:40',
    correlationId: 'c-4d5e6f',
    before: '{\n  "stockQuantity": 16\n}',
    after: '{\n  "stockQuantity": 6,\n  "reason": "Damaged in transit"\n}',
  },
  {
    id: 7003,
    actor: 'Mona Hassan',
    action: 'StatusChanged',
    entityType: 'Invoice',
    entityId: 3,
    occurredAt: '2026-10-05 11:05',
    correlationId: 'c-7g8h9i',
    before: '{\n  "status": "Sent"\n}',
    after: '{\n  "status": "Paid"\n}',
  },
  {
    id: 7004,
    actor: 'John Doe',
    action: 'Created',
    entityType: 'Task',
    entityId: 43,
    occurredAt: '2026-10-02 10:00',
    correlationId: 'c-0j1k2l',
    before: '—',
    after: '{\n  "title": "Label printer setup",\n  "priority": "Medium"\n}',
  },
];

export const MOCK_WEBHOOK_ENDPOINTS: WebhookEndpoint[] = [
  {
    id: 1,
    url: 'https://hooks.partner-erp.com/orders',
    eventTypes: ['order.created', 'invoice.paid'],
    enabled: true,
    createdAt: '2026-09-01',
  },
  {
    id: 2,
    url: 'https://ops.example.com/webhooks/stock',
    eventTypes: ['inventory.low_stock'],
    enabled: true,
    createdAt: '2026-09-12',
  },
  {
    id: 3,
    url: 'https://pm.example.com/hooks/tasks',
    eventTypes: ['task.status_changed'],
    enabled: false,
    createdAt: '2026-10-02',
  },
];

export const MOCK_WEBHOOK_DELIVERIES: WebhookDelivery[] = [
  {
    id: 3301,
    event: 'order.created',
    eventId: 'evt_01J9K2',
    status: 'Delivered',
    attemptCount: 1,
    lastResponseCode: 200,
    nextAttemptAt: '—',
  },
  {
    id: 3302,
    event: 'invoice.paid',
    eventId: 'evt_01J9K5',
    status: 'Failed',
    attemptCount: 5,
    lastResponseCode: 503,
    nextAttemptAt: '—',
  },
  {
    id: 3303,
    event: 'order.created',
    eventId: 'evt_01J9M0',
    status: 'Pending',
    attemptCount: 2,
    lastResponseCode: 500,
    nextAttemptAt: '2026-10-15 09:12',
  },
];

export const MOCK_WEBHOOK_SECRET = 'whsec_EXAMPLE_ONLY_not_a_real_secret_123456';

export const MOCK_CURRENT_USER = {
  name: 'Admin User',
  email: 'admin@company.com',
  initials: 'AU',
  roles: ['Admin'],
};
