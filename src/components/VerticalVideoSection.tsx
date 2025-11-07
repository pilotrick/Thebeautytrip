import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";

interface VerticalVideo {
  id: string;
  videoUrl: string;
  posterUrl: string;
  title: string;
  subtitle: string;
  category: 'transformation' | 'testimonial' | 'destination' | 'procedure';
  clientName?: string;
  location?: string;
}

interface VerticalVideoSectionProps {
  videos?: VerticalVideo[];
}

export function VerticalVideoSection({ videos: customVideos }: VerticalVideoSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<Record<number, boolean>>({});
  const [isMuted, setIsMuted] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Real vertical videos from Pexels (portrait orientation)
  const defaultVideos: VerticalVideo[] = [
    {
      id: 'transformation-1',
      videoUrl: 'https://videos.pexels.com/video-files/4723226/4723226-uhd_1080_1920_24fps.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=700&fit=crop',
      title: 'Sarah\'s Smile Transformation',
      subtitle: '10 days • Veneers + BOTOX',
      category: 'transformation',
      clientName: 'Sarah M.',
      location: 'Santo Domingo'
    },
    {
      id: 'testimonial-1',
      videoUrl: 'https://videos.pexels.com/video-files/3063839/3063839-uhd_1080_1920_30fps.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=700&fit=crop',
      title: 'Why I Chose The Beauty Trip',
      subtitle: 'Real client experience',
      category: 'testimonial',
      clientName: 'Maria L.',
      location: 'Punta Cana'
    },
    {
      id: 'destination-1',
      videoUrl: 'https://videos.pexels.com/video-files/2611250/2611250-hd_1080_1920_30fps.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=400&h=700&fit=crop',
      title: 'Caribbean Radiance Tour',
      subtitle: 'Paradise meets wellness',
      category: 'destination',
      location: 'Cabarete'
    },
    {
      id: 'procedure-1',
      videoUrl: 'https://videos.pexels.com/video-files/6560381/6560381-hd_1080_1920_24fps.mp4',
      posterUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=700&fit=crop',
      title: 'BOTOX: What to Expect',
      subtitle: '60 seconds • Dr. Martinez',
      category: 'procedure'
    }
  ];

  const videos = customVideos || defaultVideos;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const getVisibleVideos = () => {
    // Show 3 videos on desktop, 1 on mobile
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + videos.length) % videos.length;
      result.push({ video: videos[index], index, position: i });
    }
    return result;
  };

  const categoryColors = {
    transformation: 'var(--bt-blush)',
    testimonial: 'var(--bt-gold)',
    destination: '#4ECDC4',
    procedure: '#95A5A6'
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{ backgroundColor: 'var(--bt-cream)' }}
    >
      {/* Section Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-block px-4 py-2 mb-4 rounded-full"
          style={{ 
            backgroundColor: 'var(--bt-blush)',
            opacity: 0.2
          }}
        >
          <span 
            className="tracking-wider uppercase"
            style={{ 
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--bt-charcoal)'
            }}
          >
            Real Transformations
          </span>
        </motion.div>

        <h2 
          className="mb-4"
          style={{ 
            fontSize: '2.5rem',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            color: 'var(--bt-charcoal)'
          }}
        >
          See The Beauty Trip Experience
        </h2>
        
        <p 
          className="max-w-2xl mx-auto"
          style={{ 
            fontSize: '1.125rem',
            color: 'var(--bt-charcoal)',
            opacity: 0.7
          }}
        >
          Real clients. Real results. Real stories from the Dominican Republic.
        </p>
      </motion.div>

      {/* Video Carousel */}
      <div className="relative max-w-7xl mx-auto">
        {/* Desktop: 3 videos side by side */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {getVisibleVideos().map(({ video, index, position }) => (
            <motion.div
              key={video.id}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? {
                opacity: position === 0 ? 1 : 0.5,
                scale: position === 0 ? 1 : 0.85,
                y: position === 0 ? 0 : 20
              } : {}}
              transition={{ duration: 0.5, delay: (position + 1) * 0.1 }}
              style={{
                width: position === 0 ? '320px' : '280px',
                zIndex: position === 0 ? 10 : 5
              }}
            >
              <VerticalVideoCard
                video={video}
                index={index}
                isActive={position === 0}
                isPlaying={isPlaying[index] || false}
                isMuted={isMuted[index] !== false} // Default muted
                onPlayToggle={() => setIsPlaying(prev => ({ ...prev, [index]: !prev[index] }))}
                onMuteToggle={() => setIsMuted(prev => ({ ...prev, [index]: !prev[index] }))}
                categoryColor={categoryColors[video.category]}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: 1 video at a time */}
        <div className="md:hidden flex justify-center">
          <motion.div
            key={videos[currentIndex].id}
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ width: '320px' }}
          >
            <VerticalVideoCard
              video={videos[currentIndex]}
              index={currentIndex}
              isActive={true}
              isPlaying={isPlaying[currentIndex] || false}
              isMuted={isMuted[currentIndex] !== false}
              onPlayToggle={() => setIsPlaying(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }))}
              onMuteToggle={() => setIsMuted(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }))}
              categoryColor={categoryColors[videos[currentIndex].category]}
            />
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            color: 'var(--bt-charcoal)'
          }}
          aria-label="Previous video"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            color: 'var(--bt-charcoal)'
          }}
          aria-label="Next video"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: currentIndex === index ? 'var(--bt-gold)' : '#d1d5db',
              transform: currentIndex === index ? 'scale(1.5)' : 'scale(1)'
            }}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p 
          className="mb-4"
          style={{ 
            fontSize: '1rem',
            color: 'var(--bt-charcoal)',
            opacity: 0.8
          }}
        >
          Ready to start your transformation?
        </p>
        <button
          className="px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: 'var(--bt-gold)',
            color: 'var(--bt-charcoal)',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(184, 152, 91, 0.3)'
          }}
        >
          Start Your Journey
        </button>
      </motion.div>
    </section>
  );
}

