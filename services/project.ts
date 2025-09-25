import { API_BASE_URL } from '../app/providers';

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  thumbnailUrl?: string;
  videoUrl?: string;
  duration?: number;
  templateId?: string;
  userId: string;
  metadata?: {
    [key: string]: any;
  };
}

export interface ProjectsResponse {
  projects: Project[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface FetchProjectsParams {
  token: string;
  page?: number;
  limit?: number;
}

export class ProjectService {
  private static baseUrl = `${API_BASE_URL}/projects`;

  static async fetchProjects({ token, page = 1, limit = 20 }: FetchProjectsParams): Promise<Project[]> {
    try {
      console.log('🌐 ProjectService: Making API call to', this.baseUrl);
      const response = await fetch(`${this.baseUrl}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('📡 ProjectService: Response received', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ProjectService: Error response', errorText);
        throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle both array response and object response
      return Array.isArray(data) ? data : (data.projects || data.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  static async fetchProjectById(id: string, token: string): Promise<Project> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.project || data.data || data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  static async deleteProject(id: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
}
