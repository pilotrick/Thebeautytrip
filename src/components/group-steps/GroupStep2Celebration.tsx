import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface GroupStep2CelebrationProps {
  celebrationTypes: string[];
  customCelebration: string;
  onToggleCelebration: (id: string) => void;
  onCustomCelebrationChange: (value: string) => void;
}

export function GroupStep2Celebration({
  celebrationTypes,
  customCelebration,
  onToggleCelebration,
  onCustomCelebrationChange
}: GroupStep2CelebrationProps) {
  const celebrations = [
    { id: 'bachelorette', name: 'Bachelorette Party', emoji: '🥂' },
    { id: 'bachelor', name: 'Bachelor Party', emoji: '🎊' },
    { id: 'divorce', name: 'Divorce Celebration', emoji: '🦋' },
    { id: 'graduation', name: 'Graduation', emoji: '🎓' },
    { id: 'anniversary', name: 'Anniversary', emoji: '💍' },
    { id: 'coed', name: 'Co-Ed Adventure', emoji: '🌴' },
    { id: 'milestone', name: 'Milestone Birthday', emoji: '🎉' },
    { id: 'friends', name: 'Friends Getaway', emoji: '✨' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
          What are you celebrating? *
        </h3>
        <p className="text-sm text-gray-600 mb-6">Select all that apply</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {celebrations.map(celebration => (
            <button
              key={celebration.id}
              onClick={() => onToggleCelebration(celebration.id)}
              className="p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg text-left"
              style={{
                borderColor: celebrationTypes.includes(celebration.id) ? 'var(--bt-gold)' : '#e5e7eb',
                backgroundColor: celebrationTypes.includes(celebration.id) ? '#fffef8' : 'white'
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{celebration.emoji}</span>
                <span style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
                  {celebration.name}
                </span>
              </div>
            </button>
          ))}

          {/* Custom Option */}
          <button
            onClick={() => onToggleCelebration('custom')}
            className="p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg text-left"
            style={{
              borderColor: celebrationTypes.includes('custom') ? 'var(--bt-gold)' : '#e5e7eb',
              backgroundColor: celebrationTypes.includes('custom') ? '#fffef8' : 'white'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">✏️</span>
              <span style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
                Custom Celebration
              </span>
            </div>
          </button>

          {/* None Option */}
          <button
            onClick={() => onToggleCelebration('none')}
            className="p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg text-left"
            style={{
              borderColor: celebrationTypes.includes('none') ? 'var(--bt-gold)' : '#e5e7eb',
              backgroundColor: celebrationTypes.includes('none') ? '#fffef8' : 'white'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌟</span>
              <span style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
                No Celebration - Just Transformation
              </span>
            </div>
          </button>
        </div>

        {/* Custom Input */}
        {celebrationTypes.includes('custom') && (
          <div className="mt-6">
            <Label className="mb-2 block">Tell us about your celebration</Label>
            <Input
              type="text"
              placeholder="e.g., Turning 40 with my besties, Career milestone celebration..."
              value={customCelebration}
              onChange={(e) => onCustomCelebrationChange(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
