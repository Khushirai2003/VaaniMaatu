import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-lg p-8 bg-white shadow-2xl border-2 border-orange-200 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-4xl font-bold text-gray-900 mb-2 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              404
            </h1>
            <h2 className={`text-xl font-semibold text-gray-700 mb-4 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' ? 'ಪುಟ ಸಿಗಲಿಲ್ಲ' : 'Page Not Found'}
            </h2>
            <p className={`text-gray-600 mb-8 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {language === 'kannada' 
                ? 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ. ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ.'
                : 'The page you are looking for could not be found. Let\'s get you back home.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                <Home className="w-5 h-5" />
                <span className={`${language === 'kannada' ? 'kannada-text' : ''}`}>
                  {language === 'kannada' ? 'ಮುಖಪುಟ' : 'Go Home'}
                </span>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className={`${language === 'kannada' ? 'kannada-text' : ''}`}>
                {language === 'kannada' ? 'ಹಿಂತಿರುಗಿ' : 'Go Back'}
              </span>
            </Button>
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
