import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { Book, Headphones, Clock, Target, Volume2, Settings, Shield, Zap } from "lucide-react";

export default function Guide() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {language === 'kannada' ? 'ವಾಣಿಮಾತು ಮಾರ್ಗದರ್ಶಿ' : 'VaaniMaatu Guide'}
          </h1>
          <p className={`text-muted-foreground text-lg max-w-3xl mx-auto ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {language === 'kannada' 
              ? 'DAF ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ನಿರರ್ಗಳ ಮಾತನಾಡುವಿಕೆಯನ್ನು ಸುಧಾರಿಸಿ' 
              : 'Improve speech fluency with DAF technology and evidence-based therapy protocols'}
          </p>
        </div>

        {/* Purpose Section */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' ? 'ಉದ್ದೇಶ' : 'Purpose'}
            </h2>
          </div>
          <p className={`text-gray-700 leading-relaxed ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {language === 'kannada' 
              ? 'ವಾಣಿಮಾತು DAF ತಂತ್ರಜ್ಞಾನವನ್ನು (50-300ms, ಪೂರ್ವನಿಯೋಜಿತ 150ms) ಬಳಸಿ ನಿರರ್ಗಳತೆಯನ್ನು ಉತ್ತೇಜಿಸುತ್ತದೆ ಮತ್ತು ತೊದಲುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.'
              : 'VaaniMaatu leverages DAF technology (50–300ms, default 150ms) to promote fluency and reduce stuttering by introducing controlled delay in self-heard speech, mimicking choral speech benefits and altering neural feedback loops.'}
          </p>
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className={`text-blue-800 font-medium ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' 
                ? '150ms ಪೂರ್ವನಿಯೋಜಿತ ಸೆಟ್ಟಿಂಗ್ ವೈಜ್ಞಾನಿಕ ಸಾಹಿತ್ಯದಿಂದ ಬೆಂಬಲಿತವಾಗಿದೆ'
                : 'The 150ms default is supported by scientific literature as optimal for maximal benefit with minimal discomfort.'}
            </p>
          </div>
        </Card>

        {/* General Guidelines */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' ? 'ಸಾಮಾನ್ಯ ಮಾರ್ಗಸೂಚಿಗಳು' : 'General Guidelines'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Headphones className="w-5 h-5 text-green-600 mt-1" />
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' 
                    ? 'ಶಾಂತ ವಾತಾವರಣದಲ್ಲಿ ಹೆಡ್‌ಫೋನ್‌ಗಳೊಂದಿಗೆ ಬಳಸಿ'
                    : 'Use in quiet environment with headphones to prevent audio feedback loops'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 mt-1" />
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' 
                    ? 'ದಿನಕ್ಕೆ 15-20 ನಿಮಿಷಗಳ ಅಭ್ಯಾಸ ಮಾಡಿ'
                    : 'Practice 15-20 minutes daily for best results'}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-green-600 mt-1" />
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' 
                    ? '150ms ನಲ್ಲಿ ಪ್ರಾರಂಭಿಸಿ, ಅಗತ್ಯವಿದ್ದರೆ ಸರಿಹೊಂದಿಸಿ'
                    : 'Start at 150ms, adjust delay (50-300ms) as needed'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-green-600 mt-1" />
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' 
                    ? 'ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ, ಸರಿಯಾದ ಉಸಿರಾಟ ತಂತ್ರಗಳನ್ನು ಬಳಸಿ'
                    : 'Speak slowly, use proper breathing techniques'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Task Protocols */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Reading Tasks */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <Book className="w-8 h-8 text-orange-600" />
              <h3 className={`text-xl font-bold ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {language === 'kannada' ? 'ಓದುವ ಕಾರ್ಯಗಳು' : 'Reading Tasks'}
              </h3>
            </div>
            <ul className={`space-y-2 text-sm text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              <li>• {language === 'kannada' ? 'ಸರಳದಿಂದ ಸಂಕೀರ್ಣ ಪ್ರಬಂಧಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Select passages from simple to complex'}</li>
              <li>• {language === 'kannada' ? 'DAF ಸಕ್ರಿಯವಾಗಿರುವಾಗ ಜೋರಾಗಿ ಓದಿ' : 'Read aloud while DAF is active'}</li>
              <li>• {language === 'kannada' ? 'ನಿರರ್ಗಳತೆ ಮತ್ತು ಮೆಟ್ರಿಕ್ಸ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ' : 'Review fluency and session metrics'}</li>
              <li>• {language === 'kannada' ? 'ದೈನಂದಿನ ಪುನರಾವರ್ತನೆಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ' : 'Encourage daily repetition'}</li>
            </ul>
          </Card>

          {/* Naming Tasks */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-purple-600" />
              <h3 className={`text-xl font-bold ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {language === 'kannada' ? 'ಹೆಸರಿಸುವ ಕಾರ್ಯಗಳು' : 'Naming Tasks'}
              </h3>
            </div>
            <ul className={`space-y-2 text-sm text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              <li>• {language === 'kannada' ? 'ಸಾಂಸ್ಕೃತಿಕವಾಗಿ ಸಂಬಂಧಿತ ಚಿತ್ರಗಳನ್ನು ಬಳಸಿ' : 'Use culturally relevant images'}</li>
              <li>• {language === 'kannada' ? 'DAF ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ ವಸ್ತುಗಳನ್ನು ಹೆಸರಿಸಿ' : 'Name objects under DAF conditions'}</li>
              <li>• {language === 'kannada' ? 'ಸ್ಪಷ್ಟ ಉಚ್ಚಾರಣೆ ಮತ್ತು ಪೂರ್ಣತೆಗೆ ಗಮನಿಸಿ' : 'Focus on clear articulation and completion'}</li>
              <li>• {language === 'kannada' ? 'ನಿಯಮಿತವಾಗಿ ಚಿತ್ರ ಸೆಟ್ ಬದಲಾಯಿಸಿ' : 'Vary image sets regularly'}</li>
            </ul>
          </Card>
        </div>

        {/* How to Use */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' ? 'ಬಳಕೆಯ ವಿಧಾನ' : 'How to Use VaaniMaatu'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">1</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? 'ಹೆಡ್‌ಫೋನ್ ಧರಿಸಿ ಮತ್ತು ಶಾಂತ ಕೋಣೆಯಲ್ಲಿ ಅಭ್ಯಾಸ ಮಾಡಿ' : 'Wear headphones and practice in quiet room'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">2</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಕಾರ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Select your preferred task type'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">3</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? 'ವಿಳಂಬವನ್ನು 150ms ನಲ್ಲಿ ಇರಿಸಿ' : 'Keep delay at 150ms for best results'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">4</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? '"Start DAF" ಒತ್ತಿ ಪ್ರಾರಂಭಿಸಿ' : 'Press "Start DAF" to begin session'}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">5</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? 'ನಿರ್ದೇಶಿತ ಕಾರ್ಯವನ್ನು ನಿರ್ವಹಿಸಿ' : 'Perform directed task activities'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">6</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? '15-20 ನಿಮಿಷಗಳ ದೈನಂದಿನ ಅಭ್ಯಾಸ' : 'Complete 15-20 minutes daily practice'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">7</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? '"Stop" ಒತ್ತಿ ಸಾಧನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'Press "Stop" to end and view achievements'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-yellow-500 text-white min-w-[24px] h-6 flex items-center justify-center">8</Badge>
                <p className={`text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? 'ನಿಯಮಿತವಾಗಿ ಪುನರಾವರ್ತಿಸಿ' : 'Repeat regularly, increase challenge level'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Safety & Accessibility */}
        <Card className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className={`text-2xl font-bold ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' ? 'ಸುರಕ್ಷತೆ ಮತ್ತು ಪ್ರವೇಶಿಸುವಿಕೆ' : 'Safety & Accessibility'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold mb-3 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {language === 'kannada' ? 'ಸುರಕ್ಷತೆ' : 'Safety Features'}
              </h4>
              <ul className={`space-y-2 text-sm text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                <li>• {language === 'kannada' ? 'ಎಲ್ಲಾ ಡೇಟಾ ಸ್ಥಳೀಯವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ' : 'All data stored locally'}</li>
                <li>• {language === 'kannada' ? 'ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ರವಾನಿಸಲಾಗುವುದಿಲ್ಲ' : 'No personal information transmitted'}</li>
                <li>• {language === 'kannada' ? 'ಗೌಪ್ಯತೆ ಸಂರಕ್ಷಣೆ ಖಾತ್ರಿ' : 'Privacy protection ensured'}</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {language === 'kannada' ? 'ಪ್ರವೇಶಿಸುವಿಕೆ' : 'Accessibility'}
              </h4>
              <ul className={`space-y-2 text-sm text-gray-700 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                <li>• {language === 'kannada' ? 'ಹೈ-ಕಾಂಟ್ರಾಸ್ಟ್ ಥೀಮ್‌ಗಳು' : 'High-contrast themes'}</li>
                <li>• {language === 'kannada' ? 'ದೊಡ್ಡ ಬಟನ್‌ಗಳು ಮತ್ತು ಕೀಬೋರ್ಡ್ ನ್ಯಾವಿಗೇಶನ್' : 'Large buttons & keyboard navigation'}</li>
                <li>• {language === 'kannada' ? 'ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಬೆಂಬಲ' : 'Offline mode support'}</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}