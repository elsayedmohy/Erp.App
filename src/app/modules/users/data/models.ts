import { PageQuery } from '../../models';
import { RoleSummery } from '../../roles/data/models';

export interface UserQuery extends PageQuery {}

export interface UserResponse {
  id: string;
  role: RoleSummery;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  password?: string | null;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  roleId: string;
}

type UserField = 'firstName' | 'lastName' | 'email' | 'password';

export interface UserFieldDef {
  key: UserField;
  label: string;
  placeholder: string;
  type?: string;
  max: number;
  wide?: boolean;
  createOnly?: boolean;
  lockedOnEdit?: boolean;
}
