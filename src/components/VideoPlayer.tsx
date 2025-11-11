import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  posterUrl?: string;
  title?: string;
  caption?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16';
  className?: string;
}

/**
 * VideoPlayer Component
 * 
 * Elegant video player with custom controls matching The Beauty Trip aesthetic
 * Perfect for testimonials, procedure showcases, and destination highlights
 * 
 * Usage:
 * <VideoPlayer 
 *   videoUrl="https://example.com/video.mp4"
 *   posterUrl="https://example.com/poster.jpg"
 *   title="Client Transformation"
 *   caption="Watch Sarah's journey to radiant confidence"
 *   aspectRatio="16/9"
 * />
 */
export function VideoPlayer({
  videoUrl,
  posterUrl,
  title,
  caption,
  autoPlay = false,
  showControls = true,
  aspectRatio = '16/9',
  className = ''
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(autoPlay); // Auto-mute if autoplay
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const value = (video.currentTime / video.duration) * 100;
      setProgress(value || 0);
    };

    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      // Store reference for cleanup
      const videoElement = video;
      
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
      
      // Cleanup video resources safely
      requestIdleCallback(() => {
        try {
          if (videoElement && !videoElement.paused) {
            videoElement.pause();
          }
          if (videoElement) {
            videoElement.src = '';
            videoElement.load();
          }
        } catch (e) {
          // Video already cleaned up or removed
        }
      });
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || isPending) return;

    try {
      setIsPending(true);
      
      // Wait for any pending operation
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }

      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        playPromiseRef.current = video.play();
        await playPromiseRef.current;
        setIsPlaying(true);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.log('Video playback error:', error.message);
      }
      setIsPlaying(false);
    } finally {
      setIsPending(false);
      playPromiseRef.current = null;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const aspectRatioClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
    '9/16': 'aspect-[9/16]'
  };

  return (
    <div className={`group ${className}`}>
      {/* Title & Caption */}
      {(title || caption) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-[#111111] mb-1">{title}</h3>
          )}
          {caption && (
            <p className="text-[#717182] text-sm italic">
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Video Container */}
      <div 
        className={`relative bg-[#111111] rounded-lg overflow-hidden ${aspectRatioClasses[aspectRatio]}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={posterUrl}
          autoPlay={autoPlay}
          muted={isMuted}
          playsInline
          onClick={togglePlay}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay */}
        {showControls && (
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Center Play Button */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group/play"
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center transition-transform duration-300 group-hover/play:scale-110">
                  <Play className="w-10 h-10 text-[#111111] ml-1" fill="currentColor" />
                </div>
              </button>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              {/* Progress Bar */}
              <div 
                className="w-full h-1 bg-white/30 rounded-full cursor-pointer group/progress"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-[#E0B0BA] rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-[#E0B0BA] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-[#E0B0BA] transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
