import React, { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Step1WelcomeProps {
  onNext: () => void;
  selectedDestination: string;
  setSelectedDestination: (dest: string) => void;
  groupMode?: boolean;
  groupSize: number;
  setGroupSize: (size: number) => void;
}

export function Step1Welcome({ onNext, setSelectedDestination, groupMode = false, groupSize, setGroupSize }: Step1WelcomeProps) {
  const { t } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-set destination to Dominican Republic
  const handleStart = () => {
    if (groupSize >= 1) {
      setSelectedDestination("Dominican Republic");
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {groupMode && (
            <div className="mb-6 inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ 
              backgroundColor: 'var(--bt-blush)',
              color: 'white'
            }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span style={{ fontWeight: '600', fontSize: '0.95rem', letterSpacing: '0.02em' }}>
                GROUP JOURNEY
              </span>
            </div>
          )}
          <h1 style={{ fontSize: '3rem', color: 'var(--bt-charcoal)', marginBottom: '1.5rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
            {groupMode ? 'Welcome to Your Group Sanctuary' : 'Welcome to Your Sanctuary'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4" style={{ fontSize: '1.125rem' }}>
            {groupMode 
              ? 'Experience the Dominican Republic\'s premier aesthetic and dental excellence together. Discover transformative treatments with refined recovery in your exclusive group sanctuary.'
              : 'Experience the Dominican Republic\'s premier aesthetic and dental excellence. Discover transformative, non-invasive treatments with refined recovery in your Caribbean sanctuary.'}
          </p>
          
          {/* Take Your Time Message */}
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-lg border-2" style={{ 
            borderColor: 'var(--bt-gold)',
            backgroundColor: '#fffef8'
          }}>
            <p className="text-center" style={{ 
              fontSize: '1rem',
              color: 'var(--bt-gold)',
              fontWeight: '600',
              letterSpacing: '0.02em'
            }}>
              ✦ Take your time building your perfect experience — you can modify selections at any step ✦
            </p>
          </div>
        </div>

        {/* GROUP SIZE QUESTION - THE VERY FIRST INPUT */}
        <div className="mb-16 p-8 border-4 rounded-lg" style={{ 
          borderColor: 'var(--bt-gold)',
          backgroundColor: '#fffef8'
        }}>
          <h2 className="text-center mb-6" style={{ 
            fontSize: '2rem', 
            color: 'var(--bt-charcoal)',
            fontWeight: '600',
            letterSpacing: '-0.01em'
          }}>
            Who is joining your Renewal?
          </h2>
          <p className="text-center mb-8 text-gray-600" style={{ fontSize: '1.125rem' }}>
            Total guests, including patient
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 justify-center">
              <button
                onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110"
                style={{ 
                  borderColor: 'var(--bt-gold)',
                  backgroundColor: 'white',
                  color: 'var(--bt-charcoal)',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}
              >
                −
              </button>
              
              <div className="flex-1 text-center">
                <div className="text-6xl mb-2" style={{ 
                  color: 'var(--bt-gold)',
                  fontWeight: '700'
                }}>
                  {groupSize}
                </div>
                <div className="text-sm text-gray-600">
                  {groupSize === 1 ? 'Guest' : 'Guests'}
                </div>
              </div>

              <button
                onClick={() => setGroupSize(Math.min(12, groupSize + 1))}
                className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110"
                style={{ 
                  borderColor: 'var(--bt-gold)',
                  backgroundColor: 'white',
                  color: 'var(--bt-charcoal)',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}
              >
                +
              </button>
            </div>

            {/* Quick Select Buttons */}
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setGroupSize(1)}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: groupSize === 1 ? 'var(--bt-gold)' : 'white',
                  color: groupSize === 1 ? 'white' : 'var(--bt-charcoal)',
                  border: '2px solid var(--bt-gold)',
                  fontWeight: '500'
                }}
              >
                Solo
              </button>
              <button
                onClick={() => setGroupSize(2)}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: groupSize === 2 ? 'var(--bt-gold)' : 'white',
                  color: groupSize === 2 ? 'white' : 'var(--bt-charcoal)',
                  border: '2px solid var(--bt-gold)',
                  fontWeight: '500'
                }}
              >
                Duo
              </button>
              <button
                onClick={() => setGroupSize(4)}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: groupSize === 4 ? 'var(--bt-gold)' : 'white',
                  color: groupSize === 4 ? 'white' : 'var(--bt-charcoal)',
                  border: '2px solid var(--bt-gold)',
                  fontWeight: '500'
                }}
              >
                Small Group
              </button>
              <button
                onClick={() => setGroupSize(8)}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: groupSize >= 8 ? 'var(--bt-gold)' : 'white',
                  color: groupSize >= 8 ? 'white' : 'var(--bt-charcoal)',
                  border: '2px solid var(--bt-gold)',
                  fontWeight: '500'
                }}
              >
                Large Group
              </button>
            </div>

            {/* Curator's Note based on group size */}
            {groupSize === 1 && (
              <div className="mt-6 p-4 rounded-lg" style={{ 
                backgroundColor: 'var(--bt-blush)',
                border: '2px solid rgba(255,255,255,0.5)'
              }}>
                <p className="text-white text-sm text-center" style={{ lineHeight: '1.6' }}>
                  <strong>Curator's Note:</strong> To maintain your absolute privacy, The Beauty Trip has curated discreet sanctuaries for your solitary focus.
                </p>
              </div>
            )}

            {groupSize >= 7 && (
              <div className="mt-6 p-4 rounded-lg" style={{ 
                backgroundColor: 'var(--bt-gold)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                <p className="text-white text-sm text-center" style={{ lineHeight: '1.6' }}>
                  <strong>Welcome to The Elite Collection.</strong> These fully-staffed estates are secured for your collective confidence.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* DR Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523115719094-89bab6bf087b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb21pbmljYW4lMjByZXB1YmxpYyUyMHNhbnRvJTIwZG9taW5nb3xlbnwxfHx8fDE3NjA0OTA4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Santo Domingo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1630883233935-d639ba709e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb21pbmljYW4lMjByZXB1YmxpYyUyMGJlYWNoJTIwdmlsbGF8ZW58MXx8fHwxNzYwNDkwODkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Dominican Republic Beach Villa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Key Benefits */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-center mb-12" style={{ fontSize: '2rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.02em' }}>
            Why Your Dominican Sanctuary?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>Elevated Value</h3>
              <p className="text-sm text-gray-600">Experience 65-70% savings compared to US pricing with uncompromised excellence</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>Refined Recovery</h3>
              <p className="text-sm text-gray-600">Sophisticated, non-invasive treatments with under 7 days social downtime</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-blush)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2" style={{ color: 'var(--bt-charcoal)', fontWeight: '600' }}>Trusted Expertise</h3>
              <p className="text-sm text-gray-600">International certifications with US/European-trained specialists</p>
            </div>
          </div>
        </div>

        {/* Airport & Transportation */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="border-2 bg-white overflow-hidden" style={{ borderColor: 'var(--bt-gold)' }}>
            {/* Transportation Fleet Image */}
            <div className="w-full aspect-[16/9] overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
              <img 
                src="https://images.unsplash.com/photo-1503365238700-cbf83cf26311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGFpcnBvcnQlMjBhcnJpdmFsJTIwbHV4dXJ5fGVufDF8fHx8MTc2MDU0ODAxNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Tropical island airport arrival with luxury service"
                className="w-full h-full object-cover"
                style={{ opacity: 0.9 }}
                onError={(e) => {
                  console.log('Image failed to load');
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={(e) => {
                  console.log('Image loaded successfully');
                }}
              />
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bt-gold)' }}>
                  <svg className="w-6 h-6" style={{ color: 'var(--bt-charcoal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-3" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.01em' }}>
                    Seamless Airport Service
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We provide private airport pickup from <strong>Santo Domingo (SDQ)</strong> or <strong>Punta Cana (PUJ)</strong>. All ground transportation between your villa, clinics, and activities is included throughout your stay.
                  </p>
                  <p className="text-sm text-gray-600">
                    No need to worry about logistics—our luxury fleet handles everything from the moment you land to your return flight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div className="max-w-3xl mx-auto mb-16 p-8 border border-gray-200 bg-white">
          <h3 className="mb-6 text-center" style={{ fontSize: '1.5rem', color: 'var(--bt-charcoal)', fontWeight: '600', letterSpacing: '-0.01em' }}>
            Your 10 day Sample Itinerary
          </h3>
          <p className="text-center text-gray-600 mb-6" style={{ fontSize: '1rem' }}>
            Take your time building your perfect experience. This is a flexible framework that adapts to your schedule.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}></div>
              <div>
                <p className="text-gray-700"><span style={{ color: 'var(--bt-gold)' }}>Days 1-2:</span> Private airport pickup (SDQ or PUJ), villa check-in, specialist consultation, and first treatments</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}></div>
              <div>
                <p className="text-gray-700"><span style={{ color: 'var(--bt-gold)' }}>Days 3-5:</span> Additional procedures and recovery care (transportation to all appointments included)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}></div>
              <div>
                <p className="text-gray-700"><span style={{ color: 'var(--bt-gold)' }}>Days 6-8:</span> Relaxation and follow-up care in luxury villa</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--bt-blush)' }}></div>
              <div>
                <p className="text-gray-700"><span style={{ color: 'var(--bt-gold)' }}>Days 9-10:</span> Final check-ups and private airport transfer for departure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleStart}
            disabled={groupSize < 1}
            className="px-12 py-5 text-white transition-all duration-300 hover:scale-105 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--bt-gold)',
              fontSize: '1.125rem',
              fontWeight: '500',
              letterSpacing: '0.02em'
            }}
          >
            BEGIN YOUR RENEWAL
          </button>
        </div>
      </div>
    </div>
  );
}
