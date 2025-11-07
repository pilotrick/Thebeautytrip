import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Calendar, Upload, FileText, CheckCircle2, AlertCircle, User, Phone, Mail, Users, Clock, MapPin, Sparkles, AlertTriangle, Calendar as CalendarIcon, Plane } from 'lucide-react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Logo } from "../Logo";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { format } from "date-fns";
import { GroupData } from "../GroupQuestionnaire";

interface Step5SummaryProps {
  onBack: () => void;
  onSubmitComplete: () => void;
  selectedDestination: string;
  selectedProcedures: string[];
  selectedSpecialist: string;
  selectedRetreat: string;
  recoveryDays: number;
  groupData?: GroupData | null;
  isTourTrip?: boolean;
  tourTripBooking?: any;
  onTourDepositPaid?: (amount: number) => void;
}

export function Step5Summary({
  onBack,
  onSubmitComplete,
  selectedDestination,
  selectedProcedures,
  selectedSpecialist,
  selectedRetreat,
  recoveryDays,
  groupData = null,
  isTourTrip = false,
  tourTripBooking = null,
  onTourDepositPaid
}: Step5SummaryProps) {
  const [flightReceipt, setFlightReceipt] = useState<File | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Flight Details State
  const [procedureStartDate, setProcedureStartDate] = useState<Date | undefined>(undefined);
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [arrivalFlightNumber, setArrivalFlightNumber] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureFlightNumber, setDepartureFlightNumber] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  
  // Account Creation State
  const [createAccount, setCreateAccount] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const procedures: Record<string, { name: string; price: number }> = {
    // Collection A: Injectables & Resurfacing
    'botox-fillers': { name: 'BOTOX / Fillers (Dermal)', price: 1200 },
    'tear-trough': { name: 'Tear Trough Filler', price: 1000 },
    'non-surgical-rhino': { name: 'Non-Surgical Rhinoplasty', price: 1200 },
    'laser-resurfacing': { name: 'Laser Resurfacing (Light)', price: 950 },
    'hydrafacial': { name: 'Hydrafacial / Diamond Glow', price: 225 },
    
    // Collection B: Specialized Medical & Body
    'pdo-threads': { name: 'PDO Thread Lift', price: 2200 },
    'hair-transplant': { name: 'Hair Implants (Micro-FUE)', price: 3500 },
    'beard-transplant': { name: 'Beard/Brow Implants', price: 3000 },
    'sclerotherapy': { name: 'Sclerotherapy (Spider Veins)', price: 400 },
    'coolsculpting': { name: 'CoolSculpting / VelaShape', price: 600 },
    
    // Collection C: Smile Refinement
    'veneers': { name: 'Simple Veneers (E-Max/Porcelain)', price: 5500 },
    'whitening': { name: 'Professional Whitening', price: 325 },
    'night-guards': { name: 'Custom Night Guards', price: 400 },
    
    // Collection D: Luxury Style & Grooming
    'balayage': { name: 'Balayage / Color Correction', price: 650 },
    'hair-extensions': { name: 'Hair Extensions', price: 850 },
    'microblading': { name: 'Microblading / Shading (Brows)', price: 500 },
    'luxury-manicure': { name: 'Luxury Manicure/Pedicure', price: 115 },
    'brow-lamination': { name: 'Brow Shaping/Lamination', price: 100 },
    'lash-extensions': { name: 'Lash Extensions', price: 250 },
    
    // Collection E: Total Wellness & Concierge
    'therapeutic-massage': { name: 'Therapeutic Massage (Expanded)', price: 140 },
    'lymphatic-massage': { name: 'Lymphatic Drainage Massage', price: 160 },
    'cupping-therapy': { name: 'Cupping Therapy', price: 115 },
    'body-scrub': { name: 'Full Body Scrub & Wrap', price: 225 },
    'colometry': { name: 'Styling & Colometry', price: 600 },
    'wardrobe-analysis': { name: 'Wardrobe Body Analysis', price: 600 },
    'aromatic-blends': { name: 'Customized Aromatic Blends', price: 175 },
    'nutritional-assessment': { name: 'Nutritional Assessment', price: 250 }
  };

  const specialists: Record<string, string> = {
    'dr-martinez': 'Dr. Isabella Martínez - Aesthetic Medicine',
    'dr-santos': 'Dr. Rafael Santos - Cosmetic Dentistry',
    'dr-reyes': 'Dr. Carmen Reyes - MedSpa Director',
    'specialist-diaz': 'Jose Díaz, RN - Permanent Makeup'
  };

  const retreats: Record<string, { name: string; pricePerDay: number; location?: string }> = {
    // Solo/Private Tier
    'pearl-suite': { name: 'The Pearl Suite D.R.', pricePerDay: 180, location: 'Santo Domingo (City)' },
    'aqua-nook': { name: 'Aqua Nook', pricePerDay: 220, location: 'Punta Cana (East Coast)' },
    'cabarete-casita': { name: 'Cabarete Casita', pricePerDay: 195, location: 'North Coast' },
    'villa-colonial': { name: 'Villa Colonial Hideaway', pricePerDay: 165, location: 'Santo Domingo (Colonial Zone)' },
    'sanctuary-402': { name: 'Sanctuary 402, Cap Cana', pricePerDay: 240, location: 'Cap Cana (East Coast)' },
    'loft-blue-mall': { name: 'The Loft at Blue Mall', pricePerDay: 200, location: 'Santo Domingo (City)' },
    'jade-garden': { name: 'Jade Garden Suite', pricePerDay: 185, location: 'North Coast (Sosúa)' },
    'punta-espada': { name: 'Punta Espada Retreat', pricePerDay: 210, location: 'Cap Cana (East Coast)' },
    // Group Tier
    'villa-corales-14': { name: 'Villa Corales 14', pricePerDay: 850, location: 'Punta Cana (East Coast)' },
    'casa-marina': { name: 'Casa Marina', pricePerDay: 950, location: 'Casa de Campo (South Coast)' },
    'villa-anaconda': { name: 'Villa Anaconda', pricePerDay: 1100, location: 'North Coast (Cabrera)' },
    'toscana-estate': { name: 'The Toscana Estate', pricePerDay: 1400, location: 'Cap Cana (East Coast)' },
    'seahorse-5b': { name: 'Sea Horse Ranch 5B', pricePerDay: 700, location: 'North Coast (Cabarete)' },
    'arrecife-royale': { name: 'Arrecife Royale', pricePerDay: 1250, location: 'Punta Cana (East Coast)' }
  };

  const calculateProcedureTotal = () => {
    return selectedProcedures.reduce((sum, id) => {
      const proc = procedures[id as keyof typeof procedures];
      return sum + (proc?.price || 0);
    }, 0);
  };

  const getRetreatTotal = () => {
    const retreat = retreats[selectedRetreat];
    return retreat ? retreat.pricePerDay * recoveryDays : 0;
  };

  const getGrandTotal = () => {
    return calculateProcedureTotal() + getRetreatTotal() + 800; // +800 for concierge services
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFlightReceipt(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log('Button clicked!');
    
    // Use group data email/phone if available, otherwise use individual inputs
    const contactEmail = groupData ? groupData.leadEmail : email;
    const contactPhone = groupData ? groupData.leadPhone : phone;
    
    console.log('Form validation:', {
      procedureStartDate: !!procedureStartDate,
      arrivalAirport: !!arrivalAirport,
      arrivalFlightNumber: !!arrivalFlightNumber,
      arrivalTime: !!arrivalTime,
      departureFlightNumber: !!departureFlightNumber,
      departureTime: !!departureTime,
      flightReceipt: !!flightReceipt,
      agreedToTerms: !!agreedToTerms,
      email: !!contactEmail,
      phone: !!contactPhone,
      groupMode: !!groupData,
      isTourTrip
    });
    
    // Tour trips require 30% deposit payment
    if (isTourTrip && tourTripBooking && onTourDepositPaid) {
      const depositAmount = Math.round(tourTripBooking.price * 0.30);
      // In a real app, this would process payment
      onTourDepositPaid(depositAmount);
      alert(`Tour Trip Reservation Fee: ${depositAmount} (30% of ${tourTripBooking.price})\n\nIn production, this would redirect to Stripe payment processing.`);
    }
    
    // Basic validation (contact info and terms only - flight info is OPTIONAL for regular bookings)
    if (!agreedToTerms || !contactEmail || !contactPhone) {
      alert("Please complete all required fields: email, phone, and terms agreement");
      return;
    }
    
    // Validate password if account creation is enabled
    if (!groupData && createAccount) {
      if (!password || password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }
    
    // Create account if requested
    if (!groupData && createAccount) {
      localStorage.setItem('beautyTripUser', JSON.stringify({ 
        email: contactEmail, 
        name: contactEmail.split('@')[0] 
      }));
      console.log('Account created for:', contactEmail);
    }
    
    // In a real app, this would send data to your backend
    console.log('Booking submitted:', {
      procedures: selectedProcedures,
      specialist: selectedSpecialist,
      retreat: selectedRetreat,
      recoveryDays,
      email: contactEmail,
      phone: contactPhone,
      procedureStartDate,
      arrivalAirport,
      arrivalFlightNumber,
      arrivalTime,
      departureFlightNumber,
      departureTime,
      groupData: groupData || null,
      accountCreated: !groupData && createAccount
    });

    try {
      console.log('Calling onSubmitComplete...');
      // Transition to the majestic confirmation page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onSubmitComplete();
      console.log('onSubmitComplete called successfully!');
    } catch (error) {
      console.error('Error calling onSubmitComplete:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 style={{ fontSize: '3rem', color: 'var(--bt-charcoal)', marginBottom: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            {isTourTrip ? 'Your Tour Trip Reservation' : 'Your Bespoke Renewal'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            {isTourTrip 
              ? 'Complete your reservation with a 30% deposit - flights coordinated after payment' 
              : 'Review your curated experience and secure your renewal - zero deposit required'}
          </p>
        </div>

        {/* Trip at a Glance Timeline */}
        <div className="mb-12 border-2 p-8" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fefefe' }}>
          <h3 className="text-center mb-8" style={{ fontSize: '1.75rem', color: 'var(--bt-charcoal)' }}>
            Your Trip at a Glance
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <span style={{ color: 'var(--bt-charcoal)' }}>Day 1</span>
              </div>
              <div className="flex-1 pt-3">
                <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)' }}>Arrival & Welcome</h4>
                <p className="text-sm text-gray-600">Private pickup from SDQ or PUJ, villa check-in, specialist consultation</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <span style={{ color: 'var(--bt-charcoal)' }}>Day 3</span>
              </div>
              <div className="flex-1 pt-3">
                <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)' }}>Treatment Day</h4>
                <p className="text-sm text-gray-600">Primary procedures and treatments begin</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <span style={{ color: 'var(--bt-charcoal)' }}>Day 7</span>
              </div>
              <div className="flex-1 pt-3">
                <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)' }}>Relax and Explore</h4>
                <p className="text-sm text-gray-600">Designer shopping at Indómita & Jenny Polanco boutiques</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <span style={{ color: 'var(--bt-charcoal)' }}>Day 10</span>
              </div>
              <div className="flex-1 pt-3">
                <h4 className="mb-1" style={{ color: 'var(--bt-charcoal)' }}>Final Check & Departure</h4>
                <p className="text-sm text-gray-600">Post-care instructions, private airport transfer to SDQ or PUJ, return home</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Warning Banner */}
        <div className="mb-12 p-6 flex items-start gap-4" style={{ 
          backgroundColor: isTourTrip ? '#fdf4ff' : 'var(--bt-blush)', 
          border: isTourTrip ? '2px solid #9333ea' : '2px solid var(--bt-gold)' 
        }}>
          <AlertTriangle className="w-6 h-6 flex-shrink-0" style={{ color: isTourTrip ? '#9333ea' : 'var(--bt-charcoal)' }} />
          <div>
            <h4 className="mb-2" style={{ color: isTourTrip ? '#9333ea' : 'var(--bt-charcoal)' }}>
              {isTourTrip ? 'TOUR TRIP: 30% Deposit Required to Reserve' : 'IMPORTANT: Zero Deposit Required'}
            </h4>
            <p className="text-sm" style={{ color: isTourTrip ? '#7c3aed' : 'var(--bt-charcoal)' }}>
              {isTourTrip 
                ? 'Tour Trips require a 30% reservation deposit upfront. Flight details will be coordinated after deposit payment. This different payment structure reflects our tour provider partnerships.' 
                : 'This is a tentative booking with zero deposit required. Simply complete this form to secure your journey. Flight details can be added later - we want to reduce barriers and get you started!'}
            </p>
          </div>
        </div>

        {/* Specialist Assessment & Refund Policy */}
        <div className="mb-12 border-2 p-8" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fffbf0' }}>
          <h3 className="mb-4 flex items-center gap-2" style={{ fontSize: '1.75rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
            <svg className="w-8 h-8" style={{ color: 'var(--bt-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Specialist Assessment & 100% Refund Guarantee
          </h3>
          
          <div className="space-y-4">
            <div className="p-5 bg-white rounded border" style={{ borderColor: 'var(--bt-gold)' }}>
              <h4 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                Pre-Treatment Health Assessment
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Your safety and optimal results are our priority. Upon arrival, your specialist will conduct a comprehensive health assessment to determine if each selected procedure is appropriate based on:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 ml-5">
                <li className="list-disc">Hair quality and density (for hair transplants, extensions, coloring)</li>
                <li className="list-disc">Skin health and condition (for laser treatments, resurfacing, injectables)</li>
                <li className="list-disc">Dental structure and enamel health (for veneers, cosmetic dentistry)</li>
                <li className="list-disc">Overall medical history and contraindications</li>
              </ul>
            </div>

            <div className="p-5 bg-white rounded border-2" style={{ borderColor: 'var(--bt-gold)' }}>
              <h4 className="mb-2 flex items-center gap-2" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                100% Refund Guarantee
              </h4>
              <p className="text-sm text-gray-700">
                If your specialist determines that a procedure is not appropriate or safe based on their professional assessment (e.g., insufficient hair density, skin condition concerns, enamel quality), you will receive a <strong>100% refund</strong> for that specific treatment. No questions asked. Your accommodation and other approved procedures remain unaffected.
              </p>
            </div>

            <div className="p-4 bg-white rounded">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> This policy protects your investment while ensuring we only perform procedures that will deliver exceptional, safe results. Specialist assessments typically occur on Day 1-2 of your stay.
              </p>
            </div>
          </div>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Package Details */}
          <div className="space-y-6">
            {/* Destination */}
            <div className="border border-gray-200 p-6">
              <h3 className="mb-4 pb-3 border-b border-gray-200" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>
                Destination
              </h3>
              <p className="text-gray-700">Dominican Republic</p>
              <p className="text-sm text-gray-500 mt-2">Santo Domingo & North Coast</p>
            </div>

            {/* Specialist */}
            <div className="border border-gray-200 p-6">
              <h3 className="mb-4 pb-3 border-b border-gray-200" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>
                Your Specialist
              </h3>
              <p className="text-gray-700">{specialists[selectedSpecialist]}</p>
            </div>

            {/* Accommodation */}
            <div className="border border-gray-200 p-6">
              <h3 className="mb-4 pb-3 border-b border-gray-200" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>
                Accommodation
              </h3>
              <p className="text-gray-700 mb-2">{retreats[selectedRetreat]?.name || 'Villa'}</p>
              {retreats[selectedRetreat]?.location && (
                <p className="text-xs text-gray-500 mb-1">{retreats[selectedRetreat].location}</p>
              )}
              <p className="text-sm text-gray-500">{recoveryDays}-day stay</p>
            </div>
          </div>

          {/* Right Column - Price Breakdown */}
          <div className="border-2 p-8" style={{ borderColor: 'var(--bt-gold)', backgroundColor: '#fefefe' }}>
            <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)' }}>
              Price Breakdown
            </h3>

            <div className="space-y-4 mb-6">
              <h4 className="text-sm mb-3" style={{ color: 'var(--bt-charcoal)' }}>Selected Treatments</h4>
              {selectedProcedures.map(id => {
                const proc = procedures[id as keyof typeof procedures];
                return (
                  <div key={id} className="flex justify-between items-start text-sm">
                    <span className="text-gray-700 flex-1">{proc?.name}</span>
                    <span className="text-gray-900 ml-4">${proc?.price.toLocaleString()}</span>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-gray-300 flex justify-between">
                <span className="text-gray-700">Treatments Subtotal</span>
                <span className="text-gray-900">${calculateProcedureTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Accommodation ({recoveryDays} days)</span>
                <span className="text-gray-900">${getRetreatTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Concierge & Coordination</span>
                <span className="text-gray-900">$800</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline">
              <span style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)' }}>Grand Total</span>
              <span style={{ fontSize: '2.5rem', color: 'var(--bt-gold)' }}>
                ${getGrandTotal().toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              *All prices in USD. Includes all treatment fees, post-care, accommodations, and concierge services. Flights not included.
            </p>
          </div>
        </div>

        {/* OPTIONAL FLIGHT DETAILS SECTION (Optional for regular bookings, hidden for Tour Trips) */}
        {!isTourTrip && (
          <div className="mb-12 border-2 p-8" style={{ borderColor: '#d1d5db', backgroundColor: '#fafafa' }}>
            <div className="flex items-center gap-3 mb-4">
              <Plane className="w-8 h-8" style={{ color: '#6b7280' }} />
              <h3 style={{ 
                fontSize: '1.75rem', 
                color: 'var(--bt-charcoal)', 
                fontWeight: '600',
                letterSpacing: '0.02em',
                lineHeight: '1.3'
              }}>
                Flight Details (Optional - Add Anytime Later)
              </h3>
            </div>
            
            <div className="mb-6 p-5 flex items-start gap-3 rounded-lg" style={{ backgroundColor: '#e0f2fe', border: '2px solid #0ea5e9' }}>
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: '#0ea5e9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ 
                color: '#0c4a6e', 
                fontSize: '1rem',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                <strong style={{ fontWeight: '700', fontSize: '1.05rem' }}>No Rush!</strong> You can complete your booking now and add flight details later through your Booking Portal. We want to make it easy for you to get started without barriers.
              </p>
            </div>

          <div className="space-y-6">
            {/* Desired Procedure Start Date */}
            <div>
              <Label htmlFor="procedure-date" className="mb-2 block">
                Desired Procedure Start Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    style={{ 
                      height: '3rem',
                      borderColor: procedureStartDate ? 'var(--bt-gold)' : 'var(--border)',
                      borderWidth: '2px'
                    }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {procedureStartDate ? format(procedureStartDate, "PPP") : <span className="text-gray-500">Select your procedure date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={procedureStartDate}
                    onSelect={setProcedureStartDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="mt-2" style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280',
                lineHeight: '1.5',
                fontWeight: '500'
              }}>
                This is the primary date your treatments will begin
              </p>
            </div>

            {/* Arrival Airport Selection */}
            <div className="mb-6">
              <Label htmlFor="arrival-airport" className="mb-2 block">
                Arrival Airport
              </Label>
              <Select value={arrivalAirport} onValueChange={setArrivalAirport}>
                <SelectTrigger 
                  id="arrival-airport" 
                  className="h-12"
                  style={{ 
                    borderColor: arrivalAirport ? 'var(--bt-gold)' : 'var(--border)',
                    borderWidth: '2px'
                  }}
                >
                  <SelectValue placeholder="Select your arrival airport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="santo-domingo">Las Américas International Airport (SDQ) - Santo Domingo</SelectItem>
                  <SelectItem value="punta-cana">Punta Cana International Airport (PUJ) - Punta Cana</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                We provide pickup service from both major Dominican Republic airports
              </p>
            </div>

            {/* Flight Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Arrival Flight */}
              <div>
                <Label htmlFor="arrival-flight" className="mb-2 block">
                  Arrival Flight Number
                </Label>
                <Input
                  id="arrival-flight"
                  type="text"
                  value={arrivalFlightNumber}
                  onChange={(e) => setArrivalFlightNumber(e.target.value)}
                  placeholder="e.g., AA2345"
                  className="h-12"
                  style={{ 
                    borderColor: arrivalFlightNumber ? 'var(--bt-gold)' : 'var(--border)',
                    borderWidth: '2px'
                  }}
                />
              </div>

              <div>
                <Label htmlFor="arrival-time" className="mb-2 block">
                  Arrival Time (Local DR)
                </Label>
                <Input
                  id="arrival-time"
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="h-12"
                  style={{ 
                    borderColor: arrivalTime ? 'var(--bt-gold)' : 'var(--border)',
                    borderWidth: '2px'
                  }}
                />
              </div>

              {/* Departure Flight */}
              <div>
                <Label htmlFor="departure-flight" className="mb-2 block">
                  Departure Flight Number
                </Label>
                <Input
                  id="departure-flight"
                  type="text"
                  value={departureFlightNumber}
                  onChange={(e) => setDepartureFlightNumber(e.target.value)}
                  placeholder="e.g., AA2346"
                  className="h-12"
                  style={{ 
                    borderColor: departureFlightNumber ? 'var(--bt-gold)' : 'var(--border)',
                    borderWidth: '2px'
                  }}
                />
              </div>

              <div>
                <Label htmlFor="departure-time" className="mb-2 block">
                  Departure Time (Local DR)
                </Label>
                <Input
                  id="departure-time"
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="h-12"
                  style={{ 
                    borderColor: departureTime ? 'var(--bt-gold)' : 'var(--border)',
                    borderWidth: '2px'
                  }}
                />
              </div>
            </div>

            <div className="mt-6 p-5 bg-white border-2 rounded-lg" style={{ borderColor: '#6b7280' }}>
              <p style={{ 
                fontSize: '0.95rem', 
                color: 'var(--bt-charcoal)',
                lineHeight: '1.7',
                fontWeight: '400'
              }}>
                <strong style={{ fontWeight: '600', color: 'var(--bt-gold)', fontSize: '1rem' }}>When you're ready:</strong> Flight details help us coordinate airport pickup, schedule specialist consultations, and prepare your villa. Add them whenever you book your flights!
              </p>
            </div>
          </div>
        </div>
        )}

        {/* Contact Information */}
        <div className="mb-12 border border-gray-200 p-8">
          {groupData ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)' }}>
                  Group Journey - Lead Planner Contact
                </h3>
              </div>
              
              {/* Display Group Info */}
              <div className="mb-6 p-6 rounded-lg" style={{ backgroundColor: '#fffbfc', border: '2px solid var(--bt-blush)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Group Size</p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {groupData.groupSize} Travelers
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Budget Per Person</p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      ${groupData.budgetPerPerson.toLocaleString()}
                    </p>
                  </div>
                </div>
                {groupData.celebrationTypes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Celebration Type</p>
                    <p style={{ fontSize: '1rem', color: 'var(--bt-charcoal)' }}>
                      {groupData.celebrationTypes.join(', ')}
                      {groupData.customCelebration && ` - ${groupData.customCelebration}`}
                    </p>
                  </div>
                )}
              </div>

              {/* Lead Planner Info (Read-only display) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-2 block">Lead Planner Name</Label>
                  <div className="p-3 rounded border-2 bg-gray-50" style={{ borderColor: 'var(--bt-gold)' }}>
                    <p style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {groupData.leadName}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Contact Email</Label>
                  <div className="p-3 rounded border-2 bg-gray-50" style={{ borderColor: 'var(--bt-gold)' }}>
                    <p style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {groupData.leadEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Contact Phone</Label>
                  <div className="p-3 rounded border-2 bg-gray-50" style={{ borderColor: 'var(--bt-gold)' }}>
                    <p style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                      {groupData.leadPhone}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                <strong style={{ color: 'var(--bt-gold)' }}>Note:</strong> All booking confirmations and property details will be sent to the lead planner. You can coordinate individual traveler details with our concierge team after confirmation.
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-6" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)' }}>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Account Creation Option */}
        {!groupData && (
          <div className="mb-12 border border-gray-200 p-8">
            <div className="flex items-start gap-3 mb-6">
              <Checkbox 
                id="create-account" 
                checked={createAccount}
                onCheckedChange={(checked) => setCreateAccount(checked as boolean)}
              />
              <div>
                <Label htmlFor="create-account" className="cursor-pointer" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                  Create My Account & Save Progress
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Secure your journey details and easily access your booking portal to track progress, manage flights, and communicate with your concierge team.
                </p>
              </div>
            </div>

            {createAccount && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label htmlFor="password">Create Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2"
                    style={{ 
                      borderColor: password ? 'var(--bt-gold)' : 'var(--border)',
                      borderWidth: '2px'
                    }}
                    required={createAccount}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 8 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password *</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2"
                    style={{ 
                      borderColor: confirmPassword && password === confirmPassword ? 'var(--bt-gold)' : 'var(--border)',
                      borderWidth: '2px'
                    }}
                    required={createAccount}
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Flight Receipt Upload - Optional for regular bookings, hidden for Tour Trips */}
        {!isTourTrip && (
          <div className="mb-12 border-2 p-8" style={{ borderColor: '#d1d5db' }}>
            <h3 className="mb-4" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)' }}>
              Flight Confirmation (Optional)
            </h3>
            <p className="text-gray-600 mb-6">
              Have your flights booked already? Upload your receipt now, or add it later through your Booking Portal.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 p-8 text-center">
              <input
                type="file"
                id="flight-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label htmlFor="flight-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                {flightReceipt ? (
                  <div>
                    <p style={{ color: 'var(--bt-gold)' }}>✓ File uploaded: {flightReceipt.name}</p>
                    <p className="text-sm text-gray-500 mt-2">Click to change file</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 mb-2">Click to upload flight receipt (optional)</p>
                    <p className="text-sm text-gray-500">PDF, JPG, or PNG (max 10MB)</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="mb-12 flex items-start gap-3">
          <Checkbox 
            id="terms" 
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
            {isTourTrip 
              ? 'I understand this is a Tour Trip reservation requiring a 30% deposit payment. I agree to the terms and conditions, including the payment schedule, specialist consultation requirement, post-treatment care protocols, and cancellation policy specific to Tour Trips. *'
              : 'I agree to the terms and conditions, including the specialist consultation requirement, post-treatment care protocols, and cancellation policy. I understand that flight details can be added at any time through my Booking Portal, and final treatment dates will be scheduled based on my travel arrangements. *'
            }
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-8 py-4 border-2 transition-all duration-300 hover:scale-105 rounded-full"
            style={{ 
              borderColor: 'var(--bt-charcoal)',
              color: 'var(--bt-charcoal)'
            }}
          >
            {isTourTrip ? 'Back to Specialists' : 'Back to Recovery Options'}
          </button>
          <button
            onClick={(e) => {
              console.log('Button click event triggered');
              handleSubmit();
            }}
            disabled={!agreedToTerms || !(groupData ? groupData.leadEmail : email) || !(groupData ? groupData.leadPhone : phone)}
            className="px-12 py-5 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
            style={{ 
              backgroundColor: 'var(--bt-gold)',
              fontSize: '1.125rem',
              letterSpacing: '0.02em',
              fontWeight: '600'
            }}
          >
            {isTourTrip ? 'PAY 30% DEPOSIT & RESERVE' : 'SECURE MY RENEWAL'}
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 border border-gray-200" style={{ backgroundColor: isTourTrip ? '#fdf4ff' : '#f9fafb' }}>
          <div className="flex items-start gap-4 mb-6">
            <Logo size="md" className="opacity-60" />
            <div className="flex-1">
              <h4 className="mb-3" style={{ color: 'var(--bt-charcoal)' }}>What Happens Next?</h4>
              {isTourTrip ? (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#9333ea' }}>1.</span>
                    <span>You'll be redirected to pay your 30% reservation deposit ($XXX)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#9333ea' }}>2.</span>
                    <span>After payment confirmation, we'll coordinate your flight booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#9333ea' }}>3.</span>
                    <span>Once flights are confirmed, we'll schedule your procedure selections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#9333ea' }}>4.</span>
                    <span>Your complete Tour Trip itinerary will be sent 2 weeks before departure</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--bt-blush)' }}>1.</span>
                    <span>Our concierge team will review your submission within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--bt-blush)' }}>2.</span>
                    <span>We'll schedule a video consultation with your selected specialist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--bt-blush)' }}>3.</span>
                    <span>Add your flight details anytime through your Booking Portal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--bt-blush)' }}>4.</span>
                    <span>Upon flight confirmation, we'll finalize dates and send your travel itinerary</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="pt-6 border-t border-gray-300">
            <p className="text-xs text-gray-600 leading-relaxed mb-2">
              <strong>Medical Disclaimer:</strong> The Beauty Trip is a US-based concierge service and does not provide medical services or advice. All treatments are performed by independent, licensed practitioners in the Dominican Republic. We are not responsible for medical outcomes, complications, or adverse effects. Clients assume all medical risks.
            </p>
            <p className="text-xs text-gray-500">
              By submitting this request, you acknowledge that you have read and agree to our Terms of Service, Privacy Policy, and International Wellness Waiver.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
