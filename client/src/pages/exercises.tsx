import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReadingExercise } from "@/components/exercises/reading-exercise";
import { ImageNaming } from "@/components/exercises/image-naming";
import { ConversationPractice } from "@/components/exercises/conversation-practice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";
import { Book, Image, MessageCircle, Play } from "lucide-react";

type ExerciseType = 'reading' | 'naming' | 'conversation';
type ExerciseLevel = 'beginner' | 'intermediate' | 'advanced';

export default function Exercises() {
  const { t } = useLanguage();
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
      description: 'ಕನ್ನಡ ಪ್ರಬಂಧಗಳನ್ನು ಓದಿ ಮತ್ತು ಅಭ್ಯಾಸ ಮಾಡಿ',
      icon: Book,
      gradient: 'from-primary to-accent',
      stats: { passages: '15+', levels: '3' }
    },
    {
      id: 'naming' as ExerciseType,
      title: t('exercise.naming'),
      description: 'ದಕ್ಷಿಣ ಭಾರತೀಯ ಚಿತ್ರಗಳನ್ನು ವಿವರಿಸಿ',
      icon: Image,
      gradient: 'from-secondary to-primary',
      stats: { images: '50+', categories: '8' }
    },
    {
      id: 'conversation' as ExerciseType,
      title: t('exercise.conversation'),
      description: 'ನೈಜ ಸಂವಾದಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ',
      icon: MessageCircle,
      gradient: 'from-accent to-secondary',
      stats: { prompts: '25+', contexts: '6' }
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 kannada-text">ಅಭ್ಯಾಸ ವಿಧಗಳು</h1>
          <p className="text-muted-foreground text-lg kannada-text max-w-2xl mx-auto">
            ನಿಮ್ಮ ವಾಕ್ ಸ್ಪಷ್ಟತೆಯನ್ನು ಸುಧಾರಿಸಲು ವಿವಿಧ ಅಭ್ಯಾಸಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ
          </p>
        </div>

        <Tabs value={activeExercise} onValueChange={(value) => setActiveExercise(value as ExerciseType)}>
          {/* Exercise Type Selection */}
          <div className="mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-4xl mx-auto h-auto p-1 bg-muted">
              {exerciseTypes.map((exercise) => (
                <TabsTrigger
                  key={exercise.id}
                  value={exercise.id}
                  className="data-[state=active]:bg-card data-[state=active]:shadow-sm p-4 h-auto"
                  data-testid={`${exercise.id}-tab`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${exercise.gradient} rounded-lg flex items-center justify-center`}>
                      <exercise.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium kannada-text text-sm">{exercise.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
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

          {/* Level Selection for Reading */}
          {activeExercise === 'reading' && (
            <div className="mb-6 flex justify-center">
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                {[
                  { id: 'beginner', label: 'ಪ್ರಾರಂಭಿಕ' },
                  { id: 'intermediate', label: 'ಮಧ್ಯಮ' },
                  { id: 'advanced', label: 'ಮುಂದುವರಿದ' }
                ].map(level => (
                  <Button
                    key={level.id}
                    variant={selectedLevel === level.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedLevel(level.id as ExerciseLevel)}
                    className="kannada-text"
                    data-testid={`level-${level.id}-button`}
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Exercise Content */}
          <TabsContent value="reading" className="mt-0">
            <Card className="p-6">
              <ReadingExercise level={selectedLevel} />
            </Card>
          </TabsContent>

          <TabsContent value="naming" className="mt-0">
            <Card className="p-6">
              <ImageNaming />
            </Card>
          </TabsContent>

          <TabsContent value="conversation" className="mt-0">
            <Card className="p-6">
              <ConversationPractice />
            </Card>
          </TabsContent>
        </Tabs>

        {/* Exercise Tips */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 kannada-text">ಅಭ್ಯಾಸದ ಸಲಹೆಗಳು</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <ul className="space-y-2 kannada-text">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>ದಿನಕ್ಕೆ ಕನಿಷ್ಠ 15-20 ನಿಮಿಷಗಳ ಅಭ್ಯಾಸ ಮಾಡಿ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>DAF ಫೀಡ್‌ಬ್ಯಾಕ್ ಅನ್ನು ಯಾವಾಗಲೂ ಬಳಸಿ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>ನಿಧಾನವಾಗಿ ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ</span>
                  </li>
                </ul>
                <ul className="space-y-2 kannada-text">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>ಪ್ರಾರಂಭಿಕ ಮಟ್ಟದಿಂದ ಪ್ರಾರಂಭಿಸಿ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>ಆರಾಮದಾಯಕ ವಾತಾವರಣದಲ್ಲಿ ಅಭ್ಯಾಸ ಮಾಡಿ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>ನಿಯಮಿತವಾಗಿ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
