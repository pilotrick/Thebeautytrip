import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { PricingCatalog } from "./PricingCatalog";

interface PricingCatalogSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookNow?: () => void;
}

export function PricingCatalogSheet({ open, onOpenChange, onBookNow }: PricingCatalogSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw] max-w-none p-0 overflow-y-auto"
        style={{ backgroundColor: 'var(--bt-cream)' }}
      >
        {/* Visually hidden but accessible title and description */}
        <SheetTitle className="sr-only">
          Services & Pricing Catalog
        </SheetTitle>
        <SheetDescription className="sr-only">
          Browse our complete menu of luxury aesthetic treatments and wellness services in the Dominican Republic
        </SheetDescription>
        
        <PricingCatalog 
          onBookNow={() => {
            onOpenChange(false);
            onBookNow?.();
          }} 
        />
      </SheetContent>
    </Sheet>
  );
}