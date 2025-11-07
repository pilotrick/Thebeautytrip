import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Check, ArrowRight, Sparkles, Users, Bed, Utensils, Wifi } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface RetreatOption {
  id: string;
  name: string;
  location: string;
  type: string;
  status: string;
  keyAmenity: string;
  features: string[];
  image: string;
  pricePerDay: number;
  guestCapacity: string;
  recoveryState: 'radiance' | 'polish' | 'sanctuary';
}

interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  recoveryState: 'radiance' | 'polish' | 'sanctuary';
}

interface Step4RecoveryProps {
  onNext: () => void;
  onBack: () => void;
  selectedRetreat: string;
  setSelectedRetreat: (retreat: string) => void;
  recoveryDays: number;
  setRecoveryDays: (days: number) => void;
  groupMode?: boolean;
  groupSize?: number;
}

export function Step4Recovery({ 
  onNext, 
  onBack, 
  selectedRetreat, 
  setSelectedRetreat,
  recoveryDays = 10,
  setRecoveryDays,
  groupMode = false,
  groupSize = 1
}: Step4RecoveryProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [activeRecoveryState, setActiveRecoveryState] = useState<'radiance' | 'polish' | 'sanctuary'>('radiance');

  // Ensure recoveryDays is always a valid number
  const validRecoveryDays = isNaN(recoveryDays) || recoveryDays === undefined ? 10 : recoveryDays;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // SOLO/PRIVATE TIER (1-2 Guests)
  const soloRetreats: RetreatOption[] = [
    { id: 'pearl-suite', name: 'The Pearl Suite D.R.', location: 'Santo Domingo (City)', type: 'Executive Apt.', status: 'Available', keyAmenity: '24/7 Security & Concierge', features: ['Secure building', 'Direct concierge', 'Medical proximity'], image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', pricePerDay: 180, guestCapacity: '1-2', recoveryState: 'polish' },
    { id: 'aqua-nook', name: 'Aqua Nook', location: 'Punta Cana (East Coast)', type: 'Luxury Condo', status: 'BOOKED: 10/1 - 10/15', keyAmenity: 'Swim-Up Pool Access', features: ['Swim-up pool', 'Beach proximity', 'Modern amenities'], image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', pricePerDay: 220, guestCapacity: '1-2', recoveryState: 'radiance' },
    { id: 'cabarete-casita', name: 'Cabarete Casita', location: 'North Coast', type: 'Boutique Villa (1BR)', status: 'Available', keyAmenity: 'Private Plunge Pool', features: ['Plunge pool', 'Tropical gardens', 'Intimate setting'], image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', pricePerDay: 195, guestCapacity: '1-2', recoveryState: 'sanctuary' },
    { id: 'villa-colonial', name: 'Villa Colonial Hideaway', location: 'Santo Domingo (Colonial Zone)', type: 'Guesthouse Suite', status: 'Available', keyAmenity: 'Private Rooftop Terrace', features: ['Historic charm', 'Rooftop terrace', 'Cultural immersion'], image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', pricePerDay: 165, guestCapacity: '1-2', recoveryState: 'polish' },
    { id: 'sanctuary-402', name: 'Sanctuary 402, Cap Cana', location: 'Cap Cana (East Coast)', type: 'Executive Suite', status: 'BOOKED: 10/16 - 10/30', keyAmenity: 'Beach Club Access', features: ['Beach club', 'Exclusive resort', 'Premium amenities'], image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', pricePerDay: 240, guestCapacity: '1-2', recoveryState: 'radiance' },
    { id: 'loft-blue-mall', name: 'The Loft at Blue Mall', location: 'Santo Domingo (City)', type: 'Penthouse Apt.', status: 'Available', keyAmenity: 'Proximity to CEDIMAT Hospital', features: ['Medical access', 'Shopping district', 'City views'], image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800', pricePerDay: 200, guestCapacity: '1-2', recoveryState: 'polish' },
    { id: 'jade-garden', name: 'Jade Garden Suite', location: 'North Coast (Sosúa)', type: 'Condo Suite', status: 'Available', keyAmenity: 'Dedicated Nurse Bay', features: ['Recovery optimized', 'Medical support', 'Peaceful setting'], image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', pricePerDay: 185, guestCapacity: '1-2', recoveryState: 'sanctuary' },
    { id: 'punta-espada', name: 'Punta Espada Retreat', location: 'Cap Cana (East Coast)', type: 'Golf View Suite', status: 'Available', keyAmenity: 'Exclusive Gated Community', features: ['Security', 'Golf views', 'Elite location'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', pricePerDay: 210, guestCapacity: '1-2', recoveryState: 'polish' }
  ];

  // GROUP TIER (3-12 Guests)
  const groupRetreats: RetreatOption[] = [
    { id: 'villa-corales-14', name: 'Villa Corales 14', location: 'Punta Cana (East Coast)', type: '5 BR', status: 'Available', keyAmenity: 'Private Chef & Staff', features: ['Private chef', 'Full staff', '5 bedrooms', 'Luxury amenities'], image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', pricePerDay: 850, guestCapacity: '3-10', recoveryState: 'radiance' },
    { id: 'casa-marina', name: 'Casa Marina', location: 'Casa de Campo (South Coast)', type: '6 BR', status: 'Available', keyAmenity: 'Oceanfront Infinity Pool', features: ['Oceanfront', 'Infinity pool', '6 bedrooms', 'Staff included'], image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', pricePerDay: 950, guestCapacity: '3-12', recoveryState: 'radiance' },
    { id: 'villa-anaconda', name: 'Villa Anaconda', location: 'North Coast (Cabrera)', type: '7 BR', status: 'BOOKED: November 2025', keyAmenity: 'Dedicated Recovery Wing', features: ['Recovery wing', '7 bedrooms', 'Medical optimization'], image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800', pricePerDay: 1100, guestCapacity: '3-12', recoveryState: 'sanctuary' },
    { id: 'toscana-estate', name: 'The Toscana Estate', location: 'Cap Cana (East Coast)', type: '9 BR', status: 'Available', keyAmenity: 'Full-Service Butler', features: ['Butler service', '9 bedrooms', 'Ultimate luxury'], image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', pricePerDay: 1400, guestCapacity: '6-12', recoveryState: 'polish' },
    { id: 'seahorse-5b', name: 'Sea Horse Ranch 5B', location: 'North Coast (Cabarete)', type: '4 BR', status: 'Available', keyAmenity: 'Private Tennis Court', features: ['Tennis court', '4 bedrooms', 'Elite compound'], image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', pricePerDay: 700, guestCapacity: '3-8', recoveryState: 'radiance' },
    { id: 'arrecife-royale', name: 'Arrecife Royale', location: 'Punta Cana (East Coast)', type: '8 BR', status: 'BOOKED: December 2025', keyAmenity: 'Resort Access & Golf Carts', features: ['Resort amenities', 'Golf carts', '8 bedrooms'], image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800', pricePerDay: 1250, guestCapacity: '6-12', recoveryState: 'radiance' }
  ];

  // Smart Property Filtering based on group size
  const getFilteredRetreats = (): RetreatOption[] => {
    if (groupSize <= 2) {
      // Solo/Duo (1-2 Guests): Only show Solo Tier properties
      return soloRetreats;
    } else if (groupSize <= 6) {
      // Small Group (3-6 Guests): Show 3-5 BR villas/townhouses
      return groupRetreats.filter(r => {
        const capacity = r.guestCapacity.split('-')[1];
        return parseInt(capacity) <= 10;
      });
    } else {
      // Large Group (7-12 Guests): Show 6+ BR luxury estates
      return groupRetreats;
    }
  };

  const retreats: RetreatOption[] = getFilteredRetreats();

  const activities: Activity[] = [
    // RADIANCE (Full Excursion & Culture)
    { id: 'rad-1', name: 'Private Catamaran Day Trip', description: 'Saona or Catalina Island with snorkeling and beach BBQ', category: 'Adventure', price: 450, recoveryState: 'radiance' },
    { id: 'rad-2', name: 'Luxury Speedboat Excursion', description: 'Private tour of hidden North Coast coves', category: 'Adventure', price: 380, recoveryState: 'radiance' },
    { id: 'rad-3', name: 'Waterfall Hike', description: 'Guided hike to Cibao Valley waterfall', category: 'Adventure', price: 120, recoveryState: 'radiance' },
    { id: 'rad-4', name: 'Beachside Horseback Riding', description: 'Guided sunset ride along secluded beach', category: 'Adventure', price: 150, recoveryState: 'radiance' },
    { id: 'rad-5', name: 'Deep-Sea Fishing Charter', description: 'Half-day private fishing experience', category: 'Adventure', price: 400, recoveryState: 'radiance' },
    { id: 'rad-6', name: 'Rum & Cigar Tasting', description: 'Historical tasting at boutique supplier', category: 'Culture', price: 180, recoveryState: 'radiance' },
    { id: 'rad-7', name: 'Salsa & Bachata Lessons', description: 'Exclusive studio dance lessons', category: 'Culture', price: 120, recoveryState: 'radiance' },
    { id: 'rad-8', name: 'Dominican Cooking Class', description: 'Hands-on Caribbean cuisine class', category: 'Culture', price: 140, recoveryState: 'radiance' },
    { id: 'rad-9', name: 'Luxury Resort Day Pass', description: '5-star hotel pool/beach club access', category: 'Culture', price: 200, recoveryState: 'radiance' },
    { id: 'rad-10', name: 'Baseball Hall of Fame Tour', description: 'Guided tour in San Pedro', category: 'Culture', price: 100, recoveryState: 'radiance' },
    { id: 'rad-11', name: 'Paddleboarding/Kayaking Tour', description: 'Calm water, early morning session', category: 'Wellness', price: 90, recoveryState: 'radiance' },
    { id: 'rad-12', name: 'Scuba Diving Refresher', description: 'Shallow dive certification course', category: 'Wellness', price: 180, recoveryState: 'radiance' },
    { id: 'rad-13', name: 'Guided Fitness Session', description: 'Jogging along the Malecón', category: 'Wellness', price: 80, recoveryState: 'radiance' },
    { id: 'rad-14', name: 'Design District Tour', description: 'Full-day boutique hopping package', category: 'Shopping', price: 150, recoveryState: 'radiance' },
    { id: 'rad-15', name: 'Artisan Market Excursion', description: 'Souvenir and art shopping', category: 'Shopping', price: 100, recoveryState: 'radiance' },
    { id: 'rad-16', name: 'VIP Nightclub Access', description: 'Table service and security package', category: 'Nightlife', price: 250, recoveryState: 'radiance' },
    { id: 'rad-17', name: 'Jazz Club Night', description: 'Live music venue experience', category: 'Nightlife', price: 120, recoveryState: 'radiance' },
    { id: 'rad-18', name: 'Hot Air Balloon Ride', description: 'Sunrise experience outside Santiago', category: 'Exclusive', price: 350, recoveryState: 'radiance' },
    { id: 'rad-19', name: 'Private Drone Photography', description: 'Professional beach photo session', category: 'Exclusive', price: 200, recoveryState: 'radiance' },
    { id: 'rad-20', name: 'ATV/Buggy Adventure', description: 'Coastal dust-free route', category: 'Exclusive', price: 180, recoveryState: 'radiance' },

    // POLISH (Indoor Elegance & Exclusive Access)
    { id: 'pol-1', name: 'Private Museum Tour', description: 'Zona Colonial historical sites', category: 'Culture', price: 150, recoveryState: 'polish' },
    { id: 'pol-2', name: 'Art Gallery Crawl', description: 'Contemporary Santo Domingo galleries', category: 'Culture', price: 120, recoveryState: 'polish' },
    { id: 'pol-3', name: 'Historical Lecture', description: 'Private scholar in-suite presentation', category: 'Culture', price: 200, recoveryState: 'polish' },
    { id: 'pol-4', name: 'Cathedral Basilica Visit', description: 'Guided architecture tour', category: 'Culture', price: 100, recoveryState: 'polish' },
    { id: 'pol-5', name: 'Designer Showroom Visit', description: 'Private viewing at Indómita & Jenny Polanco', category: 'Style', price: 300, recoveryState: 'polish' },
    { id: 'pol-6', name: 'Perfume Blending Workshop', description: 'Private session with local perfumer', category: 'Style', price: 180, recoveryState: 'polish' },
    { id: 'pol-7', name: 'Artisan Jewelry Workshop', description: 'Create a custom piece', category: 'Style', price: 220, recoveryState: 'polish' },
    { id: 'pol-8', name: 'Fashion Stylist Consultation', description: 'Body type analysis at hotel', category: 'Style', price: 250, recoveryState: 'polish' },
    { id: 'pol-9', name: 'Custom Guayabera Fitting', description: 'Bespoke linen attire consultation', category: 'Style', price: 280, recoveryState: 'polish' },
    { id: 'pol-10', name: 'Fine Dining Experience', description: 'Top restaurant with private transfer', category: 'Cuisine', price: 200, recoveryState: 'polish' },
    { id: 'pol-11', name: 'Personal Chef for a Night', description: 'Gourmet meal at your villa', category: 'Cuisine', price: 350, recoveryState: 'polish' },
    { id: 'pol-12', name: 'Chocolate & Cacao Tasting', description: 'Luxury chocolatier experience', category: 'Cuisine', price: 150, recoveryState: 'polish' },
    { id: 'pol-13', name: 'Wine & Tapas Evening', description: 'Intimate indoor wine tasting', category: 'Cuisine', price: 180, recoveryState: 'polish' },
    { id: 'pol-14', name: 'Sunset Yacht Charter', description: 'Private anchored boat with champagne', category: 'Exclusive', price: 500, recoveryState: 'polish' },
    { id: 'pol-15', name: 'Private Piano Bar Night', description: 'Live performance at exclusive venue', category: 'Exclusive', price: 220, recoveryState: 'polish' },
    { id: 'pol-16', name: 'VIP Shopping Concierge', description: 'Personal assistant for boutique shopping', category: 'Shopping', price: 250, recoveryState: 'polish' },
    { id: 'pol-17', name: 'Custom Jewelry Design Session', description: 'Create a bespoke piece with local artisan', category: 'Shopping', price: 300, recoveryState: 'polish' },
    { id: 'pol-18', name: 'Cigar Rolling Workshop', description: 'Learn from a master torcedor', category: 'Culture', price: 160, recoveryState: 'polish' },
    { id: 'pol-19', name: 'Tarot & Spiritual Reading', description: 'Private session with local mystic', category: 'Wellness', price: 120, recoveryState: 'polish' },
    { id: 'pol-20', name: 'Photography Studio Session', description: 'Professional indoor portrait shoot', category: 'Exclusive', price: 280, recoveryState: 'polish' },

    // SANCTUARY (Absolute Rest & Restoration)
    { id: 'san-1', name: 'In-Villa Full Body Massage', description: '90-minute therapeutic session', category: 'Spa', price: 150, recoveryState: 'sanctuary' },
    { id: 'san-2', name: 'Lymphatic Drainage Massage', description: 'Specialized post-treatment care', category: 'Spa', price: 180, recoveryState: 'sanctuary' },
    { id: 'san-3', name: 'Couples Massage Experience', description: 'Side-by-side relaxation therapy', category: 'Spa', price: 280, recoveryState: 'sanctuary' },
    { id: 'san-4', name: 'Hot Stone Therapy', description: 'Deep muscle relaxation treatment', category: 'Spa', price: 170, recoveryState: 'sanctuary' },
    { id: 'san-5', name: 'Aromatherapy Session', description: 'Custom essential oil treatment', category: 'Spa', price: 140, recoveryState: 'sanctuary' },
    { id: 'san-6', name: 'Reflexology Treatment', description: 'Foot & pressure point therapy', category: 'Spa', price: 100, recoveryState: 'sanctuary' },
    { id: 'san-7', name: 'Private Meditation Instructor', description: 'One-on-one guided meditation', category: 'Wellness', price: 120, recoveryState: 'sanctuary' },
    { id: 'san-8', name: 'In-Villa Yoga Session', description: 'Gentle restorative yoga practice', category: 'Wellness', price: 110, recoveryState: 'sanctuary' },
    { id: 'san-9', name: 'Sound Bath Healing', description: 'Crystal bowl therapy session', category: 'Wellness', price: 130, recoveryState: 'sanctuary' },
    { id: 'san-10', name: 'Breathwork Class', description: 'Guided pranayama & relaxation', category: 'Wellness', price: 100, recoveryState: 'sanctuary' },
    { id: 'san-11', name: 'Nutritionist Consultation', description: 'Recovery meal planning session', category: 'Wellness', price: 150, recoveryState: 'sanctuary' },
    { id: 'san-12', name: 'Acupuncture Session', description: 'Traditional healing treatment', category: 'Wellness', price: 160, recoveryState: 'sanctuary' },
    { id: 'san-13', name: 'Reiki Energy Healing', description: 'Balancing energy therapy', category: 'Wellness', price: 120, recoveryState: 'sanctuary' },
    { id: 'san-14', name: 'Float Therapy Session', description: 'Sensory deprivation relaxation', category: 'Spa', price: 140, recoveryState: 'sanctuary' },
    { id: 'san-15', name: 'Infrared Sauna Treatment', description: 'Detox & relaxation session', category: 'Spa', price: 100, recoveryState: 'sanctuary' },
    { id: 'san-16', name: 'Guided Journal Coaching', description: 'Reflection & mindfulness practice', category: 'Wellness', price: 90, recoveryState: 'sanctuary' },
    { id: 'san-17', name: 'Private Chef Meal Delivery', description: 'Daily gourmet recovery meals', category: 'Cuisine', price: 200, recoveryState: 'sanctuary' },
    { id: 'san-18', name: 'Fresh Juice Cleanse Package', description: '3-day cold-pressed delivery', category: 'Cuisine', price: 180, recoveryState: 'sanctuary' },
    { id: 'san-19', name: 'Book Club & Reading Service', description: 'Curated book delivery with discussion', category: 'Culture', price: 80, recoveryState: 'sanctuary' },
    { id: 'san-20', name: 'In-Villa Movie Night Setup', description: 'Private cinema experience with snacks', category: 'Entertainment', price: 120, recoveryState: 'sanctuary' }
  ];

  const toggleActivity = (id: string) => {
    setSelectedActivities(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const getFilteredActivities = (state: 'radiance' | 'polish' | 'sanctuary') => {
    return activities.filter(a => a.recoveryState === state);
  };

  const totalActivityCost = activities
    .filter(a => selectedActivities.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const selectedRetreatData = retreats.find(r => r.id === selectedRetreat);
  const accommodationCost = selectedRetreatData ? selectedRetreatData.pricePerDay * validRecoveryDays : 0;

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 style={{ fontSize: '3rem', color: 'var(--bt-charcoal)', marginBottom: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            Curate Your Sanctuary
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            Select your recovery villa and elevate your experience with bespoke wellness activities organized by recovery state
          </p>
        </div>

        {/* Curator's Note based on group size */}
        {groupSize === 1 && (
          <div className="max-w-3xl mx-auto mb-8 p-6 rounded-lg" style={{ 
            backgroundColor: 'var(--bt-blush)',
            border: '2px solid rgba(255,255,255,0.5)'
          }}>
            <p className="text-white text-center" style={{ lineHeight: '1.7', fontSize: '1.125rem' }}>
              <strong>To maintain your absolute privacy,</strong> The Beauty Trip has curated these discreet sanctuaries for your solitary focus.
            </p>
          </div>
        )}

        {groupSize >= 7 && (
          <div className="max-w-3xl mx-auto mb-8 p-6 rounded-lg" style={{ 
            backgroundColor: 'var(--bt-gold)',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            <p className="text-white text-center" style={{ lineHeight: '1.7', fontSize: '1.125rem' }}>
              <strong>Welcome to The Elite Collection.</strong> These fully-staffed estates are secured for your collective confidence.
            </p>
          </div>
        )}

        {/* Stay Duration Selector */}
        <div className="max-w-md mx-auto mb-16 p-8 bg-white border border-gray-200">
          <h3 className="text-center mb-6" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>
            Length of Stay
          </h3>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setRecoveryDays(Math.max(7, validRecoveryDays - 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: 'var(--bt-gold)' }}
            >
              <span style={{ color: 'var(--bt-gold)' }}>−</span>
            </button>
            <div className="text-center">
              <div style={{ fontSize: '3rem', color: 'var(--bt-gold)' }}>{validRecoveryDays}</div>
              <div className="text-gray-600">days</div>
            </div>
            <button
              onClick={() => setRecoveryDays(Math.min(14, validRecoveryDays + 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors hover:bg-gray-50"
              style={{ borderColor: 'var(--bt-gold)' }}
            >
              <span style={{ color: 'var(--bt-gold)' }}>+</span>
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Standard package: 10 days (includes treatment time + relaxation)
          </p>
        </div>

        {/* Villa Selection Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-4" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
            {groupMode ? 'Your Group Sanctuary: Luxury Villa Selection' : 'Your Private Sanctuary: Curating Your Dominican Stay'}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '1rem' }}>
            {groupMode 
              ? 'Select the perfect luxury villa for your group renewal journey. Every property features multiple bedrooms, dedicated staff, and premium amenities to accommodate your entire party in elevated comfort.'
              : 'Select the perfect private retreat for your Aesthetic Renewal. Every property is chosen for its discreet location, exceptional privacy, and five-star luxury amenities.'}
          </p>
        </div>

        {/* Solo/Private Tier OR Group Tier */}
        <div className="mb-16">
          <div className="mb-6 p-6 border-2" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fefefe' }}>
            <h3 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              {groupMode ? 'The Group Renewal: Luxury Villas (3-12 Guests)' : 'The Private Renewal: Solo Trip (1-2 Guests)'}
            </h3>
            <p className="text-gray-600 text-sm">
              {groupMode
                ? 'Exclusive multi-bedroom estates with private chef, full staff, and premium amenities. These villas are designed for group celebrations while maintaining the luxury and privacy essential to your recovery.'
                : 'Boutique residences, luxury suites, and secluded casitas. These options prioritize privacy, direct concierge access, and proximity to your treatment center.'}
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--bt-gold)' }}>
              Note: The best-curated, most private spaces are often reserved well in advance. Secure your preferred sanctuary as soon as your dates are confirmed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {retreats.map((retreat) => (
              <button
                key={retreat.id}
                onClick={() => {
                  if (!retreat.status.includes('BOOKED')) {
                    setSelectedRetreat(retreat.id);
                    setActiveRecoveryState(retreat.recoveryState);
                  }
                }}
                disabled={retreat.status.includes('BOOKED')}
                className="text-left group relative overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  border: selectedRetreat === retreat.id 
                    ? '3px solid var(--bt-gold)' 
                    : '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={retreat.image} 
                    alt={retreat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {retreat.status.includes('BOOKED') && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white px-4 py-2 bg-red-600 text-sm">
                        {retreat.status}
                      </span>
                    </div>
                  )}
                  {!retreat.status.includes('BOOKED') && selectedRetreat === retreat.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-white">
                  <h4 className="mb-1" style={{ fontSize: '1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    {retreat.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{retreat.location}</p>
                  
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <p className="text-xs text-gray-600 mb-1"><strong>Type:</strong> {retreat.type}</p>
                    <p className="text-xs mb-1" style={{ color: 'var(--bt-gold)' }}>
                      <strong>★</strong> {retreat.keyAmenity}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                        ${retreat.pricePerDay}
                      </span>
                      <span className="text-gray-500 text-xs">/night</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      ${(retreat.pricePerDay * recoveryDays).toLocaleString()} total
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Group Tier - Only show when NOT in group mode (for solo travelers who want to see group options) */}
        {!groupMode && (
          <div className="mb-16">
            <div className="mb-6 p-6 border-2" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fefefe' }}>
              <h3 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                The Collective Experience: Group & Companion Stays (3-12 Guests)
              </h3>
              <p className="text-gray-600 text-sm">
                For the ultimate seamless recovery and bonding experience. These fully staffed luxury villas offer privacy, spacious amenities, and dedicated on-site services.
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--bt-blush)' }}>
                The Exclusive Collection: Villas chosen for their space and amenities, including private chefs and dedicated staff. Availability is limited due to high demand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupRetreats.map((retreat) => (
              <button
                key={retreat.id}
                onClick={() => {
                  if (!retreat.status.includes('BOOKED')) {
                    setSelectedRetreat(retreat.id);
                    setActiveRecoveryState(retreat.recoveryState);
                  }
                }}
                disabled={retreat.status.includes('BOOKED')}
                className="text-left group relative overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  border: selectedRetreat === retreat.id 
                    ? '3px solid var(--bt-gold)' 
                    : '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={retreat.image} 
                    alt={retreat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {retreat.status.includes('BOOKED') && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white px-4 py-2 bg-red-600 text-sm">
                        {retreat.status}
                      </span>
                    </div>
                  )}
                  {!retreat.status.includes('BOOKED') && selectedRetreat === retreat.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-white">
                  <h4 className="mb-1" style={{ fontSize: '1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    {retreat.name}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{retreat.location}</p>
                  
                  <div className="mb-3 pb-3 border-b border-gray-100">
                    <p className="text-xs text-gray-600 mb-1"><strong>Type:</strong> {retreat.type} • {retreat.guestCapacity} guests</p>
                    <p className="text-xs mb-1" style={{ color: 'var(--bt-gold)' }}>
                      <strong>★</strong> {retreat.keyAmenity}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                        ${retreat.pricePerDay}
                      </span>
                      <span className="text-gray-500 text-xs">/night</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      ${(retreat.pricePerDay * recoveryDays).toLocaleString()} total
                    </span>
                  </div>
                </div>
              </button>
              ))}
            </div>
          </div>
        )}

        {/* Activity Upsells */}
        {selectedRetreat && (
          <div className="mb-16 border-2 p-8" style={{ borderColor: 'var(--bt-gold)' }}>
            <h2 className="text-center mb-4" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)' }}>
              Elevate Your Experience
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Select from our curated activities based on your recovery state. Each experience is designed for your comfort and safety.
            </p>

            <Tabs value={activeRecoveryState} onValueChange={(value) => setActiveRecoveryState(value as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="radiance">Radiance</TabsTrigger>
                <TabsTrigger value="polish">Polish</TabsTrigger>
                <TabsTrigger value="sanctuary">Sanctuary</TabsTrigger>
              </TabsList>

              <TabsContent value="radiance" className="space-y-4">
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <h4 className="mb-2" style={{ color: 'var(--bt-charcoal)' }}>State: Full Excursion & Culture</h4>
                  <p className="text-sm text-gray-600">Minimal downtime • Full travel & movement • Light sun exposure with SPF</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilteredActivities('radiance').map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className="text-left p-4 border transition-colors hover:bg-gray-50"
                      style={{
                        borderColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : '#e5e7eb'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="flex-1" style={{ fontSize: '1.0625rem', color: 'var(--bt-charcoal)' }}>
                          {activity.name}
                        </h5>
                        <div 
                          className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ml-2 transition-all"
                          style={{
                            borderColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : '#d1d5db',
                            backgroundColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : 'transparent'
                          }}
                        >
                          {selectedActivities.includes(activity.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bt-blush)', color: 'var(--bt-charcoal)' }}>
                          {activity.category}
                        </span>
                        <span style={{ color: 'var(--bt-gold)' }}>${activity.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="polish" className="space-y-4">
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <h4 className="mb-2" style={{ color: 'var(--bt-charcoal)' }}>State: Indoor Elegance & Exclusive Access</h4>
                  <p className="text-sm text-gray-600">Sun avoidance required • Low physical exertion • Controlled private environments</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilteredActivities('polish').map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className="text-left p-4 border transition-colors hover:bg-gray-50"
                      style={{
                        borderColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : '#e5e7eb'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="flex-1" style={{ fontSize: '1.0625rem', color: 'var(--bt-charcoal)' }}>
                          {activity.name}
                        </h5>
                        <div 
                          className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ml-2 transition-all"
                          style={{
                            borderColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : '#d1d5db',
                            backgroundColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : 'transparent'
                          }}
                        >
                          {selectedActivities.includes(activity.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bt-blush)', color: 'var(--bt-charcoal)' }}>
                          {activity.category}
                        </span>
                        <span style={{ color: 'var(--bt-gold)' }}>${activity.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sanctuary" className="space-y-4">
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <h4 className="mb-2" style={{ color: 'var(--bt-charcoal)' }}>State: Absolute Rest & Restoration</h4>
                  <p className="text-sm text-gray-600">Complete rest • No sun exposure • Villa-based services only</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilteredActivities('sanctuary').map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className="text-left p-4 border transition-colors hover:bg-gray-50"
                      style={{
                        borderColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : '#e5e7eb'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="flex-1" style={{ fontSize: '1.0625rem', color: 'var(--bt-charcoal)' }}>
                          {activity.name}
                        </h5>
                        <div 
                          className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ml-2 transition-all"
                          style={{
                            borderColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : '#d1d5db',
                            backgroundColor: selectedActivities.includes(activity.id) ? 'var(--bt-gold)' : 'transparent'
                          }}
                        >
                          {selectedActivities.includes(activity.id) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--bt-blush)', color: 'var(--bt-charcoal)' }}>
                          {activity.category}
                        </span>
                        <span style={{ color: 'var(--bt-gold)' }}>${activity.price}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Activity Summary */}
            {selectedActivities.length > 0 && (
              <div className="mt-8 p-6 bg-gray-50 border border-gray-200">
                <h4 className="mb-4" style={{ color: 'var(--bt-charcoal)' }}>
                  Selected Activities ({selectedActivities.length})
                </h4>
                <div className="flex items-baseline gap-2">
                  <span style={{ fontSize: '1.75rem', color: 'var(--bt-gold)' }}>
                    ${totalActivityCost.toLocaleString()}
                  </span>
                  <span className="text-gray-600">total for activities</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cost Summary */}
        {selectedRetreat && (
          <div className="mb-12 p-8 border-2" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fefefe' }}>
            <h3 className="text-center mb-6" style={{ fontSize: '1.75rem', color: 'var(--bt-charcoal)' }}>
              Your Experience Investment
            </h3>
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Accommodation ({recoveryDays} days)</span>
                <span style={{ color: 'var(--bt-charcoal)' }}>${accommodationCost.toLocaleString()}</span>
              </div>
              {selectedActivities.length > 0 && (
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">Activities ({selectedActivities.length})</span>
                  <span style={{ color: 'var(--bt-charcoal)' }}>${totalActivityCost.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4">
                <span style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  Sanctuary Total
                </span>
                <span style={{ fontSize: '1.75rem', color: 'var(--bt-gold)', fontWeight: '600' }}>
                  ${(accommodationCost + totalActivityCost).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-8 py-4 border-2 transition-all duration-300 hover:scale-105 rounded-full"
            style={{ 
              borderColor: 'var(--bt-charcoal)',
              color: 'var(--bt-charcoal)',
              fontSize: '1.125rem'
            }}
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            disabled={!selectedRetreat}
            className="px-12 py-4 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
            style={{ 
              backgroundColor: 'var(--bt-gold)',
              fontSize: '1.125rem',
              letterSpacing: '0.02em'
            }}
          >
            REVIEW MY RENEWAL →
          </button>
        </div>
      </div>
    </div>
  );
}
