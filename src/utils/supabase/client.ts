// Browser-only Supabase client - avoiding Node.js dependencies
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Create a minimal Supabase-like client for browser use
function createBrowserClient() {
  return {
    auth: {
      signUp: async ({ email, password, options }: any) => {
        const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
          },
          body: JSON.stringify({ email, password, data: options?.data }),
        });
        const data = await response.json();
        if (!response.ok) {
          return { data: null, error: data };
        }
        // Store session in localStorage
        if (data.session) {
          localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
        }
        return { data, error: null };
      },
      
      signInWithPassword: async ({ email, password }: any) => {
        const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          return { data: { user: null, session: null }, error: data };
        }
        // Store session in localStorage
        if (data) {
          localStorage.setItem('supabase.auth.token', JSON.stringify(data));
        }
        return { 
          data: { 
            user: data.user, 
            session: data 
          }, 
          error: null 
        };
      },
      
      signOut: async () => {
        const session = localStorage.getItem('supabase.auth.token');
        if (session) {
          const { access_token } = JSON.parse(session);
          await fetch(`${supabaseUrl}/auth/v1/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'apikey': publicAnonKey,
            },
          });
        }
        localStorage.removeItem('supabase.auth.token');
        return { error: null };
      },
      
      getSession: async () => {
        const sessionData = localStorage.getItem('supabase.auth.token');
        if (!sessionData) {
          return { data: { session: null }, error: null };
        }
        try {
          const session = JSON.parse(sessionData);
          return { data: { session }, error: null };
        } catch {
          return { data: { session: null }, error: null };
        }
      },
      
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        // Simple implementation - check session on init
        const checkSession = () => {
          const sessionData = localStorage.getItem('supabase.auth.token');
          if (sessionData) {
            try {
              const session = JSON.parse(sessionData);
              callback('SIGNED_IN', session);
            } catch {
              // Invalid session data
            }
          }
        };
        checkSession();
        
        return {
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          }
        };
      },
      
      resetPasswordForEmail: async (email: string, options?: any) => {
        const response = await fetch(`${supabaseUrl}/auth/v1/recover`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': publicAnonKey,
          },
          body: JSON.stringify({ email, ...options }),
        });
        if (!response.ok) {
          const error = await response.json();
          return { error };
        }
        return { error: null };
      },
      
      updateUser: async (updates: any) => {
        const sessionData = localStorage.getItem('supabase.auth.token');
        if (!sessionData) {
          return { error: { message: 'Not authenticated' } };
        }
        const { access_token } = JSON.parse(sessionData);
        
        const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`,
            'apikey': publicAnonKey,
          },
          body: JSON.stringify(updates),
        });
        
        if (!response.ok) {
          const error = await response.json();
          return { error };
        }
        return { error: null };
      },
      
      signInWithOAuth: async ({ provider, options }: any) => {
        const redirectTo = options?.redirectTo || window.location.origin;
        const url = `${supabaseUrl}/auth/v1/authorize?provider=${provider}&redirect_to=${encodeURIComponent(redirectTo)}`;
        window.location.href = url;
        return { error: null };
      }
    },
    
    storage: {
      // Placeholder for storage methods if needed
    }
  };
}

// Singleton pattern for Supabase client
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient();
  }
  return supabaseClient;
}

// Export a pre-initialized client for convenience
export const supabase = getSupabaseClient();
