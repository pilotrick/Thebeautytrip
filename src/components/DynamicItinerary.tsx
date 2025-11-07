import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Sun, Moon, Sunrise } from 'lucide-react';
import { useInView } from 'motion/react';

interface ItineraryDay {
  day: number;
  phase: 'arrival' | 'treatment' | 'radiance' | 'polish' | 'sanctuary' | 'departure';
  morning: string;
  afternoon: string;
  evening: string;
  highlight: string;
}

interface TripType {
  id: string;
  name: string;
  duration: number;
  color: string;
  gradient: string;
  icon: string;
  tagline: string;
}

const tripTypes: TripType[] = [
  {
    id: 'solo',
    name: 'Solo Plus',
    duration: 14,
    color: '#b8985b',
    gradient: 'linear-gradient(135deg, #f5f1ea 0%, #e8dcc8 100%)',
    icon: '✦',
    tagline: 'Extended wellness & discretion'
  },
  {
    id: 'smile',
    name: 'Smile Transformation',
    duration: 10,
    color: '#d4a574',
    gradient: 'linear-gradient(135deg, #fff8f0 0%, #f5e6d3 100%)',
    icon: '✧',
    tagline: 'Complete dental renewal'
  },
  {
    id: 'duo',
    name: 'The Duo Retreat',
    duration: 10,
    color: '#e3b5a6',
    gradient: 'linear-gradient(135deg, #fff5f2 0%, #fde8e3 100%)',
    icon: '◆',
    tagline: 'Shared transformation journey'
  },
  {
    id: 'group',
    name: 'Group Platinum',
    duration: 12,
    color: '#c59d7e',
    gradient: 'linear-gradient(135deg, #faf7f3 0%, #f0e8dd 100%)',
    icon: '❖',
    tagline: 'Bespoke group experience'
  }
];

