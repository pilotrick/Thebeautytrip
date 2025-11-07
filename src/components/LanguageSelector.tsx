import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative group">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 rounded-full shadow-lg transition-all hover:scale-105"
          style={{ borderColor: 'var(--bt-gold)' }}
        >
          <Globe className="w-4 h-4" style={{ color: 'var(--bt-gold)' }} />
          <span className="text-sm" style={{ color: 'var(--bt-charcoal)' }}>
            {languages.find(l => l.code === language)?.flag}
          </span>
        </button>

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 w-48 bg-white border-2 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
          style={{ borderColor: 'var(--bt-gold)' }}
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                language === lang.code ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm" style={{ 
                color: language === lang.code ? 'var(--bt-gold)' : 'var(--bt-charcoal)',
                fontWeight: language === lang.code ? '600' : '400'
              }}>
                {lang.label}
              </span>
              {language === lang.code && (
                <span className="ml-auto" style={{ color: 'var(--bt-gold)' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
