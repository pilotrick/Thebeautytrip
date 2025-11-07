import { useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { ProviderDashboard } from './provider/ProviderDashboard';
import { ProviderOnboarding } from './provider/ProviderOnboarding';
import { LogOut } from 'lucide-react';

export type ProviderType = 'wellness' | 'tour' | 'recovery';

export interface ProviderUser {
  id: string;
  email: string;
  name: string;
  type: ProviderType;
  status: 'pending' | 'active' | 'suspended';
  primaryLanguage: string;
  secondaryLanguage?: string;
  slaScore: number;
  jurisdiction: string;
  currency: string;
}

export function ProviderPortal({ onBack }: { onBack: () => void }) {
  const [providerUser, setProviderUser] = useState<ProviderUser | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<'login' | 'credentialing' | 'celebration' | 'contract' | 'complete'>('login');
  const [pendingProviderData, setPendingProviderData] = useState<{
    name: string;
    email: string;
    type: ProviderType;
    primaryLanguage: string;
    secondaryLanguage: string;
    jurisdiction: string;
    currency: string;
  } | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in production this would authenticate via Supabase
    // Check if provider exists
    const mockProvider: ProviderUser = {
      id: 'provider-001',
      email: email,
      name: 'Dr. Sofia Martinez',
      type: 'wellness',
      status: 'active',
      primaryLanguage: 'en',
      secondaryLanguage: 'es',
      slaScore: 98.5,
      jurisdiction: 'Dominican Republic',
      currency: 'USD'
    };
    
    setProviderUser(mockProvider);
  };

  const handleInviteSignup = (inviteCode: string) => {
    // New provider signup via invite link
    setOnboardingStep('credentialing');
  };

  const handleLogout = () => {
    setProviderUser(null);
    setOnboardingStep('login');
    setPendingProviderData(null);
  };

  const handleCredentialingSubmit = (data: {
    name: string;
    email: string;
    type: ProviderType;
    primaryLanguage: string;
    secondaryLanguage: string;
    jurisdiction: string;
    currency: string;
  }) => {
    setPendingProviderData(data);
    setOnboardingStep('celebration');
  };

  // If provider is logged in and active, show dashboard
  if (providerUser && providerUser.status === 'active') {
    return (
      <ProviderDashboard 
        provider={providerUser} 
        onLogout={handleLogout}
        onBack={onBack}
      />
    );
  }

  // If provider is in onboarding, show onboarding flow
  if (onboardingStep !== 'login') {
    return (
      <ProviderOnboarding
        currentStep={onboardingStep}
        pendingData={pendingProviderData}
        onCredentialingSubmit={handleCredentialingSubmit}
        onComplete={(provider) => {
          setProviderUser(provider);
          setOnboardingStep('complete');
        }}
        onBack={() => setOnboardingStep('login')}
        onBackToHome={onBack}
        onMoveToContract={() => setOnboardingStep('contract')}
      />
    );
  }

  // Login screen - no confirmation needed here since no progress to lose
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      {/* Progress Bar with Logo */}
      <ProgressBar 
        currentStep={1} 
        totalSteps={1} 
        stepTitle="Provider Portal Login"
        onLogoClick={onBack}
        mode="provider"
      />

      {/* Login Form */}
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
          <div className="text-center mb-8">
            <h1 className="mb-2" style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
              Service Provider Login
            </h1>
            <p className="text-gray-600">
              Manage bookings, SLAs, and client experience
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleLogin(
                formData.get('email') as string,
                formData.get('password') as string
              );
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block mb-2 text-sm" style={{ color: 'var(--bt-charcoal)' }}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none transition-colors"
                placeholder="provider@example.com"
                defaultValue="sofia.martinez@wellness.dr"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm" style={{ color: 'var(--bt-charcoal)' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none transition-colors"
                placeholder="••••••••"
                defaultValue="demo123"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
            >
              Sign In to Provider Portal
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">
              Have an invite code?
            </p>
            <button
              onClick={() => handleInviteSignup('INVITE-123')}
              className="w-full px-6 py-3 rounded-full border-2 transition-all hover:scale-105"
              style={{ borderColor: 'var(--bt-blush)', color: 'var(--bt-blush)', fontWeight: '600' }}
            >
              New Provider Sign Up
            </button>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-900 mb-2 font-semibold">Demo Credentials:</p>
            <p className="text-xs text-blue-800">Email: sofia.martinez@wellness.dr</p>
            <p className="text-xs text-blue-800">Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