const generateItinerary = (tripType: string, duration: number): ItineraryDay[] => {
  const baseItinerary: Record<string, ItineraryDay[]> = {
    solo: [
      {
        day: 1,
        phase: 'arrival',
        morning: 'Arrive in Santo Domingo',
        afternoon: 'Private transfer to luxury sanctuary',
        evening: 'Welcome dinner & healing menu introduction',
        highlight: 'Settle into your private villa'
      },
      {
        day: 2,
        phase: 'treatment',
        morning: 'Pre-treatment consultation',
        afternoon: 'Botox & filler procedures',
        evening: 'In-villa lymphatic drainage massage',
        highlight: 'Your transformation begins'
      },
      {
        day: 3,
        phase: 'radiance',
        morning: 'Gentle beach sunrise yoga',
        afternoon: 'Recovery vitamin IV drip',
        evening: 'Private chef wellness dinner',
        highlight: 'Focus on healing & rest'
      },
      {
        day: 4,
        phase: 'radiance',
        morning: 'Crystal sound bowl healing',
        afternoon: 'Aromatherapy bath experience',
        evening: 'Guided meditation session',
        highlight: 'Deep relaxation phase'
      },
      {
        day: 5,
        phase: 'radiance',
        morning: 'Lymphatic drainage massage',
        afternoon: 'Luxury pool float relaxation',
        evening: 'Private sunset viewing',
        highlight: 'Continued gentle recovery'
      },
      {
        day: 6,
        phase: 'polish',
        morning: 'HydraFacial treatment',
        afternoon: 'Healing foot reflexology',
        evening: 'Cinema night setup',
        highlight: 'Beginning to see results'
      },
      {
        day: 7,
        phase: 'polish',
        morning: 'Therapeutic massage',
        afternoon: 'Guided nature walk',
        evening: 'Caribbean wine tasting',
        highlight: 'Increased activity level'
      },
      {
        day: 8,
        phase: 'polish',
        morning: 'Private photography tour',
        afternoon: 'Personal shopping experience',
        evening: 'Dominican cooking class',
        highlight: 'Celebrating your glow'
      },
      {
        day: 9,
        phase: 'sanctuary',
        morning: 'Catamaran sail adventure',
        afternoon: 'Beach club luxury experience',
        evening: 'Spa evening ritual',
        highlight: 'Full transformation reveal'
      },
      {
        day: 10,
        phase: 'sanctuary',
        morning: 'Sunrise horseback riding',
        afternoon: 'Waterfall exploration',
        evening: 'Fine dining celebration',
        highlight: 'Living your best life'
      },
      {
        day: 11,
        phase: 'sanctuary',
        morning: 'Couples spa day (or solo pampering)',
        afternoon: 'Colonial Santo Domingo tour',
        evening: 'Salsa dancing lessons',
        highlight: 'Cultural immersion'
      },
      {
        day: 12,
        phase: 'sanctuary',
        morning: 'Scuba diving excursion',
        afternoon: 'Beach picnic setup',
        evening: 'Bonfire & stargazing',
        highlight: 'Adventure & relaxation'
      },
      {
        day: 13,
        phase: 'sanctuary',
        morning: 'Final spa treatments',
        afternoon: 'Souvenir shopping',
        evening: 'Farewell dinner celebration',
        highlight: 'Cherishing the journey'
      },
      {
        day: 14,
        phase: 'departure',
        morning: 'Breakfast & final photos',
        afternoon: 'Private transfer to airport',
        evening: 'Depart for home',
        highlight: 'Carrying your glow forward'
      }
    ],
    smile: [
      {
        day: 1,
        phase: 'arrival',
        morning: 'Arrive in Punta Cana',
        afternoon: 'Luxury resort check-in',
        evening: 'Soft foods menu introduction',
        highlight: 'Welcome to paradise'
      },
      {
        day: 2,
        phase: 'treatment',
        morning: 'Comprehensive dental consultation',
        afternoon: 'Smile design & prep work',
        evening: 'Gentle in-villa massage',
        highlight: 'Your smile transformation begins'
      },
      {
        day: 3,
        phase: 'treatment',
        morning: 'Veneers procedure - Session 1',
        afternoon: 'Recovery & hydration',
        evening: 'Healing tea ceremony',
        highlight: 'Major procedure complete'
      },
      {
        day: 4,
        phase: 'radiance',
        morning: 'Teeth whitening treatment',
        afternoon: 'Vitamin IV drip therapy',
        evening: 'Movie night in villa',
        highlight: 'Gentle recovery day'
      },
      {
        day: 5,
        phase: 'radiance',
        morning: 'Private beach yoga',
        afternoon: 'Lymphatic massage',
        evening: 'Sunset viewing experience',
        highlight: 'Reduced swelling phase'
      },
      {
        day: 6,
        phase: 'polish',
        morning: 'Veneers final fitting',
        afternoon: 'Therapeutic massage',
        evening: 'Private chef dinner',
        highlight: 'Seeing your new smile'
      },
      {
        day: 7,
        phase: 'polish',
        morning: 'Gentle nature walk',
        afternoon: 'Photography session',
        evening: 'Wine & cheese tasting',
        highlight: 'Showing off your smile'
      },
      {
        day: 8,
        phase: 'sanctuary',
        morning: 'Beach club experience',
        afternoon: 'Shopping tour',
        evening: 'Dominican cooking class',
        highlight: 'Full confidence restored'
      },
      {
        day: 9,
        phase: 'sanctuary',
        morning: 'Catamaran adventure',
        afternoon: 'Spa treatments',
        evening: 'Celebration dinner',
        highlight: 'Living your transformation'
      },
      {
        day: 10,
        phase: 'departure',
        morning: 'Final dental check',
        afternoon: 'Private airport transfer',
        evening: 'Depart with your new smile',
        highlight: 'Smile confidently forward'
      }
    ],
    duo: [
      {
        day: 1,
        phase: 'arrival',
        morning: 'Arrive together in paradise',
        afternoon: 'Dual master suite check-in',
        evening: 'Couples welcome dinner',
        highlight: 'Your shared journey begins'
      },
      {
        day: 2,
        phase: 'treatment',
        morning: 'Individual consultations',
        afternoon: 'Coordinated procedures',
        evening: 'Recovery together in villa',
        highlight: 'Supporting each other'
      },
      {
        day: 3,
        phase: 'radiance',
        morning: 'Couples yoga session',
        afternoon: 'Side-by-side spa treatments',
        evening: 'Healing dinner experience',
        highlight: 'Healing together'
      },
      {
        day: 4,
        phase: 'radiance',
        morning: 'Dual lymphatic massages',
        afternoon: 'Pool relaxation time',
        evening: 'Private movie night',
        highlight: 'Comfortable recovery'
      },
      {
        day: 5,
        phase: 'polish',
        morning: 'Veneers procedures',
        afternoon: 'Vitamin IV drips together',
        evening: 'Sunset champagne',
        highlight: 'Transformation milestones'
      },
      {
        day: 6,
        phase: 'polish',
        morning: 'Therapeutic massages',
        afternoon: 'Gentle nature walk',
        evening: 'Body scrub treatments',
        highlight: 'Increased energy together'
      },
      {
        day: 7,
        phase: 'polish',
        morning: 'Photography session together',
        afternoon: 'Shopping adventure',
        evening: 'Couples cooking class',
        highlight: 'Creating memories'
      },
      {
        day: 8,
        phase: 'sanctuary',
        morning: 'Beach club day',
        afternoon: 'Catamaran sail',
        evening: 'Fine dining experience',
        highlight: 'Celebrating transformations'
      },
      {
        day: 9,
        phase: 'sanctuary',
        morning: 'Adventure excursion',
        afternoon: 'Couples spa treatments',
        evening: 'Salsa dancing lessons',
        highlight: 'Living your best lives'
      },
      {
        day: 10,
        phase: 'departure',
        morning: 'Farewell breakfast',
        afternoon: 'Shared airport transfer',
        evening: 'Begin your transformed life',
        highlight: 'Forever changed together'
      }
    ],
    group: [
      {
        day: 1,
        phase: 'arrival',
        morning: 'Group arrival coordination',
        afternoon: 'Bespoke sanctuary check-in',
        evening: 'Group welcome celebration',
        highlight: 'Reunion in paradise'
      },
      {
        day: 2,
        phase: 'treatment',
        morning: 'Individual consultations',
        afternoon: 'Staggered procedures',
        evening: 'Group recovery lounge',
        highlight: 'Supporting each other'
      },
      {
        day: 3,
        phase: 'radiance',
        morning: 'Group yoga & meditation',
        afternoon: 'Individual spa treatments',
        evening: 'Healing dinner together',
        highlight: 'Collective healing energy'
      },
      {
        day: 4,
        phase: 'radiance',
        morning: 'Lymphatic massages',
        afternoon: 'Private pool party',
        evening: 'Movie night setup',
        highlight: 'Bonding during recovery'
      },
      {
        day: 5,
        phase: 'radiance',
        morning: 'Mixed procedures (veneers/hair)',
        afternoon: 'Vitamin IV drip bar',
        evening: 'Group game night',
        highlight: 'Varied transformation paths'
      },
      {
        day: 6,
        phase: 'polish',
        morning: 'Therapeutic massages',
        afternoon: 'Gentle group activities',
        evening: 'Wine tasting event',
        highlight: 'Seeing results together'
      },
      {
        day: 7,
        phase: 'polish',
        morning: 'Group photography session',
        afternoon: 'Shopping excursion',
        evening: 'Cooking class together',
        highlight: 'Group transformation photos'
      },
      {
        day: 8,
        phase: 'sanctuary',
        morning: 'Beach club takeover',
        afternoon: 'Catamaran adventure',
        evening: 'Fine dining celebration',
        highlight: 'Full group reveal'
      },
      {
        day: 9,
        phase: 'sanctuary',
        morning: 'Adventure activities',
        afternoon: 'Colonial tour',
        evening: 'Salsa night together',
        highlight: 'Cultural immersion'
      },
      {
        day: 10,
        phase: 'sanctuary',
        morning: 'Water sports & beach',
        afternoon: 'Group spa day',
        evening: 'Bonfire celebration',
        highlight: 'Living the dream'
      },
      {
        day: 11,
        phase: 'sanctuary',
        morning: 'Final adventures',
        afternoon: 'Souvenir shopping',
        evening: 'Farewell dinner',
        highlight: 'Memories to last forever'
      },
      {
        day: 12,
        phase: 'departure',
        morning: 'Group farewell breakfast',
        afternoon: 'Coordinated transfers',
        evening: 'Carry the glow home',
        highlight: 'Transformed together'
      }
    ]
  };

  return baseItinerary[tripType] || baseItinerary.smile;
};

