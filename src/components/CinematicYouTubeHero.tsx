import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CinematicYouTubeHeroProps {
  videoId: string; // YouTube video ID
  mobileVideoId?: string; // Optional different video for mobile
  height?: string; // Default: 100vh
  startTime?: number; // Start time in seconds
  endTime?: number; // End time in seconds (for looping)
  overlayOpacity?: number; // 0-1, default 0.3
  children?: React.ReactNode;
}

export function CinematicYouTubeHero({
  videoId,
  mobileVideoId,
  height = '100vh',
  startTime = 0,
  endTime,
  overlayOpacity = 0.3,
  children
}: CinematicYouTubeHeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    let resizeTimer: number | undefined;
    const handleResize = () => {
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Simulate loading delay
    const loadTimer = window.setTimeout(() => setIsReady(true), 500);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (loadTimer) {
        window.clearTimeout(loadTimer);
      }
      if (resizeTimer) {
        window.clearTimeout(resizeTimer);
      }
    };
  }, []);

  const currentVideoId = isMobile && mobileVideoId ? mobileVideoId : videoId;
  
  // Build YouTube URL with parameters for seamless autoplay and loop
  const youtubeParams = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    showinfo: '0',
    rel: '0',
    loop: '1',
    playlist: currentVideoId, // Required for loop to work
    modestbranding: '1',
    playsinline: '1',
    start: startTime.toString(),
    ...(endTime && { end: endTime.toString() })
  });

  const iframeUrl = `https://www.youtube.com/embed/${currentVideoId}?${youtubeParams.toString()}`;

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      {/* YouTube Iframe - Scaled to fill and remove black bars */}
      <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            // Scale up iframe to remove black bars (16:9 standard)
            width: isMobile ? '100%' : '177.77vh', // 16:9 aspect ratio scaled
            height: isMobile ? '177.77vw' : '100%', // Ensures coverage
            minWidth: '100%',
            minHeight: '100%',
            border: 'none',
            outline: 'none',
            willChange: isMobile ? 'auto' : 'transform'
          }}
          src={iframeUrl}
          title="Background Video"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          frameBorder="0"
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay */}
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0 z-5 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content Overlay */}
      {children && (
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      )}

      {/* Loading Overlay */}
      {!isReady && (
        <motion.div 
          className="absolute inset-0 bg-black z-20 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onAnimationComplete={() => {
            // Remove from DOM after fade out
            const elem = document.querySelector('.loading-overlay');
            if (elem) elem.remove();
          }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-t-transparent rounded-full"
            style={{ borderColor: 'var(--bt-gold)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </div>
  );
}

// Example usage
export function CinematicYouTubeHeroExample() {
  return (
    <CinematicYouTubeHero
      videoId="YOUR_YOUTUBE_VIDEO_ID"
      mobileVideoId="YOUR_MOBILE_YOUTUBE_VIDEO_ID" // Optional
      height="100vh"
      startTime={0}
      overlayOpacity={0.3}
    >
      {/* Hero Content */}
      <div className="flex items-center justify-center h-full px-6">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 
            className="mb-6 text-4xl sm:text-5xl md:text-7xl"
            style={{ 
              fontWeight: '700',
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em'
            }}
          >
            Vacation in Paradise,<br />
            Meet the <span style={{ fontStyle: 'italic' }}>New You</span>
          </h1>
          
          <p 
            className="mb-8 text-lg sm:text-xl md:text-2xl"
            style={{ 
              color: 'white',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            Luxury wellness & aesthetic treatments in the Dominican Republic
          </p>

          <motion.button
            className="px-8 py-4 rounded-full text-lg"
            style={{
              backgroundColor: 'var(--bt-gold)',
              color: 'white',
              fontWeight: '700',
              letterSpacing: '0.05em',
              boxShadow: '0 10px 30px rgba(184, 152, 91, 0.4)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 40px rgba(184, 152, 91, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            START YOUR JOURNEY
          </motion.button>
        </motion.div>
      </div>
    </CinematicYouTubeHero>
  );
}
