import React, { useEffect, useMemo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Check, ArrowRight, Star, Award, Briefcase, GraduationCap, MapPin } from 'lucide-react';

interface Specialist {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  specialties: string[];
  experience: string;
  image: string;
  rating: number;
  reviews: number;
  bio: string;
  procedureTags: string[]; // Procedure IDs this specialist is qualified for
  areaOfFocus: string; // Display name for their specialty
  yearsExperience: number;
  accreditation: string;
  clinicLocations: string[]; // Clinic locations (Santo Domingo, Punta Cana)
}

interface Step3SpecialistsProps {
  onNext: () => void;
  onBack: () => void;
  selectedSpecialist: string;
  setSelectedSpecialist: (spec: string) => void;
  selectedProcedures: string[]; // NEW: Passed from Step 2
}

export function Step3Specialists({ onNext, onBack, selectedSpecialist, setSelectedSpecialist, selectedProcedures }: Step3SpecialistsProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const specialists: Specialist[] = [
    {
      id: 'dr-martinez',
      name: 'Dr. Isabella Martínez',
      title: 'Board Certified Aesthetic and Reconstructive Surgeon',
      credentials: ['MD - University of Miami', 'Board Certified - AAAM', 'Advanced Injectables Fellowship - Paris'],
      specialties: ['BOTOX & Fillers', 'Non-Surgical Face Lift', 'Advanced Injectables'],
      experience: '14 years in aesthetic medicine',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDQxMjk5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 487,
      bio: 'Dr. Martínez is renowned for her signature approach to natural-looking, elevated results. With dual training in Miami and Paris, she brings European precision to every treatment.',
      procedureTags: ['botox-fillers', 'tear-trough', 'non-surgical-rhino', 'pdo-threads'],
      areaOfFocus: 'Injectables & Facial Aesthetics',
      yearsExperience: 14,
      accreditation: 'AAAM International',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'dr-rodriguez',
      name: 'Dr. Rafael Rodriguez',
      title: 'Board Certified Cosmetic and Restorative Dentist',
      credentials: ['DDS - NYU College of Dentistry', 'AACD Accredited Member', 'E-Max Veneers Master Certification'],
      specialties: ['Porcelain Veneers', 'Smile Design', 'Cosmetic Bonding'],
      experience: '16 years in cosmetic dentistry',
      image: 'https://images.unsplash.com/photo-1612943733919-f9661f1331f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MTY0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 412,
      bio: 'Dr. Rodriguez has transformed over 3,000 smiles with his meticulous artistry and commitment to natural aesthetics. His E-Max veneer work is internationally recognized for exceptional quality.',
      procedureTags: ['veneers', 'whitening', 'night-guards'],
      areaOfFocus: 'Smile Transformation & Veneers',
      yearsExperience: 16,
      accreditation: 'AACD Accredited',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'dr-reyes',
      name: 'Dr. Carmen Reyes',
      title: 'Board Certified MedSpa Medical Director',
      credentials: ['MD - Johns Hopkins University', 'Advanced HIFU & RF Technologies', 'European Aesthetic Medicine Fellowship'],
      specialties: ['Body Contouring', 'RF Skin Tightening', 'Non-Invasive Aesthetics'],
      experience: '12 years in non-invasive aesthetics',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800',
      rating: 5.0,
      reviews: 356,
      bio: 'Dr. Reyes specializes in cutting-edge non-invasive body sculpting technologies. Her holistic approach combines advanced equipment with personalized treatment protocols for optimal results.',
      procedureTags: ['coolsculpting', 'sclerotherapy', 'hydrafacial', 'laser-resurfacing', 'pdo-threads'],
      areaOfFocus: 'Body Contouring & Non-Invasive Treatments',
      yearsExperience: 12,
      accreditation: 'Johns Hopkins Certified',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'dr-morales',
      name: 'Dr. Luis Morales',
      title: 'Board Certified Hair Restoration Surgeon',
      credentials: ['MD - International Society of Hair Restoration', 'FUE Micro-Grafting Specialist', 'ISHRS Fellowship'],
      specialties: ['Hair Transplants', 'Beard Restoration', 'Follicular Unit Extraction'],
      experience: '18 years in hair restoration',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800',
      rating: 5.0,
      reviews: 523,
      bio: 'Dr. Morales is one of the Caribbean\'s most sought-after hair restoration specialists. His advanced FUE technique delivers natural, undetectable results with minimal downtime.',
      procedureTags: ['hair-transplant', 'beard-transplant'],
      areaOfFocus: 'Hair & Beard Restoration',
      yearsExperience: 18,
      accreditation: 'ISHRS Certified',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-diaz',
      name: 'María Díaz, RN',
      title: 'Master Permanent Makeup Artist & Aesthetician',
      credentials: ['RN License - DR Ministry of Health', 'PhiBrows Master Certification', 'International PMU Training'],
      specialties: ['Microblading', 'Lip Blush', 'Powder Brows'],
      experience: '10 years in semi-permanent makeup',
      image: 'https://images.unsplash.com/photo-1670191069225-f992139f6545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlc3RoZXRpY2lhbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjA1NTE4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 298,
      bio: 'María is celebrated for her precision and artistry in semi-permanent makeup. Her bespoke approach ensures every client receives customized, confidence-boosting results.',
      procedureTags: ['microblading', 'balayage', 'hair-extensions', 'luxury-manicure'],
      areaOfFocus: 'Semi-Permanent Makeup & Luxury Styling',
      yearsExperience: 10,
      accreditation: 'PhiBrows International',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'dr-santos',
      name: 'Dr. Alejandro Santos',
      title: 'Board Certified Aesthetic Physician',
      credentials: ['MD - Universidad Autónoma de Santo Domingo', 'ASLMS Laser Certification', 'Advanced Dermatology Training - Barcelona'],
      specialties: ['Laser Treatments', 'Skin Resurfacing', 'Advanced Injectables'],
      experience: '11 years in aesthetic medicine',
      image: 'https://images.unsplash.com/photo-1758691463605-f4a3a92d6d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwbWFsZXxlbnwxfHx8fDE3NjA1NTE4NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 389,
      bio: 'Dr. Santos combines medical precision with aesthetic artistry. Trained in Barcelona\'s leading aesthetic centers, he specializes in laser technologies and minimally invasive facial rejuvenation.',
      procedureTags: ['laser-resurfacing', 'botox-fillers', 'tear-trough', 'non-surgical-rhino', 'hydrafacial'],
      areaOfFocus: 'Laser & Skin Rejuvenation',
      yearsExperience: 11,
      accreditation: 'ASLMS Certified',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'dr-gomez',
      name: 'Dr. Sofía Gómez',
      title: 'Board Certified Cosmetic Dentist & Prosthodontist',
      credentials: ['DDS - Universidad Iberoamericana', 'Prosthodontics Specialist - USC', 'Digital Smile Design Certification'],
      specialties: ['Complete Smile Makeovers', 'Veneers & Crowns', 'Full Mouth Reconstruction'],
      experience: '13 years in cosmetic dentistry',
      image: 'https://images.unsplash.com/photo-1576669801945-7a346954da5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwd29tYW4lMjBkb2N0b3J8ZW58MXx8fHwxNzYwNTUxODYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 445,
      bio: 'Dr. Gómez is a dual-trained dentist and prosthodontist who creates transformative smile designs. Her USC training and Digital Smile Design expertise ensure precision-crafted, life-changing results.',
      procedureTags: ['veneers', 'whitening', 'night-guards'],
      areaOfFocus: 'Digital Smile Design & Prosthodontics',
      yearsExperience: 13,
      accreditation: 'USC Prosthodontics',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-rivera',
      name: 'Elena Rivera, RN',
      title: 'Master Aesthetic Nurse & Laser Technician',
      credentials: ['RN - Advanced Aesthetics License', 'Certified Laser Safety Officer', 'International Dermal Fillers Training'],
      specialties: ['HydraFacial', 'Laser Hair Removal', 'Medical-Grade Facials'],
      experience: '9 years in medical aesthetics',
      image: 'https://images.unsplash.com/photo-1758204054877-fb1c7ba85ea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdvbWFuJTIwbnVyc2UlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1NTI3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 367,
      bio: 'Elena brings clinical expertise and a gentle touch to every treatment. Her advanced training in aesthetic nursing ensures safe, effective treatments with exceptional patient comfort and care.',
      procedureTags: ['hydrafacial', 'laser-resurfacing', 'coolsculpting', 'luxury-manicure'],
      areaOfFocus: 'Medical-Grade Skin Treatments',
      yearsExperience: 9,
      accreditation: 'Laser Safety Officer',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-fernandez',
      name: 'Carlos Fernández',
      title: 'Master Hair Stylist & Color Specialist',
      credentials: ['Vidal Sassoon Academy Graduate', 'Advanced Color Theory Certification', 'European Extension Specialist'],
      specialties: ['Balayage', 'Color Correction', 'Luxury Hair Extensions'],
      experience: '15 years in luxury hair styling',
      image: 'https://images.unsplash.com/photo-1656587324100-6bb6a6223a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwaGFpcnN0eWxpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1NTIxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 412,
      bio: 'Carlos trained at Vidal Sassoon in London and has styled for international fashion weeks. His color artistry and extension work have made him one of the Caribbean\'s most sought-after stylists.',
      procedureTags: ['balayage', 'hair-extensions'],
      areaOfFocus: 'Luxury Hair Color & Extensions',
      yearsExperience: 15,
      accreditation: 'Vidal Sassoon Certified',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-valdez',
      name: 'Isabela Valdez',
      title: 'Celebrity Hair Stylist & Bridal Specialist',
      credentials: ['Toni&Guy Advanced Academy', 'Bridal Styling Master Certification', 'Keratin Treatment Specialist'],
      specialties: ['Bridal Hair', 'Blowouts', 'Hair Treatments'],
      experience: '12 years in luxury hair styling',
      image: 'https://images.unsplash.com/photo-1562940215-4314619607a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyc3R5bGlzdCUyMHN0eWxpbmclMjBjbGllbnQlMjBzYWxvbnxlbnwxfHx8fDE3NjA1NTI3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 391,
      bio: 'Isabela has styled countless brides and celebrities throughout the Caribbean. Her expertise in creating timeless, elegant styles combined with advanced hair treatments makes her the go-to stylist for transformative results.',
      procedureTags: ['balayage', 'hair-extensions', 'luxury-manicure'],
      areaOfFocus: 'Bridal & Celebrity Styling',
      yearsExperience: 12,
      accreditation: 'Toni&Guy Certified',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'dr-vega',
      name: 'Dr. Ricardo Vega',
      title: 'Board Certified Vascular & Interventional Physician',
      credentials: ['MD - Universidad Nacional Pedro Henríquez Ureña', 'Vascular Surgery Fellowship - Mount Sinai', 'ABVLM Certified'],
      specialties: ['Sclerotherapy', 'Varicose Vein Treatment', 'Vascular Aesthetics'],
      experience: '17 years in vascular medicine',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0cmFpdCUyMG1hbGV8ZW58MXx8fHwxNzYwNTUyNzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 456,
      bio: 'Dr. Vega is a vascular specialist trained at Mount Sinai Hospital in New York. His expertise in minimally invasive vein treatments delivers both cosmetic and health benefits with exceptional safety and precision.',
      procedureTags: ['sclerotherapy'],
      areaOfFocus: 'Vascular Aesthetics & Spider Vein Treatment',
      yearsExperience: 17,
      accreditation: 'ABVLM Board Certified',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-ocean',
      name: 'Camila Ocean, LMT',
      title: 'Master Massage Therapist & Wellness Specialist',
      credentials: ['Licensed Massage Therapist - 2000+ Hours', 'Lymphatic Drainage Specialist Certification', 'Cupping Therapy Master'],
      specialties: ['Lymphatic Drainage', 'Deep Tissue Massage', 'Cupping Therapy'],
      experience: '14 years in therapeutic massage',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNzYWdlJTIwdGhlcmFwaXN0JTIwd29tYW58ZW58MXx8fHwxNzYwNTUyNzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 512,
      bio: 'Camila specializes in post-procedure recovery massage with advanced lymphatic drainage techniques. Her healing touch accelerates recovery while providing ultimate relaxation and comfort.',
      procedureTags: ['therapeutic-massage', 'lymphatic-massage', 'cupping-therapy'],
      areaOfFocus: 'Recovery & Therapeutic Massage',
      yearsExperience: 14,
      accreditation: 'International Lymphatic Therapy',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-santos-spa',
      name: 'Valentina Santos',
      title: 'Luxury Spa Director & Holistic Wellness Expert',
      credentials: ['International Spa Management Certification', 'Ayurvedic Body Therapy Training', 'Organic Skincare Formulation'],
      specialties: ['Body Scrubs & Wraps', 'Holistic Treatments', 'Wellness Rituals'],
      experience: '16 years in luxury spa services',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBzcGVjaWFsaXN0JTIwd29tYW58ZW58MXx8fHwxNzYwNTUyNzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 478,
      bio: 'Valentina has curated spa experiences for 5-star resorts across the Caribbean. Her holistic approach combines ancient wellness traditions with modern luxury, creating transformative body treatments.',
      procedureTags: ['body-scrub', 'aromatic-blends'],
      areaOfFocus: 'Luxury Spa Treatments & Wellness',
      yearsExperience: 16,
      accreditation: 'ISPA Certified Director',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-moreno',
      name: 'Daniela Moreno',
      title: 'Celebrity Image Consultant & Personal Stylist',
      credentials: ['Fashion Institute of Technology Graduate', 'Certified Color Analysis Specialist', 'Body Type Styling Expert'],
      specialties: ['Wardrobe Analysis', 'Color Theory', 'Personal Shopping'],
      experience: '11 years in image consulting',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGlzdCUyMHdvbWFufGVufDF8fHx8MTc2MDU1Mjc2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 334,
      bio: 'Daniela trained at FIT in New York and has styled executives, celebrities, and entrepreneurs throughout Latin America. Her expertise in color analysis and body-type dressing transforms how clients present themselves to the world.',
      procedureTags: ['colometry', 'wardrobe-analysis'],
      areaOfFocus: 'Image Consulting & Personal Styling',
      yearsExperience: 11,
      accreditation: 'FIT Certified',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    },
    {
      id: 'specialist-luna',
      name: 'Sofia Luna',
      title: 'Master Brow & Lash Artist',
      credentials: ['PhiBrows Master Certification', 'Russian Volume Lash Training', 'Brow Lamination Specialist'],
      specialties: ['Brow Lamination', 'Lash Extensions', 'Brow Shaping'],
      experience: '8 years in brow & lash artistry',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjB0ZWNobmljaWFuJTIwd29tYW58ZW58MXx8fHwxNzYwNTUyNzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 423,
      bio: 'Sofia is a PhiBrows-certified master artist who creates perfectly sculpted brows and dramatic lash extensions. Her precision and artistry have made her one of the most booked brow specialists in the Dominican Republic.',
      procedureTags: ['brow-lamination', 'lash-extensions'],
      areaOfFocus: 'Brow & Lash Enhancement',
      yearsExperience: 8,
      accreditation: 'PhiBrows Master',
      clinicLocations: ['Santo Domingo', 'Punta Cana']
    }
  ];

  // Filter specialists based on selected procedures
  const filteredSpecialists = useMemo(() => {
    if (!selectedProcedures || selectedProcedures.length === 0) {
      return specialists;
    }

    return specialists.filter(specialist => 
      selectedProcedures.some(procedureId => 
        specialist.procedureTags.includes(procedureId)
      )
    );
  }, [selectedProcedures]);

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 style={{ fontSize: '3rem', color: 'var(--bt-charcoal)', marginBottom: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            Select Your Trusted Specialist
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4" style={{ fontSize: '1.125rem' }}>
            Internationally certified experts with US/European training, curated for excellence. Only specialists qualified for your selected treatments are shown below.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--bt-charcoal)' }}>
            <MapPin className="w-4 h-4" style={{ color: 'var(--bt-gold)' }} />
            <span>All specialists available in <strong style={{ color: 'var(--bt-gold)' }}>Santo Domingo</strong> and <strong style={{ color: 'var(--bt-gold)' }}>Punta Cana</strong></span>
          </div>
        </div>

        {/* Ultimate Curator's Match Message - Show when only 1 specialist */}
        {filteredSpecialists.length === 1 && (
          <div className="mb-12 p-8 border-2 rounded-lg" style={{ 
            borderColor: 'var(--bt-gold)',
            backgroundColor: 'var(--bt-blush)'
          }}>
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--bt-gold)' }} />
              <div>
                <h3 className="mb-2" style={{ 
                  fontSize: '1.5rem',
                  color: 'var(--bt-gold)',
                  fontWeight: '700',
                  letterSpacing: '-0.01em'
                }}>
                  The Ultimate Curator's Match
                </h3>
                <p style={{ 
                  color: 'var(--bt-charcoal)',
                  fontSize: '1.125rem',
                  lineHeight: '1.6'
                }}>
                  Based on your selected treatments, The Beauty Trip has matched you with the single premier authority in this specialty to ensure uncompromising quality and exceptional results.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No Specialists Found */}
        {filteredSpecialists.length === 0 && (
          <div className="mb-12 p-8 border-2 rounded-lg text-center" style={{ 
            borderColor: 'var(--bt-blush)',
            backgroundColor: '#fafafa'
          }}>
            <p className="text-gray-600" style={{ fontSize: '1.125rem' }}>
              No specialists found for your selected procedures. Please go back and select different treatments.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredSpecialists.map((specialist) => (
            <div
              key={specialist.id}
              className="text-left group relative overflow-hidden transition-all duration-300 bg-white"
              style={{
                border: selectedSpecialist === specialist.id 
                  ? '3px solid var(--bt-gold)' 
                  : '1px solid rgba(0,0,0,0.1)'
              }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={specialist.image} 
                  alt={specialist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-8">
                {/* Area of Focus Badge - Blush Pink */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span 
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full"
                    style={{ 
                      backgroundColor: 'var(--bt-blush)',
                      color: 'white',
                      fontWeight: '600',
                      letterSpacing: '0.02em'
                    }}
                  >
                    ✦ {specialist.areaOfFocus}
                  </span>
                  
                  {/* Clinic Locations */}
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bt-charcoal)' }}>
                    <MapPin className="w-4 h-4" style={{ color: 'var(--bt-gold)' }} />
                    <span className="font-medium">{specialist.clinicLocations.join(' • ')}</span>
                  </div>
                </div>
                
                {/* Specialist Name & Title - Gold Accent */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-2" style={{ 
                      fontSize: '2rem', 
                      color: 'var(--bt-gold)',
                      fontWeight: '700',
                      letterSpacing: '-0.01em'
                    }}>
                      {specialist.name}
                    </h3>
                    <p className="mb-4" style={{ 
                      fontSize: '1rem',
                      color: 'var(--bt-charcoal)',
                      fontWeight: '500',
                      lineHeight: '1.5'
                    }}>
                      {specialist.title}
                    </p>
                  </div>
                  {selectedSpecialist === specialist.id && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-gold)' }}>
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* Bio - Trusted Curator Voice */}
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#fafafa' }}>
                  <p style={{ 
                    color: 'var(--bt-charcoal)',
                    fontSize: '0.95rem',
                    lineHeight: '1.7',
                    fontStyle: 'italic'
                  }}>
                    "{specialist.bio}"
                  </p>
                </div>

                {/* Credentials Highlight - Gold Icons */}
                <div className="mb-6 grid grid-cols-3 gap-4 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--bt-gold)' }}>
                  <div className="text-center">
                    <Award className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--bt-gold)' }} />
                    <p className="text-xs mb-1" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                      {specialist.accreditation}
                    </p>
                  </div>
                  <div className="text-center">
                    <Briefcase className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--bt-gold)' }} />
                    <p className="text-xs mb-1" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                      {specialist.yearsExperience} Years
                    </p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-6 h-6 mx-auto mb-2" fill="var(--bt-gold)" stroke="var(--bt-gold)" />
                    <p className="text-xs mb-1" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                      {specialist.rating} / 5.0
                    </p>
                    <p className="text-xs text-gray-500">{specialist.reviews} reviews</p>
                  </div>
                </div>

                {/* Full Credentials List */}
                <div className="mb-4">
                  <h5 className="text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    <GraduationCap className="w-4 h-4" style={{ color: 'var(--bt-gold)' }} />
                    Professional Credentials
                  </h5>
                  <ul className="space-y-2">
                    {specialist.credentials.map((cred, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties Tags */}
                <div className="mb-4">
                  <h5 className="text-sm mb-3" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                    Areas of Expertise
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {specialist.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 text-xs rounded-full"
                        style={{ 
                          backgroundColor: 'var(--bt-charcoal)',
                          color: 'var(--bt-gold)',
                          fontWeight: '500'
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vetted Partner Badge */}
                <div className="mb-6 p-4 border-l-4" style={{ 
                  borderColor: 'var(--bt-gold)',
                  backgroundColor: '#fffef8'
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm" style={{ color: 'var(--bt-gold)', fontWeight: '700' }}>
                      VETTED PARTNER
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    This specialist has been personally vetted by The Beauty Trip team and meets our uncompromising standards for safety, expertise, and patient care.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => setSelectedSpecialist(specialist.id)}
                    className="w-full px-6 py-4 text-white transition-all duration-300 hover:scale-105 rounded-full"
                    style={{ 
                      backgroundColor: selectedSpecialist === specialist.id ? 'var(--bt-gold)' : 'var(--bt-charcoal)',
                      fontSize: '1rem',
                      fontWeight: '600',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {selectedSpecialist === specialist.id ? '✓ Selected' : 'Select This Specialist'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Virtual consultation scheduling will be available after selecting this specialist.");
                    }}
                    className="w-full px-6 py-3 text-sm border-2 transition-all duration-300 hover:bg-gray-50 rounded-full"
                    style={{ 
                      borderColor: 'var(--bt-gold)', 
                      color: 'var(--bt-gold)',
                      fontWeight: '500'
                    }}
                  >
                    Schedule Virtual Consult
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-8 py-4 border-2 transition-all duration-300 hover:scale-105 rounded-full"
            style={{ 
              borderColor: 'var(--bt-charcoal)',
              color: 'var(--bt-charcoal)'
            }}
          >
            Back to Procedures
          </button>
          <button
            onClick={onNext}
            disabled={!selectedSpecialist}
            className="px-12 py-5 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
            style={{ 
              backgroundColor: 'var(--bt-gold)',
              fontSize: '1.125rem',
              letterSpacing: '0.025em'
            }}
          >
            Select Recovery Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
}
