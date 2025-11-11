/**
 * Scroll Utility Functions
 * Centralized scroll behavior with accessibility support
 */

/**
 * Scroll to top of page
 * Respects user's reduced motion preference
 * @param immediate - Skip animation and scroll instantly
 */
export const scrollToTop = (immediate = false): void => {
  if (typeof window === 'undefined') return;
  
  // Check user's motion preference (accessibility)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  window.scrollTo({ 
    top: 0, 
    behavior: (immediate || prefersReducedMotion) ? 'auto' : 'smooth' 
  });
};

/**
 * Scroll to a specific element
 * @param selector - CSS selector for the target element
 * @param offset - Optional offset from top (for fixed headers)
 */
export const scrollToElement = (selector: string, offset = 0): void => {
  if (typeof window === 'undefined') return;
  
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
};

/**
 * Scroll to the next section (useful for hero scroll indicators)
 * @param fallbackDistance - If no next section found, scroll this many pixels
 */
export const scrollToNextSection = (fallbackDistance?: number): void => {
  if (typeof window === 'undefined') return;
  
  // Try to find the next section marked with data attribute
  const nextSection = document.querySelector('[data-scroll-target]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (nextSection) {
    nextSection.scrollIntoView({ 
      behavior: prefersReducedMotion ? 'auto' : 'smooth', 
      block: 'start' 
    });
  } else {
    // Fallback to viewport height or custom distance
    window.scrollTo({ 
      top: fallbackDistance || window.innerHeight, 
      behavior: prefersReducedMotion ? 'auto' : 'smooth' 
    });
  }
};

/**
 * Get current scroll position
 */
export const getScrollPosition = (): number => {
  if (typeof window === 'undefined') return 0;
  return window.pageYOffset || document.documentElement.scrollTop;
};

/**
 * Check if element is in viewport
 * @param element - HTML element to check
 * @param offset - Optional offset for early/late detection
 */
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= (0 - offset) &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Disable scroll restoration for SPA navigation
 * Call this on app initialization
 */
export const disableScrollRestoration = (): void => {
  if (typeof window === 'undefined') return;
  
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
};

/**
 * Enable scroll restoration
 */
export const enableScrollRestoration = (): void => {
  if (typeof window === 'undefined') return;
  
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'auto';
  }
};
