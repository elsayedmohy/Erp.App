export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

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

export interface ProblemDetails {
  readonly type?: string;
  readonly title?: string;
  readonly status?: number;
  readonly detail?: string;
  readonly instance?: string;
  readonly errors?: Record<string, string[]>;
}

export interface ApiError {
  readonly message: string;
  readonly field?: string;
  readonly code?: string;
}

export interface ApiErrorResponse {
  readonly message: string;
  readonly errors?: ApiError[];
}

export interface TokensResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
}
