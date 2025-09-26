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

export class SegmentService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

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
}
