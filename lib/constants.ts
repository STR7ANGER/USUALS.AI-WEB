/**
 * Application constants
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

// Application Limits
export const MAX_SEGMENTS = 5;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_TEMPLATES_PER_PAGE = 20;

// UI Constants
export const SIDEBAR_WIDTH = 384; // 24rem
export const SIDEBAR_RAIL_WIDTH = 80; // 5rem
export const HEADER_HEIGHT = 64; // 4rem

// Video Player Constants
export const VIDEO_SEEK_TIME = 10; // seconds
export const VIDEO_LOADING_TIMEOUT = 30000; // 30 seconds

// Error Messages
export const ERROR_MESSAGES = {
  AUTH_REQUIRED: 'Authentication required',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  VIDEO_LOAD_ERROR: 'Failed to load video. Please try again.',
  TEMPLATE_NOT_FOUND: 'Template not found',
  PROJECT_NOT_FOUND: 'Project not found',
  SEGMENT_CREATION_FAILED: 'Failed to create segment',
  VIDEO_GENERATION_FAILED: 'Failed to generate video',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  VIDEO_GENERATED: 'Video generated successfully',
  SEGMENT_CREATED: 'Segment created successfully',
  PROJECT_SAVED: 'Project saved successfully',
} as const;

// Validation Constants
export const VALIDATION = {
  MIN_PROJECT_NAME_LENGTH: 1,
  MAX_PROJECT_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 1,
  MAX_DESCRIPTION_LENGTH: 500,
} as const;
