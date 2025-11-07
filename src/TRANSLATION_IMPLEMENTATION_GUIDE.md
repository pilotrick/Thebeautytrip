# Multi-Language Implementation Guide

## ✅ What's Already Implemented

### Core Infrastructure
1. **Translation System** (`/i18n/translations.ts`)
   - Complete translations for EN, ES, FR
   - All text content from homepage through Step 5
   - Group journey translations
   - Common UI elements

2. **Language Context** (`/i18n/LanguageContext.tsx`)
   - React context for managing language state
   - Persists language selection to localStorage
   - Auto-detects browser language on first visit
   - Updates HTML lang attribute

3. **Language Selector** (`/components/LanguageSelector.tsx`)
   - Floating language selector (top-right)
   - Dropdown with flags: 🇺🇸 English, 🇪🇸 Español, 🇫🇷 Français
   - Hover to reveal options
   - Visual indicator for current language

4. **App Integration** (`/App.tsx`)
   - LanguageProvider wrapped around all views
   - LanguageSelector visible on all pages

## 🔧 How to Complete Implementation

### Pattern for Updating Components

Every component needs two changes:

#### 1. Import the hook at the top:
```tsx
import { useLanguage } from '../i18n/LanguageContext';
```

#### 2. Use the hook in the component:
```tsx
export function YourComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t.step1.title}</h1>
      <p>{t.step1.description}</p>
    </div>
  );
}
```

### Components to Update

#### ✅ Already Updated:
- App.tsx (has LanguageProvider and LanguageSelector)

#### 📝 Needs Translation Updates:

**HomePage.tsx**
```tsx
import { useLanguage } from '../i18n/LanguageContext';

export function HomePage({ onStartBuilder, onStartGroupFlow }: HomePageProps) {
  const { t } = useLanguage();
  
  // Replace all hardcoded text with:
  // t.home.title
  // t.home.subtitle
  // t.home.tagline
  // t.home.description
  // t.home.groupCTA
  // t.home.groupButton
  // t.home.startButton
  // t.home.savingsHighlight
}
```

**Step1Welcome.tsx**
```tsx
import { useLanguage } from '../i18n/LanguageContext';

export function Step1Welcome({ ... }: Step1WelcomeProps) {
  const { t } = useLanguage();
  
  // Replace text with:
  // t.step1.title
  // t.step1.subtitle
  // t.step1.intro
  // t.step1.whatToExpect
  // t.step1.step1Title through step4Title
  // t.step1.step1Desc through step4Desc
  // t.step1.whyDR
  // t.step1.whyPoint1 through whyPoint4
  // t.step1.readyTitle
  // t.step1.readyDesc
  // t.step1.startButton
}
```

**Step2Procedures.tsx**
```tsx
import { useLanguage } from '../../i18n/LanguageContext';

export function Step2Procedures({ ... }: Step2ProceduresProps) {
  const { t } = useLanguage();
  
  // Replace text with:
  // t.step2.title
  // t.step2.subtitle
  // t.step2.savingsNotice
  // t.step2.consultationTitle
  // t.step2.consultationDesc
  // t.step2.categoriesTitle
  // t.step2.consultationRequired
  // t.step2.selectedTreatments
  // t.step2.estimatedTotal
  // t.step2.collectionA.title
  // t.step2.collectionB.title etc.
  // t.common.back
  // t.common.next
}
```

**Step3Specialists.tsx**
```tsx
import { useLanguage } from '../../i18n/LanguageContext';

export function Step3Specialists({ ... }: Step3SpecialistsProps) {
  const { t } = useLanguage();
  
  // Replace text with:
  // t.step3.title
  // t.step3.subtitle
  // t.step3.selectedSpecialist
  // t.step3.yearsExperience
  // t.step3.basedIn
  // t.step3.education
  // t.step3.specialties
  // t.step3.languages
  // t.common.back
  // t.common.next
}
```

**Step4Recovery.tsx**
```tsx
import { useLanguage } from '../../i18n/LanguageContext';

export function Step4Recovery({ ... }: Step4RecoveryProps) {
  const { t } = useLanguage();
  
  // Replace text with:
  // t.step4.title
  // t.step4.subtitle
  // t.step4.recoveryDays
  // t.step4.daysRecommended
  // t.step4.villaSelection
  // t.step4.soloVillas
  // t.step4.groupVillas
  // t.step4.perNight
  // t.step4.available
  // t.step4.limited
  // t.step4.booked
  // t.common.back
  // t.common.next
}
```

