import { useState, useEffect } from "react";
import { HomePage } from "./components/HomePage";
import { ProgressBar } from "./components/ProgressBar";
import { Step1Welcome } from "./components/steps/Step1Welcome";
import { Step2Procedures } from "./components/steps/Step2Procedures";
import { Step3Specialists } from "./components/steps/Step3Specialists";
import { Step4Recovery } from "./components/steps/Step4Recovery";
import { Step5Summary } from "./components/steps/Step5Summary";
import { BookingConfirmation } from "./components/BookingConfirmation";
import { GroupQuestionnaire, GroupData } from "./components/GroupQuestionnaire";
import { GroupSanctuarySelection } from "./components/GroupSanctuarySelection";
import { GroupCelebration } from "./components/GroupCelebration";
import { GroupThankYou } from "./components/GroupThankYou";
import { JoinGroupTrip, MemberJoinData } from "./components/JoinGroupTrip";
import { Login } from "./components/Login";
import { TransformationPortal } from "./components/TransformationPortal";
import { TourTrips } from "./components/TourTrips";
import { TourTripCelebration } from "./components/TourTripCelebration";
import { ProviderPortal } from "./components/ProviderPortal";
import { LanguageProvider } from "./i18n/LanguageContext";
import { LanguageSelector } from "./components/LanguageSelector";
import { Toaster } from "./components/ui/sonner";
import { SupabaseStatus } from "./components/SupabaseStatus";
import { getSession } from "./utils/auth";
import { supabase } from "./utils/supabase/client";

export interface PackagePreset {
  name: string;
  recoveryDays: number;
  procedures: string[];
  specialist: string;
  retreat: string;
}

