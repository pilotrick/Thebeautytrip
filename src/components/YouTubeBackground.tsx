import { useEffect, useRef, useState } from 'react';

interface YouTubeBackgroundProps {
  videoId: string; // YouTube video ID or full embed URL
  overlay?: 'light' | 'dark' | 'blush' | 'none';
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * YouTubeBackground Component
 * 
 * Cinematic background YouTube video with overlay options
 * Perfect for hero sections with YouTube content
 * 
 * Usage:
 * <YouTubeBackground 
 *   videoId="v2_kCAFnIDE"
 *   overlay="dark"
 *   overlayOpacity={0.5}
 * >
 *   <h1>Your Content Here</h1>
 * </YouTubeBackground>
 */
export function YouTubeBackground({
  videoId,
  overlay = 'dark',
  overlayOpacity = 0.3,
  className = '',
  children
}: YouTubeBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract video ID if full URL is provided
  const extractVideoId = (input: string): string => {
    // If already just an ID, return it
    if (!input.includes('/') && !input.includes('?')) {
      return input;
    }
    
    // Extract from embed URL
    const embedMatch = input.match(/embed\/([^?]+)/);
    if (embedMatch) {
      return embedMatch[1];
    }
    
    // Extract from watch URL
    const watchMatch = input.match(/[?&]v=([^&]+)/);
    if (watchMatch) {
      return watchMatch[1];
    }
    
    return input;
  };

  const vidId = extractVideoId(videoId);

  // YouTube embed URL with autoplay, mute, loop, and controls hidden
  const embedUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&mute=1&loop=1&playlist=${vidId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;

  useEffect(() => {
    // Set loaded after a brief delay to allow iframe to initialize
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const overlayColors = {
    light: 'rgba(247, 247, 247, ',
    dark: 'rgba(17, 17, 17, ',
    blush: 'rgba(224, 176, 186, ',
    none: 'rgba(0, 0, 0, 0)'
  };

  const overlayStyle = overlay !== 'none' 
    ? { backgroundColor: overlayColors[overlay] + overlayOpacity + ')' }
    : {};

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ margin: 0, padding: 0, width: '100%', height: '100%' }}>
      {/* YouTube Iframe Layer - FULL BLEED EDGE-TO-EDGE */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ margin: 0, padding: 0, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: '#F7F7F7' }}>
        <iframe
          ref={iframeRef}
          className={`absolute pointer-events-none transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={embedUrl}
          title="Background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            border: 'none',
            margin: 0,
            padding: 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw', // 16:9 aspect ratio (100 / 16 * 9)
            minWidth: '177.77vh', // 16:9 aspect ratio (100 / 9 * 16)
            minHeight: '100vh',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Overlay */}
      {overlay !== 'none' && (
        <div 
          className="absolute inset-0 z-10"
          style={overlayStyle}
        />
      )}

      {/* Content Layer */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
