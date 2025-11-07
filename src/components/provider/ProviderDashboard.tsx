import { useState } from 'react';
import { ProgressBar } from '../ProgressBar';
import { ProviderUser } from '../ProviderPortal';
import { WellnessSpecialistDashboard } from './WellnessSpecialistDashboard';
import { TourOperatorDashboard } from './TourOperatorDashboard';
import { RecoveryPartnerDashboard } from './RecoveryPartnerDashboard';
import { 
  Calendar, 
  LogOut, 
  BarChart3, 
  Clock, 
  Star, 
  TrendingUp
} from 'lucide-react';

interface Props {
  provider: ProviderUser;
  onLogout: () => void;
  onBack: () => void;
}

export function ProviderDashboard({ provider, onLogout, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'services' | 'analytics'>('dashboard');

  // SLA Performance Color
  const getSLAColor = (score: number) => {
    if (score >= 95) return '#10b981'; // green
    if (score >= 85) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const getProviderTypeLabel = () => {
    if (provider.type === 'wellness') return 'Wellness Specialist';
    if (provider.type === 'tour') return 'Tour Operator';
    return 'Recovery Partner';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      {/* Progress Bar with Logo */}
      <ProgressBar 
        currentStep={1} 
        totalSteps={1} 
        stepTitle={`${getProviderTypeLabel()} Dashboard`}
        onLogoClick={onBack}
        mode="provider"
      />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1"></div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-gray-100"
              style={{ color: 'var(--bt-charcoal)' }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Provider Info Bar */}
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                {provider.name}
              </h2>
              <p className="text-gray-600">
                {provider.type === 'wellness' && 'Wellness Specialist'}
                {provider.type === 'tour' && 'Tour Operator'}
                {provider.type === 'recovery' && 'Recovery Partner'}
                {' • '}
                {provider.jurisdiction}
              </p>
            </div>

            {/* SLA Score */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">SLA Performance</p>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-4" 
                    style={{ borderColor: getSLAColor(provider.slaScore) }}>
                    <span style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700',
                      color: getSLAColor(provider.slaScore)
                    }}>
                      {provider.slaScore.toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" style={{ color: getSLAColor(provider.slaScore), fill: getSLAColor(provider.slaScore) }} />
                      <span className="text-xs font-semibold" style={{ color: getSLAColor(provider.slaScore) }}>
                        {provider.slaScore >= 95 ? 'EXCELLENT' : provider.slaScore >= 85 ? 'GOOD' : 'NEEDS IMPROVEMENT'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'services', label: 'Active Services', icon: Clock },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: isActive ? 'var(--bt-blush)' : 'transparent',
                    color: isActive ? 'white' : 'var(--bt-charcoal)',
                    fontWeight: isActive ? '600' : '500'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {provider.type === 'wellness' && (
          <WellnessSpecialistDashboard provider={provider} activeTab={activeTab} />
        )}
        {provider.type === 'tour' && (
          <TourOperatorDashboard provider={provider} activeTab={activeTab} />
        )}
        {provider.type === 'recovery' && (
          <RecoveryPartnerDashboard provider={provider} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
}
