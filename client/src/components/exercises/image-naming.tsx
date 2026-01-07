import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DAFProcessor } from "@/components/audio/daf-processor";
import { useLanguage } from "@/hooks/use-language";
import { ChevronLeft, ChevronRight, RefreshCw, Image, Play, Pause } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const DEMO_USER_ID = "demo-user";

interface CulturalImage {
  id: string;
  url: string;
  kannadaName: string;
  englishName: string;
  category: string;
  description: string;
  culturalSignificance: string;
}

export default function ImageNaming() {
  const { t, language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<CulturalImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  const { data: apiImages, isLoading, error: fetchError } = useQuery({
    queryKey: ['/api/dataset-images'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/dataset-images?count=50');
      const data = await response.json();
      const uniqueImages = data.filter((image: CulturalImage, index: number, self: CulturalImage[]) => 
        index === self.findIndex((img) => img.url === image.url)
      );
      return uniqueImages;
    },
  });

  useEffect(() => {
    if (apiImages && Array.isArray(apiImages)) {
      setImages(apiImages);
      setLoading(false);
    }
    if (fetchError) {
      setError('Failed to load images');
      setLoading(false);
    }
  }, [apiImages, fetchError]);

  useEffect(() => {
    if (autoPlay && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, images.length]);

  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/sessions', {
        userId: DEMO_USER_ID,
        type: 'naming',
        exerciseId: 'image-naming-exercise',
      });
      return response.json();
    },
    onSuccess: (session) => {
      setSessionId(session.id);
      setSessionStarted(true);
      setStartTime(new Date());
    },
  });

  const endSessionMutation = useMutation({
    mutationFn: async () => {
      if (!sessionId || !startTime) return;
      const duration = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      const response = await apiRequest('PATCH', `/api/sessions/${sessionId}`, {
        duration: duration * 1000,
        points: Math.floor(duration / 60) * 5 + (currentImageIndex + 1) * 2,
        completed: true,
        fluencyScore: Math.floor(Math.random() * 20) + 80,
      });
      return response.json();
    },
    onSuccess: () => {
      setSessionStarted(false);
      setSessionId(null);
      setStartTime(null);
    },
  });

  const handleStartSession = () => startSessionMutation.mutate();
  const handleEndSession = () => endSessionMutation.mutate();

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      if (sessionStarted) handleEndSession();
      setCurrentImageIndex(0);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NzM4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePreviousImage();
      else if (e.key === 'ArrowRight') handleNextImage();
      else if (e.key === ' ') {
        e.preventDefault();
        setAutoPlay(!autoPlay);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentImageIndex, images.length, autoPlay]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-1 animate-pulse">
            <Image className="w-4 h-4 text-white" />
          </div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !images.length) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-1">
            <RefreshCw className="w-4 h-4 text-white" />
          </div>
          <p className="text-red-600 text-sm mb-1">{error || 'No images'}</p>
          <Button onClick={() => window.location.reload()} size="sm">Retry</Button>
        </div>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  return (
    <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 min-h-screen relative z-10 p-4 animate-gradient-x overflow-hidden">
      <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-4 shadow-2xl rounded-2xl bg-gradient-to-br from-white via-blue-50 to-purple-50 border-4 border-gradient-to-r from-orange-300 via-pink-300 to-purple-300 overflow-hidden">
        <div className="bg-gradient-to-r from-rainbow-100 via-yellow-100 to-green-100 rounded-xl p-4 border-3 border-gradient-to-r from-pink-400 via-purple-400 to-blue-400 shadow-xl animate-pulse-slow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">🎨 Images ({images.length})</span>
            <Button onClick={() => setAutoPlay(!autoPlay)} variant="outline" size="sm" className="text-xs h-8 bg-gradient-to-r from-pink-400 to-purple-500 text-white border-0 hover:from-purple-500 hover:to-pink-500 shadow-lg transform hover:scale-105 transition-all">
              {autoPlay ? <Pause className="w-2 h-2" /> : <Play className="w-2 h-2" />}
            </Button>
          </div>
          <div className="flex gap-2 max-h-20 overflow-x-auto overflow-y-hidden bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl p-3 border-2 border-rainbow shadow-inner">
            {images.map((img, idx) => (
              <button key={`${img.id}-${idx}`} onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-12 h-12 rounded-xl border-3 overflow-hidden transition-all duration-300 hover:scale-110 hover:rotate-2 ${
                  idx === currentImageIndex ? 'border-gradient-to-r from-pink-500 to-purple-500 ring-4 ring-rainbow shadow-2xl transform scale-105' : 'border-gradient-to-r from-blue-300 to-green-300 hover:border-gradient-to-r hover:from-pink-400 hover:to-yellow-400'
                }`}>
                <img src={img.url} alt={img.englishName} className="w-full h-full object-cover" onError={handleImageError} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 p-6">
          <Card className="p-0 shadow-2xl border-4 border-gradient-to-r from-rainbow rounded-2xl overflow-hidden transform hover:scale-102 transition-all duration-300">
            <div className="text-center p-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x">
              <div className="inline-flex items-center gap-3 bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full text-base font-black shadow-2xl border border-white/20">
                <Image className="w-4 h-4" />
                {currentImageIndex + 1}/{images.length}
              </div>
            </div>
            <div className="h-80 bg-gradient-to-br from-rainbow-50 via-pink-50 to-purple-50 overflow-hidden relative">
              <img key={currentImage.id} src={currentImage.url} alt={currentImage.englishName}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" onError={handleImageError} />
              <div className="absolute inset-0 bg-gradient-to-t from-rainbow/20 via-transparent to-rainbow/10 pointer-events-none"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-ping"></div>
            </div>
          </Card>
          
          <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl p-6 border-4 border-gradient-to-r from-green-400 via-blue-400 to-purple-400 shadow-2xl transform hover:scale-102 transition-all">
            <DAFProcessor onSessionStart={handleStartSession} onSessionEnd={handleEndSession}
              onCorrectedSentence={(original, corrected) => console.log('Corrected:', { original, corrected })} />
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-b-2xl border-t-4 border-gradient-to-r from-rainbow">
          <Button onClick={handlePreviousImage} disabled={currentImageIndex === 0} variant="outline" size="lg" className="bg-gradient-to-r from-blue-400 to-purple-500 text-white border-0 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 shadow-xl transform hover:scale-105 transition-all">
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          <Button onClick={handleNextImage} size="lg" className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white shadow-2xl transform hover:scale-110 transition-all animate-pulse-slow">
            {currentImageIndex === images.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}