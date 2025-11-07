import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Logo } from './Logo';
import { Calendar, MapPin, Users, Sparkles, Heart, Leaf, Mountain, Circle, Music, Flower2, Sun, ArrowRight, Gift, Star, Play, ChevronLeft, ChevronRight, Wind, Waves, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TourTrip {
  id: string;
  name: string;
  tagline: string;
  approach: string;
  location: string;
  country: string;
  dates: string;
  duration: string;
  maxCapacity: number;
  spotsRemaining: number;
  price: number;
  includes: string[];
  transformationalFocus: string[];
  instructor: string;
  instructorBio: string;
  procedureTiming: 'before' | 'after' | 'flexible';
  procedureTimingDescription: string;
  icon: any;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

const tourTrips: TourTrip[] = [
  {
    id: 'spiritual-punta-cana',
    name: 'Sacred Renewal',
    tagline: 'Faith-Based Transformation on Pristine Beaches',
    approach: 'Christian Spiritual',
    location: 'Punta Cana',
    country: 'Dominican Republic',
    dates: 'February 14-19, 2026',
    duration: '5 days',
    maxCapacity: 20,
    spotsRemaining: 4,
    price: 3200,
    includes: ['Daily prayer & worship', 'Biblical meditation', 'Beach healing walks', 'Community building'],
    transformationalFocus: ['Spiritual renewal', 'Faith deepening', 'Inner peace', 'Divine purpose'],
    instructor: 'Pastor Sarah Mitchell',
    instructorBio: 'Faith leader and spiritual wellness guide with 15 years experience',
    procedureTiming: 'before',
    procedureTimingDescription: 'Complete this 5-day spiritual retreat first to set intentions, deepen your faith, and prepare your heart and mind for your outer transformation.',
    icon: Heart,
    color: '#9333ea',
    gradientFrom: '#9333ea',
    gradientTo: '#c084fc'
  },
  {
    id: 'holistic-samana',
    name: 'Samaná Mind-Body-Spirit',
    tagline: 'Complete Integration in Caribbean Paradise',
    approach: 'Holistic Wellness',
    location: 'Samaná Peninsula',
    country: 'Dominican Republic',
    dates: 'March 5-11, 2026',
    duration: '6 days',
    maxCapacity: 25,
    spotsRemaining: 3,
    price: 3400,
    includes: ['Caribbean healing ceremonies', 'Sound bath therapy', 'Chakra balancing', 'Organic nutrition'],
    transformationalFocus: ['Energy alignment', 'Emotional release', 'Holistic health', 'Life balance'],
    instructor: 'Dr. Isabella Santos',
    instructorBio: 'Traditional healer and holistic medicine practitioner',
    procedureTiming: 'before',
    procedureTimingDescription: 'Align your mind, body, and spirit before your procedures. This 6-day retreat prepares your entire being for transformation.',
    icon: Sparkles,
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#fbbf24'
  },
  {
    id: 'ayurvedic-las-terrenas',
    name: 'Ancient Ayurvedic Wisdom',
    tagline: 'Five-Thousand Years of Healing by the Sea',
    approach: 'Ayurvedic',
    location: 'Las Terrenas',
    country: 'Dominican Republic',
    dates: 'April 10-22, 2026',
    duration: '12 days',
    maxCapacity: 12,
    spotsRemaining: 5,
    price: 6200,
    includes: ['Personalized dosha assessment', 'Gentle Ayurvedic therapies', 'Healing nutrition', 'Herbal medicine'],
    transformationalFocus: ['Body purification', 'Digestive health', 'Constitutional balance', 'Vitality'],
    instructor: 'Dr. Priya Sharma',
    instructorBio: 'Certified Ayurvedic physician with lineage training',
    procedureTiming: 'after',
    procedureTimingDescription: 'Perfect for post-procedure recovery. 12 days of gentle Ayurvedic healing practices and restorative therapies support your body\'s natural healing.',
    icon: Leaf,
    color: '#059669',
    gradientFrom: '#059669',
    gradientTo: '#10b981'
  },
  {
    id: 'permaculture-cabarete',
    name: 'Earth Connection Immersion',
    tagline: 'Regenerate Yourself in Coastal Paradise',
    approach: 'Permacultural & Ecological',
    location: 'Cabarete',
    country: 'Dominican Republic',
    dates: 'May 8-16, 2026',
    duration: '8 days',
    maxCapacity: 18,
    spotsRemaining: 11,
    price: 3800,
    includes: ['Gentle nature walks', 'Ocean therapy', 'Plant-based nutrition', 'Beach relaxation'],
    transformationalFocus: ['Environmental connection', 'Sustainable living', 'Purpose alignment', 'Earthing practices'],
    instructor: 'Marco Ramirez',
    instructorBio: 'Permaculture designer and ecological regeneration specialist',
    procedureTiming: 'after',
    procedureTimingDescription: 'Gentle nature connection and ocean therapy during recovery. 8 days of low-impact activities perfect for healing while connecting to earth.',
    icon: Leaf,
    color: '#16a34a',
    gradientFrom: '#16a34a',
    gradientTo: '#22c55e'
  },
  {
    id: 'adventure-jarabacoa',
    name: 'Active Transformation Quest',
    tagline: 'Push Limits in the Caribbean Alps',
    approach: 'Adventure & Movement',
    location: 'Jarabacoa Mountains',
    country: 'Dominican Republic',
    dates: 'June 15-22, 2026',
    duration: '7 days',
    maxCapacity: 16,
    spotsRemaining: 14,
    price: 3600,
    includes: ['Mountain hiking', 'Light trekking', 'Waterfall visits', 'Breathwork sessions'],
    transformationalFocus: ['Physical resilience', 'Mental fortitude', 'Fear release', 'Empowerment'],
    instructor: 'Carlos Dominguez',
    instructorBio: 'Adventure guide and transformational coach',
    procedureTiming: 'flexible',
    procedureTimingDescription: 'Before: 7 days to build strength and confidence. After: Celebrate your transformation (requires 3-4 weeks post-procedure for active adventures).',
    icon: Mountain,
    color: '#0284c7',
    gradientFrom: '#0284c7',
    gradientTo: '#0ea5e9'
  },
  {
    id: 'meditative-bayahibe',
    name: 'Zen Silent Awakening',
    tagline: 'Ancient Meditation on Tranquil Shores',
    approach: 'Meditative & Contemplative',
    location: 'Bayahibe',
    country: 'Dominican Republic',
    dates: 'September 5-11, 2026',
    duration: '6 days',
    maxCapacity: 10,
    spotsRemaining: 10,
    price: 4200,
    includes: ['Zen meditation (Zazen)', 'Beach contemplation', 'Mindful walking', 'Silent retreats'],
    transformationalFocus: ['Mental clarity', 'Presence mastery', 'Stress release', 'Inner silence'],
    instructor: 'Master Chen Rodriguez',
    instructorBio: 'Zen meditation teacher with 30 years of practice',
    procedureTiming: 'before',
    procedureTimingDescription: 'Find clarity and peace before your procedures. This 6-day silent retreat helps you connect with your deepest intentions.',
    icon: Circle,
    color: '#7c3aed',
    gradientFrom: '#7c3aed',
    gradientTo: '#a78bfa'
  },
  {
    id: 'kundalini-puerto-plata',
    name: 'Kundalini Energy Awakening',
    tagline: 'Activate Your Inner Power',
    approach: 'Kundalini & Energy Work',
    location: 'Puerto Plata',
    country: 'Dominican Republic',
    dates: 'October 12-21, 2026',
    duration: '9 days',
    maxCapacity: 30,
    spotsRemaining: 0,
    price: 2900,
    includes: ['Gentle kundalini yoga', 'Breathwork (Pranayama)', 'Gong baths', 'Ocean ceremonies'],
    transformationalFocus: ['Energy activation', 'Consciousness expansion', 'Chakra opening', 'Spiritual awakening'],
    instructor: 'Sat Nam Kaur',
    instructorBio: 'Kundalini yoga master teacher and energy healer',
    procedureTiming: 'after',
    procedureTimingDescription: 'Energy work supports healing. 9 days of gentle kundalini practices help integrate your outer and inner transformation during recovery.',
    icon: Sun,
    color: '#ea580c',
    gradientFrom: '#ea580c',
    gradientTo: '#fb923c'
  },
  {
    id: 'sound-santo-domingo',
    name: 'Vibrational Medicine Journey',
    tagline: 'Heal Through Sacred Sound & Frequency',
    approach: 'Sound Healing & Vibrational',
    location: 'Santo Domingo',
    country: 'Dominican Republic',
    dates: 'November 3-12, 2026',
    duration: '9 days',
    maxCapacity: 22,
    spotsRemaining: 22,
    price: 3600,
    includes: ['Crystal bowl ceremonies', 'Gong meditation', 'Voice activation', 'Frequency therapy'],
    transformationalFocus: ['Cellular healing', 'Emotional release', 'Vibrational alignment', 'Heart opening'],
    instructor: 'Luna Rose',
    instructorBio: 'Sound healer and vibrational medicine practitioner',
    procedureTiming: 'after',
    procedureTimingDescription: 'Sound healing accelerates recovery. 9 days of vibrational frequencies support cellular healing and emotional integration post-procedure.',
    icon: Music,
    color: '#db2777',
    gradientFrom: '#db2777',
    gradientTo: '#f472b6'
  },
  {
    id: 'shamanic-constanza',
    name: 'Mountain Sacred Wisdom',
    tagline: 'Ancient Practices in Highland Sanctuary',
    approach: 'Shamanic & Indigenous',
    location: 'Constanza Mountains',
    country: 'Dominican Republic',
    dates: 'January 15-21, 2026',
    duration: '6 days',
    maxCapacity: 15,
    spotsRemaining: 6,
    price: 3900,
    includes: ['Sacred ceremonies', 'Cacao rituals', 'Nature offerings', 'Traditional teachings'],
    transformationalFocus: ['Ancestral connection', 'Soul retrieval', 'Life purpose', 'Earth wisdom'],
    instructor: 'Don Alberto Reyes',
    instructorBio: 'Traditional shaman and keeper of indigenous wisdom',
    procedureTiming: 'before',
    procedureTimingDescription: 'Soul work comes first. 6 days to connect with your purpose and ancestors before embarking on your outer transformation journey.',
    icon: Mountain,
    color: '#7c2d12',
    gradientFrom: '#7c2d12',
    gradientTo: '#b45309'
  },
  {
    id: 'goddess-las-galeras',
    name: 'Divine Feminine Rising',
    tagline: 'Reclaim Your Goddess Power by the Sea',
    approach: 'Feminine Energy & Empowerment',
    location: 'Las Galeras',
    country: 'Dominican Republic',
    dates: 'July 8-15, 2026',
    duration: '7 days',
    maxCapacity: 20,
    spotsRemaining: 18,
    price: 3700,
    includes: ['Goddess circle rituals', 'Womb healing', 'Dance & movement', 'Sacred sisterhood'],
    transformationalFocus: ['Feminine power', 'Self-love', 'Sensuality', 'Creative expression'],
    instructor: 'Mariela Fernández',
    instructorBio: 'Feminine embodiment coach and priestess',
    procedureTiming: 'before',
    procedureTimingDescription: 'Build self-love and confidence first. This 7-day retreat helps you embrace your beauty and power before any external changes.',
    icon: Flower2,
    color: '#be185d',
    gradientFrom: '#be185d',
    gradientTo: '#ec4899'
  }
];

interface TourTripsProps {
  onBackHome: () => void;
  onBookTour: (tour: { id: string; name: string; price: number; duration: string; dates: string; location: string; approach: string; includedItems: string[] }) => void;
}

export function TourTrips({ onBackHome, onBookTour }: TourTripsProps) {
  const [selectedTour, setSelectedTour] = useState<TourTrip | null>(null);

  if (selectedTour) {
    return <TourTripDetails tour={selectedTour} onBack={() => setSelectedTour(null)} onBackHome={onBackHome} onBookTour={onBookTour} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bt-off-white)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          <button
            onClick={onBackHome}
            className="px-6 py-2 border-2 rounded-full transition-all hover:scale-105"
            style={{ borderColor: 'var(--bt-charcoal)', color: 'var(--bt-charcoal)' }}
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fff7ed 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6" style={{ backgroundColor: 'var(--bt-gold)', color: 'white' }}>
            <Star className="w-4 h-4" />
            <span style={{ fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.05em' }}>
              NEW: TOUR TRIPS
            </span>
          </div>

          <h1 className="mb-6" style={{ fontSize: '4rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Meet New Friends.<br />Experience Transformation.
          </h1>

          <p className="mb-8 max-w-3xl mx-auto" style={{ fontSize: '1.5rem', color: '#6b7280', lineHeight: '1.6' }}>
            Curated group journeys that combine your outer renewal with profound inner transformation. 
            Pre-scheduled dates, incredible locations, transformational experiences.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl border-2" style={{ borderColor: 'var(--bt-blush)' }}>
              <Users className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--bt-blush)' }} />
              <h3 className="mb-2" style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Meet Your Tribe
              </h3>
              <p className="text-sm text-gray-600">
                Connect with like-minded souls on the same transformational journey
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border-2" style={{ borderColor: 'var(--bt-gold)' }}>
              <Gift className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--bt-gold)' }} />
              <h3 className="mb-2" style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Exclusive Perks
              </h3>
              <p className="text-sm text-gray-600">
                Curated gift baskets, wellness gear, and VIP experiences
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border-2" style={{ borderColor: 'var(--bt-charcoal)' }}>
              <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--bt-charcoal)' }} />
              <h3 className="mb-2" style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Inner & Outer Beauty
              </h3>
              <p className="text-sm text-gray-600">
                Confidence, self-esteem, and holistic health transformation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-4" style={{ fontSize: '3rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
            Choose Your Journey
          </h2>
          <p className="text-center mb-12 text-gray-600" style={{ fontSize: '1.125rem' }}>
            Each tour offers a unique approach to transformation
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {tourTrips.map((tour) => {
              const Icon = tour.icon;
              return (
                <div
                  key={tour.id}
                  className="group bg-white rounded-2xl overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  style={{ borderColor: '#e5e7eb' }}
                  onClick={() => setSelectedTour(tour)}
                >
                  {/* Header with Gradient */}
                  <div
                    className="p-8 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${tour.gradientFrom} 0%, ${tour.gradientTo} 100%)` }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-12 h-12 text-white" />
                        <span className="px-4 py-1 rounded-full text-xs bg-white/20 text-white backdrop-blur-sm" style={{ fontWeight: '600' }}>
                          {tour.approach}
                        </span>
                      </div>
                      <h3 className="mb-2 text-white" style={{ fontSize: '2rem', fontWeight: '600' }}>
                        {tour.name}
                      </h3>
                      <p className="text-white/90" style={{ fontSize: '1.125rem' }}>
                        {tour.tagline}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                  </div>

                  {/* Details */}
                  <div className="p-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" style={{ color: tour.color }} />
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <p className="text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                            {tour.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: tour.color }} />
                        <div>
                          <p className="text-xs text-gray-500">Dates</p>
                          <p className="text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                            {tour.dates}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" style={{ color: tour.color }} />
                        <div>
                          <p className="text-xs text-gray-500">Availability</p>
                          <p className="text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                            {tour.spotsRemaining === 0 ? 'SOLD OUT' : `${tour.spotsRemaining} spots left`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" style={{ color: tour.color }} />
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                            {tour.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Procedure Timing Badge */}
                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: tour.procedureTiming === 'before' ? '#fdf4ff' : tour.procedureTiming === 'after' ? '#f0fdf4' : '#fef3c7', border: `2px solid ${tour.color}30` }}>
                      <p className="text-xs mb-1" style={{ color: tour.color, fontWeight: '700', letterSpacing: '0.05em' }}>
                        {tour.procedureTiming === 'before' && '⟡ DO THIS FIRST'}
                        {tour.procedureTiming === 'after' && '⟡ HEALING RETREAT'}
                        {tour.procedureTiming === 'flexible' && '⟡ FLEXIBLE TIMING'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {tour.procedureTiming === 'before' && 'Complete before procedures'}
                        {tour.procedureTiming === 'after' && 'Perfect for recovery'}
                        {tour.procedureTiming === 'flexible' && 'Before or after (4+ weeks)'}
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-xs text-gray-500 mb-2">Transformational Focus</p>
                      <div className="flex flex-wrap gap-2">
                        {tour.transformationalFocus.slice(0, 3).map((focus, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{ backgroundColor: `${tour.color}20`, color: tour.color, fontWeight: '600' }}
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Availability Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs" style={{ color: tour.color, fontWeight: '600' }}>
                          {tour.spotsRemaining === 0 ? '✦ FULLY BOOKED' : `${tour.maxCapacity - tour.spotsRemaining} / ${tour.maxCapacity} spots filled`}
                        </p>
                        {tour.spotsRemaining > 0 && tour.spotsRemaining <= 5 && (
                          <span className="text-xs px-2 py-1 rounded-full animate-pulse" style={{ backgroundColor: '#ef444420', color: '#ef4444', fontWeight: '600' }}>
                            Almost Full!
                          </span>
                        )}
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-500"
                          style={{ 
                            width: `${((tour.maxCapacity - tour.spotsRemaining) / tour.maxCapacity) * 100}%`,
                            backgroundColor: tour.spotsRemaining === 0 ? '#ef4444' : tour.color
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">From</p>
                        <p style={{ fontSize: '1.75rem', color: tour.color, fontWeight: '600' }}>
                          ${tour.price.toLocaleString()}
                        </p>
                        {tour.maxCapacity > 20 && <p className="text-xs text-green-600" style={{ fontWeight: '600' }}>Best value!</p>}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTour(tour);
                        }}
                        disabled={tour.spotsRemaining === 0}
                        className="px-6 py-3 rounded-full flex items-center gap-2 transition-all group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: tour.spotsRemaining === 0 ? '#9ca3af' : tour.color, color: 'white', fontWeight: '600' }}
                      >
                        {tour.spotsRemaining === 0 ? 'Sold Out' : 'Explore Sanctuary'}
                        {tour.spotsRemaining > 0 && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function TourTripDetails({ tour, onBack, onBackHome, onBookTour }: { 
  tour: TourTrip; 
  onBack: () => void; 
  onBackHome: () => void;
  onBookTour: (tour: { id: string; name: string; price: number; duration: string; dates: string; location: string; approach: string; includedItems: string[] }) => void;
}) {
  const Icon = tour.icon;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bt-off-white)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="px-6 py-2 border-2 rounded-full transition-all hover:scale-105"
              style={{ borderColor: 'var(--bt-charcoal)', color: 'var(--bt-charcoal)' }}
            >
              Back to Tours
            </button>
            <button
              onClick={onBackHome}
              className="px-6 py-2 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--bt-gold)', color: 'white' }}
            >
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${tour.gradientFrom} 0%, ${tour.gradientTo} 100%)` }}
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Icon className="w-16 h-16 text-white" />
            <span className="px-4 py-2 rounded-full text-sm bg-white/20 text-white backdrop-blur-sm" style={{ fontWeight: '600' }}>
              {tour.approach}
            </span>
          </div>
          <h1 className="mb-4 text-white" style={{ fontSize: '4rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            {tour.name}
          </h1>
          <p className="mb-8 text-white/90" style={{ fontSize: '1.75rem' }}>
            {tour.tagline}
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <MapPin className="w-6 h-6 text-white mb-2" />
              <p className="text-xs text-white/70 mb-1">Location</p>
              <p className="text-white" style={{ fontWeight: '600' }}>{tour.location}</p>
              <p className="text-sm text-white/80">{tour.country}</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <Calendar className="w-6 h-6 text-white mb-2" />
              <p className="text-xs text-white/70 mb-1">Dates</p>
              <p className="text-white" style={{ fontWeight: '600' }}>{tour.dates}</p>
              <p className="text-sm text-white/80">{tour.duration}</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <Users className="w-6 h-6 text-white mb-2" />
              <p className="text-xs text-white/70 mb-1">Availability</p>
              <p className="text-white" style={{ fontWeight: '600' }}>
                {tour.spotsRemaining === 0 ? 'SOLD OUT' : `${tour.spotsRemaining} of ${tour.maxCapacity}`}
              </p>
              <p className="text-sm text-white/80">
                {tour.spotsRemaining === 0 ? 'Fully booked' : 'spots remaining'}
              </p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <Sparkles className="w-6 h-6 text-white mb-2" />
              <p className="text-xs text-white/70 mb-1">Investment</p>
              <p className="text-white" style={{ fontSize: '1.5rem', fontWeight: '600' }}>${tour.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32" />
      </section>

      {/* Procedure Timing Banner */}
      <section className="py-12 px-6" style={{ backgroundColor: tour.procedureTiming === 'before' ? '#fdf4ff' : tour.procedureTiming === 'after' ? '#f0fdf4' : '#fef3c7' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              {tour.procedureTiming === 'before' && (
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: tour.color }}>
                  <span className="text-white" style={{ fontSize: '1.5rem', fontWeight: '700' }}>1</span>
                </div>
              )}
              {tour.procedureTiming === 'after' && (
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: tour.color }}>
                  <span className="text-white" style={{ fontSize: '1.5rem', fontWeight: '700' }}>2</span>
                </div>
              )}
              {tour.procedureTiming === 'flexible' && (
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: tour.color }}>
                  <span className="text-white" style={{ fontSize: '1.5rem', fontWeight: '700' }}>±</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="mb-3" style={{ fontSize: '1.75rem', color: tour.color, fontWeight: '600' }}>
                {tour.procedureTiming === 'before' && '✦ Experience This Retreat Before Your Procedures'}
                {tour.procedureTiming === 'after' && '✦ Perfect for Post-Procedure Recovery'}
                {tour.procedureTiming === 'flexible' && '✦ Flexible Timing - Before or After'}
              </h3>
              <p className="text-gray-700" style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
                {tour.procedureTimingDescription}
              </p>
              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'white', border: `2px solid ${tour.color}30` }}>
                <p className="text-sm text-gray-600">
                  <span style={{ fontWeight: '600', color: tour.color }}>Recommended Order:</span>{' '}
                  {tour.procedureTiming === 'before' && 'Tour Trip → Beauty Procedures → Recovery Activities'}
                  {tour.procedureTiming === 'after' && 'Beauty Procedures → Gentle Recovery → Tour Trip (Healing Focus)'}
                  {tour.procedureTiming === 'flexible' && 'Book this trip before for preparation OR 4+ weeks after for celebration'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SANCTUARY SHOWCASE - Immersive Experience */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #fdf4ff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${tour.color} 0%, ${tour.gradientTo} 100%)`,
                boxShadow: `0 10px 30px ${tour.color}50`
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold tracking-wide">
                YOUR TRANSFORMATION SANCTUARY
              </span>
            </motion.div>

            <h2 className="mb-6" style={{ 
              fontSize: '3.5rem', 
              fontWeight: '700',
              background: `linear-gradient(135deg, ${tour.color} 0%, ${tour.gradientTo} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}>
              Discover Where You'll Transform
            </h2>

            <p className="max-w-3xl mx-auto text-gray-700" style={{ 
              fontSize: '1.25rem', 
              lineHeight: '1.7'
            }}>
              Experience transformational wellness in an exclusive retreat sanctuary designed for spiritual healing, 
              community bonding, and profound personal renewal.
            </p>
          </div>

          {/* Video Placeholder */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SanctuaryVideoShowcase color={tour.color} />
          </motion.div>

          {/* Image Gallery */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-center mb-8" style={{ 
              fontSize: '2rem', 
              fontWeight: '600',
              color: tour.color
            }}>
              Experience Your Sanctuary Spaces
            </h3>
            <SanctuaryGallery color={tour.color} />
          </motion.div>

          {/* Wellness Features Grid */}
          <div className="mb-16">
            <h3 className="text-center mb-10" style={{ 
              fontSize: '2.25rem', 
              fontWeight: '700',
              color: tour.color
            }}>
              The Wellness Retreat Experience
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SanctuaryFeatureCard
                icon={Heart}
                title="Holistic Healing"
                description="Integrative wellness programs combining aesthetic treatments with spiritual healing practices and mindfulness meditation."
                color={tour.color}
                delay={0}
              />
              <SanctuaryFeatureCard
                icon={Users}
                title="Sacred Community"
                description="Join a transformational sisterhood circle. Connect deeply with like-minded souls on parallel healing journeys."
                color={tour.color}
                delay={0.1}
              />
              <SanctuaryFeatureCard
                icon={Leaf}
                title="Natural Rejuvenation"
                description="Organic spa therapies, botanical healing gardens, and farm-to-table nutrition amplify your transformation."
                color={tour.color}
                delay={0.2}
              />
              <SanctuaryFeatureCard
                icon={Sparkles}
                title="Luxury Sanctuary"
                description="5-star accommodations: private meditation spaces, therapeutic pools, ocean-view recovery suites."
                color={tour.color}
                delay={0.3}
              />
            </div>
          </div>

          {/* All-Inclusive Amenities */}
          <motion.div 
            className="mb-16 p-10 rounded-lg"
            style={{ backgroundColor: tour.color }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-center mb-10 text-white" style={{ 
              fontSize: '2.25rem', 
              fontWeight: '700'
            }}>
              Your All-Inclusive Healing Environment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Sun, text: "Daily guided meditation & sunrise yoga sessions" },
                { icon: Heart, text: "Community healing circles & transformation workshops" },
                { icon: Leaf, text: "Organic wellness cuisine & healing nutrition plans" },
                { icon: Waves, text: "Hydrotherapy pools & oceanfront relaxation zones" },
                { icon: Wind, text: "Sound healing therapy & breathwork sessions" },
                { icon: Mountain, text: "Nature immersion excursions & spiritual site visits" },
                { icon: Users, text: "Sisterhood bonding activities & group experiences" },
                { icon: Sparkles, text: "Luxury spa treatments & therapeutic massages" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    x: 10
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white" style={{ fontSize: '1.05rem' }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MEET YOUR INSTRUCTOR & TEAM */}
      <section className="py-20 px-6" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4" style={{ 
              fontSize: '2.75rem', 
              fontWeight: '700',
              color: tour.color
            }}>
              Meet Your Wellness Guide & Support Team
            </h2>
            <p className="max-w-3xl mx-auto text-gray-700" style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
              Your transformation journey is led by certified experts dedicated to your healing, growth, and complete wellbeing
            </p>
          </div>

          {/* Instructor Video Introduction */}
          <div className="mb-16">
            <InstructorVideoIntro 
              instructorName={tour.instructor}
              color={tour.color}
            />
          </div>

          {/* Instructor Bio Card */}
          <div className="mb-16 p-8 bg-white rounded-2xl border-2" style={{ borderColor: tour.color }}>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                    alt={`${tour.instructor} - Lead Wellness Instructor and Transformation Guide`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-semibold">{tour.instructor}</p>
                    <p className="text-white/80 text-sm">Lead Instructor</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="mb-4" style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '600',
                  color: tour.color
                }}>
                  Your Journey Guide
                </h3>
                <p className="text-gray-700 mb-6" style={{ lineHeight: '1.8' }}>
                  {tour.instructorBio}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${tour.color}10` }}>
                    <p className="font-semibold mb-1" style={{ color: tour.color, fontSize: '1.5rem' }}>15+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${tour.color}10` }}>
                    <p className="font-semibold mb-1" style={{ color: tour.color, fontSize: '1.5rem' }}>500+</p>
                    <p className="text-sm text-gray-600">Retreats Led</p>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: `${tour.color}10` }}>
                    <p className="font-semibold mb-1" style={{ color: tour.color, fontSize: '1.5rem' }}>4.9★</p>
                    <p className="text-sm text-gray-600">Guest Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Team Gallery */}
          <div>
            <h3 className="text-center mb-8" style={{ 
              fontSize: '2rem', 
              fontWeight: '600',
              color: tour.color
            }}>
              Your Dedicated Support Team
            </h3>
            <TeamGallery color={tour.color} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="mb-6" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                What's Included
              </h2>
              <div className="space-y-3 mb-12">
                {tour.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: `${tour.color}20` }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tour.color }} />
                    </div>
                    <p style={{ color: 'var(--bt-charcoal)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 className="mb-6" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Transformational Focus
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-12">
                {tour.transformationalFocus.map((focus, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: `${tour.color}10`, border: `2px solid ${tour.color}30` }}
                  >
                    <p style={{ color: tour.color, fontWeight: '600' }}>{focus}</p>
                  </div>
                ))}
              </div>

              {/* Exclusive Perks */}
              <div className="p-8 rounded-xl" style={{ backgroundColor: 'var(--bt-blush)', color: 'white' }}>
                <Gift className="w-10 h-10 mb-4" />
                <h3 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                  Exclusive Tour Perks
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Curated welcome gift basket
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Premium wellness gear
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Exclusive group experiences
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Lifetime alumni community access
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-12 rounded-2xl text-center" style={{ background: tour.spotsRemaining === 0 ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' : `linear-gradient(135deg, ${tour.gradientFrom} 0%, ${tour.gradientTo} 100%)` }}>
            {tour.spotsRemaining === 0 ? (
              <>
                <div className="mb-6 inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <p className="text-white" style={{ fontSize: '1.125rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                    ✦ FULLY BOOKED ✦
                  </p>
                </div>
                <h3 className="mb-4 text-white" style={{ fontSize: '2.5rem', fontWeight: '600' }}>
                  This Retreat is Sold Out
                </h3>
                <p className="mb-8 text-white/90" style={{ fontSize: '1.25rem' }}>
                  Join the waitlist to be notified when new dates are released.
                </p>
                <button
                  className="px-12 py-5 rounded-full transition-all hover:scale-105"
                  style={{ backgroundColor: 'white', color: '#6b7280', fontSize: '1.25rem', fontWeight: '600' }}
                >
                  Join Waitlist
                </button>
              </>
            ) : (
              <>
                {tour.spotsRemaining <= 5 && (
                  <div className="mb-6 inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full animate-pulse">
                    <p className="text-white" style={{ fontSize: '1.125rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                      ⚡ ONLY {tour.spotsRemaining} SPOTS LEFT ⚡
                    </p>
                  </div>
                )}
                <h3 className="mb-4 text-white" style={{ fontSize: '2.5rem', fontWeight: '600' }}>
                  Ready to Transform?
                </h3>
                <p className="mb-4 text-white/90" style={{ fontSize: '1.25rem' }}>
                  Secure your spot on this life-changing journey
                </p>
                <p className="mb-8 text-white/80" style={{ fontSize: '1rem' }}>
                  {tour.maxCapacity - tour.spotsRemaining} travelers have already joined • {tour.spotsRemaining} spots remaining
                </p>
                <button
                  onClick={() => onBookTour({
                    id: tour.id,
                    name: tour.name,
                    price: tour.price,
                    duration: tour.duration,
                    dates: tour.dates,
                    location: tour.location,
                    approach: tour.approach,
                    includedItems: tour.includes
                  })}
                  className="px-12 py-5 rounded-full transition-all hover:scale-105"
                  style={{ backgroundColor: 'white', color: tour.color, fontSize: '1.25rem', fontWeight: '600' }}
                >
                  Reserve Your Spot - ${tour.price.toLocaleString()}
                </button>
                <p className="mt-4 text-sm text-white/70">
                  Procedures booked separately • Flight confirmation required
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Video Placeholder Component
function SanctuaryVideoShowcase({ color }: { color: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-video rounded-lg overflow-hidden group cursor-pointer border-4"
      style={{ borderColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80"
        alt="Luxury wellness retreat villa with infinity pool overlooking ocean at sunset"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.9)' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: `${color}DD`,
          border: '2px solid white'
        }}
      >
        <span className="text-white font-semibold tracking-wider text-sm">
          ✦ IMMERSIVE 360° TOUR
        </span>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            border: '3px solid white'
          }}
          animate={{
            scale: isHovered ? 1.15 : 1,
            boxShadow: isHovered 
              ? '0 0 50px rgba(255, 255, 255, 0.9)' 
              : '0 0 30px rgba(255, 255, 255, 0.5)'
          }}
          transition={{ duration: 0.3 }}
        >
          <Play className="w-10 h-10 text-white ml-1" fill="white" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <motion.h3 
          className="text-white mb-2"
          style={{ fontSize: '1.75rem', fontWeight: '600' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Your Sacred Healing Space Awaits
        </motion.h3>
        <motion.p 
          className="text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Discover where transformation, community, and Caribbean serenity converge
        </motion.p>
      </div>
    </div>
  );
}

// Image Gallery Carousel
function SanctuaryGallery({ color }: { color: string }) {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      caption: "Oceanfront Meditation Deck",
      keywords: "mindfulness space, ocean views, spiritual connection"
    },
    {
      url: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
      caption: "Wellness Community Lounge",
      keywords: "social connection, shared healing journey, sisterhood circle"
    },
    {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      caption: "Private Recovery Suites",
      keywords: "luxury accommodation, healing sanctuary, personal retreat"
    },
    {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      caption: "Therapeutic Pool Gardens",
      keywords: "hydrotherapy, water healing, tropical wellness"
    }
  ];

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border-4" style={{ borderColor: color }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentImage === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={image.url} 
              alt={`${image.caption} - ${image.keywords}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-center mb-1" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {image.caption}
              </p>
              <p className="text-white/70 text-center text-sm">
                {image.keywords}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: `${color}DD` }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
        style={{ backgroundColor: `${color}DD` }}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: currentImage === index ? color : '#d1d5db',
              transform: currentImage === index ? 'scale(1.3)' : 'scale(1)'
            }}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Feature Card Component
function SanctuaryFeatureCard({ icon: Icon, title, description, color, delay }: { 
  icon: any; 
  title: string; 
  description: string; 
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="p-6 border-2 rounded-lg"
      style={{ 
        borderColor: color,
        background: `linear-gradient(135deg, ${color}10 0%, #fff 100%)`
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -8,
        boxShadow: `0 20px 40px ${color}30`
      }}
    >
      <motion.div 
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: color }}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-7 h-7 text-white" />
      </motion.div>
      <h4 className="mb-3" style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600',
        color: color
      }}>
        {title}
      </h4>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Instructor Video Introduction
function InstructorVideoIntro({ instructorName, color }: { instructorName: string; color: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer border-4"
      style={{ borderColor: color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
        alt={`Personal video introduction from ${instructorName}, your wellness retreat instructor`}
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.85)' }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Video Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 px-5 py-2 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: `${color}DD`,
          border: '2px solid white'
        }}
      >
        <span className="text-white font-semibold tracking-wider text-sm">
          ✦ MESSAGE FROM YOUR INSTRUCTOR
        </span>
      </motion.div>

      {/* Play Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            border: '3px solid white'
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            boxShadow: isHovered 
              ? '0 0 60px rgba(255, 255, 255, 0.9)' 
              : '0 0 40px rgba(255, 255, 255, 0.5)'
          }}
          transition={{ duration: 0.3 }}
        >
          <Play className="w-12 h-12 text-white ml-2" fill="white" />
        </motion.div>
      </motion.div>

      {/* Pulsing Ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-white"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>

      {/* Bottom Text */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
        <motion.h3 
          className="text-white mb-2"
          style={{ fontSize: '1.75rem', fontWeight: '600' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          A Personal Welcome from {instructorName}
        </motion.h3>
        <motion.p 
          className="text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Discover what makes our retreat transformation approach unique and why your journey starts here
        </motion.p>
      </div>
    </div>
  );
}

// Team Gallery Component
function TeamGallery({ color }: { color: string }) {
  const teamMembers = [
    {
      name: "Dr. Sofia Martinez",
      role: "Medical Director",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
      specialty: "Post-procedure care & recovery optimization"
    },
    {
      name: "Isabella Torres",
      role: "Wellness Coordinator",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
      specialty: "Daily activities & guest experience"
    },
    {
      name: "Carmen Rivera",
      role: "Nutrition Specialist",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=80",
      specialty: "Healing cuisine & dietary planning"
    },
    {
      name: "Luis Sanchez",
      role: "Yoga & Movement Guide",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
      specialty: "Gentle movement & breathwork therapy"
    },
    {
      name: "Maria Gonzalez",
      role: "Spa Therapist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
      specialty: "Healing massages & body treatments"
    },
    {
      name: "Ana Delgado",
      role: "Community Facilitator",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
      specialty: "Group circles & sisterhood connection"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {teamMembers.map((member, index) => (
        <motion.div
          key={index}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8 }}
        >
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 border-2" style={{ borderColor: color }}>
            <ImageWithFallback
              src={member.image}
              alt={`${member.name} - ${member.role} - ${member.specialty}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm leading-relaxed">
                  {member.specialty}
                </p>
              </div>
            </div>
          </div>
          <h4 className="mb-1" style={{ 
            fontWeight: '600',
            color: color
          }}>
            {member.name}
          </h4>
          <p className="text-sm text-gray-600">{member.role}</p>
        </motion.div>
      ))}
    </div>
  );
}
