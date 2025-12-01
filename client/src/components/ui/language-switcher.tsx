import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from './button';
import { Languages, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact' | 'floating';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const languages = [
    { code: 'kannada', name: 'ಕನ್ನಡ', flag: '🇮🇳', native: 'ಕನ್ನಡ' },
    { code: 'english', name: 'English', flag: '🇺🇸', native: 'English' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: 'kannada' | 'english') => {
    if (langCode !== language) {
      setIsAnimating(true);
      setTimeout(() => {
        setLanguage(langCode);
        setIsAnimating(false);
        setIsOpen(false);
      }, 300);
    }
  };

  // Floating variant for mobile
  if (variant === 'floating') {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <div className="relative">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            size="icon"
          >
            <Globe className="w-6 h-6 text-white" />
          </Button>
          
          {isOpen && (
            <div className="absolute bottom-16 right-0 bg-white border border-border rounded-xl shadow-xl p-2 min-w-[200px] animate-in slide-in-from-bottom-2 duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code as 'kannada' | 'english')}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left hover:bg-muted transition-colors duration-200",
                    language === lang.code && "bg-primary/10 text-primary"
                  )}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{lang.native}</span>
                    <span className="text-sm text-muted-foreground">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={cn("relative", className)}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="gap-2 min-w-[120px] justify-between"
        >
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="font-medium">{currentLanguage?.native}</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </Button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-border rounded-lg shadow-lg p-1 min-w-[140px] animate-in slide-in-from-top-2 duration-200 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as 'kannada' | 'english')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-muted transition-colors duration-200 text-sm",
                  language === lang.code && "bg-primary/10 text-primary"
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.native}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("relative", className)}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className={cn(
          "gap-3 px-4 py-2 h-auto transition-all duration-300 hover:shadow-md",
          isAnimating && "animate-pulse"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentLanguage?.flag}</span>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm">{currentLanguage?.native}</span>
            <span className="text-xs text-muted-foreground">{t('language.current')}</span>
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-border rounded-xl shadow-xl p-2 min-w-[240px] animate-in slide-in-from-top-2 duration-200 z-50">
          <div className="px-2 py-1 text-xs font-medium text-muted-foreground mb-2">
            {t('language.switchTo')}
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as 'kannada' | 'english')}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-muted transition-all duration-200 group",
                language === lang.code && "bg-primary/10 text-primary border border-primary/20"
              )}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {lang.flag}
              </span>
              <div className="flex flex-col flex-1">
                <span className="font-semibold">{lang.native}</span>
                <span className="text-sm text-muted-foreground">{lang.name}</span>
              </div>
              {language === lang.code && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs text-primary font-medium">ಸಕ್ರಿಯ</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Animated language indicator for header
export function LanguageIndicator() {
  const { language } = useLanguage();
  
  const languageInfo = {
    kannada: { flag: '🇮🇳', name: 'ಕನ್ನಡ', color: 'text-orange-600' },
    english: { flag: '🇺🇸', name: 'English', color: 'text-blue-600' }
  };

  const current = languageInfo[language];

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full">
      <span className="text-lg animate-bounce">{current.flag}</span>
      <span className={cn("text-sm font-medium", current.color)}>
        {current.name}
      </span>
    </div>
  );
}
