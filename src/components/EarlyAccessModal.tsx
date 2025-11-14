import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { motion } from "motion/react";
import { Lock, Sparkles } from "lucide-react";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.6, times: [0, 0.3, 0.6, 1] }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)', border: '3px solid var(--bt-gold)' }}
            >
              <Lock className="w-10 h-10" style={{ color: 'var(--bt-gold)' }} />
            </motion.div>
          </div>
          
          <DialogTitle className="text-center text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--bt-charcoal)' }}>
            Psst... You're Early! 🎉
          </DialogTitle>
          
          <DialogDescription className="text-center space-y-4 text-base">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold"
              style={{ color: 'var(--bt-gold)' }}
            >
              This Access is Reserved
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ color: 'var(--bt-charcoal)' }}
            >
              Full access is currently <span className="font-semibold">'Getting Ready'</span> as we finalize vetting. 
              Thanks for investing in our vision!
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 pt-4"
            >
              <Sparkles className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--bt-charcoal)' }}>
                Building the Gold Standard
              </span>
              <Sparkles className="w-5 h-5" style={{ color: 'var(--bt-gold)' }} />
            </motion.div>
          </DialogDescription>
        </DialogHeader>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-3 rounded-lg font-semibold text-white mt-4"
          style={{ backgroundColor: 'var(--bt-gold)' }}
        >
          Got It!
        </motion.button>
      </DialogContent>
    </Dialog>
  );
}
