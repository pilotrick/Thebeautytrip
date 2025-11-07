import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from "figma:asset/14e163fabd1036dfe849086350b27b4780fe718d.png";

interface NavigationProps {
  onLogoClick?: () => void;
}

export function Navigation({ onLogoClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Meet Our Doctors', href: '#doctors' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <>
      {/* Desktop & Mobile Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full bg-white/95 backdrop-blur-md border-b"
        style={{ 
          borderColor: 'var(--bt-charcoal)',
          borderWidth: '1px'
        }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Logo - Tiny and at edge */}
            <motion.button
              onClick={onLogoClick}
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={logoImage} 
                alt="The Beauty Trip" 
                style={{ height: '10px', width: 'auto' }}
              />
            </motion.button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative"
                  style={{ 
                    color: 'var(--bt-charcoal)',
                    fontWeight: '500',
                    letterSpacing: '-0.01em'
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--bt-blush)' }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              
              {/* CTA Button */}
              <motion.a
                href="#start"
                className="px-6 py-2.5 rounded-full"
                style={{
                  backgroundColor: 'var(--bt-gold)',
                  color: 'white',
                  fontWeight: '600',
                  letterSpacing: '-0.01em'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 16px rgba(184, 152, 91, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                My Beauty Trip
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: 'var(--bt-charcoal)' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: 'var(--bt-charcoal)' }} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 z-40 md:hidden bg-white/98 backdrop-blur-md border-b overflow-hidden"
            style={{ borderColor: 'var(--bt-charcoal)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block py-3 px-4 rounded-lg hover:bg-gray-50"
                  style={{ 
                    color: 'var(--bt-charcoal)',
                    fontWeight: '500'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              
              {/* Mobile CTA */}
              <motion.a
                href="#start"
                className="block text-center py-3 px-6 rounded-full mt-4"
                style={{
                  backgroundColor: 'var(--bt-gold)',
                  color: 'white',
                  fontWeight: '600'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Beauty Trip
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}