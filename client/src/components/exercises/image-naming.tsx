import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DAFProcessor } from "@/components/audio/daf-processor";
import { useLanguage } from "@/hooks/use-language";
import { culturalImages, type CulturalImage } from "@/data/cultural-images";
import { ChevronLeft, ChevronRight, Play, Mic } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const DEMO_USER_ID = "demo-user";

export function ImageNaming() {
  const { t, language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNaming, setIsNaming] = useState(false);
  const [sessionStart, setSessionStart] = useState<number | null>(null);

  const currentImage = culturalImages[currentImageIndex];

  // Start naming session
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/sessions', {
        userId: DEMO_USER_ID,
        type: 'naming',
        exerciseId: currentImage.id,
        dafSettings: { delayMs: 150, enabled: true },
      });
      return response.json();
    },
    onSuccess: () => {
      setIsNaming(true);
      setSessionStart(Date.now());
    },
  });

  // End naming session
  const endSessionMutation = useMutation({
    mutationFn: async (data: { sessionId: string; duration: number }) => {
      const response = await apiRequest('PATCH', `/api/sessions/${data.sessionId}`, {
        duration: data.duration,
        points: Math.floor(data.duration / 1000 / 60) * 20, // 20 points per minute
        completed: true,
        fluencyScore: Math.floor(Math.random() * 30) + 70,
      });
      return response.json();
    },
    onSuccess: () => {
      setIsNaming(false);
      setSessionStart(null);
    },
  });

  const handleStartNaming = () => {
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

  const nextImage = () => {
    if (currentImageIndex < culturalImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 kannada-text">{t('exercise.naming')}</h2>
        <p className="text-muted-foreground text-lg kannada-text max-w-2xl mx-auto">
          ದಕ್ಷಿಣ ಭಾರತದ ಸಾಂಸ್ಕೃತಿಕ ಚಿತ್ರಗಳನ್ನು ವಿವರಿಸಿ ಮತ್ತು ಹೆಸರಿಸಿ
        </p>
      </div>

      {/* Image Grid Preview */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
        {culturalImages.map((image, index) => (
          <div
            key={image.id}
            className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-border'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            data-testid={`image-thumbnail-${index}`}
          >
            <img 
              src={image.url} 
              alt={image.englishName}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Display */}
        <div>
          <Card className="overflow-hidden">
            <img 
              src={currentImage.url} 
              alt={currentImage.englishName}
              className="w-full h-80 object-cover"
              data-testid="current-image"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold kannada-text">
                  {language === 'kannada' ? currentImage.kannadaName : currentImage.englishName}
                </h3>
                <Badge className="badge-accent text-xs">{currentImage.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4 kannada-text">
                {currentImage.description}
              </p>
              <p className="text-xs text-muted-foreground italic">
                {currentImage.culturalSignificance}
              </p>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={prevImage}
              disabled={currentImageIndex === 0}
              data-testid="prev-image-button"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center text-sm text-muted-foreground kannada-text" data-testid="image-counter">
              ಚಿತ್ರ {currentImageIndex + 1} / {culturalImages.length}
            </div>
            
            <Button 
              variant="outline" 
              onClick={nextImage}
              disabled={currentImageIndex === culturalImages.length - 1}
              data-testid="next-image-button"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Exercise Controls */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 kannada-text">ಈ ಚಿತ್ರವನ್ನು ವಿವರಿಸಿ</h3>
            <p className="text-muted-foreground mb-6 kannada-text">
              DAF ಫೀಡ್‌ಬ್ಯಾಕ್ ಅನ್ನು ಬಳಸಿಕೊಂಡು ಚಿತ್ರದ ವಿವರವನ್ನು ಹೇಳಿ
            </p>

            {/* Suggested Prompts */}
            <div className="bg-muted rounded-xl p-4 mb-6">
              <h4 className="font-semibold mb-3 kannada-text text-sm">ಸೂಚನೆಗಳು:</h4>
              <ul className="space-y-2 kannada-text text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ಈ {currentImage.kannadaName}ದ ವಿವರವನ್ನು ಹೇಳಿ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ಇದರ ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವವನ್ನು ತಿಳಿಸಿ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ</span>
                </li>
              </ul>
            </div>

            {/* Session Controls */}
            <div className="space-y-3">
              <Button 
                onClick={handleStartNaming}
                disabled={isNaming || startSessionMutation.isPending}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                data-testid="start-naming-button"
              >
                <Play className="w-5 h-5" />
                {isNaming ? 'ವಿವರಿಸುತ್ತಿದ್ದೇವೆ...' : 'ವಿವರಣೆ ಪ್ರಾರಂಭಿಸಿ'}
              </Button>

              {isNaming && (
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border-2 border-primary/20">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium mb-2">
                    <Mic className="w-4 h-4" />
                    <span className="kannada-text">ಸಕ್ರಿಯ ರೆಕಾರ್ಡಿಂಗ್</span>
                  </div>
                  <div className="text-sm text-muted-foreground kannada-text">
                    ಚಿತ್ರವನ್ನು ವಿವರಿಸಿ ಮತ್ತು DAF ಫೀಡ್‌ಬ್ಯಾಕ್ ಕೇಳಿ
                  </div>
                </div>
              )}
            </div>
          </Card>

          <DAFProcessor 
            onSessionStart={handleSessionStart}
            onSessionEnd={handleSessionEnd}
          />
        </div>
      </div>
    </div>
  );
}
