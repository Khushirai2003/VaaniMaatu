import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'kannada' | 'english';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  kannada: {
    // Navigation
    'nav.home': 'ಮುಖಪುಟ',
    'nav.exercises': 'ಅಭ್ಯಾಸಗಳು',
    'nav.progress': 'ಪ್ರಗತಿ',
    'nav.about': 'ಬಗ್ಗೆ',
    
    // Hero section
    'hero.title': 'ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ',
    'hero.subtitle': 'ತಡವಾದ ಶ್ರವಣ ಪ್ರತಿಕ್ರಿಯೆ (DAF) ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ತೊದಲುವಿಕೆಯನ್ನು ನಿವಾರಿಸಿ',
    'hero.start': 'ಪ್ರಾರಂಭಿಸಿ',
    'hero.guide': 'ಮಾರ್ಗದರ್ಶಿ',
    
    // Stats
    'stats.sessions': 'ಅವಧಿಗಳು',
    'stats.points': 'ಅಂಕಗಳು',
    'stats.days': 'ದಿನಗಳು',
    'stats.minutes': 'ನಿಮಿಷಗಳು',
    'stats.achievements': 'ಸಾಧನೆಗಳು',
    'stats.streak': 'ದಿನಗಳ ಸರಣಿ',
    
    // Exercise types
    'exercise.reading': 'ಓದುವ ಅಭ್ಯಾಸ',
    'exercise.naming': 'ಚಿತ್ರ ಹೆಸರಿಸುವಿಕೆ',
    'exercise.conversation': 'ಸಂಭಾಷಣೆ ಅಭ್ಯಾಸ',
    
    // DAF controls
    'daf.delay': 'ವಿಳಂಬ ಸಮಯ (DAF)',
    'daf.start': 'ಪ್ರಾರಂಭಿಸಿ',
    'daf.stop': 'ನಿಲ್ಲಿಸಿ',
    
    // Common actions
    'action.start': 'ಪ್ರಾರಂಭಿಸಿ',
    'action.stop': 'ನಿಲ್ಲಿಸಿ',
    'action.next': 'ಮುಂದೆ',
    'action.previous': 'ಹಿಂದೆ',
    'action.finish': 'ಮುಗಿಸಿ',
  },
  english: {
    // Navigation
    'nav.home': 'Home',
    'nav.exercises': 'Exercises',
    'nav.progress': 'Progress',
    'nav.about': 'About',
    
    // Hero section
    'hero.title': 'Speak Clearly with Confidence',
    'hero.subtitle': 'Overcome stuttering with Delayed Auditory Feedback (DAF) technology',
    'hero.start': 'Start Now',
    'hero.guide': 'Guide',
    
    // Stats
    'stats.sessions': 'Sessions',
    'stats.points': 'Points',
    'stats.days': 'Days',
    'stats.minutes': 'Minutes',
    'stats.achievements': 'Achievements',
    'stats.streak': 'Day Streak',
    
    // Exercise types
    'exercise.reading': 'Reading Practice',
    'exercise.naming': 'Image Naming',
    'exercise.conversation': 'Conversation Practice',
    
    // DAF controls
    'daf.delay': 'Delay Time (DAF)',
    'daf.start': 'Start',
    'daf.stop': 'Stop',
    
    // Common actions
    'action.start': 'Start',
    'action.stop': 'Stop',
    'action.next': 'Next',
    'action.previous': 'Previous',
    'action.finish': 'Finish',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('kannada');

  useEffect(() => {
    const saved = localStorage.getItem('vaanimaatu-language');
    if (saved === 'english' || saved === 'kannada') {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('vaanimaatu-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
