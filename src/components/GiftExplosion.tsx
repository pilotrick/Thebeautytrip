import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface GiftExplosionProps {
  isActive: boolean;
  onComplete?: () => void;
  position?: { x: number; y: number };
}

/**
 * Spectacular gift box explosion effect
 * Triggers confetti, particles, sparkles, and stars
 */
export function GiftExplosion({ isActive, onComplete, position }: GiftExplosionProps) {
  useEffect(() => {
    if (isActive) {
      // Trigger spectacular confetti explosion
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      // Multiple confetti bursts
      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          // Call onComplete after explosion finishes
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Gold confetti burst
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.2, 0.4), y: randomInRange(0.3, 0.7) },
          colors: ['#B8985B', '#d4b070', '#FFD700', '#FFA500', '#FFEB3B']
        });
        
        // Blush confetti burst
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.6, 0.8), y: randomInRange(0.3, 0.7) },
          colors: ['#E0B0BA', '#F4C2C2', '#FFB6C1', '#FFC0CB', '#FF69B4']
        });
      }, 250);

      // Initial mega burst from gift position
      confetti({
        particleCount: 150,
        spread: 160,
        origin: position || { x: 0.9, y: 0.8 },
        colors: ['#B8985B', '#E0B0BA', '#d4b070', '#F4C2C2', '#FFD700'],
        shapes: ['circle', 'square'],
        scalar: 1.2,
        gravity: 0.8,
        drift: 0.5,
        ticks: 200,
        zIndex: 9999
      });

      return () => clearInterval(interval);
    }
  }, [isActive, onComplete, position]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] pointer-events-none"
      >
        {/* Central Gift Box that explodes */}
        <motion.div
          initial={{ 
            scale: 1, 
            rotate: 0,
            x: position?.x ? `${position.x * 100}vw` : '85vw',
            y: position?.y ? `${position.y * 100}vh` : '75vh'
          }}
          animate={{ 
            scale: [1, 1.5, 2, 0],
            rotate: [0, 15, -15, 25, -25, 0],
            opacity: [1, 1, 1, 0]
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
        >
          <Gift 
            className="w-20 h-20 sm:w-24 sm:h-24" 
            style={{ 
              color: 'var(--bt-gold)',
              filter: 'drop-shadow(0 0 20px rgba(184,152,91,0.8))'
            }}
            strokeWidth={2}
          />
        </motion.div>

        {/* Explosion Particles - 24 pieces flying in all directions */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const distance = 250 + Math.random() * 100;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const colors = ['#B8985B', '#E0B0BA', '#d4b070', '#F4C2C2', '#FFD700', '#FFB6C1'];
          const color = colors[i % colors.length];
          const size = 8 + Math.random() * 8;
          
          return (
            <motion.div
              key={i}
              initial={{ 
                x: position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85,
                y: position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75,
                scale: 1,
                opacity: 1,
                rotate: 0
              }}
              animate={{ 
                x: (position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85) + x,
                y: (position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75) + y,
                scale: [1, 1.8, 0],
                opacity: [1, 0.9, 0],
                rotate: [0, 360 * (i % 2 === 0 ? 2 : -2)]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut",
                delay: i * 0.02
              }}
              className="absolute"
            >
              <div 
                className="rounded-full"
                style={{ 
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
                }}
              />
            </motion.div>
          );
        })}

        {/* Sparkles Layer 1 - Close range */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const distance = 120 + Math.random() * 50;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          
          return (
            <motion.div
              key={`sparkle1-${i}`}
              initial={{ 
                x: position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85,
                y: position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75,
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                x: (position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85) + x,
                y: (position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75) + y,
                scale: [0, 2, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeOut",
                delay: 0.1 + (i * 0.03)
              }}
              className="absolute"
            >
              <Sparkles 
                className="w-6 h-6" 
                style={{ 
                  color: '#B8985B',
                  filter: 'drop-shadow(0 0 10px #B8985B)'
                }}
              />
            </motion.div>
          );
        })}

        {/* Stars Layer - Far range */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          const distance = 200 + Math.random() * 80;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          
          return (
            <motion.div
              key={`star-${i}`}
              initial={{ 
                x: position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85,
                y: position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75,
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                x: (position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85) + x,
                y: (position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75) + y,
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180]
              }}
              transition={{ 
                duration: 1.4,
                ease: "easeOut",
                delay: 0.2 + (i * 0.04)
              }}
              className="absolute"
            >
              <Star 
                className="w-8 h-8" 
                style={{ 
                  color: '#E0B0BA',
                  fill: '#E0B0BA',
                  filter: 'drop-shadow(0 0 15px #E0B0BA)'
                }}
              />
            </motion.div>
          );
        })}

        {/* Ring Waves */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`ring-${i}`}
            initial={{ 
              x: position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85,
              y: position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75,
              scale: 0,
              opacity: 0.8
            }}
            animate={{ 
              x: position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85,
              y: position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75,
              scale: [0, 3, 5],
              opacity: [0.8, 0.4, 0]
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
              delay: i * 0.2
            }}
            className="absolute w-40 h-40 rounded-full border-4 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              borderColor: i % 2 === 0 ? '#B8985B' : '#E0B0BA',
              filter: 'blur(2px)'
            }}
          />
        ))}

        {/* Center Flash */}
        <motion.div
          initial={{ 
            x: position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85,
            y: position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75,
            scale: 0, 
            opacity: 0 
          }}
          animate={{ 
            x: position?.x ? position.x * window.innerWidth : window.innerWidth * 0.85,
            y: position?.y ? position.y * window.innerHeight : window.innerHeight * 0.75,
            scale: [0, 4, 6],
            opacity: [0, 0.9, 0]
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-64 h-64 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(184,152,91,0.8) 0%, rgba(224,176,186,0.6) 40%, rgba(184,152,91,0) 70%)',
            filter: 'blur(30px)'
          }}
        />

        {/* Text Announcement */}
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0,
            y: position?.y ? (position.y * window.innerHeight) + 100 : window.innerHeight * 0.75 + 100
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1.2, 1],
            y: position?.y ? (position.y * window.innerHeight) + 80 : window.innerHeight * 0.75 + 80
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.8, 1],
            ease: "easeOut"
          }}
          className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{
            top: position?.y ? `${position.y * 100 + 10}vh` : '85vh'
          }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold whitespace-nowrap px-6 py-3 rounded-full"
            style={{ 
              color: 'white',
              textShadow: '0 0 20px rgba(184,152,91,1), 0 0 40px rgba(224,176,186,0.8), 0 4px 20px rgba(0,0,0,0.5)',
              background: 'linear-gradient(135deg, rgba(184,152,91,0.9) 0%, rgba(224,176,186,0.9) 100%)',
              backdropFilter: 'blur(10px)'
            }}
          >
            🎊 YOU WON! 🎊
          </h2>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
