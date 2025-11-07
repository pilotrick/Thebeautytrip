import { motion } from 'motion/react';
import { CheckCircle2, Mail, Clock, FileText, Sparkles } from 'lucide-react';
import { ProgressBar } from '../ProgressBar';

interface Props {
  providerName: string;
  providerEmail: string;
  providerType: 'wellness' | 'tour' | 'recovery';
  onContinue: () => void;
  onBackHome: () => void;
}

export function ProviderOnboardingCelebration({ 
  providerName, 
  providerEmail, 
  providerType,
  onContinue,
  onBackHome
}: Props) {
  const getProviderTypeLabel = () => {
    if (providerType === 'wellness') return 'Wellness Specialist';
    if (providerType === 'tour') return 'Tour Operator';
    return 'Recovery Partner';
  };

  const confetti = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      <ProgressBar 
        currentStep={1} 
        totalSteps={2} 
        stepTitle="Application Submitted"
        onLogoClick={onBackHome}
      />

      {/* Confetti Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${c.left}%`,
              top: '-5%',
              backgroundColor: Math.random() > 0.5 ? 'var(--bt-blush)' : 'var(--bt-gold)'
            }}
            animate={{
              y: ['0vh', '105vh'],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 20,
            delay: 0.2 
          }}
          className="flex justify-center mb-8"
        >
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center relative"
            style={{ backgroundColor: 'var(--bt-blush)' }}
          >
            <CheckCircle2 className="w-16 h-16 text-white" />
            
            {/* Pulse rings */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-4"
                style={{ borderColor: 'var(--bt-blush)' }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5 + (i * 0.3), opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: '700', 
              color: 'var(--bt-charcoal)',
              letterSpacing: '-0.02em'
            }}>
              Application Submitted!
            </h1>
            <Sparkles className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-600 mb-2"
          >
            Welcome to The Beauty Trip Provider Network, {providerName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-500"
          >
            Your credentials are now under review by our Facilitator team
          </motion.p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center"
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `var(--bt-blush)20` }}
            >
              <FileText className="w-8 h-8" style={{ color: 'var(--bt-blush)' }} />
            </div>
            <h3 className="mb-2" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
              Provider Type
            </h3>
            <p className="text-gray-600">{getProviderTypeLabel()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center"
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `var(--bt-gold)20` }}
            >
              <Clock className="w-8 h-8" style={{ color: 'var(--bt-gold)' }} />
            </div>
            <h3 className="mb-2" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
              Review Time
            </h3>
            <p className="text-gray-600">24-48 hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl p-6 border-2 border-gray-200 text-center"
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `var(--bt-blush)20` }}
            >
              <Mail className="w-8 h-8" style={{ color: 'var(--bt-blush)' }} />
            </div>
            <h3 className="mb-2" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
              Notification Email
            </h3>
            <p className="text-gray-600 text-sm break-all">{providerEmail}</p>
          </motion.div>
        </div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-xl p-8 border-2 border-gray-200 mb-8"
        >
          <h2 className="mb-6 text-center" style={{ 
            fontSize: '1.75rem', 
            fontWeight: '600', 
            color: 'var(--bt-charcoal)' 
          }}>
            What Happens Next?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--bt-blush)' }}
              >
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h4 className="mb-1" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                  Credential Verification
                </h4>
                <p className="text-gray-600 text-sm">
                  Our team will verify your license, insurance, and professional credentials within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--bt-gold)' }}
              >
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h4 className="mb-1" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                  Email Notification
                </h4>
                <p className="text-gray-600 text-sm">
                  You'll receive an email at <strong>{providerEmail}</strong> with your approval status and next steps.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--bt-blush)' }}
              >
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h4 className="mb-1" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                  Contract Signing
                </h4>
                <p className="text-gray-600 text-sm">
                  Once approved, you'll be invited to review and sign the Global Service Level Agreement tailored to your jurisdiction.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--bt-gold)' }}
              >
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h4 className="mb-1" style={{ fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                  Account Activation
                </h4>
                <p className="text-gray-600 text-sm">
                  After signing your SLA, you'll gain immediate access to your provider dashboard and start receiving bookings.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8"
        >
          <div className="flex gap-3">
            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="mb-2 text-blue-900" style={{ fontWeight: '600' }}>
                Check Your Email
              </h4>
              <p className="text-sm text-blue-800">
                Make sure to check your spam/junk folder if you don't see our email within 48 hours. 
                Add <strong>facilitator@thebeautytrip.com</strong> to your contacts to ensure delivery.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={onBackHome}
            className="flex-1 px-8 py-4 rounded-full border-2 transition-all hover:scale-105"
            style={{ 
              borderColor: 'var(--bt-charcoal)', 
              color: 'var(--bt-charcoal)',
              fontWeight: '600'
            }}
          >
            Return to Main Site
          </button>
          
          <button
            onClick={onContinue}
            className="flex-1 px-8 py-4 rounded-full transition-all hover:scale-105"
            style={{ 
              backgroundColor: 'var(--bt-gold)', 
              color: 'white',
              fontWeight: '600'
            }}
          >
            Continue to Contract Preview (Demo)
          </button>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="text-center text-sm text-gray-500 mt-8"
        >
          Questions? Contact us at <a href="mailto:providers@thebeautytrip.com" className="underline" style={{ color: 'var(--bt-blush)' }}>providers@thebeautytrip.com</a>
        </motion.p>
      </div>
    </div>
  );
}
