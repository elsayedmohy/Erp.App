import { PageQuery } from '../../models';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
}

export interface CustomerRequest {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
}

export type CustomerQuery = PageQuery;

