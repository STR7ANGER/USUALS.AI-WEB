import { AuthUser } from '../app/providers';
import { API_BASE_URL } from '../lib/constants';

export interface AuthStatusResponse {
  success: boolean;
  user: AuthUser;
  message: string;
}

/**
 * Fetches user authentication status from the backend
 * @param token - The authentication token
 * @returns Promise<AuthStatusResponse>
 */
export async function fetchAuthStatus(token: string): Promise<AuthStatusResponse> {
  const baseUrl = API_BASE_URL;
  const response = await fetch(`${baseUrl}/auth/status`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch auth status: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
