import { API_BASE_URL, CLOUDFRONT_URL } from '../lib/constants';
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
  imageS3Key: string;
  segmentId: string;
  prompt: string;
  duration: string;
  aspect_ratio?: string;
  resolution?: string;
  generate_audio?: boolean;
  projectId: string;
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
      // Extract image URL from CloudFront URL
      const imageUrl = request.imageS3Key.startsWith('http') 
        ? request.imageS3Key 
        : `${CLOUDFRONT_URL}/${request.imageS3Key}`;

      // Prepare payload with defaults
      const payload = {
        segmentId: request.segmentId,
        prompt: request.prompt,
        duration: request.duration,
        aspect_ratio: request.aspect_ratio || "16:9",
        resolution: request.resolution || "720p",
        generate_audio: request.generate_audio !== undefined ? request.generate_audio : true,
        projectId: request.projectId
      };

      const response = await fetch(`${API_BASE_URL}/video-gen/image-to-video`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Image-URL': imageUrl, // Send image URL as header
        },
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
