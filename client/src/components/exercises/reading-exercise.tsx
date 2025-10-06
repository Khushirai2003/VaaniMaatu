import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DAFProcessor } from "@/components/audio/daf-processor";
import { useLanguage } from "@/hooks/use-language";
import { kannadaPassages, type ReadingPassage } from "@/data/kannada-content";
import { ChevronLeft, ChevronRight, Play, RotateCcw } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const DEMO_USER_ID = "demo-user";

interface ReadingExerciseProps {
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export function ReadingExercise({ level = 'beginner' }: ReadingExerciseProps) {
  const { t } = useLanguage();
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [sessionStart, setSessionStart] = useState<number | null>(null);

  const passages = kannadaPassages.filter(p => p.level === level);
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
    mutationFn: async (data: { sessionId: string; duration: number }) => {
      const response = await apiRequest('PATCH', `/api/sessions/${data.sessionId}`, {
        duration: data.duration,
        points: Math.floor(data.duration / 1000 / 60) * 15, // 15 points per minute
        completed: true,
        fluencyScore: Math.floor(Math.random() * 30) + 70,
      });
      return response.json();
    },
    onSuccess: () => {
      setIsReading(false);
      setSessionStart(null);
    },
  });

  const handleStartReading = () => {
    startSessionMutation.mutate();
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
        <p className="text-muted-foreground kannada-text">ಈ ಮಟ್ಟಕ್ಕೆ ಪ್ರಬಂಧಗಳು ಲಭ್ಯವಿಲ್ಲ</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 kannada-text">
            ಓದುವ ಅಭ್ಯಾಸ - {level === 'beginner' ? 'ಪ್ರಾರಂಭಿಕ' : level === 'intermediate' ? 'ಮಧ್ಯಮ' : 'ಮುಂದುವರಿದ'}
          </h2>
          <p className="text-muted-foreground kannada-text">
            ಈ ಕನ್ನಡ ಪ್ರಬಂಧವನ್ನು DAF ಫೀಡ್‌ಬ್ಯಾಕ್‌ನೊಂದಿಗೆ ಓದಿ
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetExercise}
            data-testid="reset-exercise-button"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            ಮರುಪ್ರಾರಂಭಿಸಿ
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Passage Display */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 kannada-text">{currentPassage.title}</h3>
            <Badge className="badge-primary text-xs">
              {level === 'beginner' ? 'ಪ್ರಾರಂಭಿಕ' : level === 'intermediate' ? 'ಮಧ್ಯಮ' : 'ಮುಂದುವರಿದ'}
            </Badge>
          </div>

          {/* Passage Text */}
          <div className="bg-muted rounded-xl p-6 mb-6 kannada-text text-lg leading-relaxed" data-testid="passage-text">
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
              data-testid="prev-passage-button"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              ಹಿಂದಿನ
            </Button>
            
            <div className="text-sm text-muted-foreground kannada-text" data-testid="passage-counter">
              ಪ್ರಬಂಧ {currentPassageIndex + 1} / {passages.length}
            </div>
            
            <Button 
              variant="outline" 
              onClick={nextPassage}
              disabled={currentPassageIndex === passages.length - 1}
              data-testid="next-passage-button"
            >
              ಮುಂದಿನ
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* DAF Controls */}
        <div className="space-y-6">
          <DAFProcessor 
            onSessionStart={handleSessionStart}
            onSessionEnd={handleSessionEnd}
          />

          {/* Session Controls */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 kannada-text">ಓದುವ ನಿಯಂತ್ರಣಗಳು</h3>
            
            <div className="space-y-4">
              <Button 
                onClick={handleStartReading}
                disabled={isReading || startSessionMutation.isPending}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                data-testid="start-reading-button"
              >
                <Play className="w-5 h-5" />
                {isReading ? 'ಓದುತ್ತಿದ್ದೇವೆ...' : 'ಓದಲು ಪ್ರಾರಂಭಿಸಿ'}
              </Button>

              {isReading && (
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="kannada-text">ಸಕ್ರಿಯ ಅವಧಿ</span>
                  </div>
                </div>
              )}
            </div>

            {/* Reading Tips */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 kannada-text text-sm">ಓದುವ ಸಲಹೆಗಳು:</h4>
              <ul className="text-xs text-muted-foreground space-y-1 kannada-text">
                <li>• ನಿಧಾನವಾಗಿ ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಓದಿ</li>
                <li>• DAF ಫೀಡ್‌ಬ್ಯಾಕ್ ಅನ್ನು ಕೇಳಿ</li>
                <li>• ನಿಯಮಿತ ವಿರಾಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
