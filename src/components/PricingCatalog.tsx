import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles, DollarSign, Plane, ArrowRight } from "lucide-react";

interface PricingCatalogProps {
  onBookNow?: () => void;
}

export function PricingCatalog({ onBookNow }: PricingCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<'wellness' | 'injectables' | 'skin'>('injectables');

  const categories = [
    { id: 'wellness', label: 'IV Drips & Wellness', icon: Sparkles },
    { id: 'injectables', label: 'Injectables & Contouring', icon: DollarSign },
    { id: 'skin', label: 'Skin & Beauty', icon: Plane },
  ] as const;

  return (
    <section id="pricing" className="py-16 sm:py-24 px-6" style={{ backgroundColor: 'var(--bt-cream)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: 'var(--bt-charcoal)' }}>
              Services & Pricing
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8" style={{ color: 'rgba(17, 17, 17, 0.7)' }}>
              Experience luxury aesthetics at Caribbean prices. Expert care, superior value.
            </p>
            
            {/* Value Banner */}
            <div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
              style={{ 
                backgroundColor: 'rgba(184, 152, 91, 0.1)',
                border: '1px solid rgba(184, 152, 91, 0.3)'
              }}
            >
              <Sparkles className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} />
              <span className="text-sm sm:text-base" style={{ color: 'var(--bt-charcoal)' }}>
                <strong>Save up to 70%</strong> vs US prices • Board-certified specialists • 5-star recovery
              </span>
            </div>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="px-5 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center gap-2"
                style={{
                  backgroundColor: isActive ? 'var(--bt-charcoal)' : 'white',
                  color: isActive ? 'white' : 'var(--bt-charcoal)',
                  border: `2px solid ${isActive ? 'var(--bt-charcoal)' : 'rgba(17, 17, 17, 0.1)'}`,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm sm:text-base font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Content */}
        <AnimatePresence mode="wait">
          {activeCategory === 'wellness' && <WellnessCategory key="wellness" onBookNow={onBookNow} />}
          {activeCategory === 'injectables' && <InjectablesCategory key="injectables" onBookNow={onBookNow} />}
          {activeCategory === 'skin' && <SkinCategory key="skin" onBookNow={onBookNow} />}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Wellness Category
function WellnessCategory({ onBookNow }: { onBookNow?: () => void }) {
  const drips = [
    {
      tier: 'Simple Drips',
      price: 99,
      usPrice: 250,
      items: ['Hydration', 'Revitalizing', 'Hangover Relief', 'Immune Boost']
    },
    {
      tier: 'Targeted Drips',
      price: 139,
      usPrice: 350,
      items: ['Detox', 'Migraine Relief', 'Athletic Performance', 'Beauty Glow', 'Soothing']
    },
    {
      tier: 'Specialty Drips',
      price: 179,
      usPrice: 450,
      items: ['Testosterone Boost', 'Iron Infusion', 'Brainstorm Focus', 'Weight Loss', 'Myers\' Cocktail']
    },
    {
      tier: 'Customized Drip',
      price: 200,
      usPrice: 500,
      items: ['Fully personalized IV therapy', 'Consultation with wellness specialist', 'Tailored vitamin blend']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drips.map((drip, index) => (
          <PricingCard
            key={index}
            title={drip.tier}
            price={drip.price}
            usPrice={drip.usPrice}
            items={drip.items}
            featured={index === 0}
          />
        ))}
      </div>
      
      <BookingCTA onBookNow={onBookNow} />
    </motion.div>
  );
}

// Injectables Category
function InjectablesCategory({ onBookNow }: { onBookNow?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Botox Section */}
      <div>
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl mb-2" style={{ color: 'var(--bt-charcoal)' }}>
            Botox (Neurotoxins)
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl" style={{ color: 'rgba(17, 17, 17, 0.7)' }}>
              <strong style={{ color: 'var(--bt-gold)' }}>$8.00</strong> per unit
            </span>
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(224, 176, 186, 0.2)', color: 'var(--bt-charcoal)' }}>
              vs US: $15-20/unit
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { area: 'Forehead, Frown Lines, or Crow\'s Feet', price: 150, note: 'Flat fee (up to 20 units)', usPrice: 400 },
            { area: 'Brow Lift', price: 64, note: '4-8 units', usPrice: 160 },
            { area: 'Bunny Lines', price: 64, note: '4-8 units', usPrice: 160 },
            { area: 'Neck Bands', price: 400, note: '25-50 units', usPrice: 900 },
            { area: 'Hyperhidrosis (Underarms)', price: 750, note: '100-200 units', usPrice: 1800 },
          ].map((treatment, index) => (
            <TreatmentCard key={index} {...treatment} />
          ))}
        </div>
      </div>

      {/* Fillers Section */}
      <div>
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl mb-2" style={{ color: 'var(--bt-charcoal)' }}>
            Dermal Fillers & Collagen Inducers
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl" style={{ color: 'rgba(17, 17, 17, 0.7)' }}>
              <strong style={{ color: 'var(--bt-gold)' }}>$350</strong> per syringe (HA)
            </span>
            <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'rgba(224, 176, 186, 0.2)', color: 'var(--bt-charcoal)' }}>
              vs US: $800-1,200/syringe
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { area: 'Lip Augmentation', price: 350, note: 'Per syringe', usPrice: 800 },
            { area: 'Nasolabial Folds / Marionette', price: 350, note: 'Per syringe', usPrice: 800 },
            { area: 'Cheek Augmentation / Chin', price: 400, note: 'Per syringe', usPrice: 900 },
            { area: 'Tear Trough (Undereye)', price: 500, note: 'Per syringe', usPrice: 1200 },
            { area: 'Non-Surgical Rhinoplasty', price: 500, note: 'Per syringe', usPrice: 1200 },
            { area: 'Collagen Stimulators', price: 600, note: 'Sculptra/Radiesse per vial', usPrice: 1500 },
          ].map((treatment, index) => (
            <TreatmentCard key={index} {...treatment} />
          ))}
        </div>
      </div>

      {/* Regenerative Treatments */}
      <div>
        <h3 className="text-2xl sm:text-3xl mb-6" style={{ color: 'var(--bt-charcoal)' }}>
          Regenerative & Lifting Treatments
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { area: 'PRP Hair Restoration', price: 250, note: 'Per session', usPrice: 700 },
            { area: 'PRP Facial Rejuvenation', price: 200, note: 'Per session', usPrice: 600 },
            { area: 'Microneedling with PRP', price: 350, note: 'Per session', usPrice: 900 },
            { area: 'PDO Threads: Fox Eyes/Submental', price: 800, note: 'Per area', usPrice: 2000 },
            { area: 'PDO Threads: Full Face Lift', price: 2000, note: 'Comprehensive package', usPrice: 5000 },
          ].map((treatment, index) => (
            <TreatmentCard key={index} {...treatment} />
          ))}
        </div>
      </div>

      <BookingCTA onBookNow={onBookNow} />
    </motion.div>
  );
}

