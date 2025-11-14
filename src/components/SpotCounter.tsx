import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users } from "lucide-react";

interface SpotCounterProps {
  totalSpots?: number;
  className?: string;
}

export function SpotCounter({ totalSpots = 500, className = "" }: SpotCounterProps) {
  // Simulate spots being taken - in production this would come from a backend
  const [spotsRemaining, setSpotsRemaining] = useState(totalSpots);
  const spotsTaken = totalSpots - spotsRemaining;

  useEffect(() => {
    // Simulate periodic spot updates (every 30 seconds)
    const interval = setInterval(() => {
      setSpotsRemaining(prev => {
        // Randomly decrease by 0-2 spots to create urgency
        const decrease = Math.floor(Math.random() * 3);
        const newValue = Math.max(0, prev - decrease);
        return newValue;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const percentageFilled = (spotsTaken / totalSpots) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`inline-block ${className}`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border-2" style={{ borderColor: 'var(--bt-gold)' }}>
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--bt-gold)' }} />
          <span className="text-sm sm:text-base font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
            Founding Member Spots
          </span>
        </div>
        
        <div className="mb-3">
          <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: 'var(--bt-gold)' }}>
            {spotsRemaining}
          </div>
          <div className="text-xs sm:text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
            of {totalSpots} Spots Remaining
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-2.5 rounded-full"
            style={{ backgroundColor: 'var(--bt-gold)' }}
            initial={{ width: 0 }}
            animate={{ width: `${percentageFilled}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        {spotsRemaining <= 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-xs sm:text-sm font-semibold text-red-600"
          >
            ⚡ Less than {spotsRemaining} spots left!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
