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
  hasMore: boolean;
}

export interface FetchTemplatesParams {
  token: string;
}

export class TemplateService {
  private static baseUrl = `${API_BASE_URL}/video-templates`;

  static async fetchTemplates({ token }: FetchTemplatesParams): Promise<VideoTemplate[]> {
    try {
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
      
      // Handle both array response and object response
      return Array.isArray(data) ? data : (data.templates || data.data || []);
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
}
