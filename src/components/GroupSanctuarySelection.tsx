import { useState } from "react";
import { Logo } from "./Logo";
import { GroupData } from "./GroupQuestionnaire";
import { Home, Users, Check, MapPin, Wifi, Coffee, Dumbbell, Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface GroupSanctuarySelectionProps {
  groupData: GroupData;
  onComplete: (selectedSanctuaries: string[]) => void;
  onBack: () => void;
}

interface Property {
  id: string;
  name: string;
  location: string;
  capacity: number;
  minCapacity: number;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
  description: string;
  type: 'villa' | 'hotel' | 'resort';
}

export function GroupSanctuarySelection({ groupData, onComplete, onBack }: GroupSanctuarySelectionProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  // Get properties based on group size
  const getAvailableProperties = (): Property[] => {
    const properties: Property[] = [];

    // Small groups (2-6): Private villas - 12 options
    if (groupData.groupSize <= 6) {
      properties.push(
        {
          id: 'villa-serenity',
          name: 'Villa Serenity',
          location: 'Punta Cana Beachfront',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 850,
          imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          amenities: ['Private Pool', 'Ocean View', 'Chef Service', 'Daily Housekeeping', 'Spa Room', 'Yoga Deck'],
          description: 'Luxurious beachfront villa with 3 bedrooms, perfect for intimate groups seeking privacy and tranquility.',
          type: 'villa'
        },
        {
          id: 'villa-rosa',
          name: 'Villa Rosa Blanca',
          location: 'Cap Cana Golf Resort',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 950,
          imageUrl: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800',
          amenities: ['Infinity Pool', 'Golf Course Access', 'Butler Service', 'Gourmet Kitchen', 'Cinema Room', 'Gym'],
          description: 'Elegant villa in exclusive golf community with premium amenities and world-class service.',
          type: 'villa'
        },
        {
          id: 'villa-azure',
          name: 'Villa Azure Dreams',
          location: 'Bavaro Beach',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 750,
          imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
          amenities: ['Private Beach Access', 'Outdoor Lounge', 'BBQ Area', 'Full Kitchen', 'Garden', 'Beach Equipment'],
          description: 'Charming beachside villa with direct beach access and tropical gardens, ideal for relaxed coastal living.',
          type: 'villa'
        },
        {
          id: 'villa-palms',
          name: 'Casa de las Palmas',
          location: 'Las Terrenas',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 800,
          imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
          amenities: ['Plunge Pool', 'Rooftop Terrace', 'Hammocks', 'Modern Kitchen', 'AC Throughout', 'Concierge'],
          description: 'Modern tropical retreat with stunning rooftop views and intimate pool area surrounded by palm trees.',
          type: 'villa'
        },
        {
          id: 'villa-sunset',
          name: 'Villa Sunset Cove',
          location: 'Cabarete Bay',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 820,
          imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
          amenities: ['Ocean Views', 'Private Pool', 'Outdoor Dining', 'WiFi', 'BBQ Grill', 'Beach Towels'],
          description: 'Spectacular sunset views from every room, with wraparound terraces and refreshing ocean breezes.',
          type: 'villa'
        },
        {
          id: 'villa-orchid',
          name: 'Villa Orchid Garden',
          location: 'Samana Peninsula',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 780,
          imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          amenities: ['Lush Gardens', 'Natural Pool', 'Meditation Space', 'Organic Kitchen', 'Waterfall View', 'Spa Bath'],
          description: 'Eco-luxury villa nestled in tropical gardens with natural rock pools and waterfall views.',
          type: 'villa'
        },
        {
          id: 'villa-crystal',
          name: 'Villa Crystal Waters',
          location: 'Punta Cana Marina',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 900,
          imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
          amenities: ['Marina Views', 'Infinity Pool', 'Modern Design', 'Smart Home', 'Wine Cellar', 'Concierge'],
          description: 'Ultra-modern villa with cutting-edge design overlooking the marina and crystal-clear waters.',
          type: 'villa'
        },
        {
          id: 'villa-breeze',
          name: 'Villa Trade Winds',
          location: 'Juan Dolio',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 720,
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          amenities: ['Beachfront', 'Pool', 'Tropical Decor', 'Full Kitchen', 'Game Room', 'Patio'],
          description: 'Classic Caribbean villa with authentic tropical charm and steps from pristine beach.',
          type: 'villa'
        },
        {
          id: 'villa-emerald',
          name: 'Villa Emerald Bay',
          location: 'Sosua Ocean Village',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 880,
          imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
          amenities: ['Clifftop Location', 'Panoramic Views', 'Heated Pool', 'Outdoor Bar', 'Fire Pit', 'Premium Linens'],
          description: 'Stunning clifftop villa with breathtaking ocean panoramas and luxurious outdoor living spaces.',
          type: 'villa'
        },
        {
          id: 'villa-paradise-small',
          name: 'Villa Paradise Petit',
          location: 'Las Galeras',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 760,
          imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
          amenities: ['Secluded Beach', 'Natural Pool', 'Jungle Setting', 'Outdoor Shower', 'Hammock Area', 'Kayaks'],
          description: 'Hidden gem on secluded beach with natural jungle surroundings and ultimate privacy.',
          type: 'villa'
        },
        {
          id: 'villa-moonlight',
          name: 'Villa Moonlight Terrace',
          location: 'Cabrera Cliffs',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 840,
          imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
          amenities: ['Stargazing Deck', 'Pool', 'BBQ Kitchen', 'Fire Place', 'Library', 'Yoga Platform'],
          description: 'Romantic clifftop retreat with spectacular night sky views and serene outdoor spaces.',
          type: 'villa'
        },
        {
          id: 'villa-coral',
          name: 'Villa Coral Reef',
          location: 'Bayahibe Coast',
          capacity: 6,
          minCapacity: 2,
          pricePerNight: 870,
          imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
          amenities: ['Snorkeling Access', 'Beach Cabana', 'Pool', 'Outdoor Kitchen', 'Diving Equipment', 'Beach Kayaks'],
          description: 'Beachfront villa with direct access to protected coral reef, perfect for water enthusiasts.',
          type: 'villa'
        }
      );
    }

    // Medium groups (7-12): Large villas or boutique hotels - 12 options
    if (groupData.groupSize >= 7 && groupData.groupSize <= 12) {
      properties.push(
        {
          id: 'villa-paradise',
          name: 'Villa Paradise Estate',
          location: 'Casa de Campo',
          capacity: 12,
          minCapacity: 7,
          pricePerNight: 1500,
          imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
          amenities: ['Multiple Pools', 'Beach Access', 'Full Staff', 'Spa Facilities', 'Event Space', 'Tennis Court'],
          description: 'Expansive luxury estate with 6 bedrooms, ideal for group celebrations and wellness retreats.',
          type: 'villa'
        },
        {
          id: 'hotel-boutique',
          name: 'The Sanctuary Boutique Hotel',
          location: 'Bavaro Beach',
          capacity: 15,
          minCapacity: 7,
          pricePerNight: 450,
          imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          amenities: ['Spa', 'Restaurant', 'Beach Club', 'Concierge', 'Wellness Center', 'Rooftop Terrace'],
          description: 'Intimate boutique hotel with personalized service and dedicated wellness facilities.',
          type: 'hotel'
        },
        {
          id: 'villa-grande-vista',
          name: 'Villa Grande Vista',
          location: 'Punta Cana Hills',
          capacity: 12,
          minCapacity: 7,
          pricePerNight: 1650,
          imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          amenities: ['Hilltop Views', '2 Pools', 'Chef Kitchen', 'Game Room', 'Home Theater', 'Gym'],
          description: 'Magnificent hilltop estate with panoramic views and resort-style amenities for larger groups.',
          type: 'villa'
        },
        {
          id: 'hotel-costa',
          name: 'Hotel Costa Hermosa',
          location: 'Las Terrenas Downtown',
          capacity: 14,
          minCapacity: 7,
          pricePerNight: 380,
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          amenities: ['Pool Bar', 'Restaurant', 'Beach Shuttle', 'Tour Desk', 'Spa Services', 'Group Lounge'],
          description: 'Charming beachside hotel with excellent group facilities and authentic Dominican hospitality.',
          type: 'hotel'
        },
        {
          id: 'villa-royal',
          name: 'Villa Royal Palms',
          location: 'Cap Cana Exclusive',
          capacity: 12,
          minCapacity: 7,
          pricePerNight: 1800,
          imageUrl: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800',
          amenities: ['Butler Service', 'Golf Cart', 'Private Chef', 'Beach Club Access', 'Wine Cellar', 'Massage Room'],
          description: 'Ultra-luxury villa in gated golf resort with five-star butler service and exclusive amenities.',
          type: 'villa'
        },
        {
          id: 'resort-wellness',
          name: 'Wellness Resort & Spa',
          location: 'Samaná Bay',
          capacity: 16,
          minCapacity: 7,
          pricePerNight: 420,
          imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
          amenities: ['Full Spa', 'Yoga Studio', 'Healthy Restaurant', 'Meditation Gardens', 'Fitness Center', 'Pool'],
          description: 'Dedicated wellness resort with holistic programs and recovery-focused amenities.',
          type: 'resort'
        },
        {
          id: 'villa-celebration',
          name: 'Villa Celebration Manor',
          location: 'Punta Cana Beach District',
          capacity: 12,
          minCapacity: 7,
          pricePerNight: 1550,
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          amenities: ['Party Terrace', 'DJ System', 'Pool Bar', 'Event Lighting', 'Catering Kitchen', 'Dance Floor'],
          description: 'Perfect celebration villa with entertainment-focused design and spaces for memorable events.',
          type: 'villa'
        },
        {
          id: 'villa-hacienda',
          name: 'Hacienda del Mar',
          location: 'Cabrera Coastline',
          capacity: 12,
          minCapacity: 7,
          pricePerNight: 1400,
          imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          amenities: ['Colonial Architecture', 'Courtyard Pool', 'Staff Quarters', 'Full Kitchen', 'Gardens', 'Ocean Views'],
          description: 'Restored colonial hacienda with authentic Dominican elegance and modern luxury amenities.',
          type: 'villa'
        },
        {
          id: 'hotel-marina-bay',
          name: 'Marina Bay Hotel',
          location: 'Cap Cana Marina',
          capacity: 15,
          minCapacity: 7,
          pricePerNight: 480,
          imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
          amenities: ['Marina Access', 'Yacht Charters', 'Seafood Restaurant', 'Rooftop Pool', 'Spa', 'Water Sports'],
          description: 'Upscale marina hotel with yacht access and waterfront dining, ideal for adventure groups.',
          type: 'hotel'
        },
        {
          id: 'villa-infinity',
          name: 'Villa Infinity Heights',
          location: 'Sosua Hills',
          capacity: 12,
          minCapacity: 7,
          pricePerNight: 1600,
          imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
          amenities: ['Infinity Pool', '360° Views', 'Modern Design', 'Entertainment System', 'Wine Room', 'Spa Bath'],
          description: 'Contemporary masterpiece with infinity pool overlooking the Caribbean and sophisticated interiors.',
          type: 'villa'
        },
        {
          id: 'resort-paradise',
          name: 'Paradise Bay Resort',
          location: 'Bayahibe Beach',
          capacity: 14,
          minCapacity: 7,
          pricePerNight: 400,
          imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
          amenities: ['All Meals Included', 'Beach Bar', 'Water Sports', 'Nightly Entertainment', 'Pool', 'Spa Discounts'],
          description: 'All-inclusive resort with group-friendly rates and comprehensive amenities for carefree relaxation.',
          type: 'resort'
        },
        {
          id: 'villa-tropical-oasis',
          name: 'Villa Tropical Oasis',
          location: 'Las Galeras Jungle',
          capacity: 12,
          minCapacity: 7,
          pricePerNight: 1350,
          imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
          amenities: ['Jungle Setting', 'Natural Pools', 'Outdoor Cinema', 'Fire Pit', 'Treehouse Lounge', 'Hiking Trails'],
          description: 'Unique jungle retreat with natural pools and treehouse lounges for an adventurous escape.',
          type: 'villa'
        }
      );
    }

    // Large groups (13+): Multiple nearby properties or villa compounds - 12 options
    if (groupData.groupSize >= 13) {
      properties.push(
        {
          id: 'villa-compound',
          name: 'Private Villa Compound (2-3 Properties)',
          location: 'La Romana Beachfront',
          capacity: 24,
          minCapacity: 13,
          pricePerNight: 2200,
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          amenities: ['Multiple Adjacent Villas', 'Shared Pool & Facilities', 'Private Chef Team', 'Event Staff', 'Beach Access', 'Full Privacy'],
          description: 'Adjacent luxury villas within walking distance, functioning as a private compound with ultimate flexibility.',
          type: 'villa'
        },
        {
          id: 'estate-collection',
          name: 'Luxury Estate Collection - Nearby Villas',
          location: 'Cap Cana Community',
          capacity: 30,
          minCapacity: 13,
          pricePerNight: 1800,
          imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
          amenities: ['3-4 Nearby Villas', 'Shared Golf Cart Access', 'Community Amenities', 'Coordinated Staff', 'Private Beach Club', 'Group Transport'],
          description: 'Curated collection of luxury villas in the same exclusive community, perfect for large groups who want both privacy and togetherness.',
          type: 'villa'
        },
        {
          id: 'resort-grand-celebration',
          name: 'Grand Celebration Resort',
          location: 'Punta Cana All-Inclusive Zone',
          capacity: 40,
          minCapacity: 13,
          pricePerNight: 350,
          imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
          amenities: ['All-Inclusive', 'Group Coordinator', 'Multiple Restaurants', 'Spa', 'Activities Program', 'Private Event Space'],
          description: 'Full-service all-inclusive resort with dedicated group coordinator and extensive facilities.',
          type: 'resort'
        },
        {
          id: 'villa-mega-estate',
          name: 'Mega Estate - Full Property Buyout',
          location: 'Casa de Campo Exclusive',
          capacity: 28,
          minCapacity: 13,
          pricePerNight: 3500,
          imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
          amenities: ['Full Estate', '12 Bedrooms', 'Multiple Pools', 'Full Staff', 'Golf Course', 'Private Beach', 'Helipad'],
          description: 'Ultimate luxury mega-estate with 12 bedrooms, multiple pools, and complete privacy for grand celebrations.',
          type: 'villa'
        },
        {
          id: 'compound-beachfront',
          name: 'Beachfront Villa Compound',
          location: 'Bavaro Premium Beach',
          capacity: 26,
          minCapacity: 13,
          pricePerNight: 2400,
          imageUrl: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800',
          amenities: ['3 Adjacent Villas', 'Private Beach', 'Shared Facilities', 'Chef Service', 'Event Planning', 'Water Sports'],
          description: 'Three interconnected beachfront villas with shared amenities and direct beach access.',
          type: 'villa'
        },
        {
          id: 'hotel-group-tower',
          name: 'Group Tower at Luxury Hotel',
          location: 'Santo Domingo Colonial',
          capacity: 35,
          minCapacity: 13,
          pricePerNight: 280,
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          amenities: ['Entire Floor', 'Private Lounge', 'Concierge', 'Restaurant Access', 'Rooftop Access', 'Meeting Rooms'],
          description: 'Exclusive floor of luxury hotel with private lounge and dedicated services for large groups.',
          type: 'hotel'
        },
        {
          id: 'villa-cluster-golf',
          name: 'Golf Villa Cluster',
          location: 'Punta Cana Golf Resort',
          capacity: 32,
          minCapacity: 13,
          pricePerNight: 2100,
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          amenities: ['4 Nearby Villas', 'Golf Included', 'Golf Carts', 'Clubhouse Access', 'Pool', 'Tennis Courts'],
          description: 'Four luxury villas clustered around golf course with included golf and resort amenities.',
          type: 'villa'
        },
        {
          id: 'resort-wellness-retreat',
          name: 'Wellness Retreat Resort',
          location: 'Samaná Peninsula',
          capacity: 45,
          minCapacity: 13,
          pricePerNight: 380,
          imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
          amenities: ['Full Spa Program', 'Yoga Pavilion', 'Healthy Dining', 'Group Classes', 'Meditation Gardens', 'Recovery Focus'],
          description: 'Dedicated wellness resort with comprehensive recovery programs ideal for post-procedure groups.',
          type: 'resort'
        },
        {
          id: 'compound-luxury-cabins',
          name: 'Luxury Cabin Compound',
          location: 'Jarabacoa Mountains',
          capacity: 30,
          minCapacity: 13,
          pricePerNight: 1600,
          imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
          amenities: ['Mountain Setting', 'Multiple Cabins', 'Central Lodge', 'Hiking', 'Waterfalls', 'Adventure Activities'],
          description: 'Unique mountain compound with luxury cabins and adventure activities for nature-loving groups.',
          type: 'villa'
        },
        {
          id: 'estate-celebration-manor',
          name: 'Celebration Manor Estate',
          location: 'Cap Cana Exclusive',
          capacity: 24,
          minCapacity: 13,
          pricePerNight: 2800,
          imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
          amenities: ['Event Spaces', 'DJ Equipment', 'Catering Kitchen', 'Dance Floor', 'Pools', 'Full Staff'],
          description: 'Purpose-built celebration estate with professional event facilities and entertainment systems.',
          type: 'villa'
        },
        {
          id: 'resort-adults-luxury',
          name: 'Adults-Only Luxury Resort',
          location: 'Uvero Alto Beach',
          capacity: 50,
          minCapacity: 13,
          pricePerNight: 420,
          imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
          amenities: ['Adults Only', 'All-Inclusive', 'Multiple Pools', 'Spa', 'Gourmet Dining', 'Group Coordinator'],
          description: 'Sophisticated adults-only resort with refined atmosphere and comprehensive group services.',
          type: 'resort'
        },
        {
          id: 'compound-marina-villas',
          name: 'Marina Villa Compound',
          location: 'Cap Cana Marina District',
          capacity: 28,
          minCapacity: 13,
          pricePerNight: 2600,
          imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
          amenities: ['Marina Views', '3 Villas', 'Yacht Access', 'Water Sports', 'Restaurants Nearby', 'Concierge'],
          description: 'Three modern marina villas with yacht charter access and upscale waterfront lifestyle.',
          type: 'villa'
        }
      );
    }

    return properties;
  };

  const availableProperties = getAvailableProperties();

  const toggleProperty = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const getMaxSelections = () => {
    // Allow selecting multiple properties for voting if group is large
    if (groupData.groupSize >= 13) return 3;
    if (groupData.groupSize >= 7) return 2;
    return 1;
  };

  const canProceed = selectedProperties.length > 0 && selectedProperties.length <= getMaxSelections();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Logo size="md" />
        </div>
      </div>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
              Select Your Group Sanctuary
            </h1>
            <p className="text-gray-600 mb-6" style={{ fontSize: '1.125rem' }}>
              Choose properties for your group to vote on (max {getMaxSelections()})
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full">
              <Users className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} />
              <span className="text-sm">
                <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>{groupData.groupSize} guests</span>
                {' '}- Properties filtered for your group size
              </span>
            </div>
          </div>

          {/* Voting Instructions */}
          <div className="mb-8 p-6 border-2 rounded-lg" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fffbfc' }}>
            <h3 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
              🗳️ How Group Voting Works
            </h3>
            <p className="text-sm text-gray-600">
              Select {getMaxSelections() === 1 ? 'the property' : `up to ${getMaxSelections()} properties`} you'd like your group to consider. 
              Once members join, they'll vote on their preferred option in the booking portal. 
              {groupData.groupSize >= 13 && ' For large groups, multiple nearby villas or properties within the same community may be booked to ensure everyone stays close together while maintaining privacy.'}
            </p>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {availableProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-xl"
                style={{
                  borderColor: selectedProperties.includes(property.id) ? 'var(--bt-gold)' : '#e5e7eb'
                }}
                onClick={() => toggleProperty(property.id)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.imageUrl} 
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProperties.includes(property.id) && (
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs text-white" style={{ backgroundColor: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {property.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    {property.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {property.description}
                  </p>

                  {/* Capacity & Price */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4" style={{ color: 'var(--bt-gold)' }} />
                        <span className="text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                          Sleeps {property.capacity}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">Min {property.minCapacity} guests</span>
                    </div>
                    <div className="text-right">
                      <p style={{ fontSize: '1.25rem', color: 'var(--bt-gold)', fontWeight: '700' }}>
                        ${property.pricePerNight}
                      </p>
                      <span className="text-xs text-gray-500">per night</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100"
                          style={{ color: 'var(--bt-charcoal)' }}
                        >
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 4 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          +{property.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedProperties.includes(property.id)}
                        onCheckedChange={() => toggleProperty(property.id)}
                      />
                      <span className="text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '500' }}>
                        Add to voting options
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Selected Count */}
          {selectedProperties.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm">
                <span style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
                  {selectedProperties.length} {selectedProperties.length === 1 ? 'property' : 'properties'}
                </span>
                {' '}selected for group voting
                {selectedProperties.length > getMaxSelections() && (
                  <span className="text-red-500 ml-2">
                    (Maximum {getMaxSelections()} allowed)
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={onBack}
              className="px-8 py-4 border-2"
              style={{ 
                borderColor: 'var(--bt-charcoal)',
                color: 'var(--bt-charcoal)',
                backgroundColor: 'white'
              }}
            >
              Back
            </Button>

            <Button
              onClick={() => onComplete(selectedProperties)}
              disabled={!canProceed}
              className="px-12 py-4 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 rounded-full"
              style={{ 
                backgroundColor: canProceed ? 'var(--bt-gold)' : '#d1d5db',
                fontSize: '1.125rem',
                fontWeight: '500'
              }}
            >
              Continue to Celebration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
