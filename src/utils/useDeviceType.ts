import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  screenWidth: number;
  screenHeight: number;
}

/**
 * Custom hook to detect device type and capabilities
 * Breakpoints: Mobile < 768px, Tablet 768-1024px, Desktop > 1024px
 */
export function useDeviceType(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    // Initial state on mount
    if (typeof window === 'undefined') {
      return {
        type: 'desktop',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouch: false,
        screenWidth: 1920,
        screenHeight: 1080
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    let type: DeviceType = 'desktop';
    if (width < 768) {
      type = 'mobile';
    } else if (width < 1024) {
      type = 'tablet';
    }

    return {
      type,
      isMobile: type === 'mobile',
      isTablet: type === 'tablet',
      isDesktop: type === 'desktop',
      isTouch,
      screenWidth: width,
      screenHeight: height
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      let type: DeviceType = 'desktop';
      if (width < 768) {
        type = 'mobile';
      } else if (width < 1024) {
        type = 'tablet';
      }

      setDeviceInfo({
        type,
        isMobile: type === 'mobile',
        isTablet: type === 'tablet',
        isDesktop: type === 'desktop',
        isTouch,
        screenWidth: width,
        screenHeight: height
      });
    };

    // Debounce resize events for performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    // Run once on mount to ensure correct initial state
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return deviceInfo;
}

/**
 * Simple hook that just returns if device is mobile
 */
export function useIsMobile(): boolean {
  const { isMobile } = useDeviceType();
  return isMobile;
}

/**
 * Hook to detect if user prefers reduced motion (accessibility)
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
