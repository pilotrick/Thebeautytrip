import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  posterUrl?: string; // Fallback image while video loads
  overlay?: 'light' | 'dark' | 'blush' | 'none';
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * VideoBackground Component
 * 
 * Cinematic background video with overlay options
 * Perfect for hero sections and immersive content areas
 * 
 * Usage:
 * <VideoBackground 
 *   videoUrl="https://example.com/video.mp4"
 *   overlay="dark"
 *   overlayOpacity={0.4}
 * >
 *   <h1>Your Content Here</h1>
 * </VideoBackground>
 */
export function VideoBackground({
  videoUrl,
  posterUrl,
  overlay = 'dark',
  overlayOpacity = 0.3,
  className = '',
  children
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playPromise: Promise<void> | undefined;
    let isMounted = true;

    // Handle video load errors gracefully (e.g., if video file doesn't exist yet)
    const handleError = () => {
      console.log('Video failed to load - showing poster image instead');
    };

    const handleLoadedData = () => {
      if (isMounted) {
        setIsLoaded(true);
      }
    };

    // Attempt to play video (some browsers require user interaction)
    const attemptPlay = async () => {
      if (!video || !isMounted) return;
      
      // Small delay to ensure video is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!isMounted) return; // Check again after delay
      
      try {
        playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          playPromise = undefined; // Clear after successful play
        }
      } catch (error) {
        // Only log if it's not an AbortError from unmounting
        if (isMounted && error instanceof Error && error.name !== 'AbortError') {
          console.log('Video autoplay prevented by browser - showing poster');
        }
        playPromise = undefined; // Clear on error
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    
    // Start playing once metadata is loaded
    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadedmetadata', attemptPlay, { once: true });
    }

    return () => {
      isMounted = false;
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', attemptPlay);
      
      // Pause video before handling promise
      if (video) {
        try {
          // Pause immediately to stop any playback
          if (!video.paused) {
            video.pause();
          }
          // Remove src to stop any pending loads
          video.src = '';
          video.load();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
      
      // Handle any pending play promise
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently catch AbortError on unmount
        });
      }
    };
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
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Layer */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        loop
        playsInline
        poster={posterUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        {posterUrl && (
          <img 
            src={posterUrl} 
            alt="Video fallback" 
            className="w-full h-full object-cover"
          />
        )}
      </video>

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
