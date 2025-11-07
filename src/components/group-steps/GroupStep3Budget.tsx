import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Calendar } from "lucide-react";

interface GroupStep3BudgetProps {
  budgetPerPerson: number;
  groupSize: number;
  tripDuration: number;
  onBudgetChange: (budget: number) => void;
  onDurationChange: (days: number) => void;
}

export function GroupStep3Budget({ 
  budgetPerPerson, 
  groupSize, 
  tripDuration,
  onBudgetChange,
  onDurationChange 
}: GroupStep3BudgetProps) {
  const totalBudget = budgetPerPerson * groupSize;

  const getBudgetRecommendation = (budget: number) => {
    if (budget < 1500) return 'Essential procedures + comfortable stay';
    if (budget < 3000) return 'Premium treatments + luxury accommodation';
    if (budget < 5000) return 'Comprehensive transformation + 5-star experience';
    if (budget < 8000) return 'Ultra-luxury experience with multiple procedures';
    if (budget < 15000) return 'Complete transformation + extended luxury stay';
    return 'Ultimate bespoke experience - The full sanctuary';
  };

  const getRecommendedDuration = (budget: number) => {
    if (budget < 1500) return 4;
    if (budget < 2500) return 5;
    if (budget < 4000) return 7;
    if (budget < 6000) return 9;
    if (budget < 10000) return 11;
    if (budget < 15000) return 12;
    return 14;
  };

  const getDurationDescription = (days: number) => {
    if (days <= 4) return 'Quick refresh - Essential procedures only';
    if (days <= 6) return 'Classic trip - Procedures + recovery';
    if (days <= 8) return 'Extended stay - Full transformation + activities';
    return 'Ultimate retreat - Complete experience + exploration';
  };

  // Suggest duration when budget changes
  const handleBudgetChange = (newBudget: number) => {
    onBudgetChange(newBudget);
    const recommended = getRecommendedDuration(newBudget);
    if (Math.abs(tripDuration - recommended) > 2) {
      // Only auto-adjust if current duration is very different from recommended
      onDurationChange(recommended);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
          What's your budget per person?
        </h3>
        
        <div className="space-y-8">
          {/* Budget Slider */}
          <div>
            <Label className="mb-4 block">Budget Per Person</Label>
            <div className="flex items-center gap-6">
              <Slider
                value={[budgetPerPerson]}
                onValueChange={(value) => handleBudgetChange(value[0])}
                min={800}
                max={25000}
                step={100}
                className="flex-1"
              />
              <div className="w-32 text-center">
                <span style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                  ${budgetPerPerson.toLocaleString()}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {getBudgetRecommendation(budgetPerPerson)}
            </p>
          </div>

          {/* Duration Slider */}
          <div>
            <Label className="mb-4 block flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: 'var(--bt-gold)' }} />
              Trip Duration (Nights)
            </Label>
            <div className="flex items-center gap-6">
              <Slider
                value={[tripDuration]}
                onValueChange={(value) => onDurationChange(value[0])}
                min={3}
                max={14}
                step={1}
                className="flex-1"
              />
              <div className="w-32 text-center">
                <span style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                  {tripDuration}
                </span>
                <p className="text-xs text-gray-500">nights</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {getDurationDescription(tripDuration)}
            </p>
            
            {/* Recommended Duration Badge */}
            {Math.abs(tripDuration - getRecommendedDuration(budgetPerPerson)) <= 1 && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs text-green-700" style={{ fontWeight: '600' }}>
                  Optimal duration for your budget
                </span>
              </div>
            )}
            {Math.abs(tripDuration - getRecommendedDuration(budgetPerPerson)) > 1 && (
              <p className="text-xs text-gray-600 mt-2">
                💡 Based on your budget, we recommend {getRecommendedDuration(budgetPerPerson)} nights
              </p>
            )}
          </div>

          {/* Total Budget Display */}
          <div className="relative">
            {/* Budget Card - Elevated */}
            <div className="relative z-10 p-6 rounded-lg mb-4" style={{ backgroundColor: '#f9fafb' }}>
              <p className="text-sm text-gray-600 mb-1">Total Group Budget</p>
              <p style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', fontWeight: '700' }}>
                ${totalBudget.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {groupSize} guests × ${budgetPerPerson.toLocaleString()}
              </p>
            </div>

            {/* Duration & Cost Breakdown - Below */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border-2 border-gray-200 bg-white">
                <p className="text-xs text-gray-600 mb-1">Trip Duration</p>
                <p style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  {tripDuration} nights
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {tripDuration + 1} days total
                </p>
              </div>
              <div className="p-4 rounded-lg border-2 border-gray-200 bg-white">
                <p className="text-xs text-gray-600 mb-1">Per Night Cost</p>
                <p style={{ fontSize: '1.5rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                  ${Math.round(budgetPerPerson / tripDuration).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  per person
                </p>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
            <h4 className="mb-4" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              What's Included
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Medical procedures & consultations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Luxury accommodation ({tripDuration} nights)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Private transportation & airport transfers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Wellness activities & recovery experiences</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Dedicated concierge throughout stay</span>
              </div>
              {tripDuration >= 7 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                  <span>Extended stay bonuses: Cultural excursions & leisure activities</span>
                </div>
              )}
            </div>
          </div>

          {/* Duration Tips */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              ⏱️ Duration Planning Tips
            </h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Most procedures require 3-5 days for initial recovery</li>
              <li>• 7+ nights allow time for both procedures and exploration</li>
              <li>• Longer stays spread costs and provide better value</li>
              <li>• Each member can adjust their individual duration in their portal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
