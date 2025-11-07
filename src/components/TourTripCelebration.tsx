import { useState, useEffect } from 'react';
import { Sparkles, Calendar, Plane, Heart, CheckCircle2, Star, Zap, Award, PartyPopper } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from './Logo';

interface TourTripCelebrationProps {
  tourTripName: string;
  tourPrice: number;
  depositPaid: number;
  tourDates: string;
  tourLocation: string;
  tourDuration: string;
  onContinueToPortal: () => void;
  userEmail?: string;
}

export function TourTripCelebration({
  tourTripName,
  tourPrice,
  depositPaid,
  tourDates,
  tourLocation,
  tourDuration,
  onContinueToPortal,
  userEmail
}: TourTripCelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Auto-advance through celebration steps
    const timer1 = setTimeout(() => setActiveStep(1), 1500);
    const timer2 = setTimeout(() => setActiveStep(2), 3000);
    const timer3 = setTimeout(() => setActiveStep(3), 4500);
    
    // Hide confetti after 6 seconds
    const confettiTimer = setTimeout(() => setShowConfetti(false), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(confettiTimer);
    };
  }, []);

  // Confetti animation
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: ['#9333ea', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #fff7ed 50%, #fef3c7 100%)' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #9333ea 0%, transparent 70%)', top: '-10%', left: '-5%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)', bottom: '-10%', right: '-5%' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: piece.color,
                left: `${piece.x}%`,
                top: -20
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [1, 1, 0],
                rotate: piece.rotation
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeIn'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Logo */}
        <div className="text-center mb-12">
          <Logo size="lg" />
        </div>

        {/* Hero Celebration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          {/* Animated Icon */}
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)' }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PartyPopper className="w-16 h-16 text-white" />
            
            {/* Sparkle effects */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%'
                }}
                animate={{
                  x: [0, Math.cos((i / 8) * Math.PI * 2) * 60],
                  y: [0, Math.sin((i / 8) * Math.PI * 2) * 60],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: '#fbbf24' }} />
              </motion.div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4"
            style={{
              fontSize: '4rem',
              background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}
          >
            🎉 YOUR SPOT IS SECURED! 🎉
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: '1.75rem',
              color: '#7c3aed',
              fontWeight: '600',
              marginBottom: '1rem'
            }}
          >
            Welcome to {tourTripName}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full mb-8"
            style={{ backgroundColor: 'white', boxShadow: '0 10px 40px rgba(147, 51, 234, 0.3)' }}
          >
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <p className="text-sm text-gray-600">Deposit Received</p>
              <p style={{ fontSize: '2rem', color: '#9333ea', fontWeight: '700' }}>
                ${depositPaid.toLocaleString()}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Tour Details Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white rounded-3xl p-10 mb-8 border-4"
          style={{ borderColor: '#9333ea', boxShadow: '0 20px 60px rgba(147, 51, 234, 0.2)' }}
        >
          <h2 className="text-center mb-8" style={{ fontSize: '2rem', color: '#7c3aed', fontWeight: '600' }}>
            Your Transformational Journey
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#fdf4ff' }}>
              <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: '#9333ea' }} />
              <p className="text-sm text-gray-600 mb-1">Tour Dates</p>
              <p style={{ fontSize: '1.125rem', color: '#7c3aed', fontWeight: '600' }}>{tourDates}</p>
            </div>
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#fdf4ff' }}>
              <Plane className="w-8 h-8 mx-auto mb-3" style={{ color: '#ec4899' }} />
              <p className="text-sm text-gray-600 mb-1">Destination</p>
              <p style={{ fontSize: '1.125rem', color: '#ec4899', fontWeight: '600' }}>{tourLocation}</p>
            </div>
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#fdf4ff' }}>
              <Star className="w-8 h-8 mx-auto mb-3" style={{ color: '#f59e0b' }} />
              <p className="text-sm text-gray-600 mb-1">Duration</p>
              <p style={{ fontSize: '1.125rem', color: '#f59e0b', fontWeight: '600' }}>{tourDuration}</p>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="p-8 rounded-2xl mb-8" style={{ background: 'linear-gradient(135deg, #fdf4ff 0%, #fef3c7 100%)' }}>
            <h3 className="mb-6 text-center" style={{ fontSize: '1.5rem', color: '#7c3aed', fontWeight: '600' }}>
              Payment Progress
            </h3>
            <div className="flex items-center justify-between mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: activeStep >= 0 ? 1 : 0 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Step 1</p>
                  <p style={{ fontSize: '1rem', color: '#10b981', fontWeight: '600' }}>30% Paid ✓</p>
                </div>
              </motion.div>

              <motion.div
                className="flex-1 h-2 mx-4 rounded-full"
                style={{ backgroundColor: '#e5e7eb' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeStep >= 1 ? 1 : 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #10b981 0%, #9333ea 100%)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: activeStep >= 1 ? 1 : 0 }}
                transition={{ delay: 1.7, type: 'spring', stiffness: 200 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9333ea' }}>
                  <span className="text-white" style={{ fontWeight: '600' }}>2</span>
                </div>
                <div className="ml-3">
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Step 2</p>
                  <p style={{ fontSize: '1rem', color: '#9333ea', fontWeight: '600' }}>50% Due</p>
                </div>
              </motion.div>

              <motion.div
                className="flex-1 h-2 mx-4 rounded-full"
                style={{ backgroundColor: '#e5e7eb' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeStep >= 2 ? 1 : 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: activeStep >= 2 ? 1 : 0 }}
                transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
                className="flex items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ec4899' }}>
                  <span className="text-white" style={{ fontWeight: '600' }}>3</span>
                </div>
                <div className="ml-3">
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Step 3</p>
                  <p style={{ fontSize: '1rem', color: '#ec4899', fontWeight: '600' }}>20% Final</p>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Remaining Balance</p>
              <p style={{ fontSize: '2rem', color: '#9333ea', fontWeight: '700' }}>
                ${(tourPrice - depositPaid).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* What Makes This Special */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="bg-white rounded-3xl p-10 mb-8"
          style={{ border: '2px solid #f59e0b' }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap className="w-8 h-8" style={{ color: '#f59e0b' }} />
            <h2 style={{ fontSize: '1.75rem', color: '#f59e0b', fontWeight: '600' }}>
              What Makes Tour Trips Special
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#fffbf0', border: '2px solid #fbbf24' }}>
              <Award className="w-8 h-8 mb-3" style={{ color: '#f59e0b' }} />
              <h3 className="mb-2" style={{ fontSize: '1.125rem', color: '#92400e', fontWeight: '600' }}>
                Priority Reservation
              </h3>
              <p className="text-sm text-gray-700">
                You've secured your spot BEFORE booking flights! This is exclusive to Tour Trips. 
                Book your flights at your convenience knowing your transformation journey is confirmed.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{ backgroundColor: '#fdf4ff', border: '2px solid #c084fc' }}>
              <Heart className="w-8 h-8 mb-3" style={{ color: '#9333ea' }} />
              <h3 className="mb-2" style={{ fontSize: '1.125rem', color: '#7c3aed', fontWeight: '600' }}>
                Flexible Procedure Planning
              </h3>
              <p className="text-sm text-gray-700">
                Once you book your flights, we'll coordinate your beauty procedures around your 
                confirmed departure dates for optimal recovery timing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="bg-white rounded-3xl p-10 mb-8"
        >
          <h2 className="text-center mb-8" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
            What Happens Next
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dcfce7' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#166534' }}>1</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  Book Your Flights
                </h3>
                <p className="text-gray-600" style={{ lineHeight: '1.6' }}>
                  Choose flights that work for your schedule around {tourDates}. You have flexibility since your retreat spot is already secured!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fef3c7' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#92400e' }}>2</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  Upload Flight Details in Your Portal
                </h3>
                <p className="text-gray-600" style={{ lineHeight: '1.6' }}>
                  Once confirmed, upload your flight information to your Transformation Portal. This triggers procedure planning based on your actual departure date.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fdf4ff' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#7c3aed' }}>3</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  Procedure Selection & Scheduling
                </h3>
                <p className="text-gray-600" style={{ lineHeight: '1.6' }}>
                  After flight confirmation, choose your beauty procedures. We'll schedule them optimally within your tour dates for perfect recovery timing during the retreat activities.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fce7f3' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#9f1239' }}>4</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  Complete Remaining Payments
                </h3>
                <p className="text-gray-600" style={{ lineHeight: '1.6' }}>
                  50% due 30 days before departure, final 20% due 7 days before. Track everything in your portal.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            onClick={onContinueToPortal}
            className="px-12 py-5 rounded-full text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
              fontSize: '1.25rem',
              fontWeight: '600',
              boxShadow: '0 10px 40px rgba(147, 51, 234, 0.4)'
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 50px rgba(147, 51, 234, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Access Your Transformation Portal →
          </motion.button>

          {userEmail && (
            <p className="mt-4 text-gray-600">
              Confirmation sent to <strong>{userEmail}</strong>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
