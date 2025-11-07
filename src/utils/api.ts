import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-1f5586cd`;

/**
 * Helper function to make authenticated API calls to the backend
 */
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${publicAnonKey}`);
  headers.set('Content-Type', 'application/json');

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${endpoint}):`, errorText);
      throw new Error(`API call failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call error (${endpoint}):`, error);
    throw error;
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
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Authenticated API Error (${endpoint}):`, errorText);
      throw new Error(`Authenticated API call failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Authenticated API call error (${endpoint}):`, error);
    throw error;
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
