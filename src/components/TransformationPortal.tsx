import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ProgressTracker } from './ProgressTracker';
import { 
  Home, 
  Calendar, 
  Heart, 
  CreditCard, 
  LogOut, 
  Upload,
  CheckCircle2,
  Sparkles,
  MapPin,
  Users,
  Clock
} from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { toast } from 'sonner@2.0.3';

type TourTripBooking = {
  id: string;
  name: string;
  price: number;
  duration: string;
  dates: string;
  location: string;
  approach: string;
  includedItems: string[];
};

interface TransformationPortalProps {
  userEmail: string;
  onLogout: () => void;
  onReturnHome: () => void;
  onResumeBooking?: (journeyId: string) => void;
  onViewGroupTrip?: (groupId: string) => void;
  tourTripBooking?: TourTripBooking | null;
  onClearTourTrip?: () => void;
  onStartTourTripBuilder?: () => void;
}

interface SavedJourney {
  id: string;
  name: string;
  dateCreated: string;
  procedureDate?: string;
  procedures: string[];
  specialist: string;
  villa: string;
  totalCost: number;
  status: 'draft' | 'pending-flight' | 'flight-confirmed' | 'paid' | 'confirmed';
}

export function TransformationPortal({ userEmail, onLogout, onReturnHome, onResumeBooking, onViewGroupTrip, tourTripBooking, onClearTourTrip, onStartTourTripBuilder }: TransformationPortalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'journeys' | 'groups' | 'payment' | 'progress' | 'tour-trip' | 'tour-groups'>('overview');
  const [flightConfirmed, setFlightConfirmed] = useState(false);
  const [depositPaid, setDepositPaid] = useState(false);
  const [secondPaymentPaid, setSecondPaymentPaid] = useState(false);
  const [finalPaymentPaid, setFinalPaymentPaid] = useState(false);
  const [viewingGroupTrip, setViewingGroupTrip] = useState(false);
  const [addProceduresTour, setAddProceduresTour] = useState<boolean | null>(null);
  
  // If tour trip booking exists, show that tab
  useEffect(() => {
    if (tourTripBooking) {
      setActiveTab('tour-trip');
      setAddProceduresTour(null);
    }
  }, [tourTripBooking]);

  // Mock user data
  const userName = localStorage.getItem('beautyTripUser') 
    ? JSON.parse(localStorage.getItem('beautyTripUser')!).name 
    : 'Guest';

  // Mock saved journeys
  const savedJourneys: SavedJourney[] = [
    {
      id: '1',
      name: 'November Renewal Journey',
      dateCreated: 'Oct 10, 2025',
      procedureDate: 'Nov 15, 2025',
      procedures: ['BOTOX & Dysport', 'Lip Filler', 'Hair Transplant (FUE)'],
      specialist: 'Dr. Isabella Rivera',
      villa: 'Villa Paraíso - Ocean Suite',
      totalCost: 18500,
      status: flightConfirmed ? 'flight-confirmed' : 'pending-flight'
    },
    {
      id: '2',
      name: 'December Backup Plan',
      dateCreated: 'Oct 12, 2025',
      procedureDate: 'Dec 5, 2025',
      procedures: ['BOTOX & Dysport', 'Cheek Filler'],
      specialist: 'Dr. Rafael Santos',
      villa: 'Casa Blanca - Sunset Villa',
      totalCost: 12800,
      status: 'draft'
    }
  ];

  const currentJourney = savedJourneys[0];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'journeys', label: 'Saved Journeys', icon: Calendar },
    { id: 'groups', label: 'Group Trips', icon: Users },
    { id: 'tour-groups', label: 'Tour Groups', icon: Heart },
    { id: 'progress', label: 'Progress Tracker', icon: CheckCircle2 },
    { id: 'payment', label: 'Payment', icon: CreditCard }
  ];

  const handleFlightUpload = () => {
    // Mock flight confirmation
    setFlightConfirmed(true);
  };

  const handlePaymentSubmit = () => {
    setDepositPaid(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Logo size="md" />
              <div className="hidden md:block h-8 w-px bg-gray-300" />
              <div className="hidden md:block">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  {userName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={onReturnHome}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Home</span>
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="px-6 py-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap"
                  style={{
                    borderColor: activeTab === tab.id ? 'var(--bt-gold)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--bt-gold)' : '#6b7280',
                    fontWeight: activeTab === tab.id ? '600' : '500'
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Status Card */}
            <div 
              className="p-8 rounded-2xl border-2"
              style={{ 
                background: 'linear-gradient(135deg, #fffbfc 0%, #ffffff 100%)',
                borderColor: 'var(--bt-blush)'
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-8 h-8" style={{ color: 'var(--bt-gold)' }} />
                    <h1 style={{ 
                      fontSize: '2.5rem', 
                      color: 'var(--bt-charcoal)',
                      fontWeight: '600',
                      letterSpacing: '-0.02em'
                    }}>
                      {currentJourney.name}
                    </h1>
                  </div>
                  <p className="text-gray-600" style={{ fontSize: '1.1rem' }}>
                    Your renewal journey is being curated. Here's where we are:
                  </p>
                </div>
                <span 
                  className="px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: flightConfirmed ? '#dcfce7' : '#fef3c7',
                    color: flightConfirmed ? '#166534' : '#92400e',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}
                >
                  {flightConfirmed ? 'Flight Confirmed' : 'Pending Flight Details'}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-1" style={{ color: 'var(--bt-blush)' }} />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Procedure Date</p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {currentJourney.procedureDate || 'Pending'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1" style={{ color: 'var(--bt-blush)' }} />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sanctuary</p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {currentJourney.villa}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 mt-1" style={{ color: 'var(--bt-blush)' }} />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Specialist</p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {currentJourney.specialist}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Flight Confirmation Card */}
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: flightConfirmed ? '#dcfce7' : '#fef3c7' }}
                  >
                    {flightConfirmed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-700" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-700" />
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Flight Confirmation
                    </h3>
                    <p className="text-sm text-gray-500">
                      {flightConfirmed ? 'Confirmed & Approved' : 'Required to Continue'}
                    </p>
                  </div>
                </div>

                {!flightConfirmed ? (
                  <>
                    <p className="text-gray-600 mb-4" style={{ lineHeight: '1.6' }}>
                      Upload your flight receipt to unlock payment and finalize your sanctuary reservation.
                    </p>
                    <button
                      onClick={handleFlightUpload}
                      className="w-full py-3 px-4 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--bt-gold)', 
                        color: 'white',
                        fontWeight: '600'
                      }}
                    >
                      <Upload className="w-4 h-4" />
                      Upload Flight Receipt
                    </button>
                  </>
                ) : (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#dcfce7' }}>
                    <p className="text-green-800" style={{ fontWeight: '600' }}>
                      ✓ Your flight details have been confirmed by our concierge team. Payment is now available.
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Card */}
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: flightConfirmed ? (depositPaid ? '#dcfce7' : '#fff7ed') : '#f3f4f6' }}
                  >
                    <CreditCard className="w-6 h-6" style={{ color: flightConfirmed ? (depositPaid ? '#166534' : 'var(--bt-gold)') : '#9ca3af' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Payment Status
                    </h3>
                    <p className="text-sm text-gray-500">
                      {depositPaid ? 'Deposit Received' : flightConfirmed ? 'Ready for Payment' : 'Locked Until Flight Confirmation'}
                    </p>
                  </div>
                </div>

                {!flightConfirmed ? (
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <p className="text-gray-600 text-sm">
                      Payment will be available once your flight is confirmed. Your sanctuary is reserved when your flight is confirmed.
                    </p>
                  </div>
                ) : depositPaid ? (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#dcfce7' }}>
                    <p className="text-green-800 mb-2" style={{ fontWeight: '600' }}>
                      ✓ 50% Deposit Received ($9,250)
                    </p>
                    <p className="text-sm text-green-700">
                      Balance of $9,250 due 7 days before arrival
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-gray-600">Total Package Cost:</span>
                        <span style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                          ${currentJourney.totalCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>30% Deposit Due:</span>
                        <span style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                          ${Math.round(currentJourney.totalCost * 0.30).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('payment')}
                      className="w-full py-3 px-4 rounded-full transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: 'var(--bt-gold)', 
                        color: 'white',
                        fontWeight: '600'
                      }}
                    >
                      Submit Payment & Confirm Booking
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Current Package Summary */}
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Your Curated Package
              </h3>
              <div className="space-y-4">
                {currentJourney.procedures.map((procedure, index) => (
                  <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-blush)' }} />
                    <span className="text-gray-700" style={{ fontSize: '1.05rem' }}>{procedure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SAVED JOURNEYS TAB */}
        {activeTab === 'journeys' && (
          <div>
            <h2 className="mb-8" style={{ 
              fontSize: '2rem', 
              color: 'var(--bt-charcoal)',
              fontWeight: '600'
            }}>
              Your Saved Journeys
            </h2>
            <div className="grid gap-6">
              {savedJourneys.map((journey) => (
                <div 
                  key={journey.id}
                  className="bg-white p-6 rounded-xl border-2 hover:shadow-lg transition-all cursor-pointer"
                  style={{ 
                    borderColor: journey.id === '1' ? 'var(--bt-gold)' : '#e5e7eb'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        {journey.name}
                      </h3>
                      <p className="text-sm text-gray-500">Created on {journey.dateCreated}</p>
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: journey.status === 'flight-confirmed' ? '#dcfce7' : '#fef3c7',
                        color: journey.status === 'flight-confirmed' ? '#166534' : '#92400e',
                        fontWeight: '600'
                      }}
                    >
                      {journey.status === 'flight-confirmed' ? 'Active' : 'Draft'}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Procedures</p>
                      <p style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
                        {journey.procedures.length} treatments
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Investment</p>
                      <p style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        ${journey.totalCost.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => onResumeBooking?.(journey.id)}
                      className="text-sm px-4 py-2 rounded-full transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: 'var(--bt-gold)',
                        color: 'white',
                        fontWeight: '600'
                      }}
                    >
                      {journey.status === 'draft' ? 'Resume Booking' : 'View Details'}
                    </button>
                    {journey.status === 'draft' && (
                      <button 
                        className="text-sm px-4 py-2 rounded-full transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: 'transparent',
                          border: '2px solid var(--bt-blush)',
                          color: 'var(--bt-charcoal)',
                          fontWeight: '600'
                        }}
                      >
                        Delete Draft
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab === 'groups' && (
          <div>
            <h2 className="mb-8" style={{ 
              fontSize: '2rem', 
              color: 'var(--bt-charcoal)',
              fontWeight: '600'
            }}>\n              Your Group Trips
            </h2>

            {/* Mock Group Data */}
            <div className="space-y-6">
              {/* Active Group Trip */}
              <div className="bg-white p-8 rounded-xl border-2" style={{ borderColor: 'var(--bt-gold)' }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
                      <h3 style={{ fontSize: '1.75rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        Sarah's Bachelorette Trip
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Group ID: BTG-12345678</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        4 members
                      </span>
                    </div>
                  </div>
                  <span 
                    className="px-4 py-2 rounded-full"
                    style={{ 
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}
                  >
                    Active
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600 mb-1">Your Role</p>
                    <p style={{ fontSize: '1.125rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                      Group Coordinator
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600 mb-1">Members Joined</p>
                    <p style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      4 of 6 expected
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-600 mb-1">Tentative Date</p>
                    <p style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      November 2025
                    </p>
                  </div>
                </div>

                {/* Member Progress */}
                <div className="mb-6">
                  <h4 className="mb-4" style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Member Progress
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Sarah Chen (You)', status: 'booking-complete', color: '#10b981' },
                      { name: 'Emma Rodriguez', status: 'procedures-selected', color: '#f59e0b' },
                      { name: 'Jessica Kim', status: 'joined', color: '#6b7280' },
                      { name: 'Ashley Thompson', status: 'joined', color: '#6b7280' }
                    ].map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: member.color }}
                          />
                          <span style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
                            {member.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {member.status === 'booking-complete' && '✓ Booking Complete'}
                          {member.status === 'procedures-selected' && '📋 Selecting sanctuary...'}
                          {member.status === 'joined' && '⏳ Selecting procedures...'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onViewGroupTrip?.('BTG-12345678')}
                    className="px-6 py-3 rounded-full transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--bt-gold)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                  >
                    View Full Group Details
                  </button>
                  <button
                    onClick={async () => {
                      const success = await copyToClipboard(`${window.location.origin}?join=BTG-12345678`);
                      if (success) {
                        toast.success('Invite link copied to clipboard!');
                      } else {
                        toast.error('Failed to copy link. Please copy manually.');
                      }
                    }}
                    className="px-6 py-3 rounded-full transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: 'transparent',
                      border: '2px solid var(--bt-charcoal)',
                      color: 'var(--bt-charcoal)',
                      fontWeight: '600'
                    }}
                  >
                    Copy Invite Link
                  </button>
                </div>
              </div>

              {/* Empty State for More Groups */}
              <div className="bg-gray-50 p-12 rounded-xl border-2 border-dashed border-gray-300 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  Ready for Another Group Trip?
                </h3>
                <p className="text-gray-600 mb-6">
                  Coordinate multiple group experiences and track them all in one place
                </p>
                <button
                  onClick={onReturnHome}
                  className="px-6 py-3 rounded-full transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--bt-blush)',
                    color: 'white',
                    fontWeight: '600'
                  }}
                >
                  Plan New Group Trip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS TRACKER TAB */}
        {activeTab === 'progress' && (
          <ProgressTracker flightConfirmed={flightConfirmed} />
        )}

        {/* TOUR TRIP BOOKING TAB */}
        {activeTab === 'tour-trip' && tourTripBooking && (
          <div>
            <div className="mb-8">
              <button
                onClick={() => {
                  onClearTourTrip?.();
                  setActiveTab('overview');
                }}
                className="text-sm px-4 py-2 rounded-full transition-all hover:scale-105 mb-4"
                style={{ backgroundColor: '#f3f4f6', color: 'var(--bt-charcoal)' }}
              >
                ← Back to Dashboard
              </button>
              <h2 className="mb-3" style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Reserve Your Tour Trip
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
                {tourTripBooking.name} • {tourTripBooking.location}
              </p>
            </div>

            {addProceduresTour === null ? (
              /* Initial choice: Just retreat or add procedures */
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 mb-8">
                  <h3 className="mb-4" style={{ fontSize: '2rem', color: '#7c3aed', fontWeight: '600' }}>
                    ✨ Would you like to add beauty procedures?
                  </h3>
                  <p className="mb-6" style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.6' }}>
                    This retreat includes all transportation, meals, and transformational experiences. 
                    You can book just the retreat for inner beauty work, or add outer beauty procedures for a complete transformation.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Option 1: Just the Retreat */}
                  <div className="bg-white p-8 rounded-xl border-2 hover:border-purple-400 transition-all cursor-pointer"
                    style={{ borderColor: '#e5e7eb' }}
                    onClick={() => setAddProceduresTour(false)}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#fdf4ff' }}>
                      <Heart className="w-8 h-8" style={{ color: '#9333ea' }} />
                    </div>
                    <h4 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Just the Retreat
                    </h4>
                    <p className="text-gray-600 mb-4" style={{ lineHeight: '1.6' }}>
                      Focus entirely on inner transformation, healing, and spiritual growth. Perfect for those seeking mental clarity and peace.
                    </p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-2">Includes:</p>
                      <ul className="space-y-2">
                        {tourTripBooking.includedItems.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p style={{ fontSize: '2rem', color: '#9333ea', fontWeight: '600' }}>
                        ${tourTripBooking.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{tourTripBooking.duration}</p>
                    </div>
                  </div>

                  {/* Option 2: Add Procedures */}
                  <div className="bg-white p-8 rounded-xl border-2 hover:border-purple-400 transition-all cursor-pointer"
                    style={{ borderColor: '#e5e7eb' }}
                    onClick={() => setAddProceduresTour(true)}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#fef3c7' }}>
                      <Sparkles className="w-8 h-8" style={{ color: 'var(--bt-gold)' }} />
                    </div>
                    <h4 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Add Procedures
                    </h4>
                    <p className="text-gray-600 mb-4" style={{ lineHeight: '1.6' }}>
                      Combine inner AND outer transformation. Get procedures done, then recover during your transformational retreat experience.
                    </p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 mb-2">Everything from retreat PLUS:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Beauty procedures with top specialists
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Post-procedure recovery support
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Complete transformation journey
                        </li>
                      </ul>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                        ${tourTripBooking.price.toLocaleString()}+
                      </p>
                      <p className="text-sm text-gray-500">Retreat + procedure costs</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : addProceduresTour === false ? (
              /* Inner beauty only - Show celebration and payment */
              <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-12 rounded-2xl text-center mb-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'white' }}>
                    <Heart className="w-12 h-12" style={{ color: '#9333ea' }} />
                  </div>
                  <h3 className="mb-4" style={{ fontSize: '2.5rem', color: '#7c3aed', fontWeight: '600' }}>
                    ✨ Beautiful Choice!
                  </h3>
                  <p className="mb-6" style={{ fontSize: '1.25rem', color: '#6b7280', lineHeight: '1.7' }}>
                    You're about to embark on a powerful inner transformation journey. 
                    This retreat will nurture your soul, deepen your self-love, and help you discover your radiant inner beauty.
                  </p>
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ backgroundColor: 'white' }}>
                    <Sparkles style={{ color: '#9333ea' }} />
                    <span style={{ color: '#7c3aed', fontWeight: '600' }}>
                      Inner Beauty Transformation
                    </span>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border-2" style={{ borderColor: '#9333ea' }}>
                  <h4 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Your Retreat Details
                  </h4>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Retreat</span>
                      <span style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>{tourTripBooking.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Location</span>
                      <span style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>{tourTripBooking.location}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Dates</span>
                      <span style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>{tourTripBooking.dates}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-600">Duration</span>
                      <span style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>{tourTripBooking.duration}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>Total Investment</span>
                      <span style={{ fontSize: '2rem', color: '#9333ea', fontWeight: '700' }}>
                        ${tourTripBooking.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-600">
                      <span style={{ fontWeight: '600', color: '#7c3aed' }}>Note:</span> Payment reserves your spot. 
                      Flight confirmation required before travel. All transportation, meals, and activities included.
                    </p>
                  </div>

                  <button
                    className="w-full py-4 px-6 rounded-full transition-all hover:scale-105"
                    style={{ backgroundColor: '#9333ea', color: 'white', fontSize: '1.125rem', fontWeight: '600' }}
                  >
                    Reserve & Pay ${tourTripBooking.price.toLocaleString()}
                  </button>
                </div>
              </div>
            ) : (
              /* Add procedures - Continue to procedure selection */
              <div className="max-w-3xl mx-auto text-center">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 rounded-2xl mb-8">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'white' }}>
                    <Sparkles className="w-12 h-12" style={{ color: 'var(--bt-gold)' }} />
                  </div>
                  <h3 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                    Complete Transformation Ahead!
                  </h3>
                  <p className="mb-6" style={{ fontSize: '1.25rem', color: '#6b7280', lineHeight: '1.7' }}>
                    Perfect! You'll experience outer beauty transformation combined with your {tourTripBooking.approach.toLowerCase()} inner journey.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-xl border-2" style={{ borderColor: 'var(--bt-gold)' }}>
                  <h4 className="mb-4" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Next: Choose Your Procedures
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Continue to our procedure selection to customize your complete transformation package.
                    Your retreat (${tourTripBooking.price.toLocaleString()}) will be included in your total.
                  </p>
                  <button
                    onClick={() => onStartTourTripBuilder?.()}
                    className="w-full py-4 px-6 rounded-full transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontSize: '1.125rem', fontWeight: '600' }}
                  >
                    Continue to Procedure Selection →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TOUR GROUPS TAB */}
        {activeTab === 'tour-groups' && (
          <div>
            <h2 className="mb-8" style={{ 
              fontSize: '2rem', 
              color: 'var(--bt-charcoal)',
              fontWeight: '600'
            }}>
              Your Tour Group Trips
            </h2>
            
            {/* Empty State */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-12 rounded-2xl border-2 border-dashed border-purple-300 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'white' }}>
                <Sparkles className="w-10 h-10" style={{ color: '#9333ea' }} />
              </div>
              <h3 className="mb-4" style={{ fontSize: '1.75rem', color: '#7c3aed', fontWeight: '600' }}>
                No Tour Group Trips Yet
              </h3>
              <p className="mb-6 max-w-xl mx-auto text-gray-600" style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>
                Tour Groups combine the transformational power of our curated Tour Trips with the joy of traveling with friends. 
                Book a retreat together and experience collective transformation!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onReturnHome}
                  className="px-8 py-4 rounded-full transition-all hover:scale-105"
                  style={{ backgroundColor: '#9333ea', color: 'white', fontWeight: '600', fontSize: '1.125rem' }}
                >
                  Browse Tour Trips
                </button>
                <button
                  onClick={onReturnHome}
                  className="px-8 py-4 rounded-full transition-all hover:scale-105 border-2"
                  style={{ borderColor: '#9333ea', color: '#9333ea', fontWeight: '600', fontSize: '1.125rem' }}
                >
                  Create Group Tour
                </button>
              </div>
              
              {/* Preview of what it would look like */}
              <div className="mt-12 pt-8 border-t border-purple-200">
                <p className="text-sm text-gray-500 mb-4">When you book a Tour Group, you'll see:</p>
                <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <Users className="w-6 h-6 mx-auto mb-2" style={{ color: '#9333ea' }} />
                    <p className="text-sm text-gray-600">Group member progress</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: '#9333ea' }} />
                    <p className="text-sm text-gray-600">Shared trip timeline</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <Heart className="w-6 h-6 mx-auto mb-2" style={{ color: '#9333ea' }} />
                    <p className="text-sm text-gray-600">Collective celebrations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT TAB */}
        {activeTab === 'payment' && (
          <div>
            <h2 className="mb-8" style={{ 
              fontSize: '2rem', 
              color: 'var(--bt-charcoal)',
              fontWeight: '600'
            }}>
              Payment Portal
            </h2>

            {!flightConfirmed ? (
              <div className="bg-gray-50 p-12 rounded-2xl border-2 border-gray-200 text-center">
                <div className="max-w-md mx-auto">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: '#fef3c7' }}
                  >
                    <Clock className="w-10 h-10 text-yellow-700" />
                  </div>
                  <h3 className="mb-4" style={{ fontSize: '1.75rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Payment Gateway Locked
                  </h3>
                  <p className="text-gray-600 mb-6" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    Your payment portal will unlock as soon as your flight details are confirmed by our concierge team. This ensures we can coordinate your arrival, schedule your procedures, and secure your sanctuary reservation.
                  </p>
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="px-6 py-3 rounded-full transition-all hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--bt-gold)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                  >
                    Upload Flight Details
                  </button>
                </div>
              </div>
            ) : depositPaid && secondPaymentPaid && finalPaymentPaid ? (
              <div className="bg-white p-12 rounded-2xl border-2" style={{ borderColor: '#10b981' }}>
                <div className="max-w-2xl mx-auto text-center">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: '#dcfce7' }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-700" />
                  </div>
                  <h3 className="mb-4" style={{ fontSize: '2rem', color: '#10b981', fontWeight: '600' }}>
                    ✓ FULLY PAID & CONFIRMED
                  </h3>
                  <p className="text-gray-600 mb-8" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                    Congratulations! Your transformation journey is fully secured. All payments received totaling <strong style={{ color: '#10b981' }}>${currentJourney.totalCost.toLocaleString()}</strong>. We can't wait to welcome you to {currentJourney.villa}!
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-lg bg-green-50">
                      <p className="text-sm text-gray-600 mb-1">Deposit (30%)</p>
                      <p style={{ color: '#10b981', fontWeight: '600' }}>${Math.round(currentJourney.totalCost * 0.30).toLocaleString()} ✓</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50">
                      <p className="text-sm text-gray-600 mb-1">Second (50%)</p>
                      <p style={{ color: '#10b981', fontWeight: '600' }}>${Math.round(currentJourney.totalCost * 0.50).toLocaleString()} ✓</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50">
                      <p className="text-sm text-gray-600 mb-1">Final (20%)</p>
                      <p style={{ color: '#10b981', fontWeight: '600' }}>${Math.round(currentJourney.totalCost * 0.20).toLocaleString()} ✓</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">
                    Our concierge team will contact you within 24 hours to schedule your specialist consultation and finalize your arrival details.
                  </p>
                </div>
              </div>
            ) : depositPaid ? (
              <div className="max-w-4xl mx-auto">
                {/* Payment Schedule Info */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 mb-6">
                  <h4 className="mb-3" style={{ fontSize: '1.125rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                    Payment Progress
                  </h4>
                  <p className="text-gray-600 mb-3">
                    Deposit received! Continue with your remaining payments to fully secure your journey.
                  </p>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">30% Deposit ✓</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: secondPaymentPaid ? '#dcfce7' : 'var(--bt-gold)', color: secondPaymentPaid ? '#166534' : 'white', fontWeight: '600' }}>
                        {secondPaymentPaid ? '✓' : '2'}
                      </div>
                      <span className="text-gray-700">50% Mid-payment {secondPaymentPaid ? '✓' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: finalPaymentPaid ? '#dcfce7' : '#e5e7eb', color: finalPaymentPaid ? '#166534' : '#9ca3af', fontWeight: '600' }}>
                        {finalPaymentPaid ? '✓' : '3'}
                      </div>
                      <span className="text-gray-700">20% Final {finalPaymentPaid ? '✓' : ''}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl border border-gray-200 mb-6">
                  <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Complete Your Remaining Payments
                  </h3>
                  
                  <div className="space-y-6">
                    {/* 2. Second Payment - 50% */}
                    {!secondPaymentPaid && (
                      <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}>
                              2
                            </div>
                            <h4 style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                              Second Payment (50%)
                            </h4>
                          </div>
                          <p className="text-gray-600 ml-11">
                            Due 30 days before your procedure date
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p style={{ fontSize: '1.75rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                            ${Math.round(currentJourney.totalCost * 0.50).toLocaleString()}
                          </p>
                          <button
                            onClick={() => setSecondPaymentPaid(true)}
                            className="px-6 py-2 rounded-full transition-all hover:scale-105 mt-2"
                            style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontSize: '0.95rem', fontWeight: '600' }}
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 3. Final Payment - 20% */}
                    {secondPaymentPaid && !finalPaymentPaid && (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}>
                              3
                            </div>
                            <h4 style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                              Final Payment (20%)
                            </h4>
                          </div>
                          <p className="text-gray-600 ml-11">
                            Due 7 days before arrival
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p style={{ fontSize: '1.75rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                            ${Math.round(currentJourney.totalCost * 0.20).toLocaleString()}
                          </p>
                          <button
                            onClick={() => setFinalPaymentPaid(true)}
                            className="px-6 py-2 rounded-full transition-all hover:scale-105 mt-2"
                            style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontSize: '0.95rem', fontWeight: '600' }}
                          >
                            Pay Final
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total Summary */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border-2" style={{ borderColor: 'var(--bt-gold)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        Total Investment
                      </h4>
                      <p className="text-sm text-gray-600">
                        {secondPaymentPaid && finalPaymentPaid ? (
                          <span className="text-green-600 font-semibold">✓ Fully Paid</span>
                        ) : secondPaymentPaid ? (
                          <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
                            ${Math.round(currentJourney.totalCost * 0.20).toLocaleString()} remaining
                          </span>
                        ) : (
                          <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
                            ${Math.round(currentJourney.totalCost * 0.70).toLocaleString()} remaining
                          </span>
                        )}
                      </p>
                    </div>
                    <p style={{ fontSize: '2.5rem', color: 'var(--bt-gold)', fontWeight: '700' }}>
                      ${currentJourney.totalCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-amber-200">
                    <p className="text-gray-600">
                      All-inclusive package: procedures, specialist care, luxury accommodation, recovery support, 
                      and curated activities for your complete transformation journey.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                {/* Payment Unlocked Hero */}
                <div className="p-8 rounded-2xl mb-8" style={{ 
                  background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 100%)',
                  border: '2px solid var(--bt-gold)'
                }}>
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--bt-gold)' }} />
                    <h3 className="mb-3" style={{ 
                      fontSize: '2rem', 
                      color: 'var(--bt-charcoal)',
                      fontWeight: '600',
                      letterSpacing: '-0.01em'
                    }}>
                      YOUR SANCTUARY IS READY
                    </h3>
                    <p className="text-gray-700 mb-6" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                      Welcome back. Since your flight details are confirmed and your journey dates are locked in, your <strong>Gold-Tier Sanctuary</strong> is now reserved exclusively for you. The final step is to secure your booking with your payment. I've handled all the logistics; now, let's finalize your transformation.
                    </p>

                    <div className="p-5 rounded-lg" style={{ backgroundColor: '#fffbfc', border: '2px solid var(--bt-blush)' }}>
                      <p className="mb-2 text-sm text-gray-600">30% DEPOSIT DUE</p>
                      <p style={{ fontSize: '2.25rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                        ${Math.round(currentJourney.totalCost * 0.30).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">Due within 48 hours to lock reservation</p>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white p-8 rounded-xl border border-gray-200">
                  <h4 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Complete Your Booking
                  </h4>

                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Package Total:</span>
                        <span style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                          ${currentJourney.totalCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>30% Deposit Today:</span>
                        <span style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                          ${Math.round(currentJourney.totalCost * 0.30).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>50% due Nov 8, 2025</span>
                        <span>${Math.round(currentJourney.totalCost * 0.50).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-sm text-gray-600">
                        <span>20% due Nov 15, 2025</span>
                        <span>${Math.round(currentJourney.totalCost * 0.20).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Mock Payment Form */}
                    <div className="p-6 rounded-lg" style={{ backgroundColor: '#fafafa', border: '2px dashed #d1d5db' }}>
                      <p className="text-center text-gray-600 mb-4">
                        <strong>Demo Mode:</strong> Payment gateway integration
                      </p>
                      <p className="text-sm text-gray-500 text-center mb-4">
                        In production, this would connect to Stripe, PayPal, or your preferred payment processor
                      </p>
                      <button
                        onClick={handlePaymentSubmit}
                        className="w-full py-4 rounded-full transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: 'var(--bt-gold)',
                          color: 'white',
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          letterSpacing: '0.02em'
                        }}
                      >
                        SUBMIT PAYMENT & CONFIRM BOOKING
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting payment, you agree to our terms and conditions, including the specialist consultation requirement and cancellation policy.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