// Skin Category
function SkinCategory({ onBookNow }: { onBookNow?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { area: 'Salmon DNA / PDRN Therapy', price: 200, note: 'Per session', usPrice: 600 },
          { area: 'Peptide Boosters', price: 120, note: 'Per session', usPrice: 350 },
          { area: 'Dermaplaning', price: 70, note: 'Per session', usPrice: 200 },
          { area: 'Scar Treatment (Steroid)', price: 100, note: 'Per injection', usPrice: 300 },
          { area: 'Lobuloplasty', price: 300, note: 'Per ear', usPrice: 800 },
          { area: 'Microblading', price: 350, note: 'Initial + touch-up', usPrice: 800 },
          { area: 'Micropigmentation (Lips)', price: 400, note: 'Per session', usPrice: 1000 },
          { area: 'Lash Extensions', price: 150, note: 'Full set', usPrice: 400 },
        ].map((treatment, index) => (
          <TreatmentCard key={index} {...treatment} />
        ))}
      </div>
      
      <BookingCTA onBookNow={onBookNow} />
    </motion.div>
  );
}

// Pricing Card Component
function PricingCard({ 
  title, 
  price, 
  usPrice, 
  items, 
  featured 
}: { 
  title: string; 
  price: number; 
  usPrice: number; 
  items: string[]; 
  featured?: boolean;
}) {
  const savings = Math.round(((usPrice - price) / usPrice) * 100);
  
  return (
    <div 
      className="p-6 rounded-2xl transition-all duration-300 hover:scale-105"
      style={{ 
        backgroundColor: featured ? 'var(--bt-charcoal)' : 'white',
        border: `2px solid ${featured ? 'var(--bt-gold)' : 'rgba(17, 17, 17, 0.1)'}`,
        boxShadow: featured ? '0 10px 30px rgba(184, 152, 91, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="mb-4">
        <h4 className="text-xl mb-2" style={{ color: featured ? 'white' : 'var(--bt-charcoal)' }}>
          {title}
        </h4>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold" style={{ color: featured ? 'var(--bt-gold)' : 'var(--bt-gold)' }}>
            ${price}
          </span>
          {usPrice && (
            <span className="text-sm line-through" style={{ color: featured ? 'rgba(255, 255, 255, 0.5)' : 'rgba(17, 17, 17, 0.4)' }}>
              US: ${usPrice}
            </span>
          )}
        </div>
        {savings > 0 && (
          <span 
            className="inline-block px-2 py-1 rounded-full text-xs mt-2"
            style={{ 
              backgroundColor: featured ? 'rgba(224, 176, 186, 0.2)' : 'rgba(184, 152, 91, 0.1)',
              color: featured ? 'var(--bt-blush)' : 'var(--bt-gold)'
            }}
          >
            Save {savings}%
          </span>
        )}
      </div>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: featured ? 'var(--bt-gold)' : 'var(--bt-blush)' }} />
            <span className="text-sm" style={{ color: featured ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 17, 17, 0.7)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Treatment Card Component
function TreatmentCard({ 
  area, 
  price, 
  note, 
  usPrice 
}: { 
  area: string; 
  price: number; 
  note: string; 
  usPrice: number;
}) {
  const savings = Math.round(((usPrice - price) / usPrice) * 100);
  
  return (
    <div 
      className="p-5 rounded-xl transition-all duration-300 hover:scale-105"
      style={{ 
        backgroundColor: 'white',
        border: '1px solid rgba(17, 17, 17, 0.1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <h5 className="text-base mb-2" style={{ color: 'var(--bt-charcoal)' }}>
        {area}
      </h5>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-semibold" style={{ color: 'var(--bt-gold)' }}>
          ${price}+
        </span>
        {usPrice && (
          <span className="text-xs line-through" style={{ color: 'rgba(17, 17, 17, 0.4)' }}>
            ${usPrice}+
          </span>
        )}
      </div>
      <p className="text-xs mb-2" style={{ color: 'rgba(17, 17, 17, 0.6)' }}>
        {note}
      </p>
      {savings > 0 && (
        <span 
          className="inline-block px-2 py-0.5 rounded-full text-xs"
          style={{ 
            backgroundColor: 'rgba(224, 176, 186, 0.2)',
            color: 'var(--bt-blush)'
          }}
        >
          Save {savings}%
        </span>
      )}
    </div>
  );
}

// Booking CTA Component
function BookingCTA({ onBookNow }: { onBookNow?: () => void }) {
  return (
    <div 
      className="p-8 rounded-2xl text-center mt-8"
      style={{ 
        background: 'linear-gradient(135deg, rgba(184, 152, 91, 0.1) 0%, rgba(224, 176, 186, 0.1) 100%)',
        border: '2px solid rgba(184, 152, 91, 0.2)'
      }}
    >
      <h4 className="text-2xl mb-3" style={{ color: 'var(--bt-charcoal)' }}>
        Ready to Start Your Beauty Trip?
      </h4>
      <p className="text-base mb-6 max-w-2xl mx-auto" style={{ color: 'rgba(17, 17, 17, 0.7)' }}>
        Book your treatments and we'll handle everything: specialists, accommodations, and your dream vacation in paradise.
      </p>
      <button
        onClick={onBookNow}
        className="px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
        style={{ 
          backgroundColor: 'var(--bt-gold)',
          color: 'white'
        }}
      >
        <span>Book Your Treatment & Vacation</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
