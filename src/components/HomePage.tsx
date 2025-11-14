import { ImageWithFallback } from "./figma/ImageWithFallback";
import { User, CheckCircle2, ArrowDown, Play, ChevronLeft, ChevronRight, Gift } from "lucide-react";
import logoImage from "figma:asset/14e163fabd1036dfe849086350b27b4780fe718d.png";
import souvenirImage from "figma:asset/0ed94fa1506892b6843be45d851a2da19cf5ce26.png";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { useState, useEffect, useRef, useMemo } from "react";
import { YouTubeBackground } from "./YouTubeBackground";
import { VerticalVideoSection } from "./VerticalVideoSection";
import { SpinWheelPopup } from "./SpinWheelPopup";
import { GiftExplosion } from "./GiftExplosion";
import { Navigation } from "./Navigation";
import { LuxuryTicker } from "./LuxuryTicker";
import { FooterTicker } from "./FooterTicker";
import { PricingCatalogModal } from "./PricingCatalogModal";
import { Logo } from "./Logo";
import { ImprovedBeforeAfter } from "./ImprovedBeforeAfter";
import { DynamicItinerary } from "./DynamicItinerary";
import { useScrollOptimized } from "../utils/useScrollOptimized";
import { useIsMobile } from "../utils/useReducedMotion";
import { CountdownTimer } from "./CountdownTimer";
import { SpotCounter } from "./SpotCounter";
import { EarlyAccessModal } from "./EarlyAccessModal";


// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-4xl mb-3" style={{ color: 'var(--bt-gold)' }}>
      {count}{suffix}
    </div>
  );
}

// Floating Scroll Indicator - Optimized
function ScrollIndicator() {
  const isPastThreshold = useScrollOptimized(100);
  const isVisible = !isPastThreshold;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
      style={{ willChange: 'opacity, transform' }}
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <div className="flex flex-col items-center gap-1 sm:gap-2 text-white">
        <span className="text-xs sm:text-sm tracking-wider uppercase opacity-90" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Scroll Progress Bar
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
      style={{
        scaleX,
        backgroundColor: 'var(--bt-gold)',
        boxShadow: '0 0 10px rgba(184, 152, 91, 0.5)'
      }}
    />
  );
}

// Sticky Floating CTA - Hidden on small mobile, visible on tablet+ - Optimized
function FloatingCTA({ onClick }: { onClick: () => void }) {
  const isPastViewport = useScrollOptimized(typeof window !== 'undefined' ? window.innerHeight : 800);
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isPastViewport ? 0 : 100,
        opacity: isPastViewport ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-50 hidden sm:block"
      style={{ willChange: 'transform, opacity' }}
    >
      <button
        onClick={onClick}
        className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(184,152,91,0.5)] group text-sm sm:text-base"
        style={{
          backgroundColor: 'var(--bt-gold)',
          color: 'var(--bt-charcoal)',
          fontWeight: '600',
          letterSpacing: '0.02em'
        }}
      >
        <span className="flex items-center gap-2">
          <span className="hidden md:inline">START YOUR JOURNEY</span>
          <span className="md:hidden">START</span>
          {!isMobile && (
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          )}
          {isMobile && <span>→</span>}
        </span>
      </button>
    </motion.div>
  );
}

