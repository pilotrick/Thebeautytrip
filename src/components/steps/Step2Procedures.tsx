import { useState, useEffect, useRef } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, Check, BookOpen } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner@2.0.3";
import { PricingCatalogSheet } from "../PricingCatalogSheet";

interface Procedure {
  id: string;
  name: string;
  area: string;
  specialist: string;
  details: string;
  recovery: string;
  price: number;
  usPrice: number;
  requiresConsultation?: boolean; // Requires specialist pre-assessment
}

interface Step2ProceduresProps {
  onNext: () => void;
  onBack: () => void;
  selectedProcedures: string[];
  setSelectedProcedures: (procs: string[]) => void;
  procedureDescriptions?: Record<string, string>;
  setProcedureDescriptions?: (desc: Record<string, string>) => void;
}

export function Step2Procedures({ 
  onNext, 
  onBack, 
  selectedProcedures = [], 
  setSelectedProcedures,
  procedureDescriptions = {},
  setProcedureDescriptions
}: Step2ProceduresProps) {
  const [openAreas, setOpenAreas] = useState<string[]>(['injectables']);
  const [hoveredPrice, setHoveredPrice] = useState<string | null>(null);
  const [localDescriptions, setLocalDescriptions] = useState<Record<string, string>>(procedureDescriptions);
  const [activeDescriptionInput, setActiveDescriptionInput] = useState<string | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [showPricingSheet, setShowPricingSheet] = useState(false);
  const procedureRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Ensure selectedProcedures is always an array
  const safeProcedures = selectedProcedures || [];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const proceduresByArea: Record<string, Procedure[]> = {
    injectables: [
      {
        id: 'botox-basic',
        name: 'BOTOX - Standard Areas (Forehead/Frown/Crow\'s Feet)',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Flat fee up to 20 units for smoothing wrinkles in common areas ($8/unit)',
        recovery: '1-3 days (bruising risk)',
        price: 150,
        usPrice: 400,
        requiresConsultation: false
      },
      {
        id: 'botox-brow-lift',
        name: 'BOTOX - Brow Lift',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Subtle brow elevation (4-8 units)',
        recovery: '1-3 days (bruising risk)',
        price: 64,
        usPrice: 160,
        requiresConsultation: false
      },
      {
        id: 'botox-bunny-lines',
        name: 'BOTOX - Bunny Lines',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Nose wrinkle smoothing (4-8 units)',
        recovery: '1-3 days (bruising risk)',
        price: 64,
        usPrice: 160,
        requiresConsultation: false
      },
      {
        id: 'botox-neck-bands',
        name: 'BOTOX - Neck Bands (Platysmal)',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Neck smoothing and lifting (25-50 units)',
        recovery: '1-3 days (bruising risk)',
        price: 400,
        usPrice: 900,
        requiresConsultation: true
      },
      {
        id: 'botox-hyperhidrosis',
        name: 'BOTOX - Hyperhidrosis (Underarms)',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Excessive sweating treatment (100-200 units)',
        recovery: 'No downtime',
        price: 750,
        usPrice: 1800,
        requiresConsultation: false
      },
      {
        id: 'lip-filler',
        name: 'Lip Augmentation Filler',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'HA filler for fuller, defined lips ($350/syringe)',
        recovery: '2-4 days (swelling risk)',
        price: 350,
        usPrice: 800,
        requiresConsultation: false
      },
      {
        id: 'nasolabial-filler',
        name: 'Nasolabial Folds / Marionette Lines Filler',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Smile line and mouth corner softening ($350/syringe)',
        recovery: '2-4 days (swelling risk)',
        price: 350,
        usPrice: 800,
        requiresConsultation: false
      },
      {
        id: 'cheek-chin-filler',
        name: 'Cheek / Chin / Jawline Augmentation',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Volumizing and contouring filler ($400/syringe)',
        recovery: '2-4 days (swelling risk)',
        price: 400,
        usPrice: 900,
        requiresConsultation: true
      },
      {
        id: 'tear-trough',
        name: 'Tear Trough Filler (Undereye)',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Specialized under-eye filler to reduce dark circles and hollowness ($500/syringe)',
        recovery: '2-4 days (swelling risk)',
        price: 500,
        usPrice: 1200,
        requiresConsultation: true
      },
      {
        id: 'non-surgical-rhino',
        name: 'Non-Surgical Rhinoplasty',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Filler-based nose reshaping for minor corrections and symmetry ($500/syringe)',
        recovery: '2-5 days (swelling/tender)',
        price: 500,
        usPrice: 1200,
        requiresConsultation: true
      },
      {
        id: 'collagen-stimulators',
        name: 'Collagen Stimulators (Sculptra/Radiesse)',
        area: 'Collection A: Injectables & Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Long-lasting volumizing and collagen-building treatment (per vial)',
        recovery: '3-5 days (swelling risk)',
        price: 600,
        usPrice: 1500,
        requiresConsultation: true
      }
    ],
    medical: [
      {
        id: 'pdo-threads-full',
        name: 'PDO Thread Lift - Full Face',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Non-surgical face lift using dissolvable threads for instant lifting (Comprehensive package)',
        recovery: '3-7 days (swelling/tender)',
        price: 2000,
        usPrice: 5000,
        requiresConsultation: true
      },
      {
        id: 'pdo-threads-area',
        name: 'PDO Threads - Fox Eyes / Submental (Specific Area)',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Targeted thread lift for brow lift or double chin reduction (per area)',
        recovery: '3-7 days (swelling/tender)',
        price: 800,
        usPrice: 2000,
        requiresConsultation: true
      },
      {
        id: 'hair-transplant',
        name: 'Hair Implants (Micro-FUE)',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Hair Restoration Specialist',
        details: 'Follicular Unit Extraction for natural hair restoration (1000-2000 grafts) - PRP session included',
        recovery: '7-10 days (scabbing/healing)',
        price: 2800,
        usPrice: 7200,
        requiresConsultation: true
      },
      {
        id: 'beard-transplant',
        name: 'Beard/Brow Implants',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Hair Restoration Specialist',
        details: 'FUE technique for fuller beard or brow growth',
        recovery: '7-10 days (scabbing/healing)',
        price: 2400,
        usPrice: 5600,
        requiresConsultation: true
      },
      {
        id: 'prp-hair',
        name: 'PRP Hair Restoration',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Platelet-rich plasma therapy for hair growth and scalp rejuvenation (per session)',
        recovery: 'No downtime',
        price: 250,
        usPrice: 700,
        requiresConsultation: false
      },
      {
        id: 'prp-facial',
        name: 'PRP Facial Rejuvenation',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Aesthetic Doctor',
        details: 'Vampire facial for skin rejuvenation and anti-aging (per session)',
        recovery: '1-2 days (redness)',
        price: 200,
        usPrice: 600,
        requiresConsultation: false
      },
      {
        id: 'microneedling-prp',
        name: 'Microneedling with PRP',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Aesthetic Nurse/Tech',
        details: 'Collagen induction therapy combined with PRP for enhanced results (per session)',
        recovery: '2-3 days (redness)',
        price: 350,
        usPrice: 900,
        requiresConsultation: false
      },
      {
        id: 'sclerotherapy',
        name: 'Sclerotherapy (Spider Veins)',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'Vascular Specialist',
        details: 'Injection treatment for visible spider and small varicose veins',
        recovery: '1-3 days (compression required)',
        price: 300,
        usPrice: 800,
        requiresConsultation: false
      },
      {
        id: 'coolsculpting',
        name: 'CoolSculpting / VelaShape',
        area: 'Collection B: Advanced Treatments & Body Contouring',
        specialist: 'MedSpa Technician',
        details: 'Non-invasive body contouring and fat reduction (3 sessions)',
        recovery: 'No downtime (bruising possible)',
        price: 480,
        usPrice: 1200,
        requiresConsultation: false
      }
    ],
    skin: [
      {
        id: 'salmon-dna',
        name: 'Salmon DNA / PDRN Therapy',
        area: 'Collection C: Skin Treatments & Resurfacing',
        specialist: 'Aesthetic Doctor',
        details: 'Advanced regenerative skin therapy for rejuvenation and healing (per session)',
        recovery: '1-2 days (mild redness)',
        price: 200,
        usPrice: 600,
        requiresConsultation: false
      },
      {
        id: 'peptide-boosters',
        name: 'Peptide Boosters',
        area: 'Collection C: Skin Treatments & Resurfacing',
        specialist: 'Aesthetic Doctor',
        details: 'Injectable peptides for skin rejuvenation and anti-aging (per session)',
        recovery: 'No downtime',
        price: 120,
        usPrice: 350,
        requiresConsultation: false
      },
      {
        id: 'dermaplaning',
        name: 'Dermaplaning',
        area: 'Collection C: Skin Treatments & Resurfacing',
        specialist: 'Aesthetician',
        details: 'Exfoliation treatment removing dead skin and peach fuzz (per session)',
        recovery: 'No downtime',
        price: 70,
        usPrice: 200,
        requiresConsultation: false
      },
      {
        id: 'hydrafacial',
        name: 'Hydrafacial / Diamond Glow',
        area: 'Collection C: Skin Treatments & Resurfacing',
        specialist: 'Aesthetician',
        details: 'Deep cleansing, exfoliation, and hydration facial treatment',
        recovery: 'No downtime',
        price: 200,
        usPrice: 600,
        requiresConsultation: false
      },
      {
        id: 'laser-resurfacing',
        name: 'Laser Resurfacing (Light)',
        area: 'Collection C: Skin Treatments & Resurfacing',
        specialist: 'Aesthetic Nurse/Tech',
        details: 'Fractional laser for skin texture, scars, and fine lines',
        recovery: '2-4 days (redness/peeling)',
        price: 600,
        usPrice: 1600,
        requiresConsultation: true
      },
      {
        id: 'scar-treatment',
        name: 'Scar Treatment (Steroid Injection)',
        area: 'Collection C: Skin Treatments & Resurfacing',
        specialist: 'Aesthetic Doctor',
        details: 'Corticosteroid injections to flatten and reduce raised scars (per injection)',
        recovery: 'No downtime',
        price: 100,
        usPrice: 300,
        requiresConsultation: false
      },
      {
        id: 'lobuloplasty',
        name: 'Lobuloplasty (Earlobe Repair)',
        area: 'Collection C: Skin Treatments & Resurfacing',
        specialist: 'Aesthetic Doctor',
        details: 'Surgical repair of torn or stretched earlobes (per ear)',
        recovery: '5-7 days (healing)',
        price: 300,
        usPrice: 800,
        requiresConsultation: true
      }
    ],
    dental: [
      {
        id: 'veneers',
        name: 'Simple Veneers (E-Max/Porcelain)',
        area: 'Collection D: Smile Refinement',
        specialist: 'Aesthetic Dentist',
        details: '2-visit prep for natural-looking, durable veneers (6-10 teeth)',
        recovery: '3-5 days (sensitivity/fittings)',
        price: 4400,
        usPrice: 11200,
        requiresConsultation: true
      },
      {
        id: 'whitening',
        name: 'Professional Whitening',
        area: 'Collection D: Smile Refinement',
        specialist: 'Aesthetic Dentist',
        details: 'In-office laser whitening treatment for immediate brightness',
        recovery: 'No downtime',
        price: 260,
        usPrice: 600,
        requiresConsultation: false
      },
      {
        id: 'night-guards',
        name: 'Custom Night Guards',
        area: 'Collection D: Smile Refinement',
        specialist: 'Aesthetic Dentist',
        details: 'High-quality lab work for teeth protection and alignment',
        recovery: 'No downtime',
        price: 320,
        usPrice: 720,
        requiresConsultation: false
      }
    ],
    style: [
      {
        id: 'balayage',
        name: 'Balayage / Color Correction',
        area: 'Collection E: Luxury Style & Grooming',
        specialist: 'Master Stylist',
        details: 'High-end coloring service with deep conditioning treatment',
        recovery: 'No downtime',
        price: 520,
        usPrice: 1120,
        requiresConsultation: true
      },
      {
        id: 'hair-extensions',
        name: 'Hair Extensions',
        area: 'Collection E: Luxury Style & Grooming',
        specialist: 'Master Stylist',
        details: 'Application and custom styling using premium human hair',
        recovery: 'No downtime',
        price: 680,
        usPrice: 1600,
        requiresConsultation: true
      },
      {
        id: 'microblading',
        name: 'Microblading / Shading (Brows)',
        area: 'Collection E: Luxury Style & Grooming',
        specialist: 'PMU Artist',
        details: 'Semi-permanent eyebrow enhancement with natural hair-like strokes (Initial + touch-up)',
        recovery: '5-7 days (scabbing/healing)',
        price: 350,
        usPrice: 800,
        requiresConsultation: false
      },
      {
        id: 'lip-micropigmentation',
        name: 'Lip Micropigmentation (Lip Blush)',
        area: 'Collection E: Luxury Style & Grooming',
        specialist: 'PMU Artist',
        details: 'Semi-permanent lip color enhancement for fuller, defined lips (per session)',
        recovery: '5-7 days (scabbing/healing)',
        price: 400,
        usPrice: 1000,
        requiresConsultation: false
      },
      {
        id: 'luxury-manicure',
        name: 'Luxury Manicure/Pedicure',
        area: 'Collection E: Luxury Style & Grooming',
        specialist: 'Aesthetician',
        details: 'Spa-level treatment with exfoliating mask and paraffin wax',
        recovery: 'No downtime',
        price: 92,
        usPrice: 224,
        requiresConsultation: false
      },
      {
        id: 'brow-lamination',
        name: 'Brow Shaping/Lamination',
        area: 'Collection E: Luxury Style & Grooming',
        specialist: 'Brow Specialist',
        details: 'Sculpting, lamination, and professional tinting',
        recovery: 'No downtime',
        price: 80,
        usPrice: 200,
        requiresConsultation: false
      },
      {
        id: 'lash-extensions',
        name: 'Eyelash Extensions',
        area: 'Collection E: Luxury Style & Grooming',
        specialist: 'Lash Technician',
        details: 'Full set (classic or volume) applied at the villa',
        recovery: 'No downtime',
        price: 150,
        usPrice: 400,
        requiresConsultation: false
      }
    ],
    wellness: [
      {
        id: 'iv-simple',
        name: 'IV Drip - Simple (Hydration, Hangover, Immune Boost)',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Wellness Nurse',
        details: 'Quick vitamin and hydration boost delivered via IV therapy',
        recovery: 'No downtime',
        price: 99,
        usPrice: 250,
        requiresConsultation: false
      },
      {
        id: 'iv-targeted',
        name: 'IV Drip - Targeted (Detox, Beauty Glow, Athletic)',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Wellness Nurse',
        details: 'Enhanced IV therapy with targeted vitamins and minerals',
        recovery: 'No downtime',
        price: 139,
        usPrice: 350,
        requiresConsultation: false
      },
      {
        id: 'iv-specialty',
        name: 'IV Drip - Specialty (Myers\' Cocktail, Weight Loss, Brainstorm)',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Wellness Nurse',
        details: 'Premium IV therapy blends for specific wellness goals',
        recovery: 'No downtime',
        price: 179,
        usPrice: 450,
        requiresConsultation: false
      },
      {
        id: 'iv-customized',
        name: 'IV Drip - Customized',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Wellness Nurse',
        details: 'Fully personalized IV therapy with consultation and tailored vitamin blend',
        recovery: 'No downtime',
        price: 200,
        usPrice: 500,
        requiresConsultation: true
      },
      {
        id: 'therapeutic-massage',
        name: 'Therapeutic Massage (Expanded)',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Licensed Therapist',
        details: 'Deep Tissue, Hot Stone, or Aromatherapy based on client preference',
        recovery: 'No downtime',
        price: 112,
        usPrice: 280,
        requiresConsultation: false
      },
      {
        id: 'lymphatic-massage',
        name: 'Lymphatic Drainage Massage',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Licensed Therapist',
        details: 'Specialized recovery massage to reduce swelling post-procedure (highly recommended)',
        recovery: 'No downtime',
        price: 128,
        usPrice: 320,
        requiresConsultation: false
      },
      {
        id: 'cupping-therapy',
        name: 'Cupping Therapy',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Licensed Therapist',
        details: 'Traditional therapy for deep muscle tension and fascia release',
        recovery: 'No downtime',
        price: 92,
        usPrice: 224,
        requiresConsultation: false
      },
      {
        id: 'body-scrub',
        name: 'Full Body Scrub & Wrap',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Spa Specialist',
        details: 'Detoxifying scrub followed by a hydrating or firming body wrap (performed at villa)',
        recovery: 'No downtime',
        price: 180,
        usPrice: 440,
        requiresConsultation: false
      },
      {
        id: 'colometry',
        name: 'Styling & Colometry',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Image Consultant',
        details: 'Professional color analysis to determine best wardrobe hues',
        recovery: 'No downtime',
        price: 480,
        usPrice: 1120,
        requiresConsultation: false
      },
      {
        id: 'wardrobe-analysis',
        name: 'Wardrobe Body Analysis',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Image Consultant',
        details: 'Custom consultation for flattering silhouettes based on body type',
        recovery: 'No downtime',
        price: 480,
        usPrice: 1120,
        requiresConsultation: false
      },
      {
        id: 'aromatic-blends',
        name: 'Customized Aromatic Blends',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Concierge / Wellness Partner',
        details: 'High-margin take-home wellness product kit tailored to recovery needs',
        recovery: 'No downtime',
        price: 140,
        usPrice: 360,
        requiresConsultation: false
      },
      {
        id: 'nutritional-assessment',
        name: 'Nutritional Assessment',
        area: 'Collection F: Total Wellness & Concierge',
        specialist: 'Certified Nutritionist',
        details: 'Private consultation and custom anti-inflammatory meal plan for the trip',
        recovery: 'No downtime',
        price: 200,
        usPrice: 480,
        requiresConsultation: false
      }
    ]
  };

  const toggleProcedure = (procId: string) => {
    if (safeProcedures.includes(procId)) {
      setSelectedProcedures(safeProcedures.filter(p => p !== procId));
      // Remove description when procedure is deselected
      const newDesc = { ...localDescriptions };
      delete newDesc[procId];
      setLocalDescriptions(newDesc);
      if (setProcedureDescriptions) {
        setProcedureDescriptions(newDesc);
      }
      if (activeDescriptionInput === procId) {
        setActiveDescriptionInput(null);
      }
    } else {
      setSelectedProcedures([...safeProcedures, procId]);
      // Automatically show description input when procedure is selected
      setActiveDescriptionInput(procId);
    }
  };

  const updateDescription = (procId: string, description: string) => {
    const newDesc = { ...localDescriptions, [procId]: description };
    setLocalDescriptions(newDesc);
    if (setProcedureDescriptions) {
      setProcedureDescriptions(newDesc);
    }
  };

  const toggleArea = (area: string) => {
    if (openAreas.includes(area)) {
      setOpenAreas(openAreas.filter(a => a !== area));
    } else {
      setOpenAreas([...openAreas, area]);
    }
  };

  const getAllProcedures = () => {
    return Object.values(proceduresByArea).flat();
  };

  const getSelectedTotal = () => {
    const allProcs = getAllProcedures();
    return safeProcedures.reduce((sum, id) => {
      const proc = allProcs.find(p => p.id === id);
      return sum + (proc?.price || 0);
    }, 0);
  };

  const allSelectedHaveDescriptions = () => {
    const allProcs = getAllProcedures();
    return safeProcedures.every(procId => {
      const proc = allProcs.find(p => p.id === procId);
      // Only require description if procedure requires consultation
      if (proc?.requiresConsultation) {
        const desc = localDescriptions[procId];
        return desc && desc.trim().length > 0;
      }
      return true; // No description needed for non-consultation procedures
    });
  };

  const findMissingDescriptions = (): string[] => {
    const allProcs = getAllProcedures();
    const missing: string[] = [];
    
    safeProcedures.forEach(procId => {
      const proc = allProcs.find(p => p.id === procId);
      if (proc?.requiresConsultation) {
        const desc = localDescriptions[procId];
        if (!desc || desc.trim().length === 0) {
          missing.push(procId);
        }
      }
    });
    
    return missing;
  };

  const handleNextWithValidation = () => {
    const missing = findMissingDescriptions();
    
    if (missing.length > 0) {
      setMissingFields(missing);
      
      // Scroll to first missing field
      const firstMissingId = missing[0];
      const element = procedureRefs.current[firstMissingId];
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        
        // Show toast notification
        const allProcs = getAllProcedures();
        const proc = allProcs.find(p => p.id === firstMissingId);
        toast.error(`Please complete the description for "${proc?.name}"`, {
          description: 'This procedure requires specialist consultation details.',
          duration: 4000
        });
      }
      
      // Clear missing fields after 3 seconds
      setTimeout(() => {
        setMissingFields([]);
      }, 3000);
    } else {
      onNext();
    }
  };

  const areaDetails = {
    injectables: {
      title: 'Collection A: Injectables & Contouring',
      subtitle: 'BOTOX, fillers & collagen stimulators',
      location: '📍 Partner Clinic, Santo Domingo (transportation included)',
      priceRange: '$64 – $750',
      icon: (
        <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    medical: {
      title: 'Collection B: Advanced Treatments & Body Contouring',
      subtitle: 'PDO threads, PRP, hair restoration & body sculpting',
      location: '📍 Partner Clinic, Santo Domingo (transportation included)',
      priceRange: '$200 – $2,800',
      icon: (
        <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    skin: {
      title: 'Collection C: Skin Treatments & Resurfacing',
      subtitle: 'Laser, peels, dermaplaning & regenerative facials',
      location: '📍 Partner Clinic, Santo Domingo (transportation included)',
      priceRange: '$70 – $600',
      icon: (
        <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    dental: {
      title: 'Collection D: Smile Refinement',
      subtitle: 'Veneers, whitening & dental aesthetics',
      location: '📍 Partner Clinic, Santo Domingo (transportation included)',
      priceRange: '$260 – $4,400',
      icon: (
        <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    style: {
      title: 'Collection E: Luxury Style & Grooming',
      subtitle: 'Hair, nails, lashes, brows & PMU',
      location: '🏝️ Recovery Villa or Partner Salon',
      priceRange: '$80 – $680',
      icon: (
        <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    wellness: {
      title: 'Collection F: Total Wellness & Concierge',
      subtitle: 'IV drips, massage, spa & lifestyle consultations',
      location: '🏝️ Recovery Villa',
      priceRange: '$92 – $480',
      icon: (
        <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 style={{ fontSize: '3rem', color: 'var(--bt-charcoal)', marginBottom: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            Curate Your Treatments
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2" style={{ fontSize: '1.125rem' }}>
            Select from our elevated menu organized by specialist and location. All treatments seamlessly fit within your 10-day experience.
          </p>
          <p className="max-w-2xl mx-auto mb-4" style={{ fontSize: '1rem', color: 'var(--bt-gold)', fontWeight: '500' }}>
            Take your time - you can always modify your selections as you explore.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
              <span>Clinical (Santo Domingo)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--bt-blush)' }}></div>
              <span>Villa/Salon</span>
            </div>
          </div>

          {/* Browse Full Catalog Button */}
          <button
            onClick={() => setShowPricingSheet(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
            style={{
              backgroundColor: 'var(--bt-gold)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            <BookOpen className="w-5 h-5" />
            View Full Services & Pricing
          </button>

          {/* Scroll Indicator */}
          {showScrollIndicator && (
            <div className="mt-8 flex flex-col items-center animate-bounce">
              <p className="text-sm text-gray-500 mb-2">Scroll to explore treatments</p>
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>

        {/* Value Comparison Table - Prominently Placed */}
        <div className="mb-16 p-8" style={{ backgroundColor: 'var(--bt-charcoal)' }}>
          <h3 className="text-white text-center mb-8" style={{ fontSize: '1.75rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            Elevated Value: Your Savings Fund Your Sanctuary Experience
          </h3>
          
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--bt-gold)' }}>
                  <th className="text-left py-4 px-4 text-white" style={{ fontSize: '1rem', fontWeight: '600' }}>
                    Service/Procedure
                  </th>
                  <th className="text-right py-4 px-4 text-white" style={{ fontSize: '1rem', fontWeight: '600' }}>
                    🇺🇸/🇨🇦 Market Avg.
                  </th>
                  <th className="text-right py-4 px-4" style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--bt-gold)' }}>
                    🇩🇴 Beauty Trip Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white">BOTOX / Fillers</td>
                  <td className="py-4 px-4 text-right text-white/70">$2,240</td>
                  <td className="py-4 px-4 text-right" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>$960</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white">Simple Veneers (8 Teeth)</td>
                  <td className="py-4 px-4 text-right text-white/70">$11,200</td>
                  <td className="py-4 px-4 text-right" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>$4,400</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white">Hair Transplant (1500 Grafts)</td>
                  <td className="py-4 px-4 text-right text-white/70">$7,200</td>
                  <td className="py-4 px-4 text-right" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>$2,800</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-4 px-4 text-white">PDO Thread Lift</td>
                  <td className="py-4 px-4 text-right text-white/70">$4,000</td>
                  <td className="py-4 px-4 text-right" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>$1,760</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white">Lymphatic Drainage (3 Sessions)</td>
                  <td className="py-4 px-4 text-right text-white/70">$960</td>
                  <td className="py-4 px-4 text-right" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>$384</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-center mt-6" style={{ color: 'var(--bt-blush)', fontSize: '1.125rem', fontWeight: '500' }}>
            Average Savings: 60-70% • Your Savings = Your Entire Recovery Experience
          </p>
        </div>

        {/* Interactive Anatomical Chart Notice */}
        <div className="mb-12 max-w-3xl mx-auto p-8 border-2" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#ffffff' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}>
              <svg className="w-6 h-6" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Specialist Consultation Requirements
              </h3>
              <p className="text-gray-600 mb-4">
                Some procedures require a detailed description of your goals for specialist pre-assessment. Procedures marked with a <strong style={{ color: 'var(--bt-gold)' }}>consultation badge</strong> below require this information for your complimentary video consultation.
              </p>
              <div className="p-4 bg-gray-50 border-l-4" style={{ borderColor: 'var(--bt-gold)' }}>
                <p className="text-sm" style={{ color: 'var(--bt-charcoal)' }}>
                  <strong>Privacy First:</strong> Your descriptions remain confidential and are used only for specialist review. No photos required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Categories */}
        <div className="mb-12 bg-white border border-gray-200 p-8">
          <h3 className="mb-2 text-center" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)' }}>
            Treatment Categories
          </h3>
          <p className="text-center text-gray-600 text-sm mb-8">Organized by specialist type and location</p>

          <div className="space-y-4">
            {Object.entries(proceduresByArea).map(([area, procedures]) => {
              const details = areaDetails[area as keyof typeof areaDetails];
              const isClinical = ['injectables', 'medical', 'dental'].includes(area);
              return (
                <Collapsible 
                  key={area}
                  open={openAreas.includes(area)}
                  onOpenChange={() => toggleArea(area)}
                >
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: isClinical ? 'var(--bt-gold)' : 'var(--bt-blush)' }}
                      >
                        {details.icon}
                      </div>
                      <div className="text-left">
                        <h4 style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>
                          {details.title}
                        </h4>
                        <p className="text-sm text-gray-500">{details.subtitle}</p>
                        <p className="text-xs text-gray-400 mt-1">{details.location} • {procedures.length} options</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm" style={{ color: 'var(--bt-gold)' }}>{details.priceRange}</span>
                      <ChevronDown 
                        className={`w-6 h-6 text-gray-400 transition-transform ${openAreas.includes(area) ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="border-x border-b border-gray-200 divide-y divide-gray-200">
                      {procedures.map((procedure) => (
                        <div 
                          key={procedure.id}
                          ref={(el) => {
                            procedureRefs.current[procedure.id] = el;
                          }}
                        >
                          <button
                            onClick={() => toggleProcedure(procedure.id)}
                            onMouseEnter={() => setHoveredPrice(procedure.id)}
                            onMouseLeave={() => setHoveredPrice(null)}
                            className="w-full p-6 text-left hover:bg-gray-50 transition-colors relative"
                          >
                            <div className="flex items-start gap-4">
                              <div 
                                className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all"
                                style={{
                                  borderColor: safeProcedures.includes(procedure.id) ? 'var(--bt-gold)' : '#d1d5db',
                                  backgroundColor: safeProcedures.includes(procedure.id) ? 'var(--bt-gold)' : 'transparent'
                                }}
                              >
                                {safeProcedures.includes(procedure.id) && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <div>
                                    <h5 style={{ fontSize: '1.125rem', color: 'var(--bt-charcoal)' }}>
                                      {procedure.name}
                                    </h5>
                                    <p className="text-xs text-gray-500 mt-1">Specialist: {procedure.specialist}</p>
                                  </div>
                                  <div className="relative">
                                    <span style={{ color: 'var(--bt-gold)', fontSize: '1.25rem' }}>
                                      ${procedure.price.toLocaleString()}
                                    </span>
                                    
                                    {/* Hover Price Comparison */}
                                    {hoveredPrice === procedure.id && (
                                      <div 
                                        className="absolute top-full right-0 mt-2 px-4 py-2 rounded shadow-lg z-10 whitespace-nowrap"
                                        style={{ backgroundColor: 'var(--bt-charcoal)' }}
                                      >
                                        <p className="text-xs text-gray-400">🇺🇸 US/Canada Price</p>
                                        <p className="text-white">${procedure.usPrice.toLocaleString()}</p>
                                        <p className="text-xs mt-1" style={{ color: 'var(--bt-blush)' }}>
                                          You Save ${(procedure.usPrice - procedure.price).toLocaleString()}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Treatment: </span>
                                    <span className="text-gray-700">{procedure.details}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Downtime: </span>
                                    <span className="text-gray-700">{procedure.recovery}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>
                          
                          {/* Description Input - Only for procedures requiring consultation */}
                          {safeProcedures.includes(procedure.id) && procedure.requiresConsultation && (
                            <div 
                              className="px-6 pb-6 pt-2 border-t-2 transition-all duration-300" 
                              style={{ 
                                backgroundColor: missingFields.includes(procedure.id) ? '#fee2e2' : '#fffbf0', 
                                borderColor: missingFields.includes(procedure.id) ? '#ef4444' : 'var(--bt-gold)' 
                              }}
                            >
                              <label className="block mb-2 text-sm" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                                <span style={{ color: missingFields.includes(procedure.id) ? '#ef4444' : 'var(--bt-gold)' }}>
                                  ★ Required:
                                </span> Describe your goals for specialist assessment
                              </label>
                              {missingFields.includes(procedure.id) && (
                                <div className="mb-3 p-3 bg-red-100 border border-red-400 rounded">
                                  <p className="text-sm text-red-700 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    This field is required before proceeding
                                  </p>
                                </div>
                              )}
                              <Textarea
                                value={localDescriptions[procedure.id] || ''}
                                onChange={(e) => {
                                  updateDescription(procedure.id, e.target.value);
                                  // Clear error when user starts typing
                                  if (missingFields.includes(procedure.id) && e.target.value.trim().length > 0) {
                                    setMissingFields(missingFields.filter(id => id !== procedure.id));
                                  }
                                }}
                                placeholder={procedure.id === 'hair-transplant' || procedure.id === 'beard-transplant' ? 'Example: Thinning at crown and temples. Want natural hairline restoration with 1500-2000 grafts.' : procedure.id === 'veneers' ? 'Example: Want to correct spacing and slight discoloration on 8 front teeth. Prefer natural white shade.' : procedure.id.includes('hair') || procedure.id === 'balayage' ? 'Example: Current hair condition, desired color/style, any previous treatments.' : 'Describe your specific goals and any concerns for the specialist to review.'}
                                className="w-full min-h-[100px] p-3 border-2 bg-white focus:border-[var(--bt-gold)] rounded"
                                style={{ 
                                  fontSize: '0.875rem', 
                                  borderColor: missingFields.includes(procedure.id) ? '#ef4444' : 'var(--bt-gold)' 
                                }}
                              />
                              {localDescriptions[procedure.id] && localDescriptions[procedure.id].trim().length > 0 ? (
                                <p className="text-sm mt-2" style={{ color: 'var(--bt-gold)' }}>
                                  ✓ Description provided - Ready for specialist review
                                </p>
                              ) : (
                                <p className="text-sm mt-2" style={{ color: 'var(--bt-gold)' }}>
                                  Please provide details for specialist pre-assessment
                                </p>
                              )}
                              <p className="text-xs mt-2 text-gray-600">
                                <strong>Refund Policy:</strong> Your specialist will assess if this procedure is appropriate based on your hair/skin/dental health. If deemed unsuitable, you'll receive a 100% refund for this treatment.
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>

        {/* Selected Summary */}
        {safeProcedures.length > 0 && (
          <div className="mb-12 p-8 border-2" style={{ borderColor: 'var(--bt-blush)', backgroundColor: '#fefefe' }}>
            <h4 className="mb-4" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>
              Selected Treatments ({safeProcedures.length})
            </h4>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-600">Estimated Total</p>
              <p style={{ fontSize: '2rem', color: 'var(--bt-gold)' }}>
                ${getSelectedTotal().toLocaleString()}
              </p>
            </div>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="text-sm mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Consultation Requirements:
              </p>
              {(() => {
                const allProcs = getAllProcedures();
                const consultationProcs = safeProcedures.filter(id => {
                  const proc = allProcs.find(p => p.id === id);
                  return proc?.requiresConsultation;
                });
                
                if (consultationProcs.length === 0) {
                  return (
                    <p className="text-sm text-gray-600">
                      ✓ None of your selected treatments require specialist pre-assessment
                    </p>
                  );
                }
                
                const hasAllDescriptions = allSelectedHaveDescriptions();
                const completedConsultations = consultationProcs.filter(id => 
                  localDescriptions[id] && localDescriptions[id].trim().length > 0
                ).length;
                
                return (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      {completedConsultations} of {consultationProcs.length} consultation procedure(s) described
                    </p>
                    {hasAllDescriptions ? (
                      <p className="text-sm" style={{ color: 'var(--bt-gold)' }}>
                        ✓ All required descriptions provided
                      </p>
                    ) : (
                      <p className="text-sm" style={{ color: 'var(--bt-gold)' }}>
                        ⚠ Please complete descriptions for procedures marked "Consultation Required"
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
            <p className="text-sm text-gray-500">
              Final pricing confirmed during specialist consultation • All treatments include post-care
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-8 py-4 border-2 transition-all duration-300 hover:scale-105 rounded-full"
            style={{ 
              borderColor: 'var(--bt-charcoal)',
              color: 'var(--bt-charcoal)'
            }}
          >
            Back
          </button>
          <button
            onClick={handleNextWithValidation}
            disabled={safeProcedures.length === 0}
            className="px-12 py-5 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
            style={{ 
              backgroundColor: 'var(--bt-gold)',
              fontSize: '1.125rem',
              fontWeight: '500',
              letterSpacing: '-0.01em'
            }}
          >
            Choose Your Specialist
          </button>
        </div>
      </div>

      {/* Pricing Catalog Sheet */}
      <PricingCatalogSheet
        open={showPricingSheet}
        onOpenChange={setShowPricingSheet}
        onBookNow={() => setShowPricingSheet(false)}
      />
    </div>
  );
}
