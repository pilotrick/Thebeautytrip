import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Transformation {
  id: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  title: string;
  procedure: string;
  specialist: string;
  timeline: string;
  savingsPercent: number;
  testimonial: string;
  location: string;
}

const transformations: Transformation[] = [
  {
    id: 'botox-filler-1',
    category: 'Botox & Fillers',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
    afterImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
    title: 'Natural Facial Enhancement',
    procedure: 'Botox & Dermal Fillers',
    specialist: 'Dr. Martinez',
    timeline: '10 days',
    savingsPercent: 65,
    testimonial: 'I look refreshed and natural. No one can tell I had work done, they just say I look amazing!',
    location: 'Santo Domingo'
  },
  {
    id: 'smile-1',
    category: 'Smile Transformation',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
    title: 'Complete Smile Makeover',
    procedure: 'Full Veneers & Whitening',
    specialist: 'Dr. Rodriguez',
    timeline: '10 days',
    savingsPercent: 70,
    testimonial: 'My confidence has completely transformed. I smile freely now and it changed my entire life.',
    location: 'Punta Cana'
  },
  {
    id: 'skin-rejuvenation',
    category: 'Skin Rejuvenation',
    beforeImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
    afterImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
    title: 'Radiant Skin Revival',
    procedure: 'HydraFacial & Chemical Peel',
    specialist: 'Dr. Martinez',
    timeline: '7 days',
    savingsPercent: 60,
    testimonial: 'My skin glows like never before. The combination of treatments and recovery was perfect.',
    location: 'Santo Domingo'
  },
  {
    id: 'combined-treatment',
    category: 'Combined Treatments',
    beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800',
    afterImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800',
    title: 'Full Beauty Retreat',
    procedure: 'Botox, Fillers & Veneers',
    specialist: 'Dr. Martinez & Dr. Rodriguez',
    timeline: '14 days',
    savingsPercent: 68,
    testimonial: 'The comprehensive approach changed everything. I feel like the best version of myself.',
    location: 'Santo Domingo'
  }
];

const ImprovedBeforeAfterComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isInView = useInView(ref, { once: true, margin: '-100px', amount: 0.3 });

  // Keep ref in sync with state
  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const current = transformations[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
    setSliderPosition(50); // Reset slider
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
    setSliderPosition(50); // Reset slider
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  return (
    <div ref={ref} className="w-full">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
          style={{ backgroundColor: 'var(--bt-cream)' }}
        >
          <Sparkles className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} />
          <span className="font-medium" style={{ color: 'var(--bt-charcoal)' }}>
            Real Transformations
          </span>
        </motion.div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl mb-4"
          style={{ fontWeight: '600', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}
        >
          See The Results
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Witness real transformations from our clients who trusted us with their beauty journey
        </p>
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Before/After Slider */}
          <div className="relative">
            <motion.div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 cursor-ew-resize select-none"
              style={{ borderColor: 'var(--bt-gold)' }}
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* After Image (Full) */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={current.afterImage}
                  alt={`${current.title} - After`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-green-500 text-white font-semibold text-sm shadow-lg">
                  After
                </div>
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <ImageWithFallback
                  src={current.beforeImage}
                  alt={`${current.title} - Before`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gray-700 text-white font-semibold text-sm shadow-lg">
                  Before
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%`, boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
              >
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="flex gap-1">
                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                    <ChevronRight className="w-4 h-4 text-gray-700" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -left-4 -right-4 sm:-left-6 sm:-right-6 flex justify-between items-center pointer-events-none z-20">
              <motion.button
                onClick={handlePrev}
                className="pointer-events-auto p-3 rounded-full shadow-2xl"
                style={{ backgroundColor: 'var(--bt-gold)' }}
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" style={{ color: 'white' }} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="pointer-events-auto p-3 rounded-full shadow-2xl"
                style={{ backgroundColor: 'var(--bt-gold)' }}
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" style={{ color: 'white' }} />
              </motion.button>
            </div>

            {/* Drag Instruction */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 text-white text-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              ← Drag to compare →
            </motion.div>
          </div>

          {/* Details Panel */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'var(--bt-cream)', color: 'var(--bt-charcoal)' }}
              >
                {current.category}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontWeight: '600', letterSpacing: '-0.02em', color: 'var(--bt-charcoal)' }}
            >
              {current.title}
            </h3>

            {/* Procedure Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--bt-gold)' }} />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Procedure</div>
                  <div className="font-medium text-gray-900">{current.procedure}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--bt-gold)' }} />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Specialist</div>
                  <div className="font-medium text-gray-900">{current.specialist}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--bt-gold)' }} />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Timeline</div>
                  <div className="font-medium text-gray-900">{current.timeline}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--bt-gold)' }} />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="font-medium text-gray-900">{current.location}</div>
                </div>
              </div>
            </div>

            {/* Savings Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2"
              style={{ borderColor: 'var(--bt-gold)', backgroundColor: 'var(--bt-cream)' }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} />
              <span className="font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                {current.savingsPercent}% Savings vs US Prices
              </span>
            </motion.div>

            {/* Testimonial */}
            <div
              className="p-6 rounded-xl italic border-l-4"
              style={{ backgroundColor: '#fafafa', borderColor: 'var(--bt-blush)' }}
            >
              <p className="text-gray-700 leading-relaxed">"{current.testimonial}"</p>
            </div>
          </motion.div>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {transformations.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setSliderPosition(50);
              }}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: currentIndex === index ? '32px' : '8px',
                backgroundColor: currentIndex === index ? 'var(--bt-gold)' : '#d1d5db'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const ImprovedBeforeAfter = ImprovedBeforeAfterComponent;