const phaseColors: Record<string, { bg: string; text: string; icon: any }> = {
  arrival: { bg: '#f0e6ff', text: '#7c3aed', icon: MapPin },
  treatment: { bg: '#fce7f3', text: '#db2777', icon: Sparkles },
  radiance: { bg: '#fff7ed', text: '#ea580c', icon: Sunrise },
  polish: { bg: '#fef3c7', text: '#d97706', icon: Sun },
  sanctuary: { bg: '#dbeafe', text: '#2563eb', icon: Sparkles },
  departure: { bg: '#f3e8ff', text: '#9333ea', icon: Moon }
};

const DynamicItineraryComponent = () => {
  const [selectedTrip, setSelectedTrip] = useState<TripType>(tripTypes[1]); // Default to Smile
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px', amount: 0.3 });

  const itinerary = useMemo(() => 
    generateItinerary(selectedTrip.id, selectedTrip.duration), 
    [selectedTrip.id, selectedTrip.duration]
  );
  
  const currentDay = itinerary[currentDayIndex];
  const PhaseIcon = phaseColors[currentDay.phase].icon;

  const handlePrevDay = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prev) => (prev < itinerary.length - 1 ? prev + 1 : prev));
  };

  const handleTripChange = (trip: TripType) => {
    setSelectedTrip(trip);
    setCurrentDayIndex(0); // Reset to day 1
  };

  return (
    <div ref={ref} className="w-full">
      {/* Trip Type Selector */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {tripTypes.map((trip, index) => (
          <motion.button
            key={trip.id}
            onClick={() => handleTripChange(trip)}
            className="px-6 py-3 rounded-full border-2 transition-all duration-300 relative overflow-hidden"
            style={{
              borderColor: selectedTrip.id === trip.id ? trip.color : '#d1d5db',
              background: selectedTrip.id === trip.id ? trip.gradient : 'white',
              color: selectedTrip.id === trip.id ? '#111' : '#6b7280'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{trip.icon}</span>
              <span className="font-medium text-sm sm:text-base">{trip.name}</span>
              <span className="text-xs opacity-70">({trip.duration} days)</span>
            </span>
            {selectedTrip.id === trip.id && (
              <motion.div
                layoutId="activeTrip"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: trip.color }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-center mb-8 text-gray-600 italic"
        key={selectedTrip.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {selectedTrip.tagline}
      </motion.p>

      {/* Itinerary Display */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Day Navigation */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            onClick={handlePrevDay}
            disabled={currentDayIndex === 0}
            className="p-3 rounded-full border-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: selectedTrip.color,
              backgroundColor: 'white'
            }}
            whileHover={currentDayIndex > 0 ? { scale: 1.1, x: -3 } : {}}
            whileTap={currentDayIndex > 0 ? { scale: 0.9 } : {}}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: selectedTrip.color }} />
          </motion.button>

          <div className="text-center">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2"
              style={{
                borderColor: selectedTrip.color,
                background: selectedTrip.gradient
              }}
              key={`day-${currentDayIndex}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Calendar className="w-5 h-5" style={{ color: selectedTrip.color }} />
              <span className="font-semibold text-lg" style={{ color: '#111' }}>
                Day {currentDay.day}
              </span>
              <span className="text-sm opacity-70">of {itinerary.length}</span>
            </motion.div>
          </div>

          <motion.button
            onClick={handleNextDay}
            disabled={currentDayIndex === itinerary.length - 1}
            className="p-3 rounded-full border-2 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: selectedTrip.color,
              backgroundColor: 'white'
            }}
            whileHover={currentDayIndex < itinerary.length - 1 ? { scale: 1.1, x: 3 } : {}}
            whileTap={currentDayIndex < itinerary.length - 1 ? { scale: 0.9 } : {}}
          >
            <ChevronRight className="w-5 h-5" style={{ color: selectedTrip.color }} />
          </motion.button>
        </div>

        {/* Day Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentDayIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="border-2 rounded-2xl overflow-hidden"
            style={{ borderColor: selectedTrip.color }}
          >
            {/* Phase Badge */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ backgroundColor: phaseColors[currentDay.phase].bg }}
            >
              <div className="flex items-center gap-3">
                <PhaseIcon className="w-6 h-6" style={{ color: phaseColors[currentDay.phase].text }} />
                <span
                  className="font-semibold text-lg capitalize"
                  style={{ color: phaseColors[currentDay.phase].text }}
                >
                  {currentDay.phase} Phase
                </span>
              </div>
              <motion.span
                className="text-sm font-medium px-4 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'white',
                  color: phaseColors[currentDay.phase].text
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                {currentDay.highlight}
              </motion.span>
            </div>

            {/* Schedule */}
            <div className="p-6 sm:p-8 bg-white space-y-6">
              {[
                { time: 'Morning', activity: currentDay.morning, icon: '🌅' },
                { time: 'Afternoon', activity: currentDay.afternoon, icon: '☀️' },
                { time: 'Evening', activity: currentDay.evening, icon: '🌙' }
              ].map((slot, index) => (
                <motion.div
                  key={slot.time}
                  className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                    {slot.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">{slot.time}</div>
                    <div className="text-gray-700">{slot.activity}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Highlight Banner */}
            <motion.div
              className="px-6 py-4 text-center"
              style={{ background: selectedTrip.gradient }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-medium" style={{ color: '#111' }}>
                ✨ {currentDay.highlight}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center gap-1.5">
          {itinerary.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentDayIndex(index)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: currentDayIndex === index ? '32px' : '8px',
                backgroundColor: currentDayIndex === index ? selectedTrip.color : '#d1d5db'
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

export const DynamicItinerary = DynamicItineraryComponent;
