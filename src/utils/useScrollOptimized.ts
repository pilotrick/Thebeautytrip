import { useEffect, useState } from 'react';

export function useScrollOptimized(threshold: number = 100) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only update if threshold is crossed
      if ((lastScrollY <= threshold && currentScrollY > threshold) ||
          (lastScrollY > threshold && currentScrollY <= threshold)) {
        setIsPastThreshold(currentScrollY > threshold);
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // Check initial state
    setIsPastThreshold(window.scrollY > threshold);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isPastThreshold;
}
