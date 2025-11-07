import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { GroupData, getGroupDiscount } from "./GroupQuestionnaire";
import { Sparkles, Users, Crown, Calendar, MapPin, Heart, ArrowRight, ExternalLink, Car } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion } from "motion/react";

interface GroupCelebrationProps {
  groupData: GroupData;
  selectedSanctuaries: string[];
  onAccessPortal: () => void;
}

export function GroupCelebration({ groupData, selectedSanctuaries, onAccessPortal }: GroupCelebrationProps) {
  const [showFireworks, setShowFireworks] = useState(true);
  const groupId = `BTG-${Date.now().toString().slice(-8)}`;

  useEffect(() => {
    // Hide fireworks after 5 seconds
    const timer = setTimeout(() => setShowFireworks(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getCelebrationText = () => {
    if (groupData.celebrationTypes.includes('bachelorette')) return 'Bachelorette';
    if (groupData.celebrationTypes.includes('bachelor')) return 'Bachelor';
    if (groupData.celebrationTypes.includes('divorce')) return 'Divorce Party';
    if (groupData.celebrationTypes.includes('graduation')) return 'Graduation';
    if (groupData.celebrationTypes.includes('anniversary')) return 'Anniversary';
    if (groupData.celebrationTypes.includes('milestone')) return 'Milestone Birthday';
    if (groupData.celebrationTypes.includes('custom')) return groupData.customCelebration || 'Celebration';
    return 'Group Celebration';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Fireworks Animation */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight,
                scale: 0,
                opacity: 1
              }}
              animate={{
                y: Math.random() * window.innerHeight * 0.5,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: 2
              }}
            >
              <div className="text-6xl">
                {['🎆', '🎇', '✨', '💫', '🌟'][Math.floor(Math.random() * 5)]}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              backgroundColor: ['#ec4899', '#f59e0b', '#8b5cf6', '#10b981', '#3b82f6'][i % 5],
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: -20, rotate: 0 }}
            animate={{
              y: window.innerHeight + 20,
              rotate: 360,
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Logo size="md" />
        </div>
      </div>

      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Celebration Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div 
              className="inline-block mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-20 h-20 mx-auto" style={{ color: 'var(--bt-gold)' }} />
            </motion.div>
            
            <h1 className="mb-4" style={{ fontSize: '3.5rem', color: 'var(--bt-charcoal)', fontWeight: '700', letterSpacing: '-0.02em' }}>
              🎉 Your {getCelebrationText()} Trip is Secured! 🎉
            </h1>
            
            <p className="text-gray-600 mb-6" style={{ fontSize: '1.5rem' }}>
              Get ready for the ultimate transformation journey to the Dominican Republic
            </p>

            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full shadow-xl">
              <span className="text-white" style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                Group ID: {groupId}
              </span>
            </div>
          </motion.div>

          {/* Trip Summary Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="p-10 border-4 shadow-2xl mb-8" style={{ borderColor: 'var(--bt-gold)', backgroundColor: 'white' }}>
              <div className="flex items-center gap-3 mb-8 pb-6 border-b-2" style={{ borderColor: 'var(--bt-blush)' }}>
                <Crown className="w-10 h-10" style={{ color: 'var(--bt-gold)' }} />
                <h2 style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', fontWeight: '700' }}>
                  Your Dream Trip Summary
                </h2>
              </div>

              {/* Trip Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Celebration Type */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 240, 245, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6" style={{ color: 'var(--bt-blush)' }} />
                    <h3 className="text-lg" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Celebration
                    </h3>
                  </div>
                  <p className="text-2xl" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                    {getCelebrationText()}
                  </p>
                  {groupData.customCelebration && (
                    <p className="text-sm text-gray-600 mt-1">{groupData.customCelebration}</p>
                  )}
                </div>

                {/* Group Size */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 251, 235, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
                    <h3 className="text-lg" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Group Size
                    </h3>
                  </div>
                  <p className="text-2xl" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                    {groupData.groupSize} Guests
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {groupData.groupSize <= 6 
                      ? 'Perfect for private villa' 
                      : groupData.groupSize <= 12
                        ? 'Large villa or nearby properties'
                        : 'Multiple nearby villas in same community'}
                  </p>
                </div>

                {/* Budget */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 251, 235, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Budget & Duration
                    </h3>
                  </div>
                  <p className="text-2xl" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                    ${groupData.budgetPerPerson.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {groupData.tripDuration} nights · ${Math.round(groupData.budgetPerPerson / groupData.tripDuration).toLocaleString()}/night
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'var(--bt-blush)', fontWeight: '600' }}>
                    Total: ${(groupData.budgetPerPerson * groupData.groupSize).toLocaleString()}
                  </p>
                </div>

                {/* Destination */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 240, 245, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6" style={{ color: 'var(--bt-blush)' }} />
                    <h3 className="text-lg" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Destination
                    </h3>
                  </div>
                  <p className="text-2xl" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                    Dominican Republic 🌴
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Paradise awaits</p>
                </div>
              </div>

              {/* Treatment Focus */}
              <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: '#f9fafb' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
                  <h3 className="text-lg" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Treatment Focus
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {groupData.procedureFocus.map((procedure) => (
                    <span
                      key={procedure}
                      className="px-4 py-2 rounded-full text-sm"
                      style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
                    >
                      {procedure === 'injectables' && '💉 Injectables & Fillers'}
                      {procedure === 'dental' && '😁 Dental'}
                      {procedure === 'skin' && '✨ Skin Treatments'}
                      {procedure === 'hair' && '💇 Hair'}
                      {procedure === 'body' && '💃 Body Contouring'}
                      {procedure === 'anti-aging' && '⏳ Anti-Aging'}
                      {procedure === 'wellness' && '🧘 Wellness'}
                      {procedure === 'inner-beauty' && '🌸 Inner Beauty Only'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected Sanctuaries */}
              {selectedSanctuaries.length > 0 && (
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 240, 245, 0.3)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6" style={{ color: 'var(--bt-blush)' }} />
                    <h3 className="text-lg" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Your Sanctuary Selections
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {selectedSanctuaries.map((sanctuary, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--bt-blush)' }}></div>
                        <span style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>{sanctuary}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Group members will vote on final property selection in the portal
                  </p>
                </div>
              )}

              {/* Coordinator */}
              <div className="mt-8 p-6 rounded-xl border-2" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fffef8' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
                  <h3 className="text-lg" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Trip Coordinator
                  </h3>
                </div>
                <p className="text-xl" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  {groupData.coordinatorName}
                </p>
                <p className="text-sm text-gray-600">{groupData.coordinatorEmail}</p>
                {groupData.coordinatorPhone && (
                  <p className="text-sm text-gray-600">{groupData.coordinatorPhone}</p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center"
          >
            <div className="p-8 rounded-2xl border-4 shadow-2xl mb-6" style={{ borderColor: 'var(--bt-blush)', backgroundColor: 'white' }}>
              <h3 className="mb-4" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '700' }}>
                🎊 Ready to Coordinate Your Group?
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: '1.125rem' }}>
                Access your exclusive booking portal to share invite links, track member selections, and coordinate sanctuary voting
              </p>

              <Button
                onClick={onAccessPortal}
                className="px-12 py-6 text-white transition-all duration-300 hover:scale-105 shadow-xl rounded-full"
                style={{ 
                  backgroundColor: 'var(--bt-gold)',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}
              >
                Access Booking Portal
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              <p className="text-sm text-gray-500 mt-4">
                Share links, track progress, and coordinate with your group in real-time
              </p>
            </div>

            {/* Benefits Badges */}
            <div className="flex flex-col gap-3 items-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full shadow-lg"
                style={{ backgroundColor: 'var(--bt-gold)' }}
              >
                <Sparkles className="w-6 h-6 text-white" />
                <span className="text-white" style={{ fontSize: '1.125rem', fontWeight: '700' }}>
                  5% Procedures + {getGroupDiscount(groupData.groupSize) - 5}% Activities Discount Applied!
                </span>
              </motion.div>
              
              {groupData.groupSize > 8 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full shadow-lg"
                  style={{ backgroundColor: 'var(--bt-blush)' }}
                >
                  <Car className="w-6 h-6" style={{ color: 'var(--bt-charcoal)' }} />
                  <span style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--bt-charcoal)' }}>
                    All Transportation Included (Activities + Airport)!
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
