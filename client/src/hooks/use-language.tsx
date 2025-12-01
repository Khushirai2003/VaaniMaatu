import React, { createContext, useContext, useState, useEffect } from 'react';
import { kannadaTranslations } from '@/data/translations/kannada';
import { englishTranslations } from '@/data/translations/english';

type Language = 'kannada' | 'english';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  kannada: kannadaTranslations,
  english: englishTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // default to English for development and new users
  const [language, setLanguage] = useState<Language>('english');

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
    const translation = translations[language] as Record<string, string>;
    return translation[key] || key;
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
