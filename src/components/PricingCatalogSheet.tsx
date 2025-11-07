import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
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
        <SheetHeader className="sr-only">
          <SheetTitle>Services & Pricing</SheetTitle>
        </SheetHeader>
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
