import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`inline-flex items-center gap-2 sm:gap-4 ${className}`}
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--bt-gold)' }}>:</span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--bt-gold)' }}>:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--bt-gold)' }}>:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </motion.div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold px-2 sm:px-3 py-1 sm:py-2 rounded-lg"
        style={{
          color: 'var(--bt-gold)',
          backgroundColor: 'rgba(184, 152, 91, 0.1)',
          border: '2px solid var(--bt-gold)',
          minWidth: '50px',
          textAlign: 'center'
        }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-xs sm:text-sm mt-1 uppercase tracking-wider" style={{ color: 'var(--bt-charcoal)' }}>
        {label}
      </span>
    </div>
  );
}
