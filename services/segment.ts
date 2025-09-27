export interface CreateSegmentRequest {
  type: string;
  description: string;
  projectId: string;
}

export interface Segment {
  id: string;
  type: string;
  description: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SegmentVideo {
  id: string;
  description: string;
  jsonPrompt: {
    prompt: string;
    style?: string;
    [key: string]: any;
  };
  segmentId: string;
  s3Key: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSegmentsResponse {
  projectId: string;
  segments: Segment[];
  count: number;
}

export interface SegmentVideosResponse {
  segmentId: string;
  projectId: string;
  videos: SegmentVideo[];
  count: number;
}

import { API_BASE_URL } from '../lib/constants';
import { logError } from '../lib/error-handler';

export class SegmentService {
  private static baseUrl = API_BASE_URL || '';

  static async createSegment(token: string, data: CreateSegmentRequest): Promise<Segment> {
    const response = await fetch(`${this.baseUrl}/web/segment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      logError(`Failed to create segment: ${response.statusText}`, 'SegmentService.createSegment');
      throw new Error(`Failed to create segment: ${response.statusText}`);
    }

    return response.json();
  }

  static async getSegments(token: string, projectId: string): Promise<Segment[]> {
    const response = await fetch(`${this.baseUrl}/web/segment?projectId=${projectId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch segments: ${response.statusText}`);
    }

    return response.json();
  }

  // New method to fetch segments for existing project
  static async getProjectSegments(token: string, projectId: string): Promise<ProjectSegmentsResponse> {
    const response = await fetch(`${this.baseUrl}/projects/${projectId}/segments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch project segments: ${response.statusText}`);
    }

    return response.json();
  }

  // New method to fetch videos for a specific segment
  static async getSegmentVideos(token: string, segmentId: string): Promise<SegmentVideosResponse> {
    const response = await fetch(`${this.baseUrl}/projects/segment/${segmentId}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch segment videos: ${response.statusText}`);
    }

    return response.json();
  }

  // Helper method to fetch all videos for multiple segments in parallel
  static async getAllSegmentVideos(token: string, segmentIds: string[]): Promise<SegmentVideosResponse[]> {
    const promises = segmentIds.map(segmentId => 
      this.getSegmentVideos(token, segmentId)
    );
    
    return Promise.all(promises);
  }
}