export type TourTripBooking = {
  id: string;
  name: string;
  price: number;
  duration: string;
  dates: string;
  location: string;
  approach: string;
  includedItems: string[];
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'builder' | 'booking-confirmed' | 'group-questionnaire' | 'group-sanctuary' | 'group-celebration' | 'group-thankyou' | 'join-group' | 'login' | 'portal' | 'tour-trips' | 'tour-celebration' | 'provider-portal'>('home');
  const [currentStep, setCurrentStep] = useState(1);
  const [userEmail, setUserEmail] = useState<string>('');
  const [tourTripBooking, setTourTripBooking] = useState<TourTripBooking | null>(null);
  const [isTourTripBuilder, setIsTourTripBuilder] = useState(false);
  const [tourDepositPaid, setTourDepositPaid] = useState(0);

  // CRITICAL: Scroll Restoration - Always start at top on page load
  useEffect(() => {
    // Force scroll to top on initial mount or page refresh
    window.scrollTo(0, 0);
    
    // Disable browser scroll restoration to prevent mid-page landings
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // SEO Meta Tags Setup
  useEffect(() => {
    // Update document title and meta tags
    document.title = "The Beauty Trip | Vacation in Paradise, Meet the New You";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Vacation in Paradise, Meet the New You. The Beauty Trip offers luxury MedSpa, dental veneers, BOTOX, fillers & wellness treatments in the Dominican Republic. Save up to 70% vs US prices. 5-star accommodations included.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Vacation in Paradise, Meet the New You. The Beauty Trip offers luxury MedSpa, dental veneers, BOTOX, fillers & wellness treatments in the Dominican Republic. Save up to 70% vs US prices. 5-star accommodations included.';
      document.head.appendChild(meta);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywords = 'medical tourism, Dominican Republic, luxury wellness, dental veneers, BOTOX, fillers, hair transplant, laser treatment, MedSpa, aesthetic treatments, beauty tourism, cosmetic procedures, wellness retreat, luxury recovery, Santo Domingo, Punta Cana';
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'The Beauty Trip | Vacation in Paradise, Meet the New You' },
      { property: 'og:description', content: 'Vacation in Paradise, Meet the New You. Luxury wellness & aesthetic treatments in the Dominican Republic with 5-star accommodations. Save up to 70%.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'The Beauty Trip | Vacation in Paradise' },
      { name: 'twitter:description', content: 'Vacation in Paradise, Meet the New You. Luxury wellness in Dominican Republic. Save up to 70%.' }
    ];

    ogTags.forEach(tag => {
      const existing = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
      if (existing) {
        existing.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        if (tag.property) {
          meta.setAttribute('property', tag.property);
        } else if (tag.name) {
          meta.setAttribute('name', tag.name);
        }
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Pinterest Business Verification
    const pinterestMeta = document.querySelector('meta[name="p:domain_verify"]');
    if (!pinterestMeta) {
      const meta = document.createElement('meta');
      meta.name = 'p:domain_verify';
      meta.content = '47f59aed4a7e02fa401d6f4063c9add3';
      document.head.appendChild(meta);
    }

    // Structured Data (Schema.org JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "The Beauty Trip",
      "description": "Luxury medical tourism and wellness platform specializing in non-invasive aesthetic procedures in the Dominican Republic",
      "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
      "priceRange": "$$",
      "areaServed": {
        "@type": "Country",
        "name": "Dominican Republic"
      },
      "medicalSpecialty": [
        "Cosmetic Dentistry",
        "Aesthetic Medicine",
        "Dermatology",
        "Hair Restoration",
        "Wellness Medicine"
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Dental Veneers",
          "description": "Complete smile transformation with porcelain veneers"
        },
        {
          "@type": "MedicalProcedure",
          "name": "BOTOX & Fillers",
          "description": "Non-invasive facial rejuvenation treatments"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Hair Transplant",
          "description": "Advanced hair restoration procedures"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "800"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    document.head.appendChild(script);
  }, []);

  // User selections
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [procedureDescriptions, setProcedureDescriptions] = useState<Record<string, string>>({});
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectedRetreat, setSelectedRetreat] = useState("");
  const [recoveryDays, setRecoveryDays] = useState(10);
  const [groupSize, setGroupSize] = useState<number>(1); // Number of total guests including patient

  // Group flow state
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [selectedGroupSanctuaries, setSelectedGroupSanctuaries] = useState<string[]>([]);
  const [joinGroupId, setJoinGroupId] = useState<string>('');

  // Check for existing user session and URL parameters on mount
  useEffect(() => {
    // Ensure scroll position at top when checking session
    window.scrollTo(0, 0);
    
    // Check for Supabase session
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        setUserEmail(session.email);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email || '');
      } else {
        setUserEmail('');
      }
    });

    // Check for join group link in URL
    const urlParams = new URLSearchParams(window.location.search);
    const joinParam = urlParams.get('join');
    if (joinParam) {
      setJoinGroupId(joinParam);
      setCurrentView('join-group');
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add beforeunload event to prompt account creation if user tries to leave during builder or provider portal
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Prompt if in builder mode, has selections, and no user account
      if (currentView === 'builder' && 
          (selectedProcedures.length > 0 || selectedSpecialist || selectedRetreat) && 
          !localStorage.getItem('beautyTripUser')) {
        event.preventDefault();
        event.returnValue = 'You have unsaved progress. Would you like to create an account to save your selections?';
        return event.returnValue;
      }
      
      // Prompt if in provider portal (provider onboarding/credentialing in progress)
      if (currentView === 'provider-portal') {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave? Any unsaved provider information will be lost.';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentView, selectedProcedures, selectedSpecialist, selectedRetreat]);

  const totalSteps = 5;

  const handleStartBuilder = (packagePreset?: PackagePreset) => {
    setIsTourTripBuilder(false);
    // If a package preset is provided, pre-populate the selections
    if (packagePreset) {
      setSelectedDestination("dominican-republic");
      setSelectedProcedures(packagePreset.procedures);
      setSelectedSpecialist(packagePreset.specialist);
      setSelectedRetreat(packagePreset.retreat);
      setRecoveryDays(packagePreset.recoveryDays);
      // Start at step 2 since destination is pre-selected
      setCurrentStep(2);
    } else {
      setCurrentStep(1);
    }
    setCurrentView('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTourTripBuilder = () => {
    setIsTourTripBuilder(true);
    setCurrentStep(1); // Start at procedure selection for tour trips
    setCurrentView('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGroupFlow = () => {
    setCurrentView('group-questionnaire');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGroupSubmit = (data: GroupData) => {
    setGroupData(data);
    // Move to sanctuary selection
    setCurrentView('group-sanctuary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGroupSanctuaryComplete = (sanctuaries: string[]) => {
    setSelectedGroupSanctuaries(sanctuaries);
    // Show celebration screen
    setCurrentView('group-celebration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccessGroupPortal = () => {
    // Show thank you screen with portal links
    setCurrentView('group-thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMemberJoin = (memberData: MemberJoinData) => {
    // Store member data and start builder flow
    console.log('Member joined group:', memberData);
    
    // Save member info to start their individual booking
    localStorage.setItem('groupMemberId', memberData.groupId);
    localStorage.setItem('memberInfo', JSON.stringify(memberData));
    
    // Start builder flow
    setCurrentView('builder');
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setCurrentView('home');
    setCurrentStep(1);
    setGroupData(null);
    setSelectedGroupSanctuaries([]);
    setJoinGroupId('');
    
    // Clear URL parameters
    window.history.replaceState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingComplete = () => {
    // If it's a tour trip booking, show tour celebration
    if (isTourTripBuilder && tourTripBooking) {
      setCurrentView('tour-celebration');
    } else {
      setCurrentView('booking-confirmed');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewSanctuaries = () => {
    setCurrentView('builder');
    setCurrentStep(4); // Go to recovery/villa selection step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccessPortal = () => {
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTourCelebrationComplete = () => {
    // After tour celebration, go to portal
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('beautyTripUser');
    setUserEmail('');
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeBooking = (journeyId: string) => {
    // Resume to Step 5 (final summary) for incomplete bookings
    console.log('Resuming journey:', journeyId);
    setCurrentView('builder');
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewGroupTrip = (groupId: string) => {
    // View group celebration/details screen
    console.log('Viewing group trip:', groupId);
    if (groupData) {
      setCurrentView('group-celebration');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartTourTrips = () => {
    setTourTripBooking(null);
    setCurrentView('tour-trips');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccessProviderPortal = () => {
    setCurrentView('provider-portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentView === 'login') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <Login onLogin={handleLogin} onBack={handleReturnHome} />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'portal') {
    return (
      <LanguageProvider>
        <TransformationPortal 
          userEmail={userEmail}
          onLogout={handleLogout}
          onReturnHome={handleReturnHome}
          onResumeBooking={handleResumeBooking}
          onViewGroupTrip={handleViewGroupTrip}
          tourTripBooking={tourTripBooking}
          onClearTourTrip={() => setTourTripBooking(null)}
          onStartTourTripBuilder={handleStartTourTripBuilder}
        />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'provider-portal') {
    return (
      <LanguageProvider>
        <ProviderPortal onBack={handleReturnHome} />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'home') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <HomePage 
          onStartBuilder={handleStartBuilder} 
          onStartGroupFlow={handleStartGroupFlow}
          onAccessPortal={handleAccessPortal}
          onStartTourTrips={handleStartTourTrips}
          onAccessProviderPortal={handleAccessProviderPortal}
        />
        <Toaster />
        <SupabaseStatus />
      </LanguageProvider>
    );
  }

  if (currentView === 'tour-trips') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <TourTrips 
          onBackHome={handleReturnHome}
          onBookTour={(tour) => {
            setTourTripBooking(tour);
            // Start the tour trip builder flow (includes scroll-to-top)
            handleStartTourTripBuilder();
          }}
        />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'tour-celebration') {
    return (
      <LanguageProvider>
        <TourTripCelebration
          tourTripName={tourTripBooking?.name || 'Your Tour Trip'}
          tourPrice={tourTripBooking?.price || 0}
          depositPaid={tourDepositPaid || Math.round((tourTripBooking?.price || 0) * 0.30)}
          tourDates={tourTripBooking?.dates || ''}
          tourLocation={tourTripBooking?.location || 'Dominican Republic'}
          tourDuration={tourTripBooking?.duration || ''}
          onContinueToPortal={handleTourCelebrationComplete}
          userEmail={userEmail}
        />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'group-questionnaire') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <GroupQuestionnaire onSubmit={handleGroupSubmit} onBack={handleReturnHome} />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'group-sanctuary') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <GroupSanctuarySelection 
          groupData={groupData!} 
          onComplete={handleGroupSanctuaryComplete}
          onBack={() => {
            setCurrentView('group-questionnaire');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'group-celebration') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <GroupCelebration 
          groupData={groupData!}
          selectedSanctuaries={selectedGroupSanctuaries}
          onAccessPortal={handleAccessGroupPortal}
        />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'group-thankyou') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <GroupThankYou groupData={groupData!} onReturnHome={handleReturnHome} />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'join-group') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <JoinGroupTrip groupId={joinGroupId} onComplete={handleMemberJoin} />
        <Toaster />
      </LanguageProvider>
    );
  }

  if (currentView === 'booking-confirmed') {
    return (
      <LanguageProvider>
        <LanguageSelector />
        <BookingConfirmation 
          onBackToHome={handleReturnHome}
          onViewSanctuaries={handleViewSanctuaries}
          onAccessPortal={handleAccessPortal}
        />
        <Toaster />
      </LanguageProvider>
    );
  }

  // Get step-specific title
  const getStepTitle = (step: number): string => {
    if (isTourTripBuilder) {
      switch(step) {
        case 1: return "Select Add-On Procedures";
        case 2: return "Choose Your Specialist";
        case 3: return "Review & Pay Deposit";
        default: return "Tour Trip Journey";
      }
    }
    
    switch(step) {
      case 1: return "Destination Selection";
      case 2: return "Choose Your Procedures";
      case 3: return "Select Your Specialist";
      case 4: return "Recovery & Accommodation";
      case 5: return "Review & Finalize";
      default: return "Custom Journey";
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <LanguageSelector />
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={isTourTripBuilder ? 3 : totalSteps} 
          stepTitle={getStepTitle(currentStep)}
          onLogoClick={handleReturnHome}
          mode={isTourTripBuilder ? 'tour' : 'journey'}
        />
        <Toaster />

      {/* Step 1: Welcome - Skip for tour trip builder */}
      {currentStep === 1 && !isTourTripBuilder && (
        <Step1Welcome
          onNext={handleNextStep}
          selectedDestination={selectedDestination}
          setSelectedDestination={setSelectedDestination}
          groupMode={!!groupData}
          groupSize={groupSize}
          setGroupSize={setGroupSize}
        />
      )}

      {/* Step 2 (regular) or Step 1 (tour trip): Procedures */}
      {((currentStep === 2 && !isTourTripBuilder) || (currentStep === 1 && isTourTripBuilder)) && (
        <Step2Procedures
          onNext={handleNextStep}
          onBack={isTourTripBuilder ? () => setCurrentView('portal') : handlePrevStep}
          selectedProcedures={selectedProcedures}
          setSelectedProcedures={setSelectedProcedures}
          procedureDescriptions={procedureDescriptions}
          setProcedureDescriptions={setProcedureDescriptions}
        />
      )}

      {/* Step 3 (regular): Specialists - Only for regular flow */}
      {currentStep === 3 && !isTourTripBuilder && (
        <Step3Specialists
          onNext={handleNextStep}
          onBack={handlePrevStep}
          selectedSpecialist={selectedSpecialist}
          setSelectedSpecialist={setSelectedSpecialist}
          selectedProcedures={selectedProcedures}
        />
      )}

      {/* Step 2 (tour trip only): Specialists (Optional Add-ons) */}
      {currentStep === 2 && isTourTripBuilder && (
        <Step3Specialists
          onNext={handleNextStep}
          onBack={handlePrevStep}
          selectedSpecialist={selectedSpecialist}
          setSelectedSpecialist={setSelectedSpecialist}
          selectedProcedures={selectedProcedures}
        />
      )}

      {/* Step 4: Recovery - Only for regular flow, skip for tour trips */}
      {currentStep === 4 && !isTourTripBuilder && (
        <Step4Recovery
          onNext={handleNextStep}
          onBack={handlePrevStep}
          selectedRetreat={selectedRetreat}
          setSelectedRetreat={setSelectedRetreat}
          recoveryDays={recoveryDays}
          setRecoveryDays={setRecoveryDays}
          groupMode={!!groupData}
          groupSize={groupSize}
        />
      )}

      {/* Step 5 (regular) or Step 3 (tour trip): Summary */}
      {((currentStep === 5 && !isTourTripBuilder) || (currentStep === 3 && isTourTripBuilder)) && (
        <Step5Summary
          onBack={handlePrevStep}
          onSubmitComplete={handleBookingComplete}
          selectedDestination={selectedDestination}
          selectedProcedures={selectedProcedures}
          selectedSpecialist={selectedSpecialist}
          selectedRetreat={selectedRetreat}
          recoveryDays={recoveryDays}
          groupData={groupData}
          isTourTrip={isTourTripBuilder}
          tourTripBooking={tourTripBooking}
          onTourDepositPaid={(amount) => setTourDepositPaid(amount)}
        />
      )}
      </div>
    </LanguageProvider>
  );
}