**Step5Summary.tsx**
```tsx
import { useLanguage } from '../../i18n/LanguageContext';

export function Step5Summary({ ... }: Step5SummaryProps) {
  const { t } = useLanguage();
  
  // Replace text with:
  // t.step5.title
  // t.step5.subtitle
  // t.step5.tentativeBooking
  // t.step5.assessmentTitle
  // t.step5.tripDetails
  // t.step5.priceBreakdown
  // t.step5.selectedTreatments
  // t.step5.grandTotal
  // t.step5.contactInfo
  // t.step5.fullName
  // t.step5.email
  // t.step5.phone
  // etc.
}
```

**GroupQuestionnaire.tsx**
```tsx
import { useLanguage } from '../i18n/LanguageContext';

export function GroupQuestionnaire({ ... }: GroupQuestionnaireProps) {
  const { t } = useLanguage();
  
  // Replace text with:
  // t.group.title
  // t.group.subtitle
  // t.group.intro
  // t.group.formTitle
  // t.group.groupSize
  // t.group.leadName
  // t.group.email
  // t.group.phone
  // t.group.desiredDates
  // t.group.interests
  // t.group.submit
}
```

**GroupThankYou.tsx**
```tsx
import { useLanguage } from '../i18n/LanguageContext';

export function GroupThankYou({ ... }: GroupThankYouProps) {
  const { t } = useLanguage();
  
  // Replace text with:
  // t.group.thankYouTitle
  // t.group.thankYouMessage
  // t.group.backToHome
}
```

## 🌍 Translation Keys Reference

All translation keys are organized by section in `/i18n/translations.ts`:

- **common**: Shared UI elements (back, next, day, days, price, save)
- **home**: Homepage content
- **step1-step5**: Each funnel step's content
- **group**: Group journey questionnaire and thank you

## 🎨 Language Selector Styling

The language selector is:
- Fixed position (top-right corner)
- z-index: 50 (above most content)
- Shows current language flag
- Dropdown on hover with all 3 languages
- Gold border matching brand
- Checkmark on selected language

## 💾 Persistence

- Language choice saved to localStorage as 'beauty-trip-language'
- Auto-detects browser language on first visit (es/fr/en)
- Updates HTML lang attribute for SEO/accessibility

## 🔤 Common Patterns

### Conditional Text
```tsx
const { t } = useLanguage();

// For plurals
{recoveryDays} {recoveryDays === 1 ? t.common.day : t.common.days}
```

### Dynamic Content
```tsx
// For numbers/prices that don't need translation
${procedure.price.toLocaleString()} // Keep as is

// But labels should be translated:
<span>{t.step2.estimatedTotal}</span>
```

### Form Placeholders
```tsx
<input placeholder={t.step5.fullNamePlaceholder} />
```

## 🧪 Testing Checklist

1. ✅ Language selector appears on all pages
2. ✅ Switching languages updates all visible text
3. ✅ Language persists after page refresh
4. ✅ Browser language detection works on first visit
5. ✅ All 5 funnel steps have translated content
6. ✅ Group journey pages are translated
7. ✅ Form validation messages are translated
8. ✅ Button text is translated
9. ✅ Error states are translated

## 📋 Quick Implementation Steps

1. Open each component file listed above
2. Add `import { useLanguage } from '../i18n/LanguageContext';` at top
3. Add `const { t } = useLanguage();` inside component function
4. Find all hardcoded English text strings
5. Replace with corresponding `t.section.key` from translations.ts
6. Test language switching
7. Repeat for next component

## 🎯 Priority Order

1. **High Priority** (User-facing critical paths):
   - HomePage
   - Step2Procedures (most complex)
   - Step5Summary (final booking)

2. **Medium Priority**:
   - Step1Welcome
   - Step3Specialists
   - Step4Recovery

3. **Low Priority**:
   - GroupQuestionnaire
   - GroupThankYou
   - ProgressBar (minimal text)

## 💡 Tips

- Use Find & Replace to speed up repetitive text replacements
- Test each component after updating
- Check that dynamic content (prices, dates) still works
- Ensure spacing around translated text looks good in all languages
- French/Spanish text may be longer - test responsive layouts

## ✨ Additional Features to Consider

1. **URL Parameters**: Add ?lang=es to URL for direct language links
2. **Date Formatting**: Use locale-specific date formats
3. **Currency**: Consider showing prices in local currency
4. **RTL Support**: Add Arabic/Hebrew if needed later
5. **Translation Management**: Consider using i18next for more features

---

**The foundation is complete! Just update each component following the pattern above.**
