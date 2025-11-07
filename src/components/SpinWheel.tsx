import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

export interface Prize {
  id: string;
  label: string;
  subLabel?: string;
  value: string;
  color: string;
  textColor: string;
  probability: number; // Weight for random selection
  requiresBooking: boolean; // Must book to redeem
  emoji: string;
  name: string;
  description: string;
}

interface SpinWheelProps {
  onPrizeWon: (prize: Prize) => void;
  isSpecialVisitor?: boolean; // If true, guarantee grand prize
}

const prizes: Prize[] = [
  {
    id: 'grand',
    label: 'GRAND',
    subLabel: 'PRIZE',
    value: 'Free Dominican Republic trip for you + 7 friends + $8,000 in treatments ($1,000 each)',
    color: '#B8985B', // Gold
    textColor: '#FFFFFF',
    probability: 1,
    requiresBooking: false,
    emoji: '🏆',
    name: 'Grand Prize - Group Trip + $8,000 Treatments',
    description: 'You and 7 friends get a FREE Dominican Republic trip with $8,000 in luxury treatments ($1,000 each). The ultimate beauty escape!'
  },
  {
    id: 'jewelry',
    label: 'MÓNICA',
    subLabel: 'VARELA',
    value: 'Exclusive jewelry set from renowned designer Mónica Varela',
    color: '#E0B0BA', // Blush
    textColor: '#111111',
    probability: 3,
    requiresBooking: true,
    emoji: '💍',
    name: 'Mónica Varela Jewelry Set',
    description: 'Exclusive designer jewelry pieces from renowned Dominican designer Mónica Varela. Elegant, luxurious, unforgettable.'
  },
  {
    id: 'souvenirs',
    label: 'DR',
    subLabel: 'COLLECTION',
    value: 'High-end curated souvenir collection from DR Collective',
    color: '#F7F7F7', // Cream
    textColor: '#111111',
    probability: 8,
    requiresBooking: true,
    emoji: '🎁',
    name: 'DR Collective Souvenirs',
    description: 'High-end curated souvenir collection featuring the finest Dominican artisan crafts and luxury items.'
  },
  {
    id: 'travel',
    label: 'TRAVEL',
    subLabel: 'ESSENTIALS',
    value: 'Premium luxury travel accessories set',
    color: '#111111', // Charcoal
    textColor: '#FFFFFF',
    probability: 10,
    requiresBooking: true,
    emoji: '✈️',
    name: 'Luxury Travel Essentials',
    description: 'Premium travel accessories set including designer luggage tags, passport holders, and first-class amenities.'
  },
  {
    id: 'second',
    label: '$500',
    subLabel: 'CREDIT',
    value: '$500 Treatment Credit',
    color: '#B8985B', // Gold
    textColor: '#FFFFFF',
    probability: 8,
    requiresBooking: false,
    emoji: '💎',
    name: '$500 Treatment Credit',
    description: '$500 credit toward any of our luxury aesthetic treatments. Your glow-up just got more affordable!'
  },
  {
    id: 'transfer',
    label: 'VIP',
    subLabel: 'WELCOME',
    value: 'Free luxury airport transfer + welcome spa package',
    color: '#E0B0BA', // Blush
    textColor: '#111111',
    probability: 12,
    requiresBooking: false,
    emoji: '🚗',
    name: 'VIP Welcome Package',
    description: 'Free luxury airport transfer plus a rejuvenating welcome spa package. Start your journey in style!'
  },
  {
    id: 'discount20',
    label: '20%',
    subLabel: 'OFF',
    value: '20% off any procedure',
    color: '#F7F7F7', // Cream
    textColor: '#111111',
    probability: 18,
    requiresBooking: false,
    emoji: '🌟',
    name: '20% Off Any Procedure',
    description: 'Save 20% on any single procedure of your choice. Perfect for trying something new!'
  },
  {
    id: 'discount10',
    label: '10%',
    subLabel: 'OFF',
    value: '10% off your entire booking',
    color: '#111111', // Charcoal
    textColor: '#FFFFFF',
    probability: 40,
    requiresBooking: false,
    emoji: '✨',
    name: '10% Off Your Entire Booking',
    description: '10% discount on your complete Beauty Trip experience. Every treatment, every day, every moment.'
  }
];

