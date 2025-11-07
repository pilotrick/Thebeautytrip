import { useState } from 'react';
import { motion } from 'motion/react';
import { ProviderUser } from '../ProviderPortal';
import { Home, CheckCircle2, AlertTriangle, Droplet, Zap, Smile, Meh, Frown } from 'lucide-react';

interface Props {
  provider: ProviderUser;
  activeTab: string;
}

interface DailyChecklist {
  cleanliness: number; // 1-5
  utilities: 'all-working' | 'issues' | 'critical';
  clientMood: number; // 1-5
  notes: string;
}

export function RecoveryPartnerDashboard({ provider, activeTab }: Props) {
  const [checklist, setChecklist] = useState<DailyChecklist>({
    cleanliness: 5,
    utilities: 'all-working',
    clientMood: 4,
    notes: ''
  });

  const [checkInRoom, setCheckInRoom] = useState('');

  const handleDailyCheckSubmit = () => {
    console.log('Daily check submitted:', checklist);
    alert('✅ Daily property status logged. Facilitator notified.');
    
    // Reset
    setChecklist({
      cleanliness: 5,
      utilities: 'all-working',
      clientMood: 4,
      notes: ''
    });
  };

  const handleCheckIn = () => {
    if (!checkInRoom) {
      alert('Please enter room number');
      return;
    }

    // Mock GPS check-in
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Client checked in at:', {
          room: checkInRoom,
          coords: position.coords,
          property: 'North Coast Recovery Villa'
        });
        
        alert(`✅ Client checked in to Room ${checkInRoom}. Geo-tag confirmed. Client portal updated.`);
        setCheckInRoom('');
      });
    }
  };

  const getMoodIcon = (rating: number) => {
    if (rating >= 4) return <Smile className="w-6 h-6 text-green-600" />;
    if (rating >= 3) return <Meh className="w-6 h-6 text-yellow-600" />;
    return <Frown className="w-6 h-6 text-red-600" />;
  };

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Current Guests</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-blush)' }}>8</p>
            <p className="text-xs text-gray-500">12 rooms available</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Property Score</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>4.8</p>
            <p className="text-xs text-gray-500">Avg last 30 days</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Response Time</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-gold)' }}>8m</p>
            <p className="text-xs text-gray-500">Average this month</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Check-ins Today</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--bt-charcoal)' }}>3</p>
            <p className="text-xs text-gray-500">2 pending arrival</p>
          </div>
        </div>

        {/* Daily Property Check */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
          <h3 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
            Daily Property Status Check
          </h3>

          <div className="space-y-6">
            {/* Cleanliness Score */}
            <div>
              <label className="block mb-3 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                Cleanliness Score (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => setChecklist({ ...checklist, cleanliness: score })}
                    className="flex-1 py-3 rounded-lg border-2 transition-all"
                    style={{
                      borderColor: checklist.cleanliness === score ? 'var(--bt-blush)' : '#e5e7eb',
                      backgroundColor: checklist.cleanliness === score ? 'var(--bt-blush)' : 'white',
                      color: checklist.cleanliness === score ? 'white' : 'var(--bt-charcoal)',
                      fontWeight: '600'
                    }}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            {/* Utilities Check */}
            <div>
              <label className="block mb-3 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                Utilities Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'all-working', label: 'All Working', icon: CheckCircle2, color: '#10b981' },
                  { value: 'issues', label: 'Minor Issues', icon: AlertTriangle, color: '#f59e0b' },
                  { value: 'critical', label: 'Critical', icon: Zap, color: '#ef4444' }
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setChecklist({ ...checklist, utilities: option.value as any })}
                      className="p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2"
                      style={{
                        borderColor: checklist.utilities === option.value ? option.color : '#e5e7eb',
                        backgroundColor: checklist.utilities === option.value ? `${option.color}10` : 'white'
                      }}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: checklist.utilities === option.value ? option.color : '#9ca3af' }}
                      />
                      <span 
                        className="text-sm font-semibold"
                        style={{ color: checklist.utilities === option.value ? option.color : '#6b7280' }}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Client Mood Rating */}
            <div>
              <label className="block mb-3 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                Client Mood Rating (Anonymous)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setChecklist({ ...checklist, clientMood: mood })}
                    className="flex-1 py-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2"
                    style={{
                      borderColor: checklist.clientMood === mood ? 'var(--bt-gold)' : '#e5e7eb',
                      backgroundColor: checklist.clientMood === mood ? `var(--bt-gold)20` : 'white'
                    }}
                  >
                    {getMoodIcon(mood)}
                    <span className="text-sm font-semibold">{mood}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This anonymous rating helps facilitators track client wellbeing
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                Additional Notes (Optional)
              </label>
              <textarea
                value={checklist.notes}
                onChange={(e) => setChecklist({ ...checklist, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                placeholder="Any issues, requests, or observations..."
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleDailyCheckSubmit}
              className="w-full px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
            >
              <CheckCircle2 className="w-5 h-5" />
              Submit Daily Check
            </button>
          </div>
        </div>

        {/* Client Check-In */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
          <h3 className="mb-6" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
            Client Check-In
          </h3>

          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>SLA Requirement:</strong> Log client check-in immediately upon arrival to enable geo-tag confirmation on their portal.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                Room Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={checkInRoom}
                onChange={(e) => setCheckInRoom(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                placeholder="e.g., 204"
              />
            </div>

            <button
              onClick={handleCheckIn}
              disabled={!checkInRoom}
              className="w-full px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
              style={{ backgroundColor: 'var(--bt-blush)', color: 'white', fontWeight: '600' }}
            >
              <Home className="w-5 h-5" />
              Confirm Client Check-In (Geo-Tag)
            </button>
          </div>
        </div>

        {/* Pending Arrivals */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
          <h3 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
            Expected Arrivals Today
          </h3>

          <div className="space-y-3">
            {[
              { name: 'Sarah Johnson', eta: '3:30 PM', room: '204', procedures: 'Dental veneers recovery' },
              { name: 'Maria Garcia', eta: '6:00 PM', room: '301', procedures: 'Post-facial recovery' }
            ].map((arrival, idx) => (
              <div key={idx} className="p-4 rounded-lg border-2 border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                      {arrival.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Room {arrival.room} • ETA: {arrival.eta}
                    </p>
                    <p className="text-xs text-gray-500">{arrival.procedures}</p>
                  </div>
                  <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                    Pending
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Home className="w-16 h-16 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">Content for this section coming soon</p>
    </div>
  );
}
