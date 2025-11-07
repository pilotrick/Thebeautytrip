import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Gift, Phone, Mail, User as UserIcon } from 'lucide-react';
import { SpinWheel, Prize } from './SpinWheel';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface SpinWheelPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onPrizeWon?: () => void;
}

export function SpinWheelPopup({ isOpen, onClose, onPrizeWon: onPrizeWonExternal }: SpinWheelPopupProps) {
  const [step, setStep] = useState<'intro' | 'form' | 'wheel' | 'result'>('intro');
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [isSpecialVisitor, setIsSpecialVisitor] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [showExplosion, setShowExplosion] = useState(false);
  
  // Chase mode states
  const [isChaseMode, setIsChaseMode] = useState(true);
  const [chaseTimeLeft, setChaseTimeLeft] = useState(7);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [teasingMessage, setTeasingMessage] = useState("Catch me if you can, darling ✨");
  const popupRef = useRef<HTMLDivElement>(null);
  const chaseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Teasing messages that rotate
  const teasingMessages = [
    "Catch me if you can, darling ✨",
    "Not so fast! Almost there... 💎",
    "Ooh, you're getting closer! 🎁",
    "Patience is a virtue, love ✦",
    "The best things come to those who wait 🌟"
  ];

  useEffect(() => {
    if (isOpen) {
      // Check for test mode in URL (for development/testing)
      const urlParams = new URLSearchParams(window.location.search);
      const isTestMode = urlParams.get('testwheel') === 'true';
      
      // Check if already shown this session (skip check in test mode)
      if (!isTestMode) {
        const hasSeenThisSession = sessionStorage.getItem('beautyTripSpinWheelShown');
        if (hasSeenThisSession) {
          onClose();
          return;
        }
      }
      
      // Mark as shown for this session (unless in test mode)
      if (!isTestMode) {
        sessionStorage.setItem('beautyTripSpinWheelShown', 'true');
      }

      // Track visitor count
      const currentCount = parseInt(localStorage.getItem('beautyTripVisitorCount') || '0');
      const newCount = currentCount + 1;
      localStorage.setItem('beautyTripVisitorCount', newCount.toString());
      setVisitorCount(newCount);
      
      // Check if special visitor (7777th)
      if (newCount === 7777) {
        setIsSpecialVisitor(true);
      }

      // Start chase mode countdown
      setIsChaseMode(true);
      setChaseTimeLeft(7);
      
      // Random starting position
      const startPositions = [
        { x: 15, y: 15 },   // bottom-right
        { x: 15, y: 75 },   // top-right
        { x: 75, y: 15 },   // bottom-left
        { x: 70, y: 70 },   // top-left
      ];
      const randomStart = startPositions[Math.floor(Math.random() * startPositions.length)];
      setPosition(randomStart);

      // Countdown timer
      chaseTimerRef.current = setInterval(() => {
        setChaseTimeLeft((prev) => {
          if (prev <= 1) {
            setIsChaseMode(false);
            setTeasingMessage("Alright, you've earned it! Click to claim your prize 🎊");
            if (chaseTimerRef.current) {
              clearInterval(chaseTimerRef.current);
            }
            
            // Celebration when chase ends
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#B8985B', '#E0B0BA', '#d4b070']
            });
            
            return 0;
          }
          
          // Rotate teasing message every 2 seconds
          if (prev % 2 === 0) {
            const randomMsg = teasingMessages[Math.floor(Math.random() * teasingMessages.length)];
            setTeasingMessage(randomMsg);
          }
          
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (chaseTimerRef.current) {
        clearInterval(chaseTimerRef.current);
      }
    };
  }, [isOpen]);

  // Move popup to random position when chased
  const moveToRandomPosition = () => {
    if (!isChaseMode) return;

    const maxX = 70;
    const maxY = 65;
    const minDistance = 25;

    let newX, newY;
    let attempts = 0;
    do {
      newX = Math.random() * maxX + 10;
      newY = Math.random() * maxY + 10;
      attempts++;
    } while (
      attempts < 10 &&
      (Math.abs(newX - position.x) < minDistance ||
      Math.abs(newY - position.y) < minDistance)
    );

    setPosition({ x: newX, y: newY });
    
    // Play a subtle sound effect or show a playful emoji
    const emojis = ['💨', '✨', '🏃‍♀️', '👀', '💫'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    toast(randomEmoji, { duration: 500 });
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Save to localStorage for now (could integrate with Supabase later)
    localStorage.setItem('beautyTripSpinWheelEntry', JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString(),
      visitorNumber: visitorCount,
      isSpecialVisitor
    }));

    toast.success('Information saved! Ready to spin!');
    setStep('wheel');
  };

  const handlePrizeWon = (prize: Prize) => {
    setWonPrize(prize);
    
    // Trigger external gift box explosion on HomePage floating button
    if (onPrizeWonExternal) {
      onPrizeWonExternal();
    }
    
    // Trigger internal gift box explosion in modal
    setShowExplosion(true);
    
    // Wait for explosion animation before showing result
    setTimeout(() => {
      setShowExplosion(false);
      setStep('result');
    }, 1500);
    
    // Save prize to localStorage
    localStorage.setItem('beautyTripPrizeWon', JSON.stringify({
      prize,
      email: formData.email,
      timestamp: new Date().toISOString()
    }));

    // Trigger confetti celebration
    if (prize.id === 'grand') {
      // MEGA confetti for grand prize
      const duration = 5000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Gold confetti from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#B8985B', '#d4b070', '#FFD700', '#FFA500']
        });
        
        // Blush confetti from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#E0B0BA', '#F4C2C2', '#FFB6C1', '#FFC0CB']
        });
      }, 250);
    } else {
      // Regular celebration confetti
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          colors: ['#B8985B', '#E0B0BA', '#d4b070', '#F4C2C2']
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      fire(0.2, {
        spread: 60,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setTimeout(() => {
      setStep('intro');
      setFormData({ name: '', email: '', phone: '' });
      setWonPrize(null);
      setFormErrors({});
      setIsChaseMode(true);
      setChaseTimeLeft(7);
      setShowExplosion(false);
    }, 300);
    onClose();
  };

  const handleClaimPrize = () => {
    toast.success('Prize details sent to your email! Check your inbox.');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Chase Mode Teaser - Appears in corners and dodges clicks */}
          {isChaseMode && (
            <motion.div
              key="chase-teaser"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: `${position.x}vw`,
                y: `${position.y}vh`
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 20,
                opacity: { duration: 0.3 }
              }}
              className="fixed z-[100] cursor-pointer select-none"
              style={{
                left: '0',
                top: '0',
              }}
              onMouseEnter={moveToRandomPosition}
              onClick={moveToRandomPosition}
              ref={popupRef}
            >
              <motion.div
                className="bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-2xl p-6 max-w-xs"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 100px rgba(184, 152, 91, 0.4)'
                }}
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 60px rgba(184, 152, 91, 0.4)',
                    '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 100px rgba(224, 176, 186, 0.6)',
                    '0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 60px rgba(184, 152, 91, 0.4)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
                  >
                    <Gift className="w-10 h-10" style={{ color: 'var(--bt-gold)' }} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: 'var(--bt-charcoal)' }}>
                      Exclusive Prize!
                    </h3>
                    <motion.p 
                      className="text-sm font-bold" 
                      style={{ color: 'var(--bt-gold)' }}
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {chaseTimeLeft}s to unlock...
                    </motion.p>
                  </div>
                </div>
                
                <p className="text-sm italic font-medium mb-3 min-h-[40px]" style={{ color: 'var(--bt-charcoal)' }}>
                  {teasingMessage}
                </p>

                <div className="flex items-center justify-between text-xs font-medium" style={{ color: '#666' }}>
                  <span>🎁 Luxury prizes</span>
                  <span>💎 High-end rewards</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Full Modal - Only show when chase mode ends */}
          {!isChaseMode && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={handleClose}
              />

              {/* Modal */}
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div 
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto relative"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 100px rgba(184, 152, 91, 0.2)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200 shadow-md"
                    style={{ color: 'var(--bt-charcoal)' }}
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Content */}
                  <div className="p-8 md:p-12">
                    {/* Intro Step */}
                    {step === 'intro' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="text-center mb-8">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="inline-block mb-4"
                          >
                            <div 
                              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
                              style={{ 
                                background: 'linear-gradient(135deg, var(--bt-gold) 0%, #d4b070 100%)',
                                boxShadow: '0 10px 40px rgba(184, 152, 91, 0.3)'
                              }}
                            >
                              <Sparkles className="w-10 h-10 text-white" />
                            </div>
                          </motion.div>

                          <h2 className="mb-3 text-center" style={{ 
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, var(--bt-gold) 0%, #d4b070 50%, var(--bt-blush) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}>
                            🎊 You Caught It! 🎊
                          </h2>

                          <p className="text-lg mb-6" style={{ color: 'var(--bt-charcoal)' }}>
                            Spin the wheel to win exclusive luxury prizes from The Beauty Trip
                          </p>
                        </div>

                        <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">💍</span>
                            <div>
                              <p className="font-semibold">Mónica Varela Jewelry Set</p>
                              <p className="text-sm text-gray-600">Exclusive designer pieces</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">🎁</span>
                            <div>
                              <p className="font-semibold">DR Collective Souvenirs</p>
                              <p className="text-sm text-gray-600">Curated high-end collection</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">✈️</span>
                            <div>
                              <p className="font-semibold">Luxury Travel Accessories</p>
                              <p className="text-sm text-gray-600">Premium essentials set</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-2xl">💎</span>
                            <div>
                              <p className="font-semibold">Treatment Credits & VIP Services</p>
                              <p className="text-sm text-gray-600">Up to $500 value + discounts</p>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => setStep('form')}
                          className="w-full py-4 rounded-full transition-all duration-300 text-center"
                          style={{
                            backgroundColor: 'var(--bt-gold)',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '1.125rem',
                            letterSpacing: '0.05em',
                            boxShadow: '0 8px 24px rgba(184, 152, 91, 0.4)'
                          }}
                          whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(184, 152, 91, 0.6)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          CONTINUE TO WIN
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Form Step */}
                    {step === 'form' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <h2 className="mb-2 text-center" style={{ 
                          fontSize: '2rem',
                          fontWeight: '700',
                          color: 'var(--bt-charcoal)'
                        }}>
                          Almost There!
                        </h2>
                        <p className="text-center mb-8" style={{ color: '#666' }}>
                          Enter your details to unlock your spin
                        </p>

                        <form onSubmit={handleFormSubmit} className="space-y-5">
                          <div>
                            <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                              Full Name *
                            </label>
                            <div className="relative">
                              <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#999' }} />
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200"
                                style={{ borderColor: formErrors.name ? '#d4183d' : '#e5e7eb', backgroundColor: 'white' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--bt-gold)'}
                                onBlur={(e) => e.target.style.borderColor = formErrors.name ? '#d4183d' : '#e5e7eb'}
                                placeholder="Jane Doe"
                              />
                              {formErrors.name && (
                                <p className="text-sm mt-1" style={{ color: '#d4183d' }}>{formErrors.name}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#999' }} />
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200"
                                style={{ borderColor: formErrors.email ? '#d4183d' : '#e5e7eb', backgroundColor: 'white' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--bt-gold)'}
                                onBlur={(e) => e.target.style.borderColor = formErrors.email ? '#d4183d' : '#e5e7eb'}
                                placeholder="jane@example.com"
                              />
                              {formErrors.email && (
                                <p className="text-sm mt-1" style={{ color: '#d4183d' }}>{formErrors.email}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                              Phone Number <span className="text-sm" style={{ color: '#999' }}>(Optional)</span>
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#999' }} />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200"
                                style={{ borderColor: '#e5e7eb', backgroundColor: 'white' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--bt-gold)'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                                placeholder="+1 (555) 000-0000"
                              />
                            </div>
                          </div>

                          <div className="pt-4">
                            <motion.button
                              type="submit"
                              className="w-full py-4 rounded-full transition-all duration-300 text-center flex items-center justify-center"
                              style={{
                                backgroundColor: 'var(--bt-gold)',
                                color: 'white',
                                fontWeight: '700',
                                fontSize: '1.125rem',
                                letterSpacing: '0.05em',
                                boxShadow: '0 8px 24px rgba(184, 152, 91, 0.4)'
                              }}
                              whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(184, 152, 91, 0.6)' }}
                              whileTap={{ scale: 0.98 }}
                            >
                              UNLOCK MY SPIN
                            </motion.button>
                          </div>

                          <p className="text-xs text-center text-gray-500 mt-4">
                            By continuing, you agree to receive updates from The Beauty Trip about exclusive offers and wellness journeys.
                          </p>
                        </form>
                      </motion.div>
                    )}

                    {/* Wheel Step */}
                    {step === 'wheel' && !showExplosion && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <h2 className="mb-6 text-center" style={{ 
                          fontSize: '2rem',
                          fontWeight: '700',
                          color: 'var(--bt-charcoal)'
                        }}>
                          Spin to Win!
                        </h2>

                        <SpinWheel 
                          onPrizeWon={handlePrizeWon}
                          isSpecialVisitor={isSpecialVisitor}
                        />
                      </motion.div>
                    )}

                    {/* Gift Box Explosion Animation */}
                    {showExplosion && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center min-h-[500px]"
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          {/* Central Gift Box that explodes */}
                          <motion.div
                            initial={{ scale: 1, rotate: 0 }}
                            animate={{ 
                              scale: [1, 1.2, 0],
                              rotate: [0, 10, -10, 0],
                              opacity: [1, 1, 0]
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute z-10"
                          >
                            <Gift 
                              className="w-32 h-32" 
                              style={{ color: 'var(--bt-gold)' }}
                              strokeWidth={1.5}
                            />
                          </motion.div>

                          {/* Explosion Particles - 16 pieces flying out */}
                          {Array.from({ length: 16 }).map((_, i) => {
                            const angle = (i * 360) / 16;
                            const distance = 200;
                            const x = Math.cos((angle * Math.PI) / 180) * distance;
                            const y = Math.sin((angle * Math.PI) / 180) * distance;
                            const colors = ['#B8985B', '#E0B0BA', '#d4b070', '#F4C2C2'];
                            const color = colors[i % colors.length];
                            
                            return (
                              <motion.div
                                key={i}
                                initial={{ 
                                  x: 0, 
                                  y: 0, 
                                  scale: 1,
                                  opacity: 1,
                                  rotate: 0
                                }}
                                animate={{ 
                                  x,
                                  y,
                                  scale: [1, 1.5, 0],
                                  opacity: [1, 0.8, 0],
                                  rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)]
                                }}
                                transition={{ 
                                  duration: 1.2,
                                  ease: "easeOut",
                                  delay: 0.2
                                }}
                                className="absolute"
                              >
                                <div 
                                  className="w-6 h-6 rounded-full"
                                  style={{ 
                                    backgroundColor: color,
                                    boxShadow: `0 0 20px ${color}`,
                                  }}
                                />
                              </motion.div>
                            );
                          })}

                          {/* Sparkles */}
                          {Array.from({ length: 12 }).map((_, i) => {
                            const angle = (i * 360) / 12;
                            const distance = 150;
                            const x = Math.cos((angle * Math.PI) / 180) * distance;
                            const y = Math.sin((angle * Math.PI) / 180) * distance;
                            
                            return (
                              <motion.div
                                key={`sparkle-${i}`}
                                initial={{ 
                                  x: 0, 
                                  y: 0, 
                                  scale: 0,
                                  opacity: 0,
                                  rotate: 0
                                }}
                                animate={{ 
                                  x,
                                  y,
                                  scale: [0, 1.5, 0],
                                  opacity: [0, 1, 0],
                                  rotate: [0, 180]
                                }}
                                transition={{ 
                                  duration: 1,
                                  ease: "easeOut",
                                  delay: 0.3 + (i * 0.05)
                                }}
                                className="absolute"
                              >
                                <Sparkles 
                                  className="w-8 h-8" 
                                  style={{ color: '#B8985B' }}
                                />
                              </motion.div>
                            );
                          })}

                          {/* Center Flash */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 3, 4],
                              opacity: [0, 0.8, 0]
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute w-48 h-48 rounded-full"
                            style={{
                              background: 'radial-gradient(circle, rgba(184,152,91,0.6) 0%, rgba(184,152,91,0) 70%)',
                              filter: 'blur(20px)'
                            }}
                          />

                          {/* Text Announcement */}
                          <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.4 }}
                            className="absolute bottom-0 text-center"
                          >
                            <h3 className="text-3xl font-bold" style={{ 
                              color: 'var(--bt-gold)',
                              textShadow: '0 2px 10px rgba(184,152,91,0.5)'
                            }}>
                              🎊 Congratulations! 🎊
                            </h3>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}

                    {/* Result Step */}
                    {step === 'result' && wonPrize && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                          className="inline-block mb-6"
                        >
                          <div 
                            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
                            style={{ 
                              background: `linear-gradient(135deg, ${wonPrize.color} 0%, ${wonPrize.color}dd 100%)`,
                              boxShadow: `0 10px 40px ${wonPrize.color}66`
                            }}
                          >
                            <span className="text-5xl">{wonPrize.emoji}</span>
                          </div>
                        </motion.div>

                        <h2 className="mb-4" style={{ 
                          fontSize: '2.5rem',
                          fontWeight: '700',
                          color: 'var(--bt-charcoal)'
                        }}>
                          Congratulations! 🎉
                        </h2>

                        <p className="text-xl mb-2" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
                          You won:
                        </p>

                        <h3 className="text-2xl mb-6" style={{ 
                          fontWeight: '700',
                          color: 'var(--bt-charcoal)'
                        }}>
                          {wonPrize.name}
                        </h3>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                          <p className="text-lg mb-4" style={{ color: 'var(--bt-charcoal)' }}>
                            {wonPrize.description}
                          </p>
                          
                          {wonPrize.requiresBooking && (
                            <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: 'var(--bt-gold)' }}>
                              <p className="text-sm font-semibold" style={{ color: 'var(--bt-gold)' }}>
                                ✦ Requires booking to redeem
                              </p>
                            </div>
                          )}
                        </div>

                        <motion.button
                          onClick={handleClaimPrize}
                          className="w-full py-4 rounded-full transition-all duration-300 flex items-center justify-center"
                          style={{
                            backgroundColor: 'var(--bt-gold)',
                            color: 'white',
                            fontWeight: '700',
                            fontSize: '1.125rem',
                            letterSpacing: '0.05em',
                            boxShadow: '0 8px 24px rgba(184, 152, 91, 0.4)'
                          }}
                          whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(184, 152, 91, 0.6)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          CLAIM MY PRIZE
                        </motion.button>

                        <p className="text-xs text-gray-500 mt-4">
                          Prize details will be sent to {formData.email}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