export function SpinWheel({ onPrizeWon, isSpecialVisitor = false }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / prizes.length;

  const selectPrize = (): Prize => {
    // If special visitor (7777th), always return grand prize
    if (isSpecialVisitor) {
      return prizes[0];
    }

    // Weighted random selection
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    let random = Math.random() * totalWeight;
    
    for (const prize of prizes) {
      random -= prize.probability;
      if (random <= 0) {
        return prize;
      }
    }
    
    return prizes[prizes.length - 1]; // Fallback
  };

  const spin = async () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const selectedPrize = selectPrize();
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    
    // Calculate target rotation
    // Add multiple full rotations (5-7) plus the target segment
    const baseRotations = 5 + Math.random() * 2; // 5-7 full spins
    const targetAngle = prizeIndex * segmentAngle;
    const finalRotation = baseRotations * 360 + (360 - targetAngle) + (segmentAngle / 2);
    
    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 4,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for realistic spin
      }
    });
    
    setIsSpinning(false);
    
    // Delay prize announcement slightly for effect
    setTimeout(() => {
      onPrizeWon(selectedPrize);
    }, 500);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Wheel Container */}
      <div className="relative aspect-square">
        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          onClick={spin}
          className="relative w-full h-full rounded-full overflow-hidden shadow-2xl cursor-pointer"
          style={{ 
            boxShadow: '0 0 60px rgba(184, 152, 91, 0.4), inset 0 0 20px rgba(0,0,0,0.1)'
          }}
          animate={controls}
          whileHover={!isSpinning ? { scale: 1.02 } : {}}
          whileTap={!isSpinning ? { scale: 0.98 } : {}}
        >
          {/* Prize Segments */}
          {prizes.map((prize, index) => {
            const angle = index * segmentAngle;
            
            return (
              <div
                key={prize.id}
                className="absolute w-full h-full origin-center"
                style={{
                  transform: `rotate(${angle}deg)`,
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`
                }}
              >
                <div
                  className="w-full h-full relative flex items-start justify-center"
                  style={{ backgroundColor: prize.color }}
                >
                  <div 
                    className="absolute"
                    style={{ 
                      top: '25%',
                      transform: `rotate(${segmentAngle / 2}deg)`,
                      textAlign: 'center',
                      width: '90px'
                    }}
                  >
                    <p 
                      className="font-black uppercase select-none"
                      style={{ 
                        fontSize: prize.id === 'grand' ? '16px' : '14px',
                        color: prize.textColor,
                        letterSpacing: '0.05em',
                        lineHeight: '1.2',
                        textShadow: prize.textColor === '#FFFFFF' 
                          ? '1px 1px 3px rgba(0,0,0,0.8)' 
                          : '1px 1px 3px rgba(0,0,0,0.5)',
                        margin: 0,
                        padding: 0,
                        fontWeight: '900'
                      }}
                    >
                      {prize.label}
                    </p>
                    {prize.subLabel && (
                      <p 
                        className="font-black uppercase select-none"
                        style={{ 
                          color: prize.textColor,
                          fontSize: '12px',
                          letterSpacing: '0.05em',
                          lineHeight: '1.2',
                          marginTop: '2px',
                          textShadow: prize.textColor === '#FFFFFF' 
                            ? '1px 1px 3px rgba(0,0,0,0.8)' 
                            : '1px 1px 3px rgba(0,0,0,0.5)',
                          padding: 0,
                          fontWeight: '900'
                        }}
                      >
                        {prize.subLabel}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Center Circle */}
          <div 
            className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ 
              background: 'linear-gradient(135deg, #B8985B 0%, #d4b070 100%)',
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <span className="text-white font-bold text-xs">SPIN</span>
          </div>
        </motion.div>

        {/* Top Pointer */}
        <div 
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20"
          style={{
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '30px solid #B8985B',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
          }}
        />
      </div>

      {/* Click to Spin Instruction */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-center"
      >
        <p className="text-lg font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
          {isSpinning ? '🎰 Spinning...' : '👆 Click the wheel to spin!'}
        </p>
        {isSpecialVisitor && !isSpinning && (
          <p className="text-sm font-bold mt-2" style={{ color: 'var(--bt-gold)' }}>
            🎉 YOU'RE VISITOR #7777 - GRAND PRIZE GUARANTEED! 🎉
          </p>
        )}
      </motion.div>
    </div>
  );
}
