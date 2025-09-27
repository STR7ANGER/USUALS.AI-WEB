/**
 * Utility functions for handling video URLs and s3Keys
 */

import { CLOUDFRONT_URL } from './constants';

/**
 * Constructs a full video URL from an s3Key using CloudFront
 * @param s3Key - The s3 key for the video
 * @returns Full CloudFront URL for the video
 */
export function getVideoUrl(s3Key: string): string {
  if (!s3Key) return '';
  
  // If it's already a full URL, return as is
  if (s3Key.startsWith('http')) {
    return s3Key;
  }
  
  // Use CloudFront URL from environment
  if (!CLOUDFRONT_URL) {
    console.error('CLOUDFRONT_URL environment variable is not set');
    return '';
  }
  
  // Remove leading slash from s3Key if present
  const cleanS3Key = s3Key.startsWith('/') ? s3Key.slice(1) : s3Key;
  
  return `${CLOUDFRONT_URL}/${cleanS3Key}`;
}

/**
 * Checks if a string is a valid video URL
 * @param url - The URL to check
 * @returns True if it's a valid video URL
 */
export function isValidVideoUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
