import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DAFProcessor } from "@/components/audio/daf-processor";
import { useLanguage } from "@/hooks/use-language";
import { kannadaPassages, type ReadingPassage } from "@/data/kannada-content";
import { englishPassages, type EnglishReadingPassage } from "@/data/english-content";
import { ChevronLeft, ChevronRight, Play, RotateCcw, Square } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const DEMO_USER_ID = "demo-user";

export function ReadingExercise() {
  const { t, language } = useLanguage();
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [sessionStart, setSessionStart] = useState<number | null>(null);

  // Use language-appropriate passages
  const passages = language === 'kannada' 
    ? kannadaPassages
    : englishPassages;
  const currentPassage = passages[currentPassageIndex];

  // Start reading session
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/sessions', {
        userId: DEMO_USER_ID,
        type: 'reading',
        exerciseId: currentPassage.id,
        dafSettings: { delayMs: 150, enabled: true },
      });
      return response.json();
    },
    onSuccess: () => {
      setIsReading(true);
      setSessionStart(Date.now());
    },
  });

  // End reading session
  const endSessionMutation = useMutation({
    mutationFn: async (data: { sessionId: string; duration: number; fluencyScore?: number }) => {
      const response = await apiRequest('PATCH', `/api/sessions/${data.sessionId}`, {
        duration: data.duration,
        points: Math.floor(data.duration / 1000 / 60) * 15, // 15 points per minute
        completed: true,
        fluencyScore: data.fluencyScore || 75, // Use provided score or default
      });
      return response.json();
    },
    onSuccess: () => {
      setIsReading(false);
      setSessionStart(null);
    },
  });

  const handleStartReading = () => {
    // Simple start without API call
    setIsReading(true);
    setSessionStart(Date.now());
    
    // Auto-stop after 30 seconds for demo
    setTimeout(() => {
      setIsReading(false);
      setSessionStart(null);
    }, 30000);
  };

  const handleSessionStart = () => {
    // Already handled in startSessionMutation
  };

  const handleSessionEnd = (duration: number) => {
    if (sessionStart && startSessionMutation.data?.id) {
      const actualDuration = Date.now() - sessionStart;
      endSessionMutation.mutate({ sessionId: startSessionMutation.data.id, duration: actualDuration });
    }
  };

  const nextPassage = () => {
    if (currentPassageIndex < passages.length - 1) {
      setCurrentPassageIndex(currentPassageIndex + 1);
    }
  };

  const prevPassage = () => {
    if (currentPassageIndex > 0) {
      setCurrentPassageIndex(currentPassageIndex - 1);
    }
  };

  const resetExercise = () => {
    setCurrentPassageIndex(0);
    setIsReading(false);
    setSessionStart(null);
  };

  if (!currentPassage) {
    return (
      <div className="text-center p-8">
        <p className={`text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>
          {t('reading.noPassages')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold mb-2 ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {t('reading.title')}
          </h2>
          <p className={`text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {t('reading.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetExercise}
            className={`${language === 'kannada' ? 'kannada-text' : ''}`}
            data-testid="reset-exercise-button"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t('reading.resetExercise')}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Passage Display */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className={`text-lg font-semibold mb-2 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              {currentPassage.title}
            </h3>
          </div>

          {/* Passage Text */}
          <div className={`bg-muted rounded-xl p-6 mb-6 text-lg leading-relaxed ${language === 'kannada' ? 'kannada-text' : ''}`} data-testid="passage-text">
            {currentPassage.text.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={prevPassage}
              disabled={currentPassageIndex === 0}
              className={`${language === 'kannada' ? 'kannada-text' : ''}`}
              data-testid="prev-passage-button"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t('reading.previous')}
            </Button>
            
            <div className={`text-sm text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`} data-testid="passage-counter">
              {t('reading.passageCounter').replace('{current}', String(currentPassageIndex + 1)).replace('{total}', String(passages.length))}
            </div>
            
            <Button 
              variant="outline" 
              onClick={nextPassage}
              disabled={currentPassageIndex === passages.length - 1}
              className={`${language === 'kannada' ? 'kannada-text' : ''}`}
              data-testid="next-passage-button"
            >
              {t('reading.next')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* DAF Controls */}
        <div className="space-y-6">
          <DAFProcessor 
            onSessionStart={handleSessionStart}
            onSessionEnd={handleSessionEnd}
            referenceText={currentPassage.text}
          />

          {/* Reading Tips */}
          <Card className="p-6">
            <h4 className={`font-medium mb-3 text-sm ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('tips.title')}</h4>
            <ul className={`text-xs text-muted-foreground space-y-1 ${language === 'kannada' ? 'kannada-text' : ''}`}>
              <li>• {t('tips.reading')}</li>
              <li>• {t('tips.daf')}</li>
              <li>• {t('feedback.practiceMakesPerfect')}</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
