import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface GroupStep5CoordinatorProps {
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  isGiftBooking: boolean;
  onCoordinatorNameChange: (value: string) => void;
  onCoordinatorEmailChange: (value: string) => void;
  onCoordinatorPhoneChange: (value: string) => void;
  onGiftBookingChange: (checked: boolean) => void;
}

export function GroupStep5Coordinator({
  coordinatorName,
  coordinatorEmail,
  coordinatorPhone,
  isGiftBooking,
  onCoordinatorNameChange,
  onCoordinatorEmailChange,
  onCoordinatorPhoneChange,
  onGiftBookingChange
}: GroupStep5CoordinatorProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
          Trip Coordinator Details
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          You'll receive group invite links to share and manage all bookings
        </p>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <Label className="mb-2 block">Your Name *</Label>
            <Input
              type="text"
              placeholder="Jane Smith"
              value={coordinatorName}
              onChange={(e) => onCoordinatorNameChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <Label className="mb-2 block">Email Address *</Label>
            <Input
              type="email"
              placeholder="jane@example.com"
              value={coordinatorEmail}
              onChange={(e) => onCoordinatorEmailChange(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              We'll send you the coordinator portal access and invite links
            </p>
          </div>

          {/* Phone */}
          <div>
            <Label className="mb-2 block">Phone Number *</Label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={coordinatorPhone}
              onChange={(e) => onCoordinatorPhoneChange(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              For SMS invite links and trip updates
            </p>
          </div>

          {/* Gift Booking Option */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
            <Checkbox
              id="gift-booking"
              checked={isGiftBooking}
              onCheckedChange={(checked) => onGiftBookingChange(checked === true)}
            />
            <div>
              <label
                htmlFor="gift-booking"
                className="cursor-pointer"
                style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}
              >
                🎁 This is a gift/surprise trip
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Select this if you're organizing a surprise. We'll help you coordinate without revealing details to guests.
              </p>
            </div>
          </div>

          {/* Coordinator Benefits */}
          <div className="mt-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fffef8' }}>
            <h4 className="mb-4 flex items-center gap-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              <span className="text-xl">👑</span>
              Your Coordinator Benefits
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Real-time dashboard to track all member bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Easy invite link sharing via text & email</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>No need to collect personal details - members enter their own</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Priority concierge support for group logistics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                <span>Complimentary coordinator travel planning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
