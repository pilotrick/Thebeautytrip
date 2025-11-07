import React from 'react';
import { Users, MapPin, Calendar, Home, Sparkles, DollarSign, User } from 'lucide-react';
import { Card } from './ui/card';
import { GroupMember } from './GroupManagement';

interface GroupTripDetails {
  groupId: string;
  groupName: string;
  destination: string;
  procedures: string[];
  specialists: string[];
  retreat: {
    name: string;
    location: string;
    type: string;
    pricePerDay: number;
  };
  recoveryDays: number;
  startDate?: string;
  members: GroupMember[];
  activities: string[];
}

interface GroupTripVisualizationProps {
  tripDetails: GroupTripDetails;
  currentUserEmail: string;
}

export function GroupTripVisualization({ tripDetails, currentUserEmail }: GroupTripVisualizationProps) {
  const currentMember = tripDetails.members.find(m => m.email === currentUserEmail);
  const isLeader = currentMember?.role === 'leader';

  return (
    <div className=\"min-h-screen bg-white pt-20 pb-20 px-6\">
      <div className=\"max-w-7xl mx-auto\">
        {/* Header */}
        <div className=\"text-center mb-16\">
          <div className=\"inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-100 rounded-full\">
            <Users className=\"w-5 h-5\" style={{ color: 'var(--bt-gold)' }} />
            <span className=\"text-sm\" style={{ color: 'var(--bt-charcoal)' }}>
              Group ID: {tripDetails.groupId}
            </span>
          </div>
          <h1 style={{ fontSize: '3rem', color: 'var(--bt-charcoal)', marginBottom: '1rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            {tripDetails.groupName}
          </h1>
          <p className=\"text-gray-600 max-w-2xl mx-auto\" style={{ fontSize: '1.125rem' }}>
            Your collective transformation journey to the Dominican Republic
          </p>
        </div>

        {/* Trip Overview Cards */}
        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6 mb-16\">
          <Card className=\"p-6 border-2\" style={{ borderColor: 'var(--bt-blush)' }}>
            <div className=\"flex items-center gap-3 mb-3\">
              <MapPin className=\"w-6 h-6\" style={{ color: 'var(--bt-blush)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>Destination</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)' }}>{tripDetails.destination}</p>
          </Card>

          <Card className=\"p-6 border-2\" style={{ borderColor: 'var(--bt-gold)' }}>
            <div className=\"flex items-center gap-3 mb-3\">
              <Calendar className=\"w-6 h-6\" style={{ color: 'var(--bt-gold)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>Duration</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)' }}>{tripDetails.recoveryDays} days</p>
            {tripDetails.startDate && (
              <p className=\"text-sm text-gray-600 mt-1\">Starting {tripDetails.startDate}</p>
            )}
          </Card>

          <Card className=\"p-6 border-2\" style={{ borderColor: 'var(--bt-charcoal)' }}>
            <div className=\"flex items-center gap-3 mb-3\">
              <Users className=\"w-6 h-6\" style={{ color: 'var(--bt-charcoal)' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>Group Size</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)' }}>{tripDetails.members.length} members</p>
          </Card>
        </div>

        {/* Accommodation */}
        <div className=\"mb-16\">
          <h2 className=\"mb-6\" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
            <Home className=\"inline-block w-8 h-8 mr-3\" style={{ color: 'var(--bt-gold)' }} />
            Your Group Sanctuary
          </h2>
          <Card className=\"p-8 border-2\" style={{ borderColor: 'var(--bt-gold)' }}>
            <div className=\"flex items-start justify-between\">
              <div className=\"flex-1\">
                <h3 style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {tripDetails.retreat.name}
                </h3>
                <p className=\"text-gray-600 mb-2\">{tripDetails.retreat.location}</p>
                <p className=\"text-sm\" style={{ color: 'var(--bt-gold)' }}>{tripDetails.retreat.type}</p>
              </div>
              <div className=\"text-right\">
                <p className=\"text-sm text-gray-600\">Per Night</p>
                <p style={{ fontSize: '1.5rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                  ${tripDetails.retreat.pricePerDay.toLocaleString()}
                </p>
                <p className=\"text-xs text-gray-500 mt-1\">
                  ${(tripDetails.retreat.pricePerDay * tripDetails.recoveryDays).toLocaleString()} total
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Procedures & Specialists */}
        <div className=\"grid grid-cols-1 md:grid-cols-2 gap-8 mb-16\">
          <div>
            <h2 className=\"mb-6\" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
              <Sparkles className=\"inline-block w-8 h-8 mr-3\" style={{ color: 'var(--bt-blush)' }} />
              Procedures
            </h2>
            <div className=\"space-y-3\">
              {tripDetails.procedures.map((procedure, index) => (
                <Card key={index} className=\"p-4 border-l-4\" style={{ borderLeftColor: 'var(--bt-blush)' }}>
                  <p style={{ color: 'var(--bt-charcoal)' }}>{procedure}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className=\"mb-6\" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
              <User className=\"inline-block w-8 h-8 mr-3\" style={{ color: 'var(--bt-blush)' }} />
              Specialists
            </h2>
            <div className=\"space-y-3\">
              {tripDetails.specialists.map((specialist, index) => (
                <Card key={index} className=\"p-4 border-l-4\" style={{ borderLeftColor: 'var(--bt-gold)' }}>
                  <p style={{ color: 'var(--bt-charcoal)' }}>{specialist}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Group Members */}
        <div className=\"mb-16\">
          <h2 className=\"mb-6\" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
            <Users className=\"inline-block w-8 h-8 mr-3\" style={{ color: 'var(--bt-charcoal)' }} />
            Your Travel Companions
          </h2>
          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">
            {tripDetails.members.map((member) => (
              <Card
                key={member.id}
                className=\"p-6 border-2\"
                style={{
                  borderColor: member.role === 'leader' ? 'var(--bt-gold)' : 'var(--bt-blush)',
                  backgroundColor: member.email === currentUserEmail ? '#fffef5' : 'white'
                }}
              >
                <div className=\"flex items-start justify-between mb-2\">
                  <h4 style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    {member.name}
                  </h4>
                  {member.role === 'leader' && (
                    <span
                      className=\"px-2 py-1 text-xs rounded\"
                      style={{ backgroundColor: 'var(--bt-gold)', color: 'white' }}
                    >
                      Leader
                    </span>
                  )}
                  {member.email === currentUserEmail && (
                    <span
                      className=\"px-2 py-1 text-xs rounded\"
                      style={{ backgroundColor: 'var(--bt-blush)', color: 'white' }}
                    >
                      You
                    </span>
                  )}
                </div>
                <p className=\"text-sm text-gray-600 mb-3\">{member.email}</p>
                <div className=\"flex items-center gap-2\">
                  <DollarSign className=\"w-4 h-4 text-gray-500\" />
                  <p className=\"text-sm\">
                    Budget:{' '}
                    <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
                      ${member.budget.toLocaleString()}
                    </span>
                  </p>
                </div>
                <p className=\"text-xs mt-2\">
                  Status:{' '}
                  <span
                    style={{
                      color:
                        member.inviteStatus === 'accepted'
                          ? 'green'
                          : member.inviteStatus === 'sent'
                          ? 'orange'
                          : 'gray'
                    }}
                  >
                    {member.inviteStatus.charAt(0).toUpperCase() + member.inviteStatus.slice(1)}
                  </span>
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Activities */}
        {tripDetails.activities.length > 0 && (
          <div className=\"mb-16\">
            <h2 className=\"mb-6\" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
              <Sparkles className=\"inline-block w-8 h-8 mr-3\" style={{ color: 'var(--bt-gold)' }} />
              Group Activities
            </h2>
            <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
              {tripDetails.activities.map((activity, index) => (
                <Card key={index} className=\"p-4 border-l-4\" style={{ borderLeftColor: 'var(--bt-gold)' }}>
                  <p style={{ color: 'var(--bt-charcoal)' }}>{activity}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Note Section */}
        <div className=\"p-6 rounded-lg\" style={{ backgroundColor: 'var(--bt-blush)', border: '2px solid rgba(255,255,255,0.5)' }}>
          <p className=\"text-white text-center\" style={{ lineHeight: '1.7', fontSize: '1.125rem' }}>
            <strong>Your Collective Journey:</strong> This itinerary represents the shared elements of your group's transformation. Each member will complete their individual booking funnel to customize their personal preferences while staying coordinated with the group.
          </p>
        </div>
      </div>
    </div>
  );
}