// Individual Vertical Video Card Component
interface VerticalVideoCardProps {
  video: VerticalVideo;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
  categoryColor: string;
}

function VerticalVideoCard({
  video,
  isActive,
  isPlaying,
  isMuted,
  onPlayToggle,
  onMuteToggle,
  categoryColor
}: VerticalVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const handlePlayToggle = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    try {
      if (isPlaying) {
        // Wait for any pending play promise before pausing
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {});
        }
        videoElement.pause();
        playPromiseRef.current = null;
      } else {
        // Store the play promise and handle it properly
        playPromiseRef.current = videoElement.play();
        await playPromiseRef.current;
        playPromiseRef.current = null;
      }
      onPlayToggle();
    } catch (error) {
      // Only log non-abort errors
      if (error instanceof Error && error.name !== 'AbortError') {
        console.log('Video playback error:', error.message);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      onMuteToggle();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        try {
          if (!videoElement.paused) {
            videoElement.pause();
          }
          // Clear src to stop any pending operations
          videoElement.src = '';
          videoElement.load();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
      // Clear any pending promise
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
      }
      playPromiseRef.current = null;
    };
  }, []);

  return (
    <div 
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        aspectRatio: '9/16',
        backgroundColor: '#111',
        boxShadow: isActive 
          ? '0 20px 40px rgba(0,0,0,0.2)' 
          : '0 10px 20px rgba(0,0,0,0.1)'
      }}
      onClick={handlePlayToggle}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={video.posterUrl}
        loop
        muted={isMuted}
        playsInline
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support video playback.
      </video>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            <Play className="w-8 h-8 ml-1" style={{ color: 'var(--bt-charcoal)' }} fill="var(--bt-charcoal)" />
          </div>
        </motion.div>
      )}

      {/* Controls Overlay (visible on hover) */}
      <div 
        className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleMuteToggle}
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: 'var(--bt-charcoal)'
          }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Category Badge */}
      <div 
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: categoryColor,
          opacity: 0.9
        }}
      >
        <span 
          className="text-white text-xs uppercase tracking-wider"
          style={{ fontWeight: '600' }}
        >
          {video.category}
        </span>
      </div>

      {/* Bottom Gradient & Info */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)'
        }}
      >
        <h3 
          className="text-white mb-1"
          style={{ 
            fontSize: '1.25rem',
            fontWeight: '600',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {video.title}
        </h3>
        <p 
          className="text-white/80 mb-2"
          style={{ 
            fontSize: '0.875rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {video.subtitle}
        </p>
        {(video.clientName || video.location) && (
          <div className="flex items-center gap-2 text-white/70 text-xs">
            {video.clientName && <span>👤 {video.clientName}</span>}
            {video.location && <span>📍 {video.location}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
