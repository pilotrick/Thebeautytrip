import { Check, Clock, Lock } from 'lucide-react';

interface TrackerItem {
  title: string;
  status: 'complete' | 'in-progress' | 'locked';
  color: 'gold' | 'blush';
  description: string;
  dueDate?: string;
}

interface ProgressTrackerProps {
  flightConfirmed: boolean;
}

export function ProgressTracker({ flightConfirmed }: ProgressTrackerProps) {
  const items: TrackerItem[] = [
    {
      title: 'Flight Confirmation',
      status: flightConfirmed ? 'complete' : 'in-progress',
      color: 'gold',
      description: flightConfirmed 
        ? 'Flight details confirmed and approved by concierge team' 
        : 'Upload your flight receipt to unlock the next steps',
      dueDate: flightConfirmed ? undefined : 'Required before booking finalization'
    },
    {
      title: 'Pre-Op Forms Submission',
      status: flightConfirmed ? 'in-progress' : 'locked',
      color: 'blush',
      description: flightConfirmed 
        ? 'Complete your medical history and consultation forms' 
        : 'Unlocks after flight confirmation',
      dueDate: flightConfirmed ? '7 days before arrival' : undefined
    },
    {
      title: 'Payment Schedule',
      status: flightConfirmed ? 'in-progress' : 'locked',
      color: 'gold',
      description: flightConfirmed 
        ? '50% deposit required to lock sanctuary reservation' 
        : 'Payment gateway unlocks after flight confirmation',
      dueDate: flightConfirmed ? 'Due within 48 hours' : undefined
    },
    {
      title: 'Pre-Care Guide Review',
      status: flightConfirmed ? 'in-progress' : 'locked',
      color: 'blush',
      description: flightConfirmed 
        ? 'Review your personalized pre-treatment protocol' 
        : 'Available after payment confirmation',
      dueDate: flightConfirmed ? '14 days before procedures' : undefined
    },
    {
      title: 'Airport Transfer Coordination',
      status: flightConfirmed ? 'complete' : 'locked',
      color: 'gold',
      description: flightConfirmed 
        ? 'Private luxury transfer from SDQ/PUJ secured by concierge team' 
        : 'Arranged automatically after flight confirmation',
    }
  ];

  const getStatusIcon = (status: TrackerItem['status']) => {
    switch (status) {
      case 'complete':
        return <Check className="w-6 h-6" />;
      case 'in-progress':
        return <Clock className="w-6 h-6" />;
      case 'locked':
        return <Lock className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: TrackerItem['status'], color: 'gold' | 'blush') => {
    if (status === 'locked') return '#9ca3af';
    return color === 'gold' ? 'var(--bt-gold)' : 'var(--bt-blush)';
  };

  const getProgressWidth = (status: TrackerItem['status']) => {
    switch (status) {
      case 'complete': return '100%';
      case 'in-progress': return '50%';
      case 'locked': return '0%';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="mb-2" style={{ 
          fontSize: '1.75rem', 
          color: 'var(--bt-charcoal)',
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }}>
          Your Journey Progress
        </h3>
        <p className="text-gray-600" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
          Track every milestone from booking to arrival. We handle the complexity; you focus on anticipation.
        </p>
      </div>

      {items.map((item, index) => (
        <div 
          key={index}
          className="p-6 rounded-lg border-2 transition-all duration-300"
          style={{ 
            borderColor: item.status === 'locked' ? '#e5e7eb' : getStatusColor(item.status, item.color),
            backgroundColor: item.status === 'locked' ? '#fafafa' : 'white',
            opacity: item.status === 'locked' ? 0.6 : 1
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: item.status === 'locked' ? '#f3f4f6' : `${getStatusColor(item.status, item.color)}20`,
                color: getStatusColor(item.status, item.color)
              }}
            >
              {getStatusIcon(item.status)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 style={{ 
                  fontSize: '1.25rem',
                  color: 'var(--bt-charcoal)',
                  fontWeight: '600'
                }}>
                  {item.title}
                </h4>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${getStatusColor(item.status, item.color)}20`,
                    color: getStatusColor(item.status, item.color),
                    fontWeight: '600'
                  }}
                >
                  {item.status === 'complete' ? 'Complete' : item.status === 'in-progress' ? 'In Progress' : 'Locked'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                {item.description}
              </p>

              {item.dueDate && (
                <p className="text-sm" style={{ color: item.color === 'gold' ? 'var(--bt-gold)' : 'var(--bt-blush)', fontWeight: '600' }}>
                  {item.dueDate}
                </p>
              )}

              {/* Progress Bar */}
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: getProgressWidth(item.status),
                    backgroundColor: getStatusColor(item.status, item.color)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
