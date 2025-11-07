import { supabase } from './supabase/client';

export interface AuthUser {
  id: string;
  email: string;
  accessToken: string;
}

/**
 * Sign up a new user
 */
export async function signUp(email: string, password: string, name?: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || '',
        },
      },
    });

    if (error) {
      console.error('Sign up error:', error);
      throw error;
    }

    return { user: data.user, session: data.session };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(email: string, password: string): Promise<AuthUser | null> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      throw error;
    }

    if (!data.session || !data.user) {
      throw new Error('No session returned');
    }

    // Store in localStorage for convenience
    const authUser: AuthUser = {
      id: data.user.id,
      email: data.user.email!,
      accessToken: data.session.access_token,
    };

    localStorage.setItem('beautyTripUser', JSON.stringify(authUser));

    return authUser;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }

    localStorage.removeItem('beautyTripUser');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

/**
 * Get the current session
 */
export async function getSession(): Promise<AuthUser | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Get session error:', error);
      return null;
    }

    if (!session) {
      return null;
    }

    const authUser: AuthUser = {
      id: session.user.id,
      email: session.user.email!,
      accessToken: session.access_token,
    };

    return authUser;
  } catch (error) {
    console.error('Get session error:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

/**
 * Get access token for API calls
 */
export async function getAccessToken(): Promise<string | null> {
  const session = await getSession();
  return session?.accessToken || null;
}

/**
 * Password reset - request email
 */
export async function resetPasswordRequest(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      console.error('Reset password request error:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Reset password request error:', error);
    throw error;
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('Update password error:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Update password error:', error);
    throw error;
  }
}

/**
 * OAuth Sign In (Google, Facebook, etc.)
 */
export async function signInWithOAuth(provider: 'google' | 'facebook' | 'github') {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('OAuth sign in error:', error);
      throw error;
    }
  } catch (error) {
    console.error('OAuth sign in error:', error);
    throw error;
  }
}
