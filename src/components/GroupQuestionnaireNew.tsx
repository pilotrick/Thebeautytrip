import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { ProgressBar } from "./ProgressBar";
import { GroupStep1Size } from "./group-steps/GroupStep1Size";
import { GroupStep2Celebration } from "./group-steps/GroupStep2Celebration";
import { GroupStep3Budget } from "./group-steps/GroupStep3Budget";
import { GroupStep4Procedures } from "./group-steps/GroupStep4Procedures";
import { GroupStep5Coordinator } from "./group-steps/GroupStep5Coordinator";
import { ArrowLeft, ArrowRight, Car } from "lucide-react";
import { getGroupDiscount } from "./GroupQuestionnaire";

interface GroupQuestionnaireProps {
  onSubmit: (data: GroupData) => void;
  onBack: () => void;
}

export interface GroupData {
  groupSize: number;
  celebrationTypes: string[];
  customCelebration?: string;
  budgetPerPerson: number;
  procedureFocus: string[];
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  isGiftBooking: boolean;
}

export function GroupQuestionnaire({ onSubmit, onBack }: GroupQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Step 1: Group Size
  const [groupSize, setGroupSize] = useState(2);

  // Step 2: Celebration
  const [celebrationTypes, setCelebrationTypes] = useState<string[]>([]);
  const [customCelebration, setCustomCelebration] = useState("");

  // Step 3: Budget
  const [budgetPerPerson, setBudgetPerPerson] = useState(2000);

  // Step 4: Procedures
  const [procedureFocus, setProcedureFocus] = useState<string[]>([]);

  // Step 5: Coordinator
  const [coordinatorName, setCoordinatorName] = useState("");
  const [coordinatorEmail, setCoordinatorEmail] = useState("");
  const [coordinatorPhone, setCoordinatorPhone] = useState("");
  const [isGiftBooking, setIsGiftBooking] = useState(false);

  const toggleCelebration = (id: string) => {
    // Clear custom celebration if selecting a predefined option
    if (id !== 'custom' && id !== 'none') {
      setCustomCelebration("");
    }
    
    // If selecting "none" or "custom", clear other selections
    if (id === 'none' || id === 'custom') {
      setCelebrationTypes([id]);
    } else {
      // Remove "none" or "custom" if selecting other options
      setCelebrationTypes(prev => {
        const filtered = prev.filter(t => t !== 'none' && t !== 'custom');
        return filtered.includes(id) ? filtered.filter(t => t !== id) : [...filtered, id];
      });
    }
  };

  const toggleProcedure = (id: string) => {
    // If selecting "inner-beauty", clear all other selections
    if (id === 'inner-beauty') {
      setProcedureFocus(['inner-beauty']);
    } else {
      // If selecting anything else, remove "inner-beauty" if it's selected
      setProcedureFocus(prev => {
        const filtered = prev.filter(p => p !== 'inner-beauty');
        return filtered.includes(id) ? filtered.filter(p => p !== id) : [...filtered, id];
      });
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return groupSize >= 2;
    if (currentStep === 2) {
      if (celebrationTypes.includes('custom')) {
        return customCelebration.trim().length > 0;
      }
      return celebrationTypes.length > 0;
    }
    if (currentStep === 3) return budgetPerPerson >= 800;
    if (currentStep === 4) return procedureFocus.length > 0;
    if (currentStep === 5) return coordinatorName && coordinatorEmail && coordinatorPhone;
    return false;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    const finalCelebrationTypes = celebrationTypes.includes('custom') 
      ? ['custom'] 
      : celebrationTypes;
    
    onSubmit({
      groupSize,
      celebrationTypes: finalCelebrationTypes,
      customCelebration,
      budgetPerPerson,
      procedureFocus,
      coordinatorName,
      coordinatorEmail,
      coordinatorPhone,
      isGiftBooking
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Logo size="md" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      <div className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 style={{ fontSize: '2.5rem', color: 'var(--bt-charcoal)', marginBottom: '1rem', fontWeight: '600', letterSpacing: '-0.02em' }}>
              Secure Your Celebration
            </h1>
            <p className="text-gray-600" style={{ fontSize: '1.125rem' }}>
              Build Your Custom Group Experience
            </p>
            
            {/* Benefits Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full" style={{ backgroundColor: 'var(--bt-gold)' }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                  {getGroupDiscount(groupSize)}% Group Discount Applied
                </span>
              </div>
              
              {groupSize > 8 && (
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full animate-in fade-in slide-in-from-bottom-2" style={{ backgroundColor: 'var(--bt-blush)' }}>
                  <Car className="w-4 h-4" style={{ color: 'var(--bt-charcoal)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--bt-charcoal)' }}>
                    Transportation Included (Activities + Airport)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {currentStep === 1 && (
              <GroupStep1Size
                groupSize={groupSize}
                onGroupSizeChange={setGroupSize}
              />
            )}

            {currentStep === 2 && (
              <GroupStep2Celebration
                celebrationTypes={celebrationTypes}
                customCelebration={customCelebration}
                onToggleCelebration={toggleCelebration}
                onCustomCelebrationChange={setCustomCelebration}
              />
            )}

            {currentStep === 3 && (
              <GroupStep3Budget
                budgetPerPerson={budgetPerPerson}
                groupSize={groupSize}
                onBudgetChange={setBudgetPerPerson}
              />
            )}

            {currentStep === 4 && (
              <GroupStep4Procedures
                procedureFocus={procedureFocus}
                onToggleProcedure={toggleProcedure}
              />
            )}

            {currentStep === 5 && (
              <GroupStep5Coordinator
                coordinatorName={coordinatorName}
                coordinatorEmail={coordinatorEmail}
                coordinatorPhone={coordinatorPhone}
                isGiftBooking={isGiftBooking}
                onCoordinatorNameChange={setCoordinatorName}
                onCoordinatorEmailChange={setCoordinatorEmail}
                onCoordinatorPhoneChange={setCoordinatorPhone}
                onGiftBookingChange={setIsGiftBooking}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-8 py-4 border-2 bg-white hover:bg-gray-50"
              style={{ 
                borderColor: 'var(--bt-charcoal)',
                color: 'var(--bt-charcoal)'
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-12 py-4 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
              style={{ 
                backgroundColor: canProceed() ? 'var(--bt-gold)' : '#d1d5db',
                fontSize: '1.125rem',
                fontWeight: '500'
              }}
            >
              {currentStep === totalSteps ? 'Select Sanctuary' : 'Continue'}
              {currentStep < totalSteps && <ArrowRight className="w-5 h-5" />}
            </Button>
          </div>

          {/* Step Indicator */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>
    </div>
  );
}
