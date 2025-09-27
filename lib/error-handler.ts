/**
 * Centralized error handling utilities
 */

import { ERROR_MESSAGES } from './constants';

export interface AppErrorData {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
}

export class AppError extends Error {
  public code?: string;
  public status?: number;
  public details?: unknown;

  constructor(message: string, code?: string, status?: number, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Handles API errors and returns a standardized error message
 */
export function handleApiError(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    // Check for common network errors
    if (error.message.includes('fetch')) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return ERROR_MESSAGES.GENERIC_ERROR;
}

/**
 * Handles authentication errors
 */
export function handleAuthError(error: unknown): string {
  if (error instanceof AppError && error.status === 401) {
    return ERROR_MESSAGES.AUTH_REQUIRED;
  }

  return handleApiError(error);
}

/**
 * Handles video-related errors
 */
export function handleVideoError(error: unknown): string {
  if (error instanceof AppError) {
    switch (error.code) {
      case 'VIDEO_LOAD_FAILED':
        return ERROR_MESSAGES.VIDEO_LOAD_ERROR;
      case 'VIDEO_GENERATION_FAILED':
        return ERROR_MESSAGES.VIDEO_GENERATION_FAILED;
      default:
        return error.message;
    }
  }

  return handleApiError(error);
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(message: string, code?: string, status?: number): AppError {
  return new AppError(message, code, status);
}

/**
 * Logs errors in development mode
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    const prefix = context ? `[${context}]` : '[Error]';
    console.error(`${prefix}`, error);
  }
}
