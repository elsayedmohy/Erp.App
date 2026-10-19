import { PageQuery } from '../../models';
import { Category } from '../../categories/data/models';

export interface ProductQuery extends PageQuery {
  unitPrice?: number;
  stockQuantity?: number;
  categoryId?: string;
}

export interface ProductRequest {
  name: string;
  categoryId: string;
  sku: string;
  costPrice: number;
  unitPrice: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  sku: string;
  costPrice: number;
  unitPrice: number;
  stockQuantity: number;
  reorderLevel: number;
}

export interface ProductDetails {
  id: string;
  name: string;
  category: Category;
  sku: string;
  costPrice: number;
  unitPrice: number;
  stockQuantity: number;
  reorderLevel: number;
}
