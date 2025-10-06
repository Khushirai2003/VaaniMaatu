import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/ui/language-toggle";

export function Header() {
  const { t } = useLanguage();
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
              ವಾ
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground kannada-text">ವಾಣಿಮಾತು</h1>
              <p className="text-xs text-muted-foreground">Voice Therapy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className={`hover:text-primary transition-colors font-medium kannada-text ${location === '/' ? 'text-primary' : 'text-foreground'}`}>
              {t('nav.home')}
            </Link>
            <Link href="/exercises" className={`hover:text-primary transition-colors font-medium kannada-text ${location === '/exercises' ? 'text-primary' : 'text-foreground'}`}>
              {t('nav.exercises')}
            </Link>
            <Link href="/progress" className={`hover:text-primary transition-colors font-medium kannada-text ${location === '/progress' ? 'text-primary' : 'text-foreground'}`}>
              {t('nav.progress')}
            </Link>
          </nav>

          {/* Language Toggle & Profile */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            {/* User Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-semibold">
                MS
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
