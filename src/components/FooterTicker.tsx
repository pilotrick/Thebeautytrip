import { motion } from "motion/react";
import { useState } from "react";

export function FooterTicker() {
  const [isPaused, setIsPaused] = useState(false);

  // Short, hilarious & engaging quotes from Beauty Trip vibes
  const updates = [
    "😎 'RECOVERY? MORE LIKE RE-DISCOVERY'",
    "🏝️ 'MY DOCTOR IS HOT AND I'M ON A BEACH'",
    "✨ 'DAY 3: ALREADY PLANNING MY COMEBACK TOUR'",
    "💃 'DO YOU FEEL BONITA? BECAUSE YOU LOOK BONITA!'",
    "🍹 'BOTOX IN THE MORNING, BEACH CLUB BY NOON'",
    "💃 'VACATION MODE: ACTIVATED. GLOW MODE: UNLOCKED.'",
    "🎉 'WEEK 1: NERVOUS. WEEK 3: WHO IS SHE?!'",
    "☀️ TODO BIEN, TODO BONITO (ALL GOOD, ALL BEAUTIFUL)",
    "😂 'MY BEFORE PICS ARE RECEIPTS'",
    "💎 'SAVING 70%? THAT'S BIRKIN MONEY, BABY'",
    "🛫 'BYE MEDSPA DEBT, HELLO MERENGUE NIGHTS'",
    "✨ 'I SAID VACATION. TECHNICALLY TRUE.'",
    "😏 'THE RESORT VIEWS? ALMOST AS GOOD AS MY RESULTS'",
    "🥂 'LOOKING EXPENSIVE ON A BUDGET = GENIUS'",
    "💫 'PLOT TWIST: I'M THRIVING'",
    "🔥 'LEFT WITH MAIN CHARACTER ENERGY'",
    "😂 'MOM: WHY DR? ME: ...THE BEACHES?'",
    "✈️ 'NEW FACE: PENDING. ANXIETY: DELETED.'",
    "🌴 'LUXURY + SAVINGS = THIS'",
    "🏖️ 'PARADISE + TRANSFORMATION = LIFE HACK'",
    "💁‍♀️ 'I WOKE UP LIKE THIS... AFTER A LITTLE HELP'",
    "🌊 'SUN, SAND, AND A WHOLE NEW ME'",
    "🎯 'THE GLOW-UP WAS JUST THE BEGINNING'",
    "✨ 'UNBOTHERED. MOISTURIZED. IN MY LANE. IN PARADISE.'",
  ];

  // Create a long string of all updates repeated
  const tickerContent = [...updates, ...updates, ...updates].join(" ✦ ");

  return (
    <div 
      className="w-full overflow-hidden border-t"
      style={{ 
        backgroundColor: 'rgba(17, 17, 17, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderColor: 'rgba(184, 152, 91, 0.1)'
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
          background: 'linear-gradient(to right, rgba(17, 17, 17, 0.5), transparent)'
        }}
      />
      <div 
        className="absolute top-0 right-0 h-full w-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, rgba(17, 17, 17, 0.5), transparent)'
        }}
      />
    </div>
  );
}
