import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReadingExercise } from "@/components/exercises/reading-exercise";
import ImageNaming from "@/components/exercises/image-naming";
import { ConversationPractice } from "@/components/exercises/conversation-practice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";
import { Book, Image, MessageCircle, Play, Sparkles } from "lucide-react";

type ExerciseType = 'reading' | 'naming' | 'conversation';
type ExerciseLevel = 'beginner' | 'intermediate' | 'advanced';

export default function Exercises() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [activeExercise, setActiveExercise] = useState<ExerciseType>('reading');
  const [selectedLevel, setSelectedLevel] = useState<ExerciseLevel>('beginner');

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const type = urlParams.get('type') as ExerciseType;
    const level = urlParams.get('level') as ExerciseLevel;
    
    if (type && ['reading', 'naming', 'conversation'].includes(type)) {
      setActiveExercise(type);
    }
    if (level && ['beginner', 'intermediate', 'advanced'].includes(level)) {
      setSelectedLevel(level);
    }
  }, [location]);

  const exerciseTypes = [
    {
      id: 'reading' as ExerciseType,
      title: t('exercise.reading'),
      description: t('reading.subtitle'),
      icon: Book,
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      stats: { passages: '15+', levels: '3' }
    },
    {
      id: 'naming' as ExerciseType,
      title: t('exercise.naming'),
      description: t('naming.subtitle'),
      icon: Image,
      gradient: 'from-green-400 via-blue-500 to-purple-600',
      stats: { images: '50+', categories: '8' }
    },
    {
      id: 'conversation' as ExerciseType,
      title: t('exercise.conversation'),
      description: t('conversation.subtitle'),
      icon: MessageCircle,
      gradient: 'from-purple-400 via-pink-500 to-red-600',
      stats: { prompts: '25+', contexts: '6' }
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 pt-20 relative overflow-hidden">

      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-48 h-48 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-yellow-300 rounded-full animate-bounce"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <Badge className="bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-lg">
                {language === 'kannada' ? '🎯 ಅಭ್ಯಾಸ ಕೇಂದ್ರ' : '🎯 Exercise Center'}
              </Badge>
            </div>
            <h1 className={`text-5xl md:text-6xl font-black mb-6 text-black ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {t('home.exerciseTypes')}
            </h1>
            <p className={`text-white/90 text-xl max-w-3xl mx-auto leading-relaxed ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {t('home.exerciseTypesSubtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <Tabs value={activeExercise} onValueChange={(value) => setActiveExercise(value as ExerciseType)}>
          {/* Exercise Type Selection */}
          <div className="mb-12">
            <TabsList className="grid grid-cols-3 w-full max-w-4xl mx-auto h-auto p-3 bg-gradient-to-r from-white/80 via-pink-50/80 to-purple-50/80 rounded-3xl border-2 border-pink-300 shadow-2xl">
              {exerciseTypes.map((exercise) => (
                <TabsTrigger
                  key={exercise.id}
                  value={exercise.id}
                  className="data-[state=active]:bg-orange-100 data-[state=active]:shadow-lg p-6 h-auto rounded-2xl transition-all duration-300"
                  data-testid={`${exercise.id}-tab`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-16 h-16 bg-gradient-to-br ${exercise.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <exercise.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className={`font-bold text-black ${language === 'kannada' ? 'kannada-text' : ''}`}>{exercise.title}</div>
                      <div className="text-sm text-white/70 mt-1">
                        {Object.entries(exercise.stats).map(([key, value], index) => (
                          <span key={key}>
                            {index > 0 && ' • '}
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>



          {/* Exercise Content */}
          <TabsContent value="reading" className="mt-0">
            <div className="p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl border-4 border-blue-300 shadow-2xl">
              <ReadingExercise />
            </div>
          </TabsContent>

          <TabsContent value="naming" className="mt-0">
            <div className="bg-gradient-to-br from-white via-pink-50 to-orange-50 rounded-3xl border-4 border-pink-300 shadow-2xl overflow-hidden">
              <ImageNaming />
            </div>
          </TabsContent>

          <TabsContent value="conversation" className="mt-0">
            <div className="p-8 bg-gradient-to-br from-white via-green-50 to-blue-50 rounded-3xl border-4 border-green-300 shadow-2xl">
              <ConversationPractice />
            </div>
          </TabsContent>
        </Tabs>

        {/* Exercise Tips */}
        <div className="mt-12 p-8 bg-orange-50 rounded-3xl border border-orange-200 shadow-2xl">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-4 text-black ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('tips.title')}</h3>
              <div className="grid md:grid-cols-2 gap-6 text-orange-800">
                <ul className={`space-y-3 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('tips.reading')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('tips.naming')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('tips.conversation')}</span>
                  </li>
                </ul>
                <ul className={`space-y-3 ${language === 'kannada' ? 'kannada-text' : ''}`}>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-300 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{language === 'kannada' ? 'ನಿಧಾನವಾಗಿ ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ' : 'Speak slowly and clearly'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{language === 'kannada' ? 'ನಿಯಮಿತ ಅಭ್ಯಾಸ ಮಾಡಿ' : 'Practice regularly'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{t('feedback.practiceMakesPerfect')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}