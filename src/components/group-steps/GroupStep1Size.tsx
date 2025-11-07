import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { getGroupDiscount } from "../GroupQuestionnaire";
import { Car } from "lucide-react";

interface GroupStep1SizeProps {
  groupSize: number;
  onGroupSizeChange: (size: number) => void;
}

export function GroupStep1Size({ groupSize, onGroupSizeChange }: GroupStep1SizeProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
          How many guests in your group?
        </h3>
        <div className="space-y-6">
          <div>
            <Label className="mb-4 block">Group Size (Minimum 2 guests)</Label>
            <div className="flex items-center gap-6">
              <Slider
                value={[groupSize]}
                onValueChange={(value) => onGroupSizeChange(value[0])}
                min={2}
                max={20}
                step={1}
                className="flex-1"
              />
              <div className="w-20 text-center">
                <span style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                  {groupSize}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {groupSize <= 6 
                ? 'Private villa accommodation recommended' 
                : groupSize <= 12
                  ? 'Large villa or multiple nearby properties recommended'
                  : 'Multiple nearby villas or estate compound recommended'}
            </p>
          </div>

          {/* Discount Tiers Breakdown */}
          <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fffdf7' }}>
            <h4 className="mb-4 text-center" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              Group Discount Tiers
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-3 rounded-lg border-2 transition-all ${groupSize >= 4 && groupSize <= 5 ? 'border-gold-500 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: groupSize >= 4 && groupSize <= 5 ? 'var(--bt-gold)' : '#9ca3af' }}>5%</div>
                <div className="text-xs text-gray-600">4-5 guests</div>
              </div>
              <div className={`p-3 rounded-lg border-2 transition-all ${groupSize >= 6 && groupSize <= 9 ? 'border-gold-500 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: groupSize >= 6 && groupSize <= 9 ? 'var(--bt-gold)' : '#9ca3af' }}>10%</div>
                <div className="text-xs text-gray-600">6-9 guests</div>
              </div>
              <div className={`p-3 rounded-lg border-2 transition-all ${groupSize >= 10 && groupSize <= 14 ? 'border-gold-500 bg-white' : 'border-gray-200 bg-gray-50'}`}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: groupSize >= 10 && groupSize <= 14 ? 'var(--bt-gold)' : '#9ca3af' }}>15%</div>
                <div className="text-xs text-gray-600">10-14 guests</div>
              </div>
              <div className={`p-3 rounded-lg border-2 transition-all ${groupSize >= 15 ? 'border-gold-500 bg-white shadow-lg' : 'border-gray-200 bg-gray-50'}`}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: groupSize >= 15 ? 'var(--bt-gold)' : '#9ca3af' }}>20%</div>
                <div className="text-xs text-gray-600">15+ guests</div>
                {groupSize >= 15 && <div className="text-xs mt-1" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>Maximum!</div>}
              </div>
            </div>
          </div>

          {/* Visual Group Size Indicator */}
          <div className="mt-6 p-6 rounded-lg border-2" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
            <h4 className="mb-4" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              Your Group Benefits
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span className="flex items-center gap-1">
                  <span style={{ fontWeight: '600', color: 'var(--bt-gold)' }}>5%</span>
                  <span>group discount on procedures</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span className="flex items-center gap-1">
                  <span style={{ fontWeight: '600', color: 'var(--bt-gold)' }}>{getGroupDiscount(groupSize) - 5}%</span>
                  <span>group discount on activities</span>
                  {groupSize >= 15 && <span style={{ fontSize: '0.75rem', color: 'var(--bt-gold)' }}>(Maximum!)</span>}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Private group experiences and wellness activities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Dedicated concierge support</span>
              </div>
              {groupSize > 8 && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                  <Car className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--bt-gold)' }} />
                  <span style={{ fontWeight: '600', color: 'var(--bt-gold)' }}>
                    Premium transportation for all group activities and transfers (to/from airport)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
