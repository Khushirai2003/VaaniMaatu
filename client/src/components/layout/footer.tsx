import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 border-t border-white/20 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
                ವಾ
              </div>
              <h3 className="text-2xl font-black text-white kannada-text">ವಾಣಿಮಾತು</h3>
            </div>
            <p className="text-white/80 kannada-text leading-relaxed">
              ಕನ್ನಡ ಮಾತನಾಡುವವರಿಗಾಗಿ ಉಚಿತ, ಮುಕ್ತ ಮೂಲ ವಾಕ್ ಚಿಕಿತ್ಸಾ ಅನ್ವಯ.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-white kannada-text text-lg">ತ್ವರಿತ ಲಿಂಕ್ಗಳು</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-white/70 hover:text-yellow-300 transition-all duration-300 kannada-text font-medium">{t('nav.home')}</a></li>
              <li><a href="/exercises" className="text-white/70 hover:text-pink-300 transition-all duration-300 kannada-text font-medium">{t('nav.exercises')}</a></li>
              <li><a href="/progress" className="text-white/70 hover:text-purple-300 transition-all duration-300 kannada-text font-medium">{t('nav.progress')}</a></li>
              <li><a href="/about" className="text-white/70 hover:text-blue-300 transition-all duration-300 kannada-text font-medium">{t('nav.about')}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-6 text-white kannada-text text-lg">ಸಂಪನ್ಮೂಲಗಳು</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-green-300 transition-all duration-300 kannada-text font-medium">ಮಾರ್ಗದರ್ಶಿ</a></li>
              <li><a href="#" className="text-white/70 hover:text-cyan-300 transition-all duration-300 kannada-text font-medium">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-orange-300 transition-all duration-300 kannada-text font-medium">ಸಮುದಾಯ</a></li>
              <li><a href="#" className="text-white/70 hover:text-red-300 transition-all duration-300 font-medium">GitHub</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-white kannada-text text-lg">ಸಂಪರ್ಕಿಸಿ</h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span className="font-medium">vaanimaatu@sahyadri.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span className="kannada-text font-medium">ಮಂಗಳೂರು, ಕರ್ನಾಟಕ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/70 kannada-text font-medium">
            © 2025 ವಾಣಿಮಾತು. ಎಲ್ಲಾ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. MIT ಪರವಾನಗಿ.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </a>
            <span className="text-white/70 font-medium">Made with ❤️ by Sahyadri Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}