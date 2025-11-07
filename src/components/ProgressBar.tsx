import { useState } from "react";
import { Progress } from "./ui/progress";
import { Logo } from "./Logo";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
  onLogoClick?: () => void;
  mode?: 'journey' | 'provider' | 'group' | 'tour';
}

export function ProgressBar({ currentStep, totalSteps, stepTitle, onLogoClick, mode = 'journey' }: ProgressBarProps) {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const progress = (currentStep / totalSteps) * 100;
  
  const handleLogoClick = () => {
    setShowExitDialog(true);
  };

  const handleConfirmExit = () => {
    setShowExitDialog(false);
    if (onLogoClick) {
      onLogoClick();
    }
  };

  // Get contextual modal content based on mode
  const getModalContent = () => {
    switch (mode) {
      case 'provider':
        return {
          title: 'Leave Provider Portal?',
          description: 'Are you done for now? You can return to your provider area anytime.',
          cancel: 'Stay',
          confirm: 'Yes, Leave'
        };
      case 'group':
        return {
          title: 'Leave Group Planning?',
          description: 'Are you sure you want to exit? Your group details will be saved.',
          cancel: 'Continue Planning',
          confirm: 'Yes, Exit'
        };
      case 'tour':
        return {
          title: 'Leave Tour Selection?',
          description: 'Are you sure you want to exit? You can return to browse tours anytime.',
          cancel: 'Continue Browsing',
          confirm: 'Yes, Exit'
        };
      default: // 'journey'
        return {
          title: 'Leave Your Custom Journey?',
          description: 'Are you sure you want to exit? Your progress will be saved, but you\'ll need to start over from the beginning when you return.',
          cancel: 'Continue Planning',
          confirm: 'Yes, Exit'
        };
    }
  };

  const modalContent = getModalContent();
  
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleLogoClick}
                className="transition-opacity hover:opacity-70 cursor-pointer"
                aria-label="Return to home"
              >
                <Logo size="sm" />
              </button>
              {stepTitle && (
                <span className="text-sm text-gray-700" style={{ fontWeight: '600' }}>
                  {stepTitle}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-600" style={{ fontWeight: '500' }}>
                {Math.round(progress)}% Complete
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </div>

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{modalContent.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {modalContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{modalContent.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit} className="bg-gray-900 hover:bg-gray-800">
              {modalContent.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
