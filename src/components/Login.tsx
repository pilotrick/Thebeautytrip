import { useState } from 'react';
import { Logo } from './Logo';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, User } from 'lucide-react';
import { signIn, signUp, signInWithOAuth } from '../utils/auth';
import { toast } from 'sonner@2.0.3';

interface LoginProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

export function Login({ onLogin, onBack }: LoginProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // Sign up new user
        const { user, session } = await signUp(email, password, name);
        
        if (!session) {
          toast.info('Please check your email to confirm your account!');
          setLoading(false);
          return;
        }

        toast.success('Account created successfully!');
        onLogin(email);
      } else {
        // Sign in existing user
        const authUser = await signIn(email, password);
        
        if (authUser) {
          toast.success('Welcome back!');
          onLogin(authUser.email);
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      if (error.message?.includes('Invalid login credentials')) {
        toast.error('Invalid email or password. Please try again.');
      } else if (error.message?.includes('User already registered')) {
        toast.error('This email is already registered. Try signing in instead.');
      } else {
        toast.error(isSignup ? 'Failed to create account' : 'Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      setLoading(true);
      await signInWithOAuth(provider);
    } catch (error) {
      console.error('OAuth error:', error);
      toast.error(`Failed to sign in with ${provider}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="mb-3" style={{ 
            fontSize: '2.5rem', 
            color: 'var(--bt-charcoal)',
            letterSpacing: '-0.02em'
          }}>
            Booking Portal
          </h1>
          <p className="text-gray-600" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            {isSignup ? 'Create your account to save your journey and manage your booking' : 'Welcome back. Access your saved journeys and booking details'}
          </p>
        </div>

        {/* Notice for New Users */}
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#fffbfc', border: '2px solid var(--bt-gold)' }}>
          <p className="text-sm text-center" style={{ color: 'var(--bt-charcoal)', lineHeight: '1.7' }}>
            <strong style={{ color: 'var(--bt-gold)' }}>First Time Here?</strong> We recommend starting with our{' '}
            <button 
              onClick={onBack}
              className="underline hover:no-underline transition-all"
              style={{ color: 'var(--bt-gold)', fontWeight: '600' }}
            >
              curated booking experience
            </button>
            {' '}to discover your perfect sanctuary and specialist. Returning guests can access their saved journeys below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignup && (
            <div>
              <Label htmlFor="name" className="mb-2 block" style={{ fontSize: '1rem', fontWeight: '600' }}>
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 h-14"
                  style={{ 
                    borderWidth: '2px',
                    borderColor: name ? 'var(--bt-gold)' : 'var(--border)'
                  }}
                  placeholder="Enter your full name"
                  required={isSignup}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="mb-2 block" style={{ fontSize: '1rem', fontWeight: '600' }}>
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14"
                style={{ 
                  borderWidth: '2px',
                  borderColor: email ? 'var(--bt-gold)' : 'var(--border)'
                }}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="mb-2 block" style={{ fontSize: '1rem', fontWeight: '600' }}>
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 h-14"
                style={{ 
                  borderWidth: '2px',
                  borderColor: password ? 'var(--bt-gold)' : 'var(--border)'
                }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-white transition-all duration-300 hover:scale-105 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--bt-gold)',
              fontSize: '1.125rem',
              fontWeight: '600',
              letterSpacing: '0.02em'
            }}
          >
            {loading ? 'PLEASE WAIT...' : (isSignup ? 'CREATE MY ACCOUNT' : 'ACCESS MY PORTAL')}
          </button>
        </form>

        {/* Toggle Sign Up / Login */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            style={{ fontSize: '1rem' }}
          >
            {isSignup ? (
              <>Already have an account? <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>Sign In</span></>
            ) : (
              <>New to The Beauty Trip? <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>Create Account</span></>
            )}
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            style={{ fontSize: '0.95rem' }}
          >
            ← Back to Home
          </button>
        </div>

        {/* OAuth Options */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleOAuthSignIn('google')}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-full hover:bg-gray-50 transition-all disabled:opacity-50"
              style={{ borderColor: 'var(--border)' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleOAuthSignIn('facebook')}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-full hover:bg-gray-50 transition-all disabled:opacity-50"
              style={{ borderColor: 'var(--border)' }}
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Connected to Supabase Notice */}
        <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: '#fffbfc', border: '2px solid #10b981' }}>
          <p className="text-sm text-gray-600 text-center">
            <strong style={{ color: '#10b981' }}>✓ Secure Authentication:</strong> Your account is protected with Supabase enterprise-grade security.
          </p>
        </div>
      </div>
    </div>
  );
}
