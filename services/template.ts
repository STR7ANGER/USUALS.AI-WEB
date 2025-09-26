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
  token: string;
  page?: number;
  limit?: number;
}

export class TemplateService {
  private static baseUrl = `${API_BASE_URL}/video-templates`;

  static async fetchTemplates({ token, page = 1, limit = 20 }: FetchTemplatesParams): Promise<TemplatesResponse> {
    try {
      const url = `${this.baseUrl}?page=${page}&limit=${limit}`;
      console.log('🌐 TemplateService: Making API call to', url);
      const response = await fetch(url, {
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
      console.log('📊 TemplateService: Response data', { 
        dataLength: data.data?.length, 
        total: data.total, 
        page: data.page, 
        totalPages: data.totalPages 
      });
      
      return data;
    } catch (error) {
      console.error('Error fetching templates:', error);
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
