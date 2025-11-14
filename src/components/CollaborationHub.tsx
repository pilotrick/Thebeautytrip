import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Unlock, Youtube, Users, BookOpen, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

interface CollaborationHubProps {
  onBack?: () => void;
}

export function CollaborationHub({ onBack }: CollaborationHubProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // In production, this should be validated against a backend
  // For now, using a simple password
  const FOUNDING_MEMBER_PASSWORD = "founding2025";

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === FOUNDING_MEMBER_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please check your founding member email.");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" 
        style={{ backgroundColor: 'var(--bt-cream)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2" style={{ borderColor: 'var(--bt-gold)' }}>
            <div className="flex justify-center mb-6">
              <Logo className="h-12" />
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)', border: '3px solid var(--bt-gold)' }}>
                <Lock className="w-10 h-10" style={{ color: 'var(--bt-gold)' }} />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ color: 'var(--bt-charcoal)' }}>
              Founding Members Only
            </h1>
            
            <p className="text-center mb-8 text-sm sm:text-base" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
              Welcome to the exclusive Collaboration Hub. Enter your founding member password to access.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--bt-charcoal)' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: error ? '#EF4444' : 'var(--bt-gold)',
                    backgroundColor: 'white'
                  }}
                  placeholder="Enter your password"
                  required
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--bt-gold)' }}
              >
                <Unlock className="w-5 h-5" />
                Access Hub
              </motion.button>
            </form>

            {onBack && (
              <button
                onClick={onBack}
                className="w-full mt-4 text-sm hover:underline"
                style={{ color: 'var(--bt-charcoal)', opacity: 0.6 }}
              >
                ← Back to Home
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Authenticated view - Collaboration Hub content
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bt-cream)' }}>
      {/* Header */}
      <div className="bg-white border-b-2" style={{ borderColor: 'var(--bt-gold)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Logo className="h-10" />
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'var(--bt-gold)', color: 'white' }}>
                <Users className="w-4 h-4 inline mr-2" />
                Founding Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--bt-charcoal)' }}>
            Welcome to the Collaboration Hub
          </h1>
          <p className="text-xl" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
            Your exclusive space for content, community, and insider access
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* YouTube Channel Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-2"
            style={{ borderColor: 'var(--bt-gold)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)' }}>
                <Youtube className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--bt-charcoal)' }}>
                YouTube Channel
              </h2>
            </div>
            
            <p className="mb-6" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
              Access exclusive behind-the-scenes content, destination guides, and transformation stories.
            </p>

            <a
              href="https://youtube.com/@thebeautytrip"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 text-center rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#FF0000' }}
            >
              <Youtube className="w-5 h-5 inline mr-2" />
              Visit Our Channel
            </a>
          </motion.div>

          {/* Community Forum Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-2"
            style={{ borderColor: 'var(--bt-gold)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)' }}>
                <Users className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--bt-charcoal)' }}>
                Community
              </h2>
            </div>
            
            <p className="mb-6" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
              Connect with fellow founding members, share experiences, and get insider tips.
            </p>

            <button
              className="block w-full py-3 text-center rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--bt-gold)' }}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Join the Discussion
            </button>
          </motion.div>
        </div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 border-2"
          style={{ borderColor: 'var(--bt-gold)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(184, 152, 91, 0.1)' }}>
              <BookOpen className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--bt-charcoal)' }}>
              Exclusive Resources
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(184, 152, 91, 0.05)' }}>
              <Sparkles className="w-6 h-6 mb-2" style={{ color: 'var(--bt-gold)' }} />
              <h3 className="font-semibold mb-2" style={{ color: 'var(--bt-charcoal)' }}>
                Travel Guides
              </h3>
              <p className="text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                Comprehensive destination and preparation guides
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(184, 152, 91, 0.05)' }}>
              <Sparkles className="w-6 h-6 mb-2" style={{ color: 'var(--bt-gold)' }} />
              <h3 className="font-semibold mb-2" style={{ color: 'var(--bt-charcoal)' }}>
                Provider Vetting
              </h3>
              <p className="text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                Detailed reports on verified specialists
              </p>
            </div>

            <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(184, 152, 91, 0.05)' }}>
              <Sparkles className="w-6 h-6 mb-2" style={{ color: 'var(--bt-gold)' }} />
              <h3 className="font-semibold mb-2" style={{ color: 'var(--bt-charcoal)' }}>
                Member Stories
              </h3>
              <p className="text-sm" style={{ color: 'var(--bt-charcoal)', opacity: 0.7 }}>
                Real transformation journeys from members
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        {onBack && (
          <div className="text-center mt-12">
            <button
              onClick={onBack}
              className="text-sm hover:underline"
              style={{ color: 'var(--bt-charcoal)', opacity: 0.6 }}
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