// Video Placeholder Component - Optimized
function VideoPlaceholder() {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div 
      className="absolute inset-0 group cursor-pointer"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Background Image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
        alt="Pristine Caribbean Beach Coastline"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(1.15) contrast(1.05)' }}
      />
      
      {/* Animated Gradient Overlay - Only animate on desktop */}
      {!isMobile ? (
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.35) 100%)',
              'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.25) 100%)',
              'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.35) 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.35) 100%)' }}
        />
      )}

      {/* Video Coming Soon Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 right-8 px-4 py-2 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(184, 152, 91, 0.9)',
          border: '2px solid white'
        }}
      >
        <span className="text-white text-sm font-semibold tracking-wider">
          ✦ CINEMATIC EXPERIENCE COMING SOON
        </span>
      </motion.div>

      {/* Play Button Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            border: '3px solid white'
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered 
              ? '0 0 40px rgba(255, 255, 255, 0.8)' 
              : '0 0 20px rgba(255, 255, 255, 0.4)'
          }}
          transition={{ duration: 0.3 }}
        >
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </motion.div>
      </motion.div>

      {/* Pulsing Ring Animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>
    </div>
  );
}

// Before/After Slider Component
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setSliderPosition(percent);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <h3 className="text-center mb-8" style={{ 
        fontSize: '1.75rem', 
        color: 'var(--bt-charcoal)', 
        fontWeight: '600',
        letterSpacing: '-0.01em'
      }}>
        A Reset Button for the Soul
      </h3>
      
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] overflow-hidden rounded-lg cursor-ew-resize select-none border-4"
        style={{ borderColor: 'var(--bt-gold)' }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1564403238967-1d0bc05d0653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwdHJvcGljYWwlMjBiZWFjaCUyMHJlbGF4aW5nfGVufDF8fHx8MTc2MTI4OTc2OHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Before tropical wellness transformation"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(17, 17, 17, 0.8)' }}>
            <span className="text-white font-semibold">BEFORE</span>
          </div>
        </div>

        {/* After Image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1686413559420-f8a7345c4bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwd2VsbG5lc3MlMjBzcGElMjB0cm9waWNhbHxlbnwxfHx8fDE3NjEyODk3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="After tropical wellness transformation"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}>
            <span className="text-white font-semibold">AFTER</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 cursor-ew-resize"
          style={{ 
            left: `${sliderPosition}%`,
            backgroundColor: 'white',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: 'var(--bt-gold)',
              boxShadow: '0 0 20px rgba(184, 152, 91, 0.5)'
            }}
          >
            <ChevronLeft className="w-5 h-5 text-white absolute -left-1" />
            <ChevronRight className="w-5 h-5 text-white absolute -right-1" />
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        Drag the slider to compare • All procedures under 7 days downtime
      </p>
    </div>
  );
}

// Experience Image Slider Component
function ExperienceImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    {
      url: "https://images.unsplash.com/photo-1570191668512-4ad985e7f6a8?w=1200&q=80",
      caption: "Your Tropical Paradise Awaits"
    },
    {
      url: "https://images.unsplash.com/photo-1705429541078-fc2b60aaaa16?w=1200&q=80",
      caption: "Luxury Recovery Sanctuary"
    },
    {
      url: "https://images.unsplash.com/photo-1524882343900-7fabca41cd25?w=1200&q=80",
      caption: "Rejuvenating Wellness Experience"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="aspect-[16/9] overflow-hidden rounded-lg border-4" style={{ borderColor: 'var(--bt-gold)' }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <ImageWithFallback 
              src={image.url} 
              alt={image.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-center" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {image.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Indicator Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: currentImage === index ? 'var(--bt-gold)' : '#d1d5db',
              transform: currentImage === index ? 'scale(1.2)' : 'scale(1)'
            }}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Package Carousel Component
function PackageCarousel({ onSelectPackage }: { onSelectPackage: (preset: PackagePreset) => void }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packages = [
    {
      name: "Solo Plus",
      duration: "14 Nights / 1 Guest",
      budget: "$7,840 Est.",
      feature: "Extended Wellness Focus: Two extra Lymphatic Drainage Massages (LDMs) included",
      tagline: "Maximized Discretion",
      preset: {
        name: "Solo Plus",
        recoveryDays: 14,
        procedures: ['botox-fillers', 'lymphatic-massage', 'therapeutic-massage', 'hydrafacial'],
        specialist: 'dr-martinez',
        retreat: 'cabarete-casita'
      }
    },
    {
      name: "Smile Transformation",
      duration: "10 Nights / 1 Guest",
      budget: "$6,800 Est.",
      feature: "Complete Smile Renewal: Full veneers transformation with teeth whitening and comprehensive dental care",
      tagline: "Confidence Restored",
      preset: {
        name: "Smile Transformation",
        recoveryDays: 10,
        procedures: ['veneers', 'whitening', 'therapeutic-massage', 'lymphatic-massage'],
        specialist: 'dr-rodriguez',
        retreat: 'executive-loft'
      }
    },
    {
      name: "The Duo Retreat",
      duration: "10 Nights / 2 Guests",
      budget: "$11,600 Est.",
      feature: "Companion Comfort: Dedicated 2nd master suite access and enhanced Gourmet Healing Chef options",
      tagline: "Shared Transformation",
      preset: {
        name: "The Duo Retreat",
        recoveryDays: 10,
        procedures: ['botox-fillers', 'veneers', 'therapeutic-massage', 'body-scrub'],
        specialist: 'dr-martinez',
        retreat: 'pearl-suite'
      }
    },
    {
      name: "The Group Platinum",
      duration: "12 Nights / 4 Guests",
      budget: "$18,400 Est.",
      feature: "The Bespoke Sanctuary access with private pool and full-time Blush-Tie Coordinator",
      tagline: "Family Comfort",
      preset: {
        name: "The Group Platinum",
        recoveryDays: 12,
        procedures: ['botox-fillers', 'veneers', 'hair-transplant', 'lymphatic-massage', 'therapeutic-massage'],
        specialist: 'dr-martinez',
        retreat: 'villa-corales-14'
      }
    }
  ];

  return (
    <div ref={ref} className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-2 p-6 transition-all duration-300 cursor-pointer relative"
            style={{ 
              borderColor: 'var(--bt-gold)',
              backgroundColor: 'var(--bt-charcoal)',
              transform: hoveredCard === index ? 'translateY(-8px) rotateX(2deg)' : 'translateY(0)',
              boxShadow: hoveredCard === index ? '0 12px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => onSelectPackage(pkg.preset)}
          >
            {/* Hover Tagline */}
            {hoveredCard === index && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full whitespace-nowrap"
                style={{ 
                  backgroundColor: 'var(--bt-blush)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <p style={{ 
                  color: 'white', 
                  fontSize: '0.875rem', 
                  fontWeight: '700',
                  letterSpacing: '0.02em'
                }}>
                  {pkg.tagline}
                </p>
              </motion.div>
            )}

            <h4 className="mb-4" style={{ 
              color: 'var(--bt-gold)', 
              fontSize: '1.5rem', 
              fontWeight: '700',
              letterSpacing: '0.02em'
            }}>
              {pkg.name}
            </h4>
            
            <div className="space-y-3 mb-4">
              <p className="text-white" style={{ fontSize: '1rem' }}>
                {pkg.duration}
              </p>
              <p style={{ 
                color: 'var(--bt-gold)', 
                fontSize: '1.25rem', 
                fontWeight: '700' 
              }}>
                {pkg.budget}
              </p>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {pkg.feature}
            </p>

            {/* CTA Button */}
            <motion.button 
              className="w-full px-4 py-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: 'var(--bt-gold)',
                color: 'var(--bt-charcoal)',
                fontWeight: '600',
                fontSize: '0.875rem',
                letterSpacing: '0.02em'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPackage(pkg.preset);
              }}
            >
              SELECT THIS PACKAGE
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface PackagePreset {
  name: string;
  recoveryDays: number;
  procedures: string[];
  specialist: string;
  retreat: string;
}

interface HomePageProps {
  onStartBuilder: (packagePreset?: PackagePreset) => void;
  onStartGroupFlow: () => void;
  onAccessPortal?: () => void;
  onStartTourTrips?: () => void;
  onAccessProviderPortal?: () => void;
  onAccessCollaborationHub?: () => void;
}

