import { useRef, useEffect, useCallback } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<number>();
  const callbackRef = useRef(callback);

  // Update callback ref on each render
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const throttled = useCallback(((...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastRun.current >= delay) {
      callbackRef.current(...args);
      lastRun.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
        lastRun.current = Date.now();
      }, delay - (now - lastRun.current));
    }
  }) as T, [delay]);

  return throttled;
}
