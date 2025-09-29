import { API_BASE_URL } from '../lib/constants';
import { getVideoUrl } from '../lib/video-utils';
import { logError } from '../lib/error-handler';

export interface GenerateVideoRequest {
  description: string;
  jsonPrompt: string;
  projectId: string;
  segmentId: string;
  userPreferences: string;
}

export interface GenerateVideoResponse {
  optimizedPrompt: string;
  s3Key: string;
  segmentId: string;
  description: string;
}

export interface GeneratedVideo {
  id: string;
  s3Key: string;
  description: string;
  optimizedPrompt: string;
  segmentId: string;
  createdAt: string;
}

export interface ImageToVideoRequest {
  imageS3Key: string; // can be full URL or s3 key
  segmentId: string;
  prompt: string;
  duration: string;
  projectId: string;
  // Optional overrides; defaults applied if omitted
  aspect_ratio?: string; // e.g., '16:9'
  resolution?: string; // e.g., '720p'
  generate_audio?: boolean;
}

export interface ImageToVideoResponse {
  s3Key: string;
  segmentId: string;
  description: string;
}

export class VideoGenerationService {
  private static baseUrl = `${API_BASE_URL}/prompt-optimizer`;

  static async generateVideo(token: string, request: GenerateVideoRequest): Promise<GenerateVideoResponse> {
    try {
      
      const response = await fetch(`${this.baseUrl}/optimize-and-generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });


      if (!response.ok) {
        const errorText = await response.text();
        logError(`Failed to generate video: ${response.status} ${response.statusText}`, 'VideoGenerationService');
        throw new Error(`Failed to generate video: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      logError(error, 'VideoGenerationService.generateVideo');
      throw error;
    }
  }

  // Image to video generation for Solana templates
  static async generateImageToVideo(token: string, request: ImageToVideoRequest): Promise<ImageToVideoResponse> {
    try {
      // Determine if imageS3Key is a URL; if so, send via header and keep body payload
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      let bodyImageKey = request.imageS3Key;
      if (typeof request.imageS3Key === 'string' && request.imageS3Key.startsWith('http')) {
        headers['X-Image-Url'] = request.imageS3Key;
        // Try to also provide the path as key when possible
        try {
          const url = new URL(request.imageS3Key);
          bodyImageKey = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
        } catch {
          // Keep original if parsing fails
          bodyImageKey = request.imageS3Key;
        }
      }

      const payload: ImageToVideoRequest = {
        ...request,
        imageS3Key: bodyImageKey,
        generate_audio: request.generate_audio ?? true,
        resolution: request.resolution ?? '720p',
        aspect_ratio: request.aspect_ratio ?? '16:9',
      };

      const response = await fetch(`${API_BASE_URL}/video-gen/image-to-video`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logError(`Failed to generate image-to-video: ${response.status} ${response.statusText}`, 'VideoGenerationService');
        throw new Error(`Failed to generate image-to-video: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      logError(error, 'VideoGenerationService.generateImageToVideo');
      throw error;
    }
  }

  // Helper method to get video URL from s3Key using CloudFront
  static getVideoUrl(s3Key: string): string {
    return getVideoUrl(s3Key);
  }
}
