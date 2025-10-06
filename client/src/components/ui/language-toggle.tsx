import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground kannada-text">ಕನ್ನಡ</span>
      <div 
        className={`lang-toggle ${language === 'english' ? 'active' : ''}`}
        onClick={() => setLanguage(language === 'kannada' ? 'english' : 'kannada')}
        data-testid="language-toggle"
      >
        <div className="lang-toggle-slider"></div>
      </div>
      <span className="text-sm text-muted-foreground">EN</span>
    </div>
  );
}
