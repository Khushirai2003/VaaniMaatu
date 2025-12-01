import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function Header() {
  const { t, language } = useLanguage();
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-orange-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-yellow-400 to-green-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform hover:scale-110 transition-all duration-300 border-3 border-yellow-300">
              {language === 'kannada' ? 'ವಾ' : 'V'}
            </div>
            <div>
              <h1 className={`text-xl font-bold text-red-600 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {language === 'kannada' ? 'ವಾಣಿಮಾತು' : 'Vaanimaatu'}
              </h1>
              <p className="text-xs text-green-600 font-bold">Voice Therapy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`hover:text-primary transition-colors font-medium ${language === 'kannada' ? 'kannada-text' : ''} ${location === '/' ? 'text-primary' : 'text-foreground'}`}>
              {t('nav.home')}
            </Link>
            <Link href="/exercises" className={`hover:text-primary transition-colors font-medium ${language === 'kannada' ? 'kannada-text' : ''} ${location === '/exercises' ? 'text-primary' : 'text-foreground'}`}>
              {t('nav.exercises')}
            </Link>
            <Link href="/progress" className={`hover:text-primary transition-colors font-medium ${language === 'kannada' ? 'kannada-text' : ''} ${location === '/progress' ? 'text-primary' : 'text-foreground'}`}>
              {t('nav.progress')}
            </Link>
            <Link href="/guide" className={`hover:text-primary transition-colors font-medium ${language === 'kannada' ? 'kannada-text' : ''} ${location === '/guide' ? 'text-primary' : 'text-foreground'}`}>
              {language === 'kannada' ? 'ಮಾರ್ಗದರ್ಶಿ' : 'Guide'}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="compact" />
          </div>
        </div>
      </div>
    </header>
  );
}