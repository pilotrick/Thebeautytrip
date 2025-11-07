import { useState } from "react";
import { Logo } from "./Logo";
import { GroupData } from "./GroupQuestionnaire";
import { Copy, Check, MessageSquare, Users, Crown, Link as LinkIcon, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { copyToClipboard } from "../utils/clipboard";

interface GroupThankYouProps {
  groupData: GroupData;
  onReturnHome: () => void;
}

export function GroupThankYou({ groupData, onReturnHome }: GroupThankYouProps) {
  // Generate unique group ID
  const groupId = `BTG-${Date.now().toString().slice(-8)}`;
  
  // Generate shareable group link
  const baseUrl = window.location.origin;
  const groupInviteLink = `${baseUrl}?join=${groupId}`;
  const portalLink = `${baseUrl}/portal?groupId=${groupId}`;
  
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPortal, setCopiedPortal] = useState(false);

  const handleCopyGroupLink = async () => {
    const success = await copyToClipboard(groupInviteLink);
    if (success) {
      setCopiedLink(true);
      toast.success('Group invite link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      toast.error('Failed to copy link. Please copy manually.');
    }
  };

  const handleCopyPortalLink = async () => {
    const success = await copyToClipboard(portalLink);
    if (success) {
      setCopiedPortal(true);
      toast.success('Booking portal link copied!');
      setTimeout(() => setCopiedPortal(false), 2000);
    } else {
      toast.error('Failed to copy link. Please copy manually.');
    }
  };

  const handleShareViaText = () => {
    const message = `You're invited to join our Beauty Trip to the Dominican Republic! 🌴✨\n\nJoin our group (ID: ${groupId}):\n${groupInviteLink}\n\nEach person selects their own treatments and pays individually. We're automatically grouped for shared villas & group discounts!`;
    
    // Open SMS with pre-filled message
    window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
    toast.success('Opening text message app...');
  };

  const handleShareViaEmail = () => {
    const subject = `Join Our Beauty Trip to Dominican Republic (Group ${groupId})`;
    const body = `You're invited to join our group trip to the Dominican Republic! 🌴✨

Group ID: ${groupId}

Click here to join and customize your experience:
${groupInviteLink}

HOW IT WORKS:
• Each person creates their own account
• Select your preferred treatments & specialists
• Manage your own booking and payment
• We're automatically grouped for shared villas and group discounts!

Looking forward to this amazing adventure together!`;

    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    toast.success('Opening email app...');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Logo size="md" />
        </div>
      </div>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)' }}>
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
              {groupData.isGiftBooking ? 'Gift Trip Created!' : 'Group Trip Ready to Share!'}
            </h1>
            
            <p className="text-gray-600 mb-4" style={{ fontSize: '1.125rem' }}>
              {groupData.isGiftBooking 
                ? 'Our concierge team will contact you within 24 hours to coordinate'
                : 'Share your group link - everyone fills in their own details'}
            </p>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full">
              <span className="text-sm text-gray-600">Group ID:</span>
              <span style={{ color: 'var(--bt-gold)', fontWeight: '600', fontSize: '1.125rem' }}>
                {groupId}
              </span>
            </div>
          </div>

          {/* Security Disclosure */}
          {!groupData.isGiftBooking && (
            <div className="mb-8 p-6 border-2 rounded-lg" style={{ borderColor: '#f59e0b', backgroundColor: '#fffbeb' }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#f59e0b' }} />
                <div>
                  <h4 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    ⚠️ Important: Share Links Carefully
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Only share this link with confirmed group members</li>
                    <li>Double-check email addresses and phone numbers before sending</li>
                    <li>Anyone with the link can join your group trip</li>
                    <li>We're not responsible if unintended people receive the invitation</li>
                    <li>Contact our team immediately if someone joins by mistake (we can help troubleshoot)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Group Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-2 text-center" style={{ borderColor: 'var(--bt-blush)' }}>
              <Users className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--bt-blush)' }} />
              <p className="text-sm text-gray-600 mb-1">Expected Group Size</p>
              <p style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                {groupData.groupSize}
              </p>
            </Card>

            <Card className="p-6 border-2 text-center" style={{ borderColor: 'var(--bt-gold)' }}>
              <Crown className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--bt-gold)' }} />
              <p className="text-sm text-gray-600 mb-1">Budget Per Person</p>
              <p style={{ fontSize: '2rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                ${groupData.budgetPerPerson.toLocaleString()}
              </p>
            </Card>

            <Card className="p-6 border-2 text-center" style={{ borderColor: 'var(--bt-charcoal)' }}>
              <LinkIcon className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--bt-charcoal)' }} />
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <p style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                Ready to Share
              </p>
            </Card>
          </div>

          {!groupData.isGiftBooking ? (
            <>
              {/* Self-Service Flow */}
              <div className="mb-8 p-8 border-2 rounded-lg" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fffef8' }}>
                <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  🔗 Share Your Group Invite Link
                </h3>
                
                <div className="mb-6 p-4 bg-white border-2 rounded-lg" style={{ borderColor: 'var(--bt-gold)' }}>
                  <p style={{ color: 'var(--bt-charcoal)', fontWeight: '600', marginBottom: '0.5rem' }}>
                    ✨ Everyone Manages Their Own Booking
                  </p>
                  <p className="text-sm text-gray-600">
                    Each person uses this link to join, fill in their details, select treatments, and pay individually. You're automatically grouped for shared villas and discounts!
                  </p>
                </div>

                {/* Group Invite Link */}
                <div className="mb-6">
                  <Label className="mb-2 block text-sm text-gray-600">Group Invite Link</Label>
                  <div className="flex gap-3">
                    <div className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
                      <p className="text-sm truncate" style={{ color: 'var(--bt-charcoal)' }}>
                        {groupInviteLink}
                      </p>
                    </div>
                    <Button
                      onClick={handleCopyGroupLink}
                      className="flex items-center gap-2 px-6"
                      style={{ backgroundColor: copiedLink ? '#10b981' : 'var(--bt-gold)', color: 'white' }}
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedLink ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleShareViaText}
                    className="flex items-center justify-center gap-2 px-6 py-4 border-2"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: 'var(--bt-charcoal)',
                      color: 'var(--bt-charcoal)'
                    }}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Share via Text Message
                  </Button>

                  <Button
                    onClick={handleShareViaEmail}
                    className="flex items-center justify-center gap-2 px-6 py-4"
                    style={{ backgroundColor: 'var(--bt-blush)', color: 'white' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Share via Email
                  </Button>
                </div>
              </div>

              {/* Booking Portal Access */}
              <div className="mb-8 p-8 border-2 rounded-lg" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
                <h3 className="mb-4" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  📊 Track Your Group in Real-Time
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Access your Booking Portal to see live updates as group members join and complete their bookings. You'll see who's joined, their treatment selections, and booking status.
                </p>

                <div className="flex gap-3">
                  <div className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <p className="text-sm truncate" style={{ color: 'var(--bt-charcoal)' }}>
                      {portalLink}
                    </p>
                  </div>
                  <Button
                    onClick={handleCopyPortalLink}
                    className="flex items-center gap-2 px-6"
                    style={{ backgroundColor: copiedPortal ? '#10b981' : 'var(--bt-blush)', color: 'white' }}
                  >
                    {copiedPortal ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedPortal ? 'Copied!' : 'Copy'}
                  </Button>
                </div>

                <div className="mt-4">
                  <Button
                    onClick={() => window.location.href = portalLink}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4"
                    style={{ backgroundColor: 'var(--bt-charcoal)', color: 'white' }}
                  >
                    Open Booking Portal
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Next Steps */}
              <div className="p-8 border-2 rounded-lg mb-8" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fffef8' }}>
                <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  📋 What Happens Next
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>1</span>
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        Members Click the Link & Fill Their Info
                      </h4>
                      <p className="text-sm text-gray-600">
                        Each person enters their own name, contact details, and creates their account
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>2</span>
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        They Customize Their Experience
                      </h4>
                      <p className="text-sm text-gray-600">
                        Each member selects procedures, specialists, and recovery activities based on their preferences
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>3</span>
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        You Track Progress in Your Portal
                      </h4>
                      <p className="text-sm text-gray-600">
                        See live updates as members join, view their selections, and coordinate group details
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>4</span>
                    </div>
                    <div>
                      <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                        Everyone Manages Their Own Payment
                      </h4>
                      <p className="text-sm text-gray-600">
                        Individual payments processed separately - no need to coordinate deposits or collect money
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Gift Flow */
            <div className="p-8 border-2 rounded-lg mb-8" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
              <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                🎁 Gift Booking - Concierge Coordination
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: '1.125rem' }}>
                Our luxury concierge team will contact you within 24 hours to:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}>
                    <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>1</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Collect guest information at your pace
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}>
                    <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>2</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Coordinate treatment preferences for each guest
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}>
                    <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>3</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Process payment and finalize arrangements
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white border-2 rounded-lg" style={{ borderColor: 'var(--bt-gold)' }}>
                <p className="text-sm" style={{ color: 'var(--bt-charcoal)' }}>
                  <strong>Your Group ID:</strong> {groupId}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Keep this handy for all future correspondence
                </p>
              </div>
            </div>
          )}

          {/* Return Button */}
          <div className="flex justify-center">
            <Button
              onClick={onReturnHome}
              className="px-12 py-4 border-2"
              style={{ 
                borderColor: 'var(--bt-charcoal)',
                color: 'var(--bt-charcoal)',
                backgroundColor: 'white'
              }}
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
}