export function HomePage({ onStartBuilder, onStartGroupFlow, onAccessPortal, onStartTourTrips, onAccessProviderPortal, onAccessCollaborationHub }: HomePageProps) {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showEarlyAccessModal, setShowEarlyAccessModal] = useState(false);
  
  // Launch date - set to 30 days from now
  const launchDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }, []);
  
  // Parallax effect for hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // CRITICAL: Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if user has already claimed a prize
  useEffect(() => {
    const prizeWon = localStorage.getItem('beautyTripPrizeWon');
    if (prizeWon) {
      setHasClaimed(true);
    }
  }, []);

  // Auto-show spin wheel popup after delay (only once per session)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenSpinWheel');
    const prizeWon = localStorage.getItem('beautyTripPrizeWon');
    
    // Don't show if they've already won a prize
    if (!hasSeenPopup && !prizeWon) {
      const timer = setTimeout(() => {
        setShowSpinWheel(true);
        sessionStorage.setItem('hasSeenSpinWheel', 'true');
      }, 7000); // Show after 7 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  // Handler for locked features
  const handleLockedFeatureClick = () => {
    setShowEarlyAccessModal(true);
  };

  return (
    <div className="min-h-screen" style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
      {/* Gift Explosion Effect */}
      <GiftExplosion 
        isActive={showExplosion}
        onComplete={() => setShowExplosion(false)}
        position={{ x: 0.9, y: 0.8 }}
      />

      {/* Spin Wheel Popup */}
      <SpinWheelPopup 
        isOpen={showSpinWheel} 
        onClose={() => setShowSpinWheel(false)}
        onPrizeWon={() => {
          setShowExplosion(true);
          setHasClaimed(true);
        }}
      />

      {/* Early Access Modal */}
      <EarlyAccessModal 
        isOpen={showEarlyAccessModal}
        onClose={() => setShowEarlyAccessModal(false)}
      />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Floating CTA */}
      <FloatingCTA onClick={() => setShowPricingModal(true)} />

      {/* Floating Spin Wheel Button - Only show if prize hasn't been claimed */}
      {!hasClaimed && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={showExplosion ? {
            scale: [1, 1.2, 0.9, 1.3, 0],
            rotate: [0, -15, 15, -20, 20, 0],
            opacity: [1, 1, 1, 0]
          } : {
            scale: 1,
            opacity: 1
          }}
          transition={showExplosion ? {
            duration: 0.8,
            ease: "easeOut"
          } : {
            duration: 0.5,
            delay: 1
          }}
          onClick={() => setShowSpinWheel(true)}
          className="fixed bottom-20 sm:bottom-24 md:bottom-28 right-4 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: 'var(--bt-blush)',
            color: 'white',
            boxShadow: showExplosion ? '0 0 60px rgba(224, 176, 186, 1)' : '0 8px 24px rgba(224, 176, 186, 0.5)'
          }}
          whileHover={{ 
            boxShadow: '0 12px 32px rgba(224, 176, 186, 0.7)',
            rotate: [0, -10, 10, -10, 10, 0]
          }}
          title="Spin to Win Prizes!"
        >
          <Gift className="w-7 h-7 sm:w-8 sm:h-8" />
        </motion.button>
      )}

      {/* Hero Section - FULL BLEED Video */}
      <section className="relative w-full h-screen overflow-hidden" style={{ margin: 0, padding: 0 }}>
        {/* Navigation - Absolutely Positioned */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navigation onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>

        {/* Luxury Ticker - Under Navigation */}
        <div className="absolute left-0 right-0 z-40" style={{ top: '80px' }}>
          <LuxuryTicker />
        </div>

        {/* Video Background - YouTube */}
        <div className="absolute inset-0 w-full h-full">
          {/* 🎬 CINEMATIC VIDEO BACKGROUND - YouTube */}
          <YouTubeBackground
            videoId="v2_kCAFnIDE"
            overlay="dark"
            overlayOpacity={0.35}
            className="w-full h-full"
          >
            {/* Empty - content goes in the layer below */}
          </YouTubeBackground>
        </div>
        
        {/* Hero Content - Minimal & Clean */}
        <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Minimal Tagline */}
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" 
              style={{ 
                lineHeight: '1.1', 
                fontWeight: '300', 
                letterSpacing: '-0.03em', 
                color: 'white',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}
            >
              Vacation in Paradise &
              <br />
              <span style={{ fontWeight: '600' }}>Meet the New You</span>
            </motion.h1>
            
            <motion.p 
              className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl" 
              style={{ 
                fontWeight: '300', 
                letterSpacing: '0.02em', 
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              In Dominican Republic
            </motion.p>

            {/* Vetting Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span className="text-white text-sm font-medium">
                ✓ Vetting in Progress: Building the Gold Standard
              </span>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={() => setShowPricingModal(true)}
              className="mt-8 px-10 py-4 rounded-full text-lg"
              style={{
                backgroundColor: 'white',
                color: 'var(--bt-charcoal)',
                fontWeight: '600',
                letterSpacing: '-0.01em',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Services & Pricing
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* 🔥 FOUNDING MEMBER PLEDGE SECTION - Above the Fold Priority */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 z-10" style={{ backgroundColor: 'var(--bt-cream)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--bt-charcoal)' }}>
              Become a Founding Member
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl" style={{ color: 'var(--bt-charcoal)', opacity: 0.8 }}>
              Join the elite few shaping the future of beauty travel
            </p>
          </motion.div>

          {/* Countdown Timer & Spot Counter Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2"
              style={{ borderColor: 'var(--bt-gold)' }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: 'var(--bt-charcoal)' }}>
                Launch Countdown
              </h3>
              <CountdownTimer targetDate={launchDate} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center"
            >
              <SpotCounter totalSpots={500} />
            </motion.div>
          </div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 md:p-12 mb-8 border-2"
            style={{ borderColor: 'var(--bt-gold)' }}
          >
            <div className="text-center mb-6">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2" style={{ color: 'var(--bt-gold)' }}>
                $200
              </div>
              <div className="text-xl sm:text-2xl mb-4" style={{ color: 'var(--bt-charcoal)' }}>
                One-Time Investment
              </div>
              <div className="inline-block px-6 py-3 rounded-full text-2xl sm:text-3xl font-bold"
                style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)', color: 'var(--bt-gold)', border: '2px solid var(--bt-gold)' }}>
                Get $500 Credit + Lifetime Perks
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--bt-gold)' }} />
                <div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--bt-charcoal)' }}>
                    $500 Travel Credit
                  </div>
                  <div className="text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                    2.5x your investment value
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--bt-gold)' }} />
                <div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--bt-charcoal)' }}>
                    Lifetime Priority Access
                  </div>
                  <div className="text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                    First pick of destinations & dates
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--bt-gold)' }} />
                <div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--bt-charcoal)' }}>
                    Exclusive Community
                  </div>
                  <div className="text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                    Private forum & member events
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--bt-gold)' }} />
                <div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--bt-charcoal)' }}>
                    Special Member Pricing
                  </div>
                  <div className="text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                    Lifetime discounts on all services
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={onAccessCollaborationHub}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-xl text-xl sm:text-2xl font-bold text-white shadow-2xl"
              style={{ backgroundColor: 'var(--bt-gold)' }}
            >
              🔒 Lock In Your Spot & Invest $200
            </motion.button>

            <p className="text-center text-sm mt-4" style={{ color: 'var(--bt-charcoal)', opacity: 0.6 }}>
              Limited to 500 founding members only
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-sm"
            style={{ color: 'var(--bt-charcoal)', opacity: 0.6 }}
          >
            ✓ Secure Payment • ✓ Money-Back Guarantee • ✓ Instant Access to Collaboration Hub
          </motion.div>
        </div>
      </section>

      {/* Decision Gate Section */}
      <section id="start" className="relative py-3 sm:py-4 md:py-6 px-4 sm:px-6 z-10" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="max-w-5xl mx-auto">
          {/* Decorative top line */}
          <motion.div 
            className="w-16 sm:w-20 h-px mx-auto mb-3 sm:mb-4"
            style={{ backgroundColor: 'var(--bt-gold)' }}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Logo positioned above heading */}
          <motion.div 
            className="flex justify-center mb-1"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={logoImage} 
              alt="The Beauty Trip" 
              className="h-4 sm:h-5 md:h-5 w-auto"
            />
          </motion.div>
          
          {/* Decorative bottom line */}
          <motion.div 
            className="w-16 sm:w-20 h-px mx-auto mt-3 sm:mt-4 mb-3 sm:mb-4"
            style={{ backgroundColor: 'var(--bt-gold)' }}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <motion.h2 
            className="text-center mb-1 sm:mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl" 
            style={{ 
              fontWeight: '600', 
              letterSpacing: '-0.02em', 
              color: 'var(--bt-charcoal)' 
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Beauty Trip
          </motion.h2>
          
          <motion.p
            className="text-center mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto text-base sm:text-lg md:text-xl"
            style={{ color: 'var(--bt-charcoal)', lineHeight: '1.6' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            World-class treatments paired with a Caribbean escape. Wake up refreshed, return renewed.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Solo Trip Card */}
            <motion.div 
              className="border-2 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl flex flex-col" 
              style={{ borderColor: 'var(--bt-gold)' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                y: -5
              }}
            >
              <div className="text-center flex-1">
                <motion.div 
                  className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" 
                  style={{ backgroundColor: 'var(--bt-gold)' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.div>
                <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl" style={{ fontWeight: '600', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}>
                  Private Beauty Retreat
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  Your personalized transformation vacation
                </p>
                <p className="text-xs text-gray-500 mb-4 sm:mb-6" style={{ lineHeight: '1.5', minHeight: '2.5rem' }}>
                  Choose your procedures, specialist, and luxury sanctuary. Unlock VIP perks as you build your journey.
                </p>
              </div>
              <motion.button
                onClick={() => setShowPricingModal(true)}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 text-white transition-all duration-300 rounded-full text-center text-sm sm:text-base md:text-lg"
                style={{ 
                  backgroundColor: 'var(--bt-gold)',
                  fontWeight: '500',
                  letterSpacing: '0.02em'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(184, 152, 91, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                START YOUR JOURNEY
              </motion.button>
            </motion.div>

            {/* Group Celebration Card */}
            <motion.div 
              className="border-2 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl flex flex-col" 
              style={{ borderColor: 'var(--bt-blush)' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                y: -5
              }}
            >
              <div className="text-center flex-1">
                <motion.div 
                  className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" 
                  style={{ backgroundColor: 'var(--bt-blush)' }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </motion.div>
                <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl" style={{ fontWeight: '600', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}>
                  Group Beauty Retreats
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  Transform together with your crew
                </p>
                <p className="text-xs text-gray-500 mb-4 sm:mb-6" style={{ lineHeight: '1.5', minHeight: '2.5rem' }}>
                  Coordinate dates & sanctuary, share links, everyone books individually
                </p>
              </div>
              <motion.button
                onClick={handleLockedFeatureClick}
                className="w-full px-8 py-4 text-white transition-all duration-300 rounded-full text-center"
                style={{ 
                  backgroundColor: 'var(--bt-charcoal)',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  letterSpacing: '0.02em'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(17, 17, 17, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                PLAN GROUP RETREAT
              </motion.button>
            </motion.div>

            {/* Tour Trips Card */}
            {onStartTourTrips && (
              <motion.div 
                className="border-2 p-8 transition-all duration-300 hover:shadow-xl flex flex-col relative overflow-hidden md:col-span-2" 
                style={{ 
                  borderColor: '#D4A5A5', 
                  background: 'linear-gradient(135deg, #FAF5F5 0%, #F5EDED 100%)',
                  boxShadow: '0 4px 20px rgba(224, 176, 186, 0.2)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 25px 50px rgba(224, 176, 186, 0.3)',
                  y: -8
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200/15 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-300/10 rounded-full -ml-12 -mb-12" />
                <div className="relative z-10 text-center flex-1">
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 shadow-md" 
                    style={{ backgroundColor: '#D4A5A5', color: 'white' }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.05em' }}>NEW</span>
                  </motion.div>
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center shadow-lg" 
                    style={{ backgroundColor: '#D4A5A5' }}
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <h3 className="mb-3" style={{ fontSize: '2rem', fontWeight: '600', letterSpacing: '-0.02em', color: '#8B6B70' }}>
                    Tour Trip Retreats
                  </h3>
                  <p className="mb-4" style={{ fontSize: '1.125rem', color: '#9D7A7F', fontWeight: '500' }}>
                    Join solo, leave with new friends
                  </p>
                  <p className="text-sm mb-5" style={{ lineHeight: '1.6', minHeight: '2.5rem', color: '#7A5C61' }}>
                    Pre-scheduled group trips with curated experiences, set dates, and included wellness activities
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 shadow-sm" style={{ backgroundColor: 'rgba(224, 176, 186, 0.15)', border: '2px solid rgba(224, 176, 186, 0.4)' }}>
                    <span className="text-sm" style={{ color: '#8B6B70', fontWeight: '700' }}>
                      ⚡ $2,900-$6,200 • 30% Deposit Reserves Your Spot
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={handleLockedFeatureClick}
                  className="w-full px-8 py-4 text-white transition-all duration-300 rounded-full text-center relative z-10 shadow-lg"
                  style={{ 
                    backgroundColor: '#D4A5A5',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    letterSpacing: '0.02em'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(224, 176, 186, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW TOUR RETREATS →
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Group Discount Badge */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="inline-flex flex-col items-center gap-3">
              <motion.div 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full" 
                style={{ backgroundColor: 'var(--bt-blush)' }}
                whileHover={{ scale: 1.05 }}
              >
                <svg className="w-5 h-5" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                  Group retreats save up to 20% on treatments
                </span>
              </motion.div>
              <p className="text-xs text-gray-600 max-w-md">
                4-5 guests: 5% off • 6-9 guests: 10% off • 10-14 guests: 15% off • 15+ guests: 20% off
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🎬 VERTICAL VIDEO SECTION - Real Transformations */}
      <VerticalVideoSection />

      {/* Trust & Value Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-white text-center mb-4" 
            style={{ fontSize: '2.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Same Luxury. Smarter Prices.
          </motion.h2>
          <motion.p 
            className="text-center mb-16" 
            style={{ color: 'var(--bt-gold)', fontSize: '1.25rem', fontWeight: '500' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Save 60-70% vs US rates. Vacation included.
          </motion.p>
          
          {/* Price Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Injectables & Fillers", us: "$3,500", bt: "$1,200", save: "Save 66%" },
              { title: "Smile Makeover", us: "$18,000", bt: "$5,400", save: "Save 70%", featured: true },
              { title: "Med Spa Treatments", us: "$4,500", bt: "$1,600", save: "Save 64%" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-8"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: item.featured ? '2px solid var(--bt-gold)' : '1px solid rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 40px rgba(184, 152, 91, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                {item.featured && (
                  <div className="text-center mb-4">
                    <span className="px-4 py-1.5 text-sm" style={{ backgroundColor: 'var(--bt-gold)', color: '#111111' }}>
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-white mb-6 text-center" style={{ fontSize: '1.5rem' }}>
                  {item.title}
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-gray-400">US Price</span>
                    <span className="text-white text-xl">{item.us}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Beauty Trip Price</span>
                    <span style={{ color: 'var(--bt-gold)', fontSize: '1.5rem' }}>{item.bt}</span>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-white/10">
                  <span style={{ color: 'var(--bt-blush)' }}>{item.save}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges with Animated Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AnimatedCounter end={800} suffix="+" />
              <div className="text-gray-400">Successful Treatments</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AnimatedCounter end={99} suffix="%" />
              <div className="text-gray-400">Satisfaction Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatedCounter end={10} suffix="+" />
              <div className="text-gray-400">Certified Specialists</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl mb-3" style={{ color: 'var(--bt-gold)' }}>24/7</div>
              <div className="text-gray-400">Concierge Support</div>
            </motion.div>
          </div>
          
          {/* Dominican Luxury Partners */}
          <motion.div 
            className="mt-20 pt-16 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-center text-gray-400 mb-8">Experience Dominican Excellence</p>
            
            {/* Luxury Souvenir Collection Image */}
            <motion.div 
              className="max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src={souvenirImage} 
                alt="The Beauty Trip Luxury Collection - Curated Dominican souvenirs including Larimar jewelry, premium rum, cigars, and artisan goods" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <p className="text-center text-gray-400 text-sm mt-4 italic">
                Curated luxury souvenirs from our Dominican partners - available for purchase during your stay
              </p>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-12">
              {[
                { name: "JENNY POLANCO", subtitle: "Fashion & Lifestyle" },
                { name: "MÓNICA VARELA", subtitle: "Luxury Experiences" },
                { name: "INDÓMITA", subtitle: "Wellness Resort" },
                { name: "JOARLA", subtitle: "Larimar Jewelry" },
                { name: "HIPÓLITO", subtitle: "Chacabana Tailoring" },
                { name: "BRUGAL 1888", subtitle: "Premium Rum" },
                { name: "ARTURO FUENTE", subtitle: "Premium Cigars" }
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <p className="text-white text-xl tracking-widest" style={{ fontFamily: 'var(--font-serif)' }}>
                    {partner.name}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">{partner.subtitle}</p>
                </motion.div>
              )).reduce((acc, curr, index, array) => {
                if (index === 0) return [curr];
                return [
                  ...acc,
                  <div key={`divider-${index}`} className="w-px h-12 bg-white/20"></div>,
                  curr
                ];
              }, [] as React.ReactNode[])}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🔥 MID-PAGE FOUNDING MEMBER CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bt-gold)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              Don't Miss Your Chance
            </h2>
            <p className="text-xl sm:text-2xl mb-8 text-white/90">
              Only <span className="font-bold">500 Founding Member spots</span> available
            </p>
            
            <motion.button
              onClick={onAccessCollaborationHub}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 rounded-xl text-xl sm:text-2xl font-bold shadow-2xl"
              style={{ backgroundColor: 'white', color: 'var(--bt-gold)' }}
            >
              🔒 Lock In Your Spot & Invest $200
            </motion.button>

            <p className="text-white/80 text-sm mt-6">
              Get $500 Credit + Lifetime Priority Access
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Catalog Modal */}
      <PricingCatalogModal 
        open={showPricingModal}
        onOpenChange={setShowPricingModal}
        onBookNow={handleLockedFeatureClick}
      />

      {/* VIP Upgrade Perks Section */}
      <section className="py-20 sm:py-24 md:py-32 px-6" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: '300', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}>
              Exclusive <span style={{ fontWeight: '600' }}>VIP Perks</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--bt-blush)' }} />
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Elevate your Beauty Trip with complimentary upgrades unlocked through your booking journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Transportation Perk */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative overflow-hidden" style={{ borderRadius: '8px' }}>
                <ImageWithFallback 
                  src="figma:asset/7c2a7746f654a4f0f5a8bfd30e745c29a8ead14d.png"
                  alt="The Beauty Trip Luxury Transportation"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)', borderRadius: '50%' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                    Complimentary Luxury Transportation
                  </h3>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center" style={{ color: 'var(--bt-blush)' }}>
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">
                    <strong style={{ color: 'var(--bt-charcoal)' }}>Unlock when:</strong> You book 2+ procedures totaling $2,000 or more
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center" style={{ color: 'var(--bt-blush)' }}>
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Premium black car service or luxury SUV for all your appointments and activities
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center" style={{ color: 'var(--bt-blush)' }}>
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Includes airport transfers and door-to-door service throughout your stay
                  </p>
                </div>
              </div>
              <div className="px-6 py-4" style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)', borderLeft: '3px solid var(--bt-gold)', borderRadius: '4px' }}>
                <p className="text-sm" style={{ color: 'var(--bt-charcoal)' }}>
                  <strong>Estimated Value:</strong> $800–$1,200 • Automatically applied at checkout
                </p>
              </div>
            </motion.div>
          </div>

          {/* Travel Accessories Perk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)', borderRadius: '50%' }}>
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                    Curated Travel Essentials Kit
                  </h3>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center" style={{ color: 'var(--bt-blush)' }}>
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">
                    <strong style={{ color: 'var(--bt-charcoal)' }}>Unlock when:</strong> You book 3+ recovery activities from our curated menu
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center" style={{ color: 'var(--bt-blush)' }}>
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Luxury branded travel set including premium sleep mask, neck pillow, and travel organizer
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center" style={{ color: 'var(--bt-blush)' }}>
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Thoughtfully curated recovery essentials and beauty accessories in signature blush packaging
                  </p>
                </div>
              </div>
              <div className="px-6 py-4" style={{ backgroundColor: 'rgba(224, 157, 157, 0.1)', borderLeft: '3px solid var(--bt-blush)', borderRadius: '4px' }}>
                <p className="text-sm" style={{ color: 'var(--bt-charcoal)' }}>
                  <strong>Estimated Value:</strong> $350–$500 • Delivered to your accommodation upon arrival
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative overflow-hidden" style={{ borderRadius: '8px' }}>
                <ImageWithFallback 
                  src="figma:asset/7c1ae31e10da3afd4d9f47837afed4e333fa24ee.png"
                  alt="The Beauty Trip Travel Essentials Kit"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Additional Perks Note */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-8 py-4" style={{ backgroundColor: 'white', borderRadius: '50px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <svg className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-gray-600">
                <strong style={{ color: 'var(--bt-charcoal)' }}>VIP perks are tracked automatically</strong> as you build your Beauty Trip and applied at checkout
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before/After Interactive Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ImprovedBeforeAfter />
        </div>
      </section>

      {/* Dynamic Itinerary Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-center mb-8" 
            style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Your Sample Itinerary
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-600 mb-16 max-w-2xl mx-auto" 
            style={{ fontSize: '1.125rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore day-by-day schedules for different retreat types. Each journey is customized to your procedures and recovery timeline.
          </motion.p>
          
          <DynamicItinerary />

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={() => setShowPricingModal(true)}
              className="px-16 py-6 text-white transition-all duration-300 rounded-full shadow-xl"
              style={{ 
                backgroundColor: 'var(--bt-gold)',
                fontSize: '1.25rem',
                fontWeight: '600',
                letterSpacing: '0.05em'
              }}
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 0 40px rgba(184, 152, 91, 0.6)',
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
            >
              BOOK YOUR RETREAT
            </motion.button>
            <p className="mt-4 text-gray-500 text-sm">
              Start planning your transformation journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION II: DYNAMIC EXPERIENCE SHOWCASE */}
      <section className="py-24 px-6" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-6xl mx-auto">
          {/* A. The 10-Day Anchor Experience */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-center mb-4" 
              style={{ 
                fontSize: '2rem', 
                color: 'var(--bt-gold)', 
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our 10-Day Beauty Retreat
            </motion.h2>
            <motion.p 
              className="text-center text-gray-700 mb-8 max-w-3xl mx-auto" 
              style={{ fontSize: '1.125rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The perfect balance of transformation and recovery in tropical paradise
            </motion.p>
            
            {/* Image Reel Slider */}
            <ExperienceImageSlider />
          </motion.div>

          {/* B. Variable Samples Section */}
          <div className="mb-12">
            <motion.h3 
              className="text-center mb-8" 
              style={{ 
                fontSize: '1.75rem', 
                color: 'var(--bt-charcoal)', 
                fontWeight: '600',
                letterSpacing: '-0.01em'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Popular Retreat Packages
            </motion.h3>
            <PackageCarousel onSelectPackage={handleLockedFeatureClick} />
          </div>
        </div>
      </section>

      {/* SECTION III: ANTICIPATION CHECKLIST */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="border-2 p-8" 
            style={{ 
              borderColor: 'var(--bt-gold)',
              backgroundColor: '#fffef8'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 flex items-center gap-3" style={{ 
              fontSize: '1.75rem', 
              color: 'var(--bt-charcoal)', 
              fontWeight: '700',
              letterSpacing: '0.02em'
            }}>
              <span style={{ color: 'var(--bt-gold)' }}>✓</span>
              What Happens Next
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  title: "Personal Concierge Call",
                  desc: "Your dedicated coordinator contacts you within 24 hours to confirm details"
                },
                {
                  title: "Welcome Kit Delivered",
                  desc: "Receive your pre-care guides, healing menus, and travel preparation checklist"
                },
                {
                  title: "Sanctuary Reserved",
                  desc: "We secure your luxury accommodation and coordinate all logistics"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
                    style={{ backgroundColor: 'var(--bt-gold)' }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--bt-charcoal)' }} />
                  </motion.div>
                  <div>
                    <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {item.title}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-24 md:py-32 px-6" style={{ backgroundColor: 'var(--bt-cream)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: '300', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}>
              Why The <span style={{ fontWeight: '600' }}>Beauty Trip</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--bt-gold)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Uncompromising Standards",
                description: "Hand-selected specialists with international certifications and proven track records in aesthetic excellence.",
                icon: "✦"
              },
              {
                title: "Seamless Experience",
                description: "From your first consultation to post-treatment care, every detail is orchestrated for your comfort and confidence.",
                icon: "◆"
              },
              {
                title: "Transparent Pricing",
                description: "Save up to 70% compared to US prices while maintaining the highest standards of care and luxury accommodations.",
                icon: "✧"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="text-5xl mb-4" style={{ color: 'var(--bt-gold)' }}>{item.icon}</div>
                <h3 className="mb-3 text-xl" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Doctors Section */}
      <section id="doctors" className="py-20 sm:py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: '300', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}>
              Meet Your <span style={{ fontWeight: '600' }}>Specialists</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--bt-blush)' }} />
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              World-class expertise meets personalized care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sofia Martinez",
                specialty: "Aesthetic Dentistry",
                credentials: "DMD, Harvard School of Dental Medicine",
                experience: "15+ years of smile makeovers",
                image: "https://images.unsplash.com/photo-1754715203698-70c7ad3a879d?w=400&q=80"
              },
              {
                name: "Dr. Carlos Reyes",
                specialty: "Dermatology & Aesthetics",
                credentials: "Board Certified Dermatologist",
                experience: "20+ years in non-invasive procedures",
                image: "https://images.unsplash.com/photo-1645066928295-2506defde470?w=400&q=80"
              },
              {
                name: "Dr. Isabella Cruz",
                specialty: "Hair Restoration",
                credentials: "ISHRS Certified Surgeon",
                experience: "10,000+ successful transplants",
                image: "https://images.unsplash.com/photo-1678695972687-033fa0bdbac9?w=400&q=80"
              },
              {
                name: "Dr. Miguel Santos",
                specialty: "Cosmetic Surgery",
                credentials: "Board Certified Plastic Surgeon",
                experience: "12+ years in body contouring",
                image: "https://images.unsplash.com/photo-1645066928295-2506defde470?w=400&q=80"
              }
            ].map((doctor, index) => (
              <motion.div
                key={index}
                className="border p-6 hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden"
                style={{ borderColor: 'var(--bt-gold)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                {/* Vetting in Progress Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white shadow-md z-10"
                  style={{ color: 'var(--bt-gold)', border: '1px solid var(--bt-gold)' }}>
                  ✓ Vetting
                </div>

                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 relative" style={{ borderColor: 'var(--bt-gold)' }}>
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20"></div>
                </div>
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-center mb-2 text-xl" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                  {doctor.name}
                </h3>
                <p className="text-center mb-3" style={{ color: 'var(--bt-gold)', fontWeight: '500' }}>
                  {doctor.specialty}
                </p>
                <p className="text-center text-sm text-gray-600 mb-2">
                  {doctor.credentials}
                </p>
                <p className="text-center text-sm text-gray-500">
                  {doctor.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-24 md:py-32 px-6" style={{ backgroundColor: 'var(--bt-cream)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: '300', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}>
              Real <span style={{ fontWeight: '600' }}>Results</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--bt-gold)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "New York, USA",
                procedure: "Dental Veneers",
                quote: "The entire experience exceeded my expectations. From the moment I landed to my final check-up, everything was perfectly coordinated. My smile makeover is beyond what I imagined.",
                rating: 5
              },
              {
                name: "Jennifer L.",
                location: "Los Angeles, USA",
                procedure: "BOTOX & Fillers",
                quote: "I saved thousands compared to LA prices and the quality of care was exceptional. The recovery villa was like a 5-star resort. I'll definitely be returning!",
                rating: 5
              },
              {
                name: "Michael R.",
                location: "Miami, USA",
                procedure: "Hair Transplant",
                quote: "Best decision I've made. Dr. Cruz is a true artist. The confidence I've gained is priceless. The Beauty Trip made the whole process stress-free.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 border-2 hover:shadow-xl transition-all duration-300"
                style={{ borderColor: 'var(--bt-blush)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4" style={{ borderColor: 'var(--bt-blush)' }}>
                  <p className="mb-1" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--bt-gold)' }}>
                    {testimonial.procedure}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="py-20 sm:py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl" style={{ fontWeight: '300', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}>
              Insights & <span style={{ fontWeight: '600' }}>Inspiration</span>
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--bt-blush)' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Ultimate Guide to Dental Tourism in the Dominican Republic",
                category: "Dental Care",
                readTime: "8 min read",
                excerpt: "Everything you need to know about getting world-class dental work in paradise.",
                image: "https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBtb2Rlcm58ZW58MXx8fHwxNzYyNDM5NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "Recovery in Paradise: What to Expect After Your Procedure",
                category: "Recovery Tips",
                readTime: "6 min read",
                excerpt: "A day-by-day guide to your healing journey in luxury accommodations.",
                image: "https://images.unsplash.com/photo-1737037542702-291b215b9895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjByZWNvdmVyeXxlbnwxfHx8fDE3NjI1NDA5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "Why Top Specialists Choose the Dominican Republic",
                category: "Expert Insights",
                readTime: "5 min read",
                excerpt: "The rising hub of medical excellence in the Caribbean.",
                image: "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3BlY2lhbGlzdCUyMGRvY3RvcnxlbnwxfHx8fDE3NjI1NDA5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "Your Beauty Trip Packing Guide: Essentials for Recovery & Radiance",
                category: "Travel Tips",
                readTime: "7 min read",
                excerpt: "Curated must-haves and luxury travel accessories for your aesthetic journey.",
                image: "https://images.unsplash.com/photo-1656411552801-545235c64321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBwYWNraW5nfGVufDF8fHx8MTc2MjU0MTQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "Matching Your Activity Level to Your Procedure: A Recovery Guide",
                category: "Recovery Tips",
                readTime: "9 min read",
                excerpt: "From Sanctuary to Radiance: understanding movement guidelines for every treatment type.",
                image: "https://images.unsplash.com/photo-1603206006222-26ecff6f4f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMGFjdGl2aXR5JTIwbGV2ZWxzfGVufDF8fHx8MTc2MjU0MTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "Luxury Shopping in Santo Domingo: Where Elegance Meets Caribbean Charm",
                category: "Lifestyle",
                readTime: "6 min read",
                excerpt: "Discover high-end boutiques, designer destinations, and unique Dominican treasures.",
                image: "https://images.unsplash.com/photo-1760537766198-947fd4c98b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzaG9wcGluZyUyMGJvdXRpcXVlfGVufDF8fHx8MTc2MjQ2NDc4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              {
                title: "Michelin-Worthy Dining in the DR: Celebrity Chefs & Culinary Excellence",
                category: "Lifestyle",
                readTime: "8 min read",
                excerpt: "From María Marte to Martín Omar, discover the haute cuisine scene transforming Dominican gastronomy.",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjI1MTcyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              }
            ].map((article, index) => (
              <motion.article
                key={index}
                className="border hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                style={{ borderColor: 'var(--bt-gold)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--bt-blush)', color: 'white' }}>
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="mb-3 text-lg leading-tight" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex items-start gap-4 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-6 h-6 flex-shrink-0 text-gray-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-gray-800">Medical Disclaimer:</strong> All procedures listed on The Beauty Trip platform are performed by licensed medical professionals in accredited facilities within the Dominican Republic. Results may vary by individual. This platform provides concierge coordination services and does not directly perform medical procedures. Consultation with qualified healthcare providers is required before booking any treatment.
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg className="w-6 h-6 flex-shrink-0 text-gray-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-gray-800">Pricing Transparency:</strong> All prices shown are estimates in USD and may vary based on individual needs, exchange rates, and specialist availability. Final pricing will be confirmed during your consultation. Package estimates include procedures, accommodation, meals, and concierge services as specified in each package description.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Provider Portal Link */}
      {onAccessProviderPortal && (
        <section className="py-16 px-6" style={{ backgroundColor: 'var(--bt-charcoal)' }}>
          <div className="max-w-7xl mx-auto">
            {/* Decorative Top Border */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px flex-1 max-w-xs" style={{ backgroundColor: 'rgba(184, 152, 91, 0.2)' }} />
              <div className="px-6">
                <svg className="w-6 h-6" style={{ color: 'var(--bt-gold)', opacity: 0.5 }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </div>
              <div className="h-px flex-1 max-w-xs" style={{ backgroundColor: 'rgba(184, 152, 91, 0.2)' }} />
            </div>

            {/* Content */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="mb-3" style={{ color: 'var(--bt-gold)', fontSize: '1.125rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                  FOR WELLNESS PROFESSIONALS
                </h3>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-sm">
                  Are you a wellness provider, tour operator, or recovery partner? Join our trusted network of luxury wellness professionals.
                </p>
                <button
                  onClick={onAccessProviderPortal}
                  className="px-10 py-4 rounded-full border-2 transition-all hover:scale-105 group"
                  style={{ 
                    borderColor: 'var(--bt-gold)', 
                    color: 'var(--bt-gold)',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    PROVIDER PORTAL LOGIN
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Decorative Bottom Border */}
            <div className="flex items-center justify-center mt-12">
              <div className="h-px flex-1" style={{ backgroundColor: 'rgba(184, 152, 91, 0.3)' }} />
            </div>
          </div>
        </section>
      )}

      {/* Footer Ticker */}
      <FooterTicker />

      {/* 🔥 BOTTOM FOUNDING MEMBER CTA - Final Push */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: 'var(--bt-cream)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 border-4" style={{ borderColor: 'var(--bt-gold)' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="mb-6">
                <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
                  style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)', color: 'var(--bt-gold)', border: '2px solid var(--bt-gold)' }}>
                  ⚡ LIMITED TIME OFFER
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--bt-charcoal)' }}>
                Ready to Secure Your Future in Beauty Travel?
              </h2>
              
              <p className="text-xl sm:text-2xl mb-4" style={{ color: 'var(--bt-charcoal)', opacity: 0.8 }}>
                Invest <span className="font-bold" style={{ color: 'var(--bt-gold)' }}>$200</span> today
              </p>
              
              <p className="text-lg sm:text-xl mb-8" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                Receive <span className="font-bold">$500 in travel credit</span> + lifetime founding member benefits
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <SpotCounter totalSpots={500} />
                <div className="hidden sm:block w-px h-24 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--bt-charcoal)' }}>
                    Launch Countdown
                  </div>
                  <CountdownTimer targetDate={launchDate} className="scale-90" />
                </div>
              </div>

              <motion.button
                onClick={onAccessCollaborationHub}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-12 py-6 rounded-xl text-2xl font-bold text-white shadow-2xl"
                style={{ backgroundColor: 'var(--bt-gold)' }}
              >
                🔒 Lock In Your Spot Now
              </motion.button>

              <p className="text-sm mt-6" style={{ color: 'var(--bt-charcoal)', opacity: 0.6 }}>
                ✓ Secure Payment • ✓ Instant Hub Access • ✓ Money-Back Guarantee
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6" style={{ backgroundColor: 'var(--bt-charcoal)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
            {/* Column 1: Logo & Brand (spans 3 cols on lg) */}
            <div className="lg:col-span-3 space-y-6">
              <Logo size="md" className="brightness-0 invert" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Vacation in Paradise, Meet the New You. Luxury wellness experiences in the Dominican Republic.
              </p>
              
              {/* Social Media Links */}
              <div className="flex gap-4 pt-2">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)' }}
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)' }}
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)' }}
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (spans 2 cols on lg) */}
            <div className="lg:col-span-2">
              <h4 className="mb-5" style={{ color: 'var(--bt-gold)', fontWeight: '600', fontSize: '15px', letterSpacing: '0.05em' }}>
                EXPLORE
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#start" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Private Renewal
                  </a>
                </li>
                <li>
                  <a href="#packages" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Tour Trips
                  </a>
                </li>
                <li>
                  <a href="#doctors" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Our Specialists
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Client Stories
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Insights & Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Procedures (spans 2 cols on lg) */}
            <div className="lg:col-span-2">
              <h4 className="mb-5" style={{ color: 'var(--bt-gold)', fontWeight: '600', fontSize: '15px', letterSpacing: '0.05em' }}>
                PROCEDURES
              </h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-400 text-sm">Dental Veneers</span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm">BOTOX & Fillers</span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm">Hair Transplant</span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm">Laser Treatments</span>
                </li>
                <li>
                  <span className="text-gray-400 text-sm">Body Contouring</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact (spans 2 cols on lg) */}
            <div className="lg:col-span-2">
              <h4 className="mb-5" style={{ color: 'var(--bt-gold)', fontWeight: '600', fontSize: '15px', letterSpacing: '0.05em' }}>
                CONTACT
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs mb-1.5 uppercase tracking-wider">Concierge</p>
                  <a 
                    href="mailto:concierge@thebeautytrip.com" 
                    className="text-gray-300 hover:text-[var(--bt-gold)] transition-colors text-sm"
                  >
                    concierge@thebeautytrip.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1.5 uppercase tracking-wider">WhatsApp</p>
                  <a 
                    href="https://wa.me/18095551234" 
                    className="text-gray-300 hover:text-[var(--bt-gold)] transition-colors text-sm"
                  >
                    +1 (809) 555-1234
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1.5 uppercase tracking-wider">Hours</p>
                  <p className="text-gray-400 text-sm">
                    Mon-Fri: 9AM - 7PM EST<br />
                    Sat-Sun: 10AM - 4PM EST
                  </p>
                </div>
              </div>
            </div>

            {/* Column 5: Offices (spans 3 cols on lg) */}
            <div className="lg:col-span-3">
              <h4 className="mb-5" style={{ color: 'var(--bt-gold)', fontWeight: '600', fontSize: '15px', letterSpacing: '0.05em' }}>
                OUR OFFICES
              </h4>
              <div className="space-y-6">
                {/* US Office */}
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <p className="text-white text-sm mb-1" style={{ fontWeight: '500' }}>Miami, USA</p>
                      <address className="not-italic text-gray-400 text-xs leading-relaxed">
                        1200 Brickell Avenue, Suite 1950<br />
                        Miami, FL 33131
                      </address>
                    </div>
                  </div>
                </div>

                {/* DR Office */}
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <p className="text-white text-sm mb-1" style={{ fontWeight: '500' }}>Santo Domingo, DR</p>
                      <address className="not-italic text-gray-400 text-xs leading-relaxed">
                        Torre Corporativa 2, Av. Winston Churchill<br />
                        Piantini, Santo Domingo
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Signifiers - Redesigned */}
          <div className="border-t border-b py-10 mb-10" style={{ borderColor: 'rgba(184, 152, 91, 0.2)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(184, 152, 91, 0.15)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-lg mb-1" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>800+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Happy Clients</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(184, 152, 91, 0.15)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-lg mb-1" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>Licensed</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Medical Professionals</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(184, 152, 91, 0.15)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p className="text-lg mb-1" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>Accredited</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Medical Facilities</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(184, 152, 91, 0.15)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                    </svg>
                  </div>
                </div>
                <p className="text-lg mb-1" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>5-Star</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Luxury Accommodations</p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-2">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} The Beauty Trip. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <a href="#" className="text-gray-500 hover:text-[var(--bt-gold)] transition-colors">Privacy Policy</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="text-gray-500 hover:text-[var(--bt-gold)] transition-colors">Terms of Service</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="text-gray-500 hover:text-[var(--bt-gold)] transition-colors">Medical Disclaimer</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="text-gray-500 hover:text-[var(--bt-gold)] transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
