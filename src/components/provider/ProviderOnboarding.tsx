import { useState } from 'react';
import { motion } from 'motion/react';
import { ProgressBar } from '../ProgressBar';
import { ProviderUser, ProviderType } from '../ProviderPortal';
import { ProviderOnboardingCelebration } from './ProviderOnboardingCelebration';
import { Upload, FileText, CheckCircle2, Globe, DollarSign, Shield } from 'lucide-react';

interface Props {
  currentStep: 'login' | 'credentialing' | 'celebration' | 'contract' | 'complete';
  pendingData?: {
    name: string;
    email: string;
    type: ProviderType;
    primaryLanguage: string;
    secondaryLanguage: string;
    jurisdiction: string;
    currency: string;
  } | null;
  onCredentialingSubmit?: (data: {
    name: string;
    email: string;
    type: ProviderType;
    primaryLanguage: string;
    secondaryLanguage: string;
    jurisdiction: string;
    currency: string;
  }) => void;
  onComplete: (provider: ProviderUser) => void;
  onBack: () => void;
  onBackToHome: () => void;
  onMoveToContract?: () => void;
}

export function ProviderOnboarding({ currentStep, pendingData, onCredentialingSubmit, onComplete, onBack, onBackToHome, onMoveToContract }: Props) {
  const [providerType, setProviderType] = useState<ProviderType>('wellness');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [primaryLanguage, setprimaryLanguage] = useState('en');
  const [secondaryLanguage, setSecondaryLanguage] = useState('');
  const [jurisdiction, setJurisdiction] = useState('Dominican Republic');
  const [currency, setCurrency] = useState('USD');
  const [license, setLicense] = useState<File | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);
  const [contractSigned, setContractSigned] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCredentialingSubmitLocal = () => {
    if (!name || !email || !license || !insurance) {
      alert('Please complete all required fields');
      return;
    }

    // In production, this would upload to Supabase Storage
    console.log('Credentials submitted for review:', {
      name,
      email,
      type: providerType,
      language: primaryLanguage,
      jurisdiction,
      currency,
      documents: { license, insurance }
    });

    // Call parent handler if provided (proper flow)
    if (onCredentialingSubmit) {
      onCredentialingSubmit({
        name,
        email,
        type: providerType,
        primaryLanguage,
        secondaryLanguage,
        jurisdiction,
        currency
      });
    } else {
      // Fallback for demo: show celebration inline
      setShowCelebration(true);
    }
  };

  const handleContractSign = () => {
    setContractSigned(true);
    
    // Use pendingData if available, otherwise use local state
    const providerData = pendingData || {
      name,
      email,
      type: providerType,
      primaryLanguage,
      secondaryLanguage,
      jurisdiction,
      currency
    };
    
    // Create provider user
    const newProvider: ProviderUser = {
      id: `provider-${Date.now()}`,
      email: providerData.email,
      name: providerData.name,
      type: providerData.type,
      status: 'active',
      primaryLanguage: providerData.primaryLanguage,
      secondaryLanguage: providerData.secondaryLanguage,
      slaScore: 100, // Start at perfect
      jurisdiction: providerData.jurisdiction,
      currency: providerData.currency
    };

    setTimeout(() => {
      onComplete(newProvider);
    }, 1500);
  };

  // Show celebration after credentialing submission
  if (currentStep === 'credentialing' && showCelebration) {
    return (
      <ProviderOnboardingCelebration
        providerName={name}
        providerEmail={email}
        providerType={providerType}
        onContinue={() => {
          if (onMoveToContract) {
            onMoveToContract();
          } else {
            setShowCelebration(false);
          }
        }}
        onBackHome={onBackToHome}
      />
    );
  }

  // If we're on celebration step (from parent), show it
  if (currentStep === 'celebration' && pendingData) {
    return (
      <ProviderOnboardingCelebration
        providerName={pendingData.name}
        providerEmail={pendingData.email}
        providerType={pendingData.type}
        onContinue={() => {
          if (onMoveToContract) {
            onMoveToContract();
          }
        }}
        onBackHome={onBackToHome}
      />
    );
  }

  if (currentStep === 'credentialing') {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
        <ProgressBar 
          currentStep={1} 
          totalSteps={2} 
          stepTitle="Provider Credentialing"
          onLogoClick={onBackToHome}
          mode="provider"
        />

        <div className="max-w-3xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 border-2 border-gray-200"
          >
            <div className="text-center mb-8">
              <h1 className="mb-2" style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                Provider Credentialing
              </h1>
              <p className="text-gray-600">
                Upload your credentials for Facilitator review
              </p>
            </div>

            <div className="space-y-6">
              {/* Provider Type */}
              <div>
                <label className="block mb-3 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Provider Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'wellness', label: 'Wellness Specialist' },
                    { value: 'tour', label: 'Tour Operator' },
                    { value: 'recovery', label: 'Recovery Partner' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setProviderType(type.value as ProviderType)}
                      className="p-4 rounded-lg border-2 transition-all"
                      style={{
                        borderColor: providerType === type.value ? 'var(--bt-blush)' : '#e5e7eb',
                        backgroundColor: providerType === type.value ? `var(--bt-blush)10` : 'white',
                        color: providerType === type.value ? 'var(--bt-blush)' : 'var(--bt-charcoal)',
                        fontWeight: providerType === type.value ? '600' : '500'
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Full Name / Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  placeholder="Dr. Sofia Martinez"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  placeholder="sofia@wellness.dr"
                />
              </div>

              {/* Languages */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                    <Globe className="w-4 h-4 inline mr-1" />
                    Primary Language
                  </label>
                  <select
                    value={primaryLanguage}
                    onChange={(e) => setprimaryLanguage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                    Secondary Language
                  </label>
                  <select
                    value={secondaryLanguage}
                    onChange={(e) => setSecondaryLanguage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  >
                    <option value="">None</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
              </div>

              {/* Jurisdiction & Currency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                    Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--bt-blush)] focus:outline-none"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="DOP">DOP - Dominican Peso</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
              </div>

              {/* License Upload */}
              <div>
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Local License <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setLicense(e.target.files?.[0] || null)}
                    className="hidden"
                    id="license-upload"
                  />
                  <label htmlFor="license-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600">Upload license document</p>
                    <p className="text-sm text-gray-500">PDF, JPG, or PNG</p>
                  </label>
                </div>
                {license && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {license.name}
                  </p>
                )}
              </div>

              {/* Insurance Upload */}
              <div>
                <label className="block mb-2 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                  Insurance Certificate <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setInsurance(e.target.files?.[0] || null)}
                    className="hidden"
                    id="insurance-upload"
                  />
                  <label htmlFor="insurance-upload" className="cursor-pointer">
                    <Shield className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600">Upload insurance certificate</p>
                    <p className="text-sm text-gray-500">PDF, JPG, or PNG</p>
                  </label>
                </div>
                {insurance && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {insurance.name}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onBack}
                  className="flex-1 px-6 py-4 rounded-full border-2 transition-all hover:scale-105"
                  style={{ borderColor: 'var(--bt-charcoal)', color: 'var(--bt-charcoal)', fontWeight: '600' }}
                >
                  Back
                </button>
                <button
                  onClick={handleCredentialingSubmitLocal}
                  disabled={!name || !email || !license || !insurance}
                  className="flex-1 px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Submit for Review
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (currentStep === 'contract') {
    // Use pendingData if available, otherwise fall back to local state
    const contractName = pendingData?.name || name;
    const contractEmail = pendingData?.email || email;
    const contractType = pendingData?.type || providerType;
    const contractJurisdiction = pendingData?.jurisdiction || jurisdiction;
    const contractCurrency = pendingData?.currency || currency;

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
        <ProgressBar 
          currentStep={2} 
          totalSteps={2} 
          stepTitle="Contract Signing (Demo)"
          onLogoClick={onBackToHome}
          mode="provider"
        />

        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 border-2 border-gray-200"
          >
            <div className="text-center mb-8">
              <h1 className="mb-2" style={{ fontSize: '2rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                Global Service Level Agreement
              </h1>
              <p className="text-gray-600">
                Review and sign the SLA for {contractJurisdiction} ({contractCurrency})
              </p>
            </div>

            {/* Mock SLA Document */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gray-200 max-h-96 overflow-y-auto">
              <h3 className="mb-4 font-semibold" style={{ color: 'var(--bt-charcoal)' }}>
                Service Level Agreement
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Provider:</strong> {contractName}</p>
                <p><strong>Type:</strong> {contractType}</p>
                <p><strong>Jurisdiction:</strong> {contractJurisdiction}</p>
                <p><strong>Currency:</strong> {contractCurrency}</p>
                
                <div className="pt-4 border-t border-gray-300 mt-4">
                  <p className="font-semibold mb-2">Performance Requirements:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Response time: Maximum 30 minutes for client inquiries</li>
                    <li>Service punctuality: No more than 15 minutes late</li>
                    <li>Documentation: All service logs must include detailed notes (min 50 chars)</li>
                    <li>Client satisfaction: Maintain minimum 4.5/5.0 rating</li>
                    <li>Availability: Update schedule at least 48 hours in advance</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-300 mt-4">
                  <p className="font-semibold mb-2">Payment Terms:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Payout currency: {contractCurrency}</li>
                    <li>Payment cycle: Weekly via bank transfer</li>
                    <li>Commission: Platform fee of 15% on all bookings</li>
                  </ul>
                </div>

                <p className="pt-4 italic">
                  This agreement is automatically localized for your jurisdiction and translated into your preferred language.
                </p>
              </div>
            </div>

            {/* E-Signature */}
            <div className="mb-6">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[var(--bt-blush)] transition-all">
                <input
                  type="checkbox"
                  checked={contractSigned}
                  onChange={(e) => setContractSigned(e.target.checked)}
                  className="w-5 h-5"
                />
                <span style={{ color: 'var(--bt-charcoal)' }}>
                  I have read and agree to the Service Level Agreement
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 px-6 py-4 rounded-full border-2 transition-all hover:scale-105"
                style={{ borderColor: 'var(--bt-charcoal)', color: 'var(--bt-charcoal)', fontWeight: '600' }}
              >
                Back
              </button>
              <button
                onClick={handleContractSign}
                disabled={!contractSigned}
                className="flex-1 px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                style={{ backgroundColor: 'var(--bt-gold)', color: 'white', fontWeight: '600' }}
              >
                <FileText className="w-5 h-5" />
                Sign Agreement & Activate Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
