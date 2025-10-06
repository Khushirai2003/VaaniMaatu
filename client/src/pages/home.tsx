import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DAFProcessor } from "@/components/audio/daf-processor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Play, Book, Image, MessageCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

// Demo user for the application
const DEMO_USER_ID = "demo-user";

export default function Home() {
  const { t } = useLanguage();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Initialize demo user
  const { data: user } = useQuery({
    queryKey: ['/api/users', DEMO_USER_ID],
    queryFn: async () => {
      const response = await apiRequest('POST', '/api/users', { username: 'demo-user' });
      return response.json();
    },
  });

  // Get user stats
  const { data: stats } = useQuery<{
    totalPoints: number;
    totalMinutes: number;
    currentStreak: number;
    achievements: any[];
  }>({
    queryKey: ['/api/users', DEMO_USER_ID, 'stats'],
    enabled: !!user,
  });

  // Start DAF session mutation
  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/sessions', {
        userId: DEMO_USER_ID,
        type: 'daf',
        dafSettings: { delayMs: 150, enabled: true },
      });
      return response.json();
    },
    onSuccess: (session) => {
      setCurrentSessionId(session.id);
    },
  });

  // End session mutation
  const endSessionMutation = useMutation({
    mutationFn: async (duration: number) => {
      if (!currentSessionId) return;
      const response = await apiRequest('PATCH', `/api/sessions/${currentSessionId}`, {
        duration: duration * 1000, // Convert to milliseconds
        points: Math.floor(duration / 60) * 10, // 10 points per minute
        completed: true,
        fluencyScore: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      });
      return response.json();
    },
    onSuccess: () => {
      setCurrentSessionId(null);
      // Invalidate stats to refresh
    },
  });

  const handleSessionStart = () => {
    startSessionMutation.mutate();
  };

  const handleSessionEnd = (duration: number) => {
    if (currentSessionId) {
      endSessionMutation.mutate(duration);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block mb-4">
                <Badge className="badge badge-primary kannada-text">
                  🎯 ಉಚಿತ ವಾಕ್ ಚಿಕಿತ್ಸೆ
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 kannada-text text-foreground leading-tight">
                ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು<br />
                <span className="text-primary">ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 kannada-text leading-relaxed">
                ತಡವಾದ ಶ್ರವಣ ಪ್ರತಿಕ್ರಿಯೆ (DAF) ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ತೊದಲುವಿಕೆಯನ್ನು ನಿವಾರಿಸಿ. 
                ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿಗೆ ವಿಶೇಷವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="text-center p-4 border border-border">
                  <div className="text-3xl font-bold text-primary mb-1" data-testid="total-sessions">
                    {stats?.totalMinutes ? Math.floor(stats.totalMinutes / 20) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground kannada-text">{t('stats.sessions')}</div>
                </Card>
                <Card className="text-center p-4 border border-border">
                  <div className="text-3xl font-bold text-secondary mb-1" data-testid="total-points">
                    {stats?.totalPoints || 0}
                  </div>
                  <div className="text-sm text-muted-foreground kannada-text">{t('stats.points')}</div>
                </Card>
                <Card className="text-center p-4 border border-border">
                  <div className="text-3xl font-bold text-accent mb-1" data-testid="current-streak">
                    {stats?.currentStreak || 0}
                  </div>
                  <div className="text-sm text-muted-foreground kannada-text">{t('stats.days')}</div>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/exercises" className="inline-block">
                  <Button className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg kannada-text flex items-center gap-2" data-testid="start-exercises-button">
                    <Play className="w-6 h-6" />
                    {t('hero.start')}
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-4 rounded-xl font-semibold text-lg kannada-text flex items-center gap-2" data-testid="guide-button">
                  <Book className="w-6 h-6" />
                  {t('hero.guide')}
                </Button>
              </div>
            </div>

            {/* Right Content - DAF Processor */}
            <DAFProcessor 
              onSessionStart={handleSessionStart}
              onSessionEnd={handleSessionEnd}
            />
          </div>
        </div>
      </section>

      {/* Quick Exercise Preview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 kannada-text">ಅಭ್ಯಾಸ ವಿಧಗಳು</h2>
            <p className="text-muted-foreground text-lg kannada-text max-w-2xl mx-auto">
              ನಿಮ್ಮ ವಾಕ್ ಸ್ಪಷ್ಟತೆಯನ್ನು ಸುಧಾರಿಸಲು ವಿವಿಧ ಅಭ್ಯಾಸಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Reading Exercise Card */}
            <Link href="/exercises?type=reading">
              <Card className="p-6 card-hover cursor-pointer" data-testid="reading-exercise-card">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 kannada-text">{t('exercise.reading')}</h3>
                <p className="text-muted-foreground mb-4 kannada-text text-sm">
                  ಕನ್ನಡ ಪ್ರಬಂಧಗಳನ್ನು ಓದಿ ಮತ್ತು ಅಭ್ಯಾಸ ಮಾಡಿ
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="badge-primary">3 ಮಟ್ಟಗಳು</Badge>
                  <Badge className="badge-secondary">ಬಹು ಪ್ರಬಂಧಗಳು</Badge>
                </div>
              </Card>
            </Link>

            {/* Image Naming Card */}
            <Link href="/exercises?type=naming">
              <Card className="p-6 card-hover cursor-pointer" data-testid="naming-exercise-card">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-4">
                  <Image className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 kannada-text">{t('exercise.naming')}</h3>
                <p className="text-muted-foreground mb-4 kannada-text text-sm">
                  ದಕ್ಷಿಣ ಭಾರತೀಯ ಚಿತ್ರಗಳನ್ನು ವಿವರಿಸಿ
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="badge-primary">ಬಹು ಚಿತ್ರಗಳು</Badge>
                  <Badge className="badge-accent">ಸಾಂಸ್ಕೃತಿಕ</Badge>
                </div>
              </Card>
            </Link>

            {/* Conversation Practice Card */}
            <Link href="/exercises?type=conversation">
              <Card className="p-6 card-hover cursor-pointer" data-testid="conversation-exercise-card">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 kannada-text">{t('exercise.conversation')}</h3>
                <p className="text-muted-foreground mb-4 kannada-text text-sm">
                  ನೈಜ ಸಂವಾದಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Badge className="badge-secondary">ಬಹು ಪ್ರಾಂಪ್ಟ್‌ಗಳು</Badge>
                  <Badge className="badge-primary">ಸಂದರ್ಭ</Badge>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
