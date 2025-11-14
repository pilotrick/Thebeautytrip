import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { PricingCatalog } from "./PricingCatalog";
import { X } from "lucide-react";

interface PricingCatalogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookNow?: () => void;
}

export function PricingCatalogModal({ open, onOpenChange, onBookNow }: PricingCatalogModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[100vw] w-full h-full max-h-screen p-0 gap-0 border-0"
        style={{ backgroundColor: 'var(--bt-cream)' }}
      >
        {/* Visually hidden but accessible title and description */}
        <DialogTitle className="sr-only">
          Services & Pricing Catalog
        </DialogTitle>
        <DialogDescription className="sr-only">
          Browse our complete menu of luxury aesthetic treatments and wellness services in the Dominican Republic
        </DialogDescription>

        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300"
          style={{ 
            backgroundColor: 'rgba(17, 17, 17, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-full">
          <PricingCatalog 
            onBookNow={() => {
              onOpenChange(false);
              onBookNow?.();
            }} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}