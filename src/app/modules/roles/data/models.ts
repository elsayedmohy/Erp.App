export interface RoleSummery {
  readonly id: string;
  readonly name: string;
}

export interface RoleResponse {
  readonly id: string;
  readonly name: string;
  readonly permissions: string[];
}

export interface RoleRequest {
  name: string;
  permissions: string[];
}

export interface PermissionGroup {
  module: string;
  label: string;
  codes: string[];
}
