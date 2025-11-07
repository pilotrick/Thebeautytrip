import { useState } from "react";
import { Sparkles, Search, Filter, Check, Plus, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface Activity {
  id: string;
  name: string;
  category: 'radiance' | 'polish' | 'sanctuary';
  type: 'wellness' | 'beauty' | 'adventure' | 'culture' | 'relaxation' | 'culinary';
  duration: string;
  price: number;
  description: string;
  recoveryLevel: 'light' | 'moderate' | 'full';
  bestTiming: string;
  imageUrl: string;
}

interface ActivitiesCatalogueProps {
  selectedActivities?: string[];
  onActivityToggle?: (activityId: string) => void;
  recoveryDays?: number;
}

export function ActivitiesCatalogue({ 
  selectedActivities = [], 
  onActivityToggle,
  recoveryDays = 10
}: ActivitiesCatalogueProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'radiance' | 'polish' | 'sanctuary'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [detailsDialog, setDetailsDialog] = useState<Activity | null>(null);

  const activities: Activity[] = [
    // RADIANCE - Light Recovery Activities (Days 1-3)
    {
      id: 'private-beach-yoga',
      name: 'Private Beach Sunrise Yoga',
      category: 'radiance',
      type: 'wellness',
      duration: '60 min',
      price: 85,
      description: 'Gentle flow yoga session on private beach with personalized attention and ocean views.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-3 post-procedure',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'
    },
    {
      id: 'aromatherapy-bath',
      name: 'Luxury Aromatherapy Bath',
      category: 'radiance',
      type: 'relaxation',
      duration: '90 min',
      price: 120,
      description: 'Indulgent aromatic bath experience with essential oils, flower petals, and champagne.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-4',
      imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800'
    },
    {
      id: 'guided-meditation',
      name: 'Private Guided Meditation',
      category: 'radiance',
      type: 'wellness',
      duration: '45 min',
      price: 65,
      description: 'One-on-one meditation session focused on healing, relaxation, and inner peace.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-5',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
    },
    {
      id: 'in-villa-massage',
      name: 'Gentle In-Villa Massage',
      category: 'radiance',
      type: 'wellness',
      duration: '60 min',
      price: 110,
      description: 'Soothing lymphatic drainage massage designed to reduce swelling and promote healing.',
      recoveryLevel: 'light',
      bestTiming: 'Days 2-5',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800'
    },
    {
      id: 'smoothie-bar',
      name: 'Custom Wellness Smoothie Bar',
      category: 'radiance',
      type: 'culinary',
      duration: 'Daily access',
      price: 45,
      description: 'Daily access to nutrient-rich smoothies crafted for post-procedure recovery.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-7',
      imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800'
    },
    {
      id: 'sound-healing',
      name: 'Crystal Sound Bowl Healing',
      category: 'radiance',
      type: 'wellness',
      duration: '60 min',
      price: 95,
      description: 'Therapeutic sound bath using crystal singing bowls for deep relaxation and cellular healing.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-5',
      imageUrl: 'https://images.unsplash.com/photo-1545450660-cf315b2e3730?w=800'
    },
    {
      id: 'journaling-workshop',
      name: 'Transformation Journaling',
      category: 'radiance',
      type: 'wellness',
      duration: '90 min',
      price: 75,
      description: 'Guided journaling session to process your transformation journey and set intentions.',
      recoveryLevel: 'light',
      bestTiming: 'Days 2-6',
      imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800'
    },
    {
      id: 'pool-floaties',
      name: 'Luxury Pool Float Experience',
      category: 'radiance',
      type: 'relaxation',
      duration: 'Daily',
      price: 35,
      description: 'Premium float devices and poolside service for effortless relaxation.',
      recoveryLevel: 'light',
      bestTiming: 'Days 2-7',
      imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
    },
    {
      id: 'foot-reflexology',
      name: 'Healing Foot Reflexology',
      category: 'radiance',
      type: 'wellness',
      duration: '45 min',
      price: 70,
      description: 'Targeted reflexology to stimulate healing throughout the body via pressure points.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-5',
      imageUrl: 'https://images.unsplash.com/photo-1598216991232-10ac58a309e5?w=800'
    },
    {
      id: 'breathing-class',
      name: 'Pranayama Breathing Class',
      category: 'radiance',
      type: 'wellness',
      duration: '45 min',
      price: 60,
      description: 'Ancient breathing techniques to reduce inflammation and enhance recovery.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-7',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
    },
    {
      id: 'private-chef-dinner',
      name: 'Private Chef Wellness Dinner',
      category: 'radiance',
      type: 'culinary',
      duration: '2 hours',
      price: 180,
      description: 'Personalized anti-inflammatory meal prepared by private chef in your villa.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-7',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    },
    {
      id: 'sunset-viewing',
      name: 'Private Sunset Viewing Setup',
      category: 'radiance',
      type: 'relaxation',
      duration: '1 hour',
      price: 50,
      description: 'Curated sunset viewing experience with champagne and luxury seating.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-7',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    },
    {
      id: 'coloring-therapy',
      name: 'Adult Coloring Therapy',
      category: 'radiance',
      type: 'relaxation',
      duration: '60 min',
      price: 40,
      description: 'Mindful art therapy with premium materials and guided relaxation.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-5',
      imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800'
    },
    {
      id: 'facial-misting',
      name: 'Hydrating Facial Misting Service',
      category: 'radiance',
      type: 'beauty',
      duration: 'Daily',
      price: 55,
      description: 'Regular hydrating facial mists throughout the day to maintain glow.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-7',
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'
    },
    {
      id: 'tea-ceremony',
      name: 'Healing Tea Ceremony',
      category: 'radiance',
      type: 'wellness',
      duration: '60 min',
      price: 85,
      description: 'Traditional tea ceremony with healing herbs selected for recovery.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-7',
      imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800'
    },
    {
      id: 'reading-lounge',
      name: 'Curated Reading Lounge',
      category: 'radiance',
      type: 'relaxation',
      duration: 'Daily',
      price: 30,
      description: 'Access to luxury reading lounge with curated book selection.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-7',
      imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800'
    },
    {
      id: 'vitamin-infusion',
      name: 'Recovery Vitamin IV Drip',
      category: 'radiance',
      type: 'wellness',
      duration: '45 min',
      price: 150,
      description: 'Medical-grade vitamin infusion to accelerate healing and boost energy.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-4',
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800'
    },
    {
      id: 'gentle-stretching',
      name: 'Private Gentle Stretching',
      category: 'radiance',
      type: 'wellness',
      duration: '45 min',
      price: 70,
      description: 'Customized gentle stretching session to maintain mobility during recovery.',
      recoveryLevel: 'light',
      bestTiming: 'Days 2-7',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800'
    },
    {
      id: 'movie-night',
      name: 'Cinema Night Setup',
      category: 'radiance',
      type: 'relaxation',
      duration: '3 hours',
      price: 90,
      description: 'Premium movie night with projector, gourmet snacks, and cozy setup.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-5',
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800'
    },
    {
      id: 'silk-pillowcase',
      name: 'Luxury Silk Pillow Collection',
      category: 'radiance',
      type: 'beauty',
      duration: 'Full stay',
      price: 65,
      description: 'Premium silk pillowcases to protect skin and hair during recovery.',
      recoveryLevel: 'light',
      bestTiming: 'Days 1-10',
      imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'
    },

    // POLISH - Moderate Recovery Activities (Days 4-7)
    {
      id: 'gentle-hike',
      name: 'Guided Nature Walk',
      category: 'polish',
      type: 'adventure',
      duration: '2 hours',
      price: 95,
      description: 'Easy-paced nature walk through tropical landscapes with experienced guide.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 4-10',
      imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'
    },
    {
      id: 'photography-tour',
      name: 'Private Photography Tour',
      category: 'polish',
      type: 'culture',
      duration: '3 hours',
      price: 220,
      description: 'Professional photographer captures your transformation in stunning locations.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800'
    },
    {
      id: 'art-gallery',
      name: 'Local Art Gallery Tour',
      category: 'polish',
      type: 'culture',
      duration: '2 hours',
      price: 75,
      description: 'Curated tour of local art scene with cultural insights.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=800'
    },
    {
      id: 'wine-tasting',
      name: 'Caribbean Wine & Cheese Tasting',
      category: 'polish',
      type: 'culinary',
      duration: '2 hours',
      price: 130,
      description: 'Intimate wine tasting with local and international selections.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800'
    },
    {
      id: 'cooking-class',
      name: 'Dominican Cooking Masterclass',
      category: 'polish',
      type: 'culinary',
      duration: '3 hours',
      price: 145,
      description: 'Hands-on cooking class learning traditional Dominican cuisine.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800'
    },
    {
      id: 'shopping-tour',
      name: 'Personal Shopping Experience',
      category: 'polish',
      type: 'culture',
      duration: '4 hours',
      price: 180,
      description: 'Guided shopping tour with personal stylist at boutique locations.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800'
    },
    {
      id: 'beach-picnic',
      name: 'Luxury Beach Picnic',
      category: 'polish',
      type: 'culinary',
      duration: '2 hours',
      price: 160,
      description: 'Gourmet beach picnic setup with premium foods and champagne.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 4-10',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    },
    {
      id: 'botanical-garden',
      name: 'Botanical Garden Tour',
      category: 'polish',
      type: 'culture',
      duration: '2.5 hours',
      price: 85,
      description: 'Guided exploration of tropical botanical gardens.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800'
    },
    {
      id: 'sunset-cruise',
      name: 'Private Sunset Catamaran',
      category: 'polish',
      type: 'adventure',
      duration: '3 hours',
      price: 350,
      description: 'Private catamaran cruise with cocktails and sunset views.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    },
    {
      id: 'cigar-rolling',
      name: 'Premium Cigar Rolling Class',
      category: 'polish',
      type: 'culture',
      duration: '2 hours',
      price: 120,
      description: 'Learn traditional cigar rolling from master artisan.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 6-10',
      imageUrl: 'https://images.unsplash.com/photo-1605896854671-ee69953e46b1?w=800'
    },
    {
      id: 'horseback-beach',
      name: 'Beach Horseback Riding',
      category: 'polish',
      type: 'adventure',
      duration: '2 hours',
      price: 140,
      description: 'Gentle horseback ride along pristine beaches.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 6-10',
      imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800'
    },
    {
      id: 'watercolor-class',
      name: 'Tropical Watercolor Class',
      category: 'polish',
      type: 'culture',
      duration: '2 hours',
      price: 100,
      description: 'Paint tropical scenes with professional artist instruction.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
    },
    {
      id: 'spa-manicure',
      name: 'Luxury Spa Manicure',
      category: 'polish',
      type: 'beauty',
      duration: '90 min',
      price: 95,
      description: 'Premium manicure with massage and luxury products.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800'
    },
    {
      id: 'dance-lesson',
      name: 'Private Bachata Dance Lesson',
      category: 'polish',
      type: 'culture',
      duration: '90 min',
      price: 110,
      description: 'Learn authentic Dominican bachata from professional dancer.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 6-10',
      imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800'
    },
    {
      id: 'chocolate-tasting',
      name: 'Dominican Chocolate Tasting',
      category: 'polish',
      type: 'culinary',
      duration: '90 min',
      price: 90,
      description: 'Premium chocolate tasting featuring local cacao.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800'
    },
    {
      id: 'rum-distillery',
      name: 'Rum Distillery Tour',
      category: 'polish',
      type: 'culture',
      duration: '3 hours',
      price: 115,
      description: 'Tour renowned rum distillery with tastings and history.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 6-10',
      imageUrl: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9?w=800'
    },
    {
      id: 'colonial-tour',
      name: 'Colonial Zone Walking Tour',
      category: 'polish',
      type: 'culture',
      duration: '3 hours',
      price: 85,
      description: 'Explore UNESCO World Heritage colonial architecture.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800'
    },
    {
      id: 'beach-volleyball',
      name: 'Beach Volleyball Game',
      category: 'polish',
      type: 'adventure',
      duration: '2 hours',
      price: 65,
      description: 'Fun beach volleyball with equipment and instructor.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 7-10',
      imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800'
    },
    {
      id: 'makeup-lesson',
      name: 'Professional Makeup Lesson',
      category: 'polish',
      type: 'beauty',
      duration: '2 hours',
      price: 175,
      description: 'One-on-one makeup tutorial with professional artist.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 5-10',
      imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800'
    },
    {
      id: 'kayaking',
      name: 'Mangrove Kayaking Tour',
      category: 'polish',
      type: 'adventure',
      duration: '2.5 hours',
      price: 105,
      description: 'Peaceful kayaking through protected mangrove forests.',
      recoveryLevel: 'moderate',
      bestTiming: 'Days 6-10',
      imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800'
    },

    // SANCTUARY - Full Recovery Activities (Days 8-10)
    {
      id: 'zip-lining',
      name: 'Jungle Zip-Lining Adventure',
      category: 'sanctuary',
      type: 'adventure',
      duration: '4 hours',
      price: 165,
      description: 'Thrilling zip-line course through tropical jungle canopy.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1533556113430-869a4a7dc685?w=800'
    },
    {
      id: 'atv-tour',
      name: 'ATV Mountain Adventure',
      category: 'sanctuary',
      type: 'adventure',
      duration: '3 hours',
      price: 145,
      description: 'Off-road ATV excursion through mountains and countryside.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
    },
    {
      id: 'scuba-diving',
      name: 'Scuba Diving Excursion',
      category: 'sanctuary',
      type: 'adventure',
      duration: '4 hours',
      price: 180,
      description: 'Guided scuba dive at pristine coral reefs.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    },
    {
      id: 'parasailing',
      name: 'Parasailing Experience',
      category: 'sanctuary',
      type: 'adventure',
      duration: '2 hours',
      price: 125,
      description: 'Soar above turquoise waters with breathtaking views.',
      recoveryLevel: 'full',
      bestTiming: 'Days 9-14',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    },
    {
      id: 'waterfall-hike',
      name: '27 Waterfalls Hiking Tour',
      category: 'sanctuary',
      type: 'adventure',
      duration: '6 hours',
      price: 195,
      description: 'Epic waterfall jumping and hiking adventure.',
      recoveryLevel: 'full',
      bestTiming: 'Days 9-14',
      imageUrl: 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=800'
    },
    {
      id: 'snorkeling',
      name: 'Snorkeling & Island Hopping',
      category: 'sanctuary',
      type: 'adventure',
      duration: '5 hours',
      price: 155,
      description: 'Boat tour with snorkeling at multiple pristine locations.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    },
    {
      id: 'whale-watching',
      name: 'Whale Watching Tour',
      category: 'sanctuary',
      type: 'adventure',
      duration: '4 hours',
      price: 170,
      description: 'Seasonal whale watching expedition in Samaná Bay.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14 (Jan-Mar)',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    },
    {
      id: 'windsurfing',
      name: 'Windsurfing Lesson',
      category: 'sanctuary',
      type: 'adventure',
      duration: '2 hours',
      price: 135,
      description: 'Professional windsurfing instruction in perfect conditions.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800'
    },
    {
      id: 'deep-sea-fishing',
      name: 'Deep Sea Fishing Charter',
      category: 'sanctuary',
      type: 'adventure',
      duration: '6 hours',
      price: 450,
      description: 'Private deep sea fishing with experienced crew.',
      recoveryLevel: 'full',
      bestTiming: 'Days 9-14',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    },
    {
      id: 'beach-club-party',
      name: 'VIP Beach Club Experience',
      category: 'sanctuary',
      type: 'relaxation',
      duration: 'Full day',
      price: 200,
      description: 'All-day VIP access to premium beach club with bottle service.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
    },
    {
      id: 'cave-exploration',
      name: 'Cave & Cenote Exploration',
      category: 'sanctuary',
      type: 'adventure',
      duration: '4 hours',
      price: 140,
      description: 'Explore mystical caves and swim in crystal cenotes.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1586276393503-1c60c5e8ee5e?w=800'
    },
    {
      id: 'nightclub-vip',
      name: 'VIP Nightclub Experience',
      category: 'sanctuary',
      type: 'culture',
      duration: 'Evening',
      price: 185,
      description: 'VIP table and bottle service at top nightclub.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'
    },
    {
      id: 'jet-ski',
      name: 'Jet Ski Adventure',
      category: 'sanctuary',
      type: 'adventure',
      duration: '2 hours',
      price: 160,
      description: 'Guided jet ski tour along stunning coastline.',
      recoveryLevel: 'full',
      bestTiming: 'Days 9-14',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    },
    {
      id: 'mountain-biking',
      name: 'Mountain Biking Expedition',
      category: 'sanctuary',
      type: 'adventure',
      duration: '4 hours',
      price: 125,
      description: 'Challenging mountain bike trails with guide.',
      recoveryLevel: 'full',
      bestTiming: 'Days 9-14',
      imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800'
    },
    {
      id: 'kite-surfing',
      name: 'Kitesurfing Lesson',
      category: 'sanctuary',
      type: 'adventure',
      duration: '3 hours',
      price: 190,
      description: 'Learn kitesurfing in world-famous Cabarete Bay.',
      recoveryLevel: 'full',
      bestTiming: 'Days 10-14',
      imageUrl: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800'
    },
    {
      id: 'yacht-rental',
      name: 'Private Yacht Day Charter',
      category: 'sanctuary',
      type: 'adventure',
      duration: '8 hours',
      price: 850,
      description: 'Full-day private yacht with captain, crew, and catering.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'
    },
    {
      id: 'golf-round',
      name: 'Championship Golf Round',
      category: 'sanctuary',
      type: 'adventure',
      duration: '5 hours',
      price: 220,
      description: 'Play renowned Punta Cana golf course with cart and caddy.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800'
    },
    {
      id: 'beach-party',
      name: 'Private Beach Party Setup',
      category: 'sanctuary',
      type: 'culture',
      duration: '6 hours',
      price: 500,
      description: 'Full beach party with DJ, decorations, and catering.',
      recoveryLevel: 'full',
      bestTiming: 'Days 9-14',
      imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
    },
    {
      id: 'helicopter-tour',
      name: 'Helicopter Island Tour',
      category: 'sanctuary',
      type: 'adventure',
      duration: '90 min',
      price: 450,
      description: 'Breathtaking aerial tour of Dominican Republic.',
      recoveryLevel: 'full',
      bestTiming: 'Days 10-14',
      imageUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800'
    },
    {
      id: 'salsa-night',
      name: 'Authentic Salsa Night Out',
      category: 'sanctuary',
      type: 'culture',
      duration: '4 hours',
      price: 95,
      description: 'Experience authentic Dominican salsa culture with locals.',
      recoveryLevel: 'full',
      bestTiming: 'Days 8-14',
      imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'radiance': return 'var(--bt-blush)';
      case 'polish': return 'var(--bt-gold)';
      case 'sanctuary': return 'var(--bt-charcoal)';
      default: return 'gray';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch(category) {
      case 'radiance': return 'Light recovery activities perfect for the first few days (Days 1-3)';
      case 'polish': return 'Moderate activities as you regain energy (Days 4-7)';
      case 'sanctuary': return 'Full adventure experiences when fully recovered (Days 8-14)';
      default: return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8" style={{ color: 'var(--bt-gold)' }} />
          <h2 style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
            Recovery Activities Catalogue
          </h2>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Curated experiences organized by recovery phase. Choose activities that align with your healing timeline for the perfect balance of rest and adventure.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="wellness">Wellness</option>
            <option value="beauty">Beauty</option>
            <option value="adventure">Adventure</option>
            <option value="culture">Culture</option>
            <option value="relaxation">Relaxation</option>
            <option value="culinary">Culinary</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({activities.length})</TabsTrigger>
          <TabsTrigger value="radiance">Radiance (20)</TabsTrigger>
          <TabsTrigger value="polish">Polish (20)</TabsTrigger>
          <TabsTrigger value="sanctuary">Sanctuary (20)</TabsTrigger>
        </TabsList>

        {/* Category Description */}
        {selectedCategory !== 'all' && (
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${getCategoryColor(selectedCategory)}15`, borderLeft: `4px solid ${getCategoryColor(selectedCategory)}` }}>
            <p className="text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
              {getCategoryDescription(selectedCategory)}
            </p>
          </div>
        )}

        <TabsContent value="all" className="mt-6">
          <ActivityGrid activities={filteredActivities} selectedActivities={selectedActivities} onActivityToggle={onActivityToggle} onViewDetails={setDetailsDialog} />
        </TabsContent>
        <TabsContent value="radiance" className="mt-6">
          <ActivityGrid activities={filteredActivities} selectedActivities={selectedActivities} onActivityToggle={onActivityToggle} onViewDetails={setDetailsDialog} />
        </TabsContent>
        <TabsContent value="polish" className="mt-6">
          <ActivityGrid activities={filteredActivities} selectedActivities={selectedActivities} onActivityToggle={onActivityToggle} onViewDetails={setDetailsDialog} />
        </TabsContent>
        <TabsContent value="sanctuary" className="mt-6">
          <ActivityGrid activities={filteredActivities} selectedActivities={selectedActivities} onActivityToggle={onActivityToggle} onViewDetails={setDetailsDialog} />
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      {detailsDialog && (
        <Dialog open={!!detailsDialog} onOpenChange={() => setDetailsDialog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <img 
                src={detailsDialog.imageUrl} 
                alt={detailsDialog.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <DialogTitle className="text-2xl">{detailsDialog.name}</DialogTitle>
              <DialogDescription>
                <div className="space-y-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge style={{ backgroundColor: getCategoryColor(detailsDialog.category), color: 'white' }}>
                      {detailsDialog.category.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{detailsDialog.type}</Badge>
                    <Badge variant="outline">{detailsDialog.duration}</Badge>
                    <Badge variant="outline">{detailsDialog.recoveryLevel} recovery</Badge>
                  </div>
                  
                  <p className="text-gray-700">{detailsDialog.description}</p>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Best Timing</p>
                    <p style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>{detailsDialog.bestTiming}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <p style={{ fontSize: '1.5rem', color: 'var(--bt-gold)', fontWeight: '700' }}>
                      ${detailsDialog.price}
                    </p>
                    {onActivityToggle && (
                      <Button
                        onClick={() => {
                          onActivityToggle(detailsDialog.id);
                          setDetailsDialog(null);
                        }}
                        style={{ backgroundColor: selectedActivities.includes(detailsDialog.id) ? 'var(--bt-charcoal)' : 'var(--bt-gold)' }}
                      >
                        {selectedActivities.includes(detailsDialog.id) ? (
                          <><Check className="w-4 h-4 mr-2" /> Added</>
                        ) : (
                          <><Plus className="w-4 h-4 mr-2" /> Add to Trip</>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function ActivityGrid({ 
  activities, 
  selectedActivities, 
  onActivityToggle,
  onViewDetails 
}: { 
  activities: Activity[], 
  selectedActivities: string[], 
  onActivityToggle?: (id: string) => void,
  onViewDetails: (activity: Activity) => void
}) {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'radiance': return 'var(--bt-blush)';
      case 'polish': return 'var(--bt-gold)';
      case 'sanctuary': return 'var(--bt-charcoal)';
      default: return 'gray';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No activities match your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity) => (
        <Card 
          key={activity.id} 
          className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative"
        >
          {selectedActivities.includes(activity.id) && (
            <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)' }}>
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          
          <div className="relative h-48 overflow-hidden" onClick={() => onViewDetails(activity)}>
            <img 
              src={activity.imageUrl} 
              alt={activity.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <Badge style={{ backgroundColor: getCategoryColor(activity.category), color: 'white' }}>
                {activity.category.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="p-4" onClick={() => onViewDetails(activity)}>
            <h3 className="mb-2" style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              {activity.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {activity.description}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>{activity.duration}</span>
              <span>{activity.type}</span>
            </div>

            <div className="flex items-center justify-between">
              <p style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '700' }}>
                ${activity.price}
              </p>
              
              {onActivityToggle && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onActivityToggle(activity.id);
                  }}
                  variant={selectedActivities.includes(activity.id) ? "secondary" : "default"}
                  style={{ 
                    backgroundColor: selectedActivities.includes(activity.id) ? 'var(--bt-charcoal)' : 'var(--bt-gold)',
                    color: 'white'
                  }}
                >
                  {selectedActivities.includes(activity.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
