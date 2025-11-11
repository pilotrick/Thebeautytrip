import { projectId, publicAnonKey } from './supabase/info';

// Use environment variables when available, fallback to imported values for development
const API_BASE = import.meta.env.VITE_API_BASE || `https://${projectId}.supabase.co/functions/v1/make-server-1f5586cd`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || publicAnonKey;

/**
 * Helper function to make authenticated API calls to the backend
 */
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${ANON_KEY}`);
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      const errorMessage = errorData.message || `API call failed with status ${response.status}`;
      
      // Only log in development
      if (import.meta.env.DEV) {
        console.error(`API Error (${endpoint}):`, errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      // Only log in development
      if (import.meta.env.DEV) {
        console.error(`API call error (${endpoint}):`, error.message);
      }
      throw new Error(`Failed to complete request: ${error.name}`);
    }
    throw new Error('An unexpected error occurred');
  }
}

/**
 * Helper to make authenticated API calls with user token
 */
async function authenticatedApiCall(endpoint: string, accessToken: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      const errorMessage = errorData.message || `Authenticated API call failed with status ${response.status}`;
      
      // Only log in development
      if (import.meta.env.DEV) {
        console.error(`Authenticated API Error (${endpoint}):`, errorMessage);
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      // Only log in development
      if (import.meta.env.DEV) {
        console.error(`Authenticated API call error (${endpoint}):`, error.message);
      }
      throw new Error(`Failed to complete authenticated request: ${error.name}`);
    }
    throw new Error('An unexpected error occurred');
  }
}

// User & Booking APIs
export const api = {
  // User Profile
  getUserProfile: (userId: string, accessToken: string) =>
    authenticatedApiCall(`/users/${userId}`, accessToken),

  updateUserProfile: (userId: string, accessToken: string, data: any) =>
    authenticatedApiCall(`/users/${userId}`, accessToken, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Bookings
  createBooking: (accessToken: string, bookingData: any) =>
    authenticatedApiCall('/bookings', accessToken, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),

  getUserBookings: (userId: string, accessToken: string) =>
    authenticatedApiCall(`/bookings/user/${userId}`, accessToken),

  getBooking: (bookingId: string, accessToken: string) =>
    authenticatedApiCall(`/bookings/${bookingId}`, accessToken),

  updateBooking: (bookingId: string, accessToken: string, data: any) =>
    authenticatedApiCall(`/bookings/${bookingId}`, accessToken, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Group Trips
  createGroupTrip: (accessToken: string, groupData: any) =>
    authenticatedApiCall('/groups', accessToken, {
      method: 'POST',
      body: JSON.stringify(groupData),
    }),

  getGroupTrip: (groupId: string) =>
    apiCall(`/groups/${groupId}`),

  addGroupMember: (groupId: string, memberData: any) =>
    apiCall(`/groups/${groupId}/members`, {
      method: 'POST',
      body: JSON.stringify(memberData),
    }),

  updateGroupMember: (groupId: string, memberId: string, data: any) =>
    apiCall(`/groups/${groupId}/members/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  voteForSanctuary: (groupId: string, memberId: string, propertyId: string) =>
    apiCall(`/groups/${groupId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ memberId, propertyId }),
    }),

  getUserGroups: (userId: string, accessToken: string) =>
    authenticatedApiCall(`/groups/user/${userId}`, accessToken),

  // Tour Trip Bookings
  createTourBooking: (accessToken: string, tourData: any) =>
    authenticatedApiCall('/tour-bookings', accessToken, {
      method: 'POST',
      body: JSON.stringify(tourData),
    }),

  // Provider APIs
  createProvider: (providerData: any) =>
    apiCall('/providers', {
      method: 'POST',
      body: JSON.stringify(providerData),
    }),

  getProvider: (providerEmail: string) =>
    apiCall(`/providers/email/${encodeURIComponent(providerEmail)}`),

  updateProvider: (providerId: string, data: any) =>
    apiCall(`/providers/${providerId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
