import { API_BASE_URL } from '../lib/constants';
import { logError } from '../lib/error-handler';

export interface VideoTemplate {
  id: string;
  description: string;
  jsonPrompt: string;
  s3Key: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplatesResponse {
  data: VideoTemplate[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TrendingTemplatesResponse {
  templates: VideoTemplate[];
  totalCount: number;
}

export interface FetchTemplatesParams {
  page?: number;
  limit?: number;
}

export class TemplateService {
  private static baseUrl = `${API_BASE_URL}/video-templates`;

  static async fetchTemplates({ page = 1, limit = 20 }: FetchTemplatesParams): Promise<TemplatesResponse> {
    try {
      const url = `${this.baseUrl}?page=${page}&limit=${limit}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        logError(`Failed to fetch templates: ${response.status} ${response.statusText}`, 'TemplateService');
        throw new Error(`Failed to fetch templates: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      logError(error, 'TemplateService.fetchTemplates');
      throw error;
    }
  }


  static async fetchTrendingTemplates(description: string = "Trending"): Promise<TrendingTemplatesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/find-similar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('TemplateService: Error response', errorText);
        throw new Error(`Failed to fetch trending templates: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trending templates:', error);
      throw error;
    }
  }
}
