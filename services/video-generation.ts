import { API_BASE_URL } from '../app/providers';
import { getVideoUrl } from '../lib/video-utils';

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
        console.error('VideoGenerationService: Error response', errorText);
        throw new Error(`Failed to generate video: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  // Helper method to get video URL from s3Key using CloudFront
  static getVideoUrl(s3Key: string): string {
    return getVideoUrl(s3Key);
  }
}
