import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface CinematicHeroProps {
  videoUrl: string;
  mobileVideoUrl?: string; // Optional separate video for mobile
  posterImage?: string; // Fallback image while loading
  height?: string; // Default: 100vh
  overlayOpacity?: number; // 0-1, default 0.3
  showMuteButton?: boolean;
  children?: React.ReactNode; // Content to overlay on video
}

export function CinematicHero({
  videoUrl,
  mobileVideoUrl,
  posterImage,
  height = '100vh',
  overlayOpacity = 0.3,
  showMuteButton = true,
  children
}: CinematicHeroProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play video when loaded
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play might be blocked, that's ok
        console.log('Auto-play blocked');
      });
    }
  }, [isLoaded]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const currentVideoUrl = isMobile && mobileVideoUrl ? mobileVideoUrl : videoUrl;

  return (
    <div 
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      {/* Video Background - Full Bleed */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          objectPosition: isMobile ? 'center center' : 'center center',
        }}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster={posterImage}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={currentVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay (Optional) */}
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Mute/Unmute Button */}
      {showMuteButton && (
        <motion.button
          onClick={toggleMute}
          className="absolute top-6 right-6 z-20 p-3 rounded-full backdrop-blur-md transition-all duration-300"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </motion.button>
      )}

      {/* Content Overlay */}
      {children && (
        <div className="absolute inset-0 z-10">
          {children}
        </div>
      )}

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <motion.div
            className="w-12 h-12 border-4 border-t-transparent rounded-full"
            style={{ borderColor: 'var(--bt-gold)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  );
}

// Example usage component
export function CinematicHeroExample() {
  return (
    <CinematicHero
      videoUrl="https://example.com/desktop-hero.mp4"
      mobileVideoUrl="https://example.com/mobile-hero.mp4" // Optional vertical video for mobile
      posterImage="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80"
      height="100vh"
      overlayOpacity={0.3}
      showMuteButton={true}
    >
      {/* Your hero content here */}
      <div className="flex items-center justify-center h-full px-6">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
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
    </CinematicHero>
  );
}
