import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function LuxuryTicker() {
  const [isPaused, setIsPaused] = useState(false);

  // Core value propositions - teaching what The Beauty Trip is in 5-7 seconds
  const updates = [
    "🏝️ VACATION IN PARADISE + MEET THE NEW YOU",
    "✦ LUXURY MEDSPA IN DOMINICAN REPUBLIC",
    "💎 SAVE 70% ON VENEERS, BOTOX & FILLERS",
    "✧ 5-STAR RESORT RECOVERY INCLUDED",
    "🛫 FLY TO DR → GET YOUR GLOW → RELAX ON BEACH",
    "✦ BOARD-CERTIFIED SPECIALISTS + PARADISE STAY",
    "💫 DENTAL + AESTHETICS + LUXURY ACCOMMODATION",
    "✧ SAME QUALITY, 70% SAVINGS, BETTER VIEWS",
    "🌟 YOUR WELLNESS VACATION STARTS HERE",
    "✦ TRUSTED BY 800+ HAPPY CLIENTS",
  ];

  // Create a long string of all updates repeated
  const tickerContent = [...updates, ...updates, ...updates].join(" ✦ ");

  return (
    <div 
      className="fixed top-16 sm:top-20 left-0 right-0 w-full overflow-hidden z-40"
      style={{ 
        backgroundColor: 'rgba(17, 17, 17, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(184, 152, 91, 0.1)'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Scrolling ticker */}
      <motion.div
        className="flex whitespace-nowrap py-2.5 sm:py-3"
        style={{
          color: 'rgba(247, 247, 247, 0.75)',
          fontSize: '0.8125rem',
          fontWeight: '500',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
        animate={{
          x: isPaused ? undefined : [0, -2000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear"
          }
        }}
      >
        <span className="inline-block px-2">{tickerContent}</span>
        <span className="inline-block px-2">{tickerContent}</span>
      </motion.div>

      {/* Gradient fade edges */}
      <div 
        className="absolute top-0 left-0 h-full w-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(17, 17, 17, 0.75), transparent)'
        }}
      />
      <div 
        className="absolute top-0 right-0 h-full w-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(17, 17, 17, 0.75), transparent)'
        }}
      />
    </div>
  );
}
