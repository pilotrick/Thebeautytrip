/**
 * Scroll Restoration Utilities
 * 
 * CRITICAL: These utilities ensure users always see CTAs by forcing pages to start at the top.
 * Without this, users who refresh, use back button, or bookmark pages may land mid-page,
 * missing primary CTAs and causing conversion drop-off.
 */

/**
 * Force scroll to top - Use for initial page loads and view changes
 */
export const scrollToTop = (behavior: ScrollBehavior = 'auto') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior
  });
};

/**
 * Smooth scroll to top - Use for user-initiated actions
 */
export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

/**
 * Scroll to element by ID
 */
export const scrollToElement = (elementId: string, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Disable browser's automatic scroll restoration
 * CRITICAL: Prevents browsers from remembering scroll positions
 */
export const disableBrowserScrollRestoration = () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
};

/**
 * Hook for scroll restoration on component mount
 * Use in any component that should always start at the top
 */
export const useScrollRestoration = () => {
  if (typeof window !== 'undefined') {
    // Immediate scroll to prevent flash
    window.scrollTo(0, 0);
    
    // Disable browser scroll restoration
    disableBrowserScrollRestoration();
  }
};

/**
 * Check if user has scrolled past viewport
 * Useful for showing floating CTAs
 */
export const isPastViewport = (threshold = 0): boolean => {
  if (typeof window === 'undefined') return false;
  return window.pageYOffset > (threshold || window.innerHeight);
};

/**
 * Get current scroll position
 */
export const getScrollPosition = (): { x: number; y: number } => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement, offset = 0): boolean => {
  if (typeof window === 'undefined') return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
};
