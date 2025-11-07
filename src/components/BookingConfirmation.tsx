import { useLanguage } from '../i18n/LanguageContext';
import { Check, Sparkles, Calendar, Mail, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingConfirmationProps {
  onBackToHome: () => void;
  onViewSanctuaries?: () => void;
  onAccessPortal?: () => void;
}

export function BookingConfirmation({ onBackToHome, onViewSanctuaries, onAccessPortal }: BookingConfirmationProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bt-off-white)' }}>
      {/* Hero Celebration Section - Blush Pink Background */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--bt-blush)' }}>
        {/* Decorative Gold Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--bt-gold)' }}>
                <Check className="w-16 h-16 text-white" strokeWidth={3} />
              </div>
              <Sparkles className="absolute -top-4 -right-4 w-12 h-12" style={{ color: 'var(--bt-gold)' }} />
            </div>
          </div>

          {/* Main Confirmation Message */}
          <h1 className="mb-8" style={{ 
            fontSize: '4rem', 
            lineHeight: '1.1', 
            color: 'var(--bt-gold)',
            fontWeight: '600',
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-serif, Georgia, serif)'
          }}>
            YOUR JOURNEY IS SECURED.
          </h1>

          {/* Confirmation Blurb with Curator's Note */}
          <div className="max-w-3xl mx-auto mb-8 p-8 border-4 rounded-lg" style={{ 
            backgroundColor: 'var(--bt-blush)',
            borderColor: 'var(--bt-gold)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
          }}>
            <p className="mb-6" style={{ 
              fontSize: '1.5rem',
              color: 'white',
              fontWeight: '600',
              letterSpacing: '0.01em'
            }}>
              Thank You! Your bespoke experience has been submitted.
            </p>

            <div className="mb-6 p-6 rounded-lg" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '2px solid var(--bt-gold)'
            }}>
              <h3 className="mb-3 flex items-center gap-2" style={{ 
                fontSize: '1.125rem',
                color: 'var(--bt-gold)',
                fontWeight: '700',
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}>
                <span style={{ fontSize: '1.5rem' }}>✦</span>
                A Curator's Note on Dates
              </h3>
              <p className="mb-0" style={{ 
                fontSize: '1rem',
                color: 'var(--bt-charcoal)',
                lineHeight: '1.7'
              }}>
                To ensure I secure your luxury property and medical appointments efficiently, please be prepared to provide <strong>realistic, tentative dates</strong> for when you have confirmed time availability and have reviewed preliminary flight pricing. The precision of my service depends on the accuracy of your dates.
              </p>
            </div>

            <p style={{ 
              fontSize: '1.125rem',
              color: 'white',
              fontWeight: '500',
              lineHeight: '1.6'
            }}>
              My Concierge Team will contact you within{' '}
              <strong style={{ 
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>24 hours</strong>{' '}
              to begin this crucial validation step.
            </p>
          </div>

          {/* Validation Catchphrase */}
          <p className="text-2xl mb-12" style={{ 
            color: 'var(--bt-gold)',
            fontWeight: '500',
            letterSpacing: '0.05em',
            fontStyle: 'italic'
          }}>
            "The wait is over. The confidence begins."
          </p>
        </div>
      </section>

      {/* Visual Celebration Zone - Aspirational Imagery */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="relative h-80 overflow-hidden rounded-lg shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800"
                alt="Luxury villa interior"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-lg">{t.confirmation.sanctuary}</p>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
                alt="Gourmet dining"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-lg">{t.confirmation.wellness}</p>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-lg shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
                alt="Caribbean coastline"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-lg">{t.confirmation.paradise}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect - Gold Accent Timeline */}
      <section className="py-20" style={{ backgroundColor: '#fffbf0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center mb-16" style={{ 
            fontSize: '3rem', 
            color: 'var(--bt-charcoal)',
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}>
            {t.confirmation.whatNext}
          </h2>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center" style={{ 
                backgroundColor: 'var(--bt-gold)',
                boxShadow: '0 4px 16px rgba(194, 151, 88, 0.3)'
              }}>
                <span className="text-white text-2xl" style={{ fontWeight: '600' }}>1</span>
              </div>
              <div className="flex-1 pt-3">
                <h3 className="mb-3" style={{ 
                  fontSize: '1.75rem', 
                  color: 'var(--bt-gold)',
                  fontWeight: '600'
                }}>
                  {t.confirmation.step1Title}
                </h3>
                <p className="text-lg text-gray-700" style={{ lineHeight: '1.7' }}>
                  {t.confirmation.step1Desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center" style={{ 
                backgroundColor: 'var(--bt-gold)',
                boxShadow: '0 4px 16px rgba(194, 151, 88, 0.3)'
              }}>
                <span className="text-white text-2xl" style={{ fontWeight: '600' }}>2</span>
              </div>
              <div className="flex-1 pt-3">
                <h3 className="mb-3" style={{ 
                  fontSize: '1.75rem', 
                  color: 'var(--bt-gold)',
                  fontWeight: '600'
                }}>
                  {t.confirmation.step2Title}
                </h3>
                <p className="text-lg text-gray-700" style={{ lineHeight: '1.7' }}>
                  {t.confirmation.step2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center" style={{ 
                backgroundColor: 'var(--bt-gold)',
                boxShadow: '0 4px 16px rgba(194, 151, 88, 0.3)'
              }}>
                <span className="text-white text-2xl" style={{ fontWeight: '600' }}>3</span>
              </div>
              <div className="flex-1 pt-3">
                <h3 className="mb-3" style={{ 
                  fontSize: '1.75rem', 
                  color: 'var(--bt-gold)',
                  fontWeight: '600'
                }}>
                  {t.confirmation.step3Title}
                </h3>
                <p className="text-lg text-gray-700" style={{ lineHeight: '1.7' }}>
                  {t.confirmation.step3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Departure Excitement Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 border-2 rounded-lg" style={{ borderColor: 'var(--bt-blush)' }}>
              <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--bt-gold)' }} />
              <h4 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                {t.confirmation.flexibleTitle}
              </h4>
              <p className="text-gray-600">
                {t.confirmation.flexibleDesc}
              </p>
            </div>

            <div className="p-8 border-2 rounded-lg" style={{ borderColor: 'var(--bt-blush)' }}>
              <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--bt-gold)' }} />
              <h4 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                {t.confirmation.digitalTitle}
              </h4>
              <p className="text-gray-600">
                {t.confirmation.digitalDesc}
              </p>
            </div>

            <div className="p-8 border-2 rounded-lg" style={{ borderColor: 'var(--bt-blush)' }}>
              <Home className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--bt-gold)' }} />
              <h4 className="mb-2" style={{ fontSize: '1.25rem', color: 'var(--bt-charcoal)', fontWeight: '600' }}>
                {t.confirmation.villaTitle}
              </h4>
              <p className="text-gray-600">
                {t.confirmation.villaDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--bt-blush)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-center mb-12" style={{ 
            fontSize: '2.5rem', 
            color: 'var(--bt-charcoal)',
            fontWeight: '600',
            letterSpacing: '-0.02em'
          }}>
            {t.confirmation.continueExploring}
          </h3>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {onViewSanctuaries && (
              <button
                onClick={onViewSanctuaries}
                className="px-10 py-5 text-white transition-all duration-300 hover:scale-105 rounded-full shadow-xl text-lg"
                style={{ 
                  backgroundColor: 'var(--bt-gold)',
                  fontWeight: '600',
                  letterSpacing: '0.05em'
                }}
              >
                {t.confirmation.exploreSanctuaries}
              </button>
            )}

            <button
              onClick={onBackToHome}
              className="px-10 py-5 transition-all duration-300 hover:scale-105 rounded-full text-lg border-2"
              style={{ 
                borderColor: 'var(--bt-gold)',
                color: 'var(--bt-charcoal)',
                fontWeight: '600',
                letterSpacing: '0.05em',
                backgroundColor: 'white'
              }}
            >
              {t.confirmation.returnHome}
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-16 text-center p-8 bg-white rounded-lg border-2" style={{ borderColor: 'var(--bt-gold)' }}>
            <p className="mb-3" style={{ color: 'var(--bt-charcoal)', fontSize: '1.125rem' }}>
              <strong>{t.confirmation.questionsBefore}</strong>
            </p>
            <p className="text-gray-600 mb-4">
              {t.confirmation.questionsDesc}
            </p>
            <a 
              href="mailto:concierge@thebeautytrip.com" 
              className="inline-block px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--bt-gold)',
                color: 'white',
                fontWeight: '500'
              }}
            >
              concierge@thebeautytrip.com
            </a>
          </div>
        </div>
      </section>

      {/* Final Assurance Footer */}
      <section className="py-12 bg-white border-t-2" style={{ borderColor: 'var(--bt-gold)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg italic" style={{ color: 'var(--bt-charcoal)' }}>
            {t.confirmation.finalMessage}
          </p>
          <p className="mt-4" style={{ color: 'var(--bt-gold)', fontWeight: '600' }}>
            {t.confirmation.conciergeTeam}
          </p>
        </div>
      </section>
    </div>
  );
}
