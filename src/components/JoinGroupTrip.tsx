import { useState } from "react";
import { Logo } from "./Logo";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";

interface JoinGroupTripProps {
  groupId: string;
  onComplete: (memberData: MemberJoinData) => void;
}

export interface MemberJoinData {
  groupId: string;
  memberName: string;
  memberEmail: string;
  memberPhone: string;
  budgetPreference: number;
}

export function JoinGroupTrip({ groupId, onComplete }: JoinGroupTripProps) {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [budgetPreference, setBudgetPreference] = useState(2000);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const canProceed = memberName.trim() && 
                      memberEmail.trim() && 
                      memberEmail.includes('@') && 
                      memberPhone.trim() &&
                      agreedToTerms;

  const handleJoin = () => {
    if (!canProceed) return;

    onComplete({
      groupId,
      memberName,
      memberEmail,
      memberPhone,
      budgetPreference
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Logo size="md" />
        </div>
      </div>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)' }}>
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
              Join a Group Beauty Trip!
            </h1>
            
            <p className="text-gray-600 mb-4" style={{ fontSize: '1.125rem' }}>
              You've been invited to coordinate a luxury wellness transformation experience
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full">
              <span className="text-sm text-gray-600">Group ID:</span>
              <span style={{ color: 'var(--bt-gold)', fontWeight: '600', fontSize: '1.125rem' }}>
                {groupId}
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="mb-8 p-6 border-2 rounded-lg" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fffef8' }}>
            <h3 className="mb-4" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              ✨ How This Works
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--bt-gold)' }} />
                <span>You'll create your own account and customize your experience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--bt-gold)' }} />
                <span>Select your preferred procedures, specialists, and recovery activities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--bt-gold)' }} />
                <span>Manage your own booking and payment (no need to coordinate with others)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--bt-gold)' }} />
                <span>You're automatically grouped for shared villas and group discounts!</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="p-8 border-2 rounded-lg mb-8" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
            <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              Your Information
            </h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="member-name">Full Name *</Label>
                <Input
                  id="member-name"
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="Jane Smith"
                  className="mt-2 h-12"
                  required
                />
              </div>

              <div>
                <Label htmlFor="member-email">Email Address *</Label>
                <Input
                  id="member-email"
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="jane@email.com"
                  className="mt-2 h-12"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll use this for booking confirmations and updates
                </p>
              </div>

              <div>
                <Label htmlFor="member-phone">Phone Number *</Label>
                <Input
                  id="member-phone"
                  type="tel"
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="mt-2 h-12"
                  required
                />
              </div>

              <div>
                <Label htmlFor="budget">Your Budget Preference</Label>
                <p className="text-xs text-gray-500 mb-3">
                  This is just for your planning - you can adjust later
                </p>
                <div className="flex items-center gap-4">
                  <Input
                    id="budget"
                    type="range"
                    min="800"
                    max="10000"
                    step="200"
                    value={budgetPreference}
                    onChange={(e) => setBudgetPreference(Number(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-32 text-right">
                    <span style={{ fontSize: '1.5rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                      ${budgetPreference.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                    I confirm that I was invited to join this group and agree to The Beauty Trip's terms of service and privacy policy. I understand that I'm responsible for my own booking and payment.
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mb-8 p-4 border-2 rounded-lg" style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-500" />
              <p className="text-xs text-gray-600">
                Your information is secure and will only be used to coordinate your group trip and provide you with personalized service. We never share your data with third parties without consent.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleJoin}
              disabled={!canProceed}
              className="px-12 py-4 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
              style={{ 
                backgroundColor: canProceed ? 'var(--bt-gold)' : '#d1d5db',
                fontSize: '1.125rem',
                fontWeight: '500',
                letterSpacing: '-0.01em'
              }}
            >
              Join Group & Start Customizing
            </Button>
          </div>

          {!agreedToTerms && memberName && memberEmail && memberPhone && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please agree to the terms to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
