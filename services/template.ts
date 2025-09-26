import { API_BASE_URL } from '../app/providers';

export interface VideoTemplate {
  id: string;
  description: string;
  jsonPrompt: string;
  s3Key: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplatesResponse {
  templates: VideoTemplate[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
  hasMore: boolean;
}

export interface TrendingTemplatesResponse {
  templates: VideoTemplate[];
  totalCount: number;
}

export interface FetchTemplatesParams {
  token: string;
  page?: number;
  limit?: number;
}

export class TemplateService {
  private static baseUrl = `${API_BASE_URL}/video-templates`;

  static async fetchTemplates({ token, page = 1, limit = 12 }: FetchTemplatesParams): Promise<TemplatesResponse> {
    try {
      // Single request: do not add pagination params; backend may still support them, but we intentionally fetch all
      console.log('🌐 TemplateService: Making API call to', this.baseUrl);
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('📡 TemplateService: Response received', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('TemplateService: Error response', errorText);
        throw new Error(`Failed to fetch templates: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      // Normalize response to TemplatesResponse
      if (Array.isArray(data)) {
        const total = data.length;
        return { templates: data, total, page: 1, limit: total, totalPages: 1, hasMore: false };
      }
      const templates: VideoTemplate[] = data.templates || data.data || [];
      const total: number = data.total ?? templates.length;
      // Treat as single-shot: report that all are included
      return { templates, total, page: 1, limit: total, totalPages: 1, hasMore: false };
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  }

  static async fetchTemplateById(id: string, token: string): Promise<VideoTemplate> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch template: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.template || data.data || data;
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  }

  static async fetchTrendingTemplates(token: string, description: string = "Trending"): Promise<TrendingTemplatesResponse> {
    try {
      console.log('🌐 TemplateService: Making API call to trending templates with description:', description);
      const response = await fetch(`${this.baseUrl}/find-similar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description
        }),
      });
      console.log('📡 TemplateService: Trending response received', response.status);

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
