import { HttpErrorResponse } from '@angular/common/http';
import { ApiError, ApiErrorResponse, ProblemDetails } from '@core/auth/auth.models';

function isProblemDetails(body: unknown): body is ProblemDetails {
  return !!body && typeof body === 'object' && 'detail' in body && body !== null;
}

export function toApiErrorResponse(errorResponse: unknown): ApiErrorResponse {
  if (isApiErrorResponse(errorResponse)) {
    return errorResponse;
  }
  if (errorResponse instanceof HttpErrorResponse) {
    const body: unknown = errorResponse.error;
    if (isProblemDetails(body)) {
      if (body.errors) {
        const errors: ApiError[] = Object.entries(body.errors).map(([field, messages]) => ({
          field,
          message: messages[0] ?? field,
        }));
        return {
          message: firstError(errors) ?? 'Validation failed.',
          errors,
        };
      }
      return {
        message: body.detail ?? 'Request failed',
      };
    }



    if (typeof body === 'string' && body.trim()) {
      return { message: body.trim() };
    }



    const fallback =
      errorResponse.status === 0
        ? 'Network error. Check your connection and try again.'
        : `Request failed (${errorResponse.status}).`;
    return { message: fallback };
  }

  if (errorResponse instanceof Error && errorResponse.message) {
    return { message: errorResponse.message };
  }

  return { message: 'Something went wrong.' };
}



export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (!value || typeof value !== 'object' || !('message' in value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return (
    (prototype === Object.prototype || prototype === null) && typeof value.message === 'string'
  );
}

function firstError(errors:ApiError[]): string | null {
  return errors[0]?.message ?? null;
}

