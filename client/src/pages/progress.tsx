import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgressChart } from "@/components/progress/progress-chart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { Zap, Clock, Award, Flame, TrendingUp, Target, Star, Calendar } from "lucide-react";

const DEMO_USER_ID = "demo-user";

export default function Progress() {
  const { t } = useLanguage();

  // Get user stats
  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalPoints: number;
    totalMinutes: number;
    currentStreak: number;
    achievements: any[];
  }>({
    queryKey: ['/api/users', DEMO_USER_ID, 'stats'],
  });

  // Get user progress (last 7 days)
  const { data: weeklyProgress, isLoading: progressLoading } = useQuery<any[]>({
    queryKey: ['/api/users', DEMO_USER_ID, 'progress', '7'],
    queryFn: async () => {
      const response = await fetch(`/api/users/${DEMO_USER_ID}/progress?days=7`);
      if (!response.ok) throw new Error('Failed to fetch progress');
      return response.json();
    },
  });

  // Get recent sessions
  const { data: recentSessions, isLoading: sessionsLoading } = useQuery<any[]>({
    queryKey: ['/api/users', DEMO_USER_ID, 'sessions'],
  });

  const calculateFluencyScore = () => {
    if (!recentSessions || recentSessions.length === 0) return 0;
    const validScores = recentSessions
      .filter((session: any) => session.fluencyScore && session.fluencyScore > 0)
      .map((session: any) => session.fluencyScore);
    
    if (validScores.length === 0) return 0;
    return Math.round(validScores.reduce((sum: number, score: number) => sum + score, 0) / validScores.length);
  };

  const achievements = [
    {
      id: 'first_step',
      title: 'ಮೊದಲ ಹೆಜ್ಜೆ',
      description: 'ಮೊದಲ ಅವಧಿ ಪೂರ್ಣಗೊಳಿಸಿ',
      icon: Star,
      earned: true,
      gradient: 'from-primary to-accent'
    },
    {
      id: 'dedicated',
      title: 'ಸಮರ್ಪಿತ',
      description: '7 ದಿನಗಳ ಸರಣಿ',
      icon: Flame,
      earned: (stats?.currentStreak || 0) >= 7,
      gradient: 'from-secondary to-primary'
    },
    {
      id: 'reader',
      title: 'ಓದುಗ',
      description: '10 ಪ್ರಬಂಧಗಳು ಓದಿ',
      icon: Target,
      earned: (stats?.totalMinutes || 0) >= 200, // Assume 20 min per reading session
      gradient: 'from-accent to-secondary'
    },
    {
      id: 'month_master',
      title: 'ತಿಂಗಳ ಮಾಸ್ಟರ್',
      description: '30 ದಿನಗಳ ಸರಣಿ',
      icon: Award,
      earned: (stats?.currentStreak || 0) >= 30,
      gradient: 'from-primary to-secondary'
    },
  ];

  const fluencyScore = calculateFluencyScore();

  if (statsLoading || progressLoading || sessionsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground kannada-text">ಲೋಡ್ ಆಗುತ್ತಿದೆ...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 kannada-text">{t('nav.progress')}</h1>
          <p className="text-muted-foreground text-lg kannada-text max-w-2xl mx-auto">
            ನಿಮ್ಮ ಸುಧಾರಣೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಸಾಧನೆಗಳನ್ನು ಗಳಿಸಿ
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="total-points">
                  {stats?.totalPoints || 0}
                </div>
                <div className="text-sm text-muted-foreground kannada-text">{t('stats.points')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="total-minutes">
                  {stats?.totalMinutes || 0}
                </div>
                <div className="text-sm text-muted-foreground kannada-text">{t('stats.minutes')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="achievements-count">
                  {achievements.filter(a => a.earned).length}
                </div>
                <div className="text-sm text-muted-foreground kannada-text">{t('stats.achievements')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="current-streak">
                  {stats?.currentStreak || 0}
                </div>
                <div className="text-sm text-muted-foreground kannada-text">{t('stats.streak')}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 kannada-text flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              ಸಾಪ್ತಾಹಿಕ ಪ್ರಗತಿ
            </h3>
            <ProgressChart data={weeklyProgress || []} />
          </Card>

          {/* Fluency Score */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 kannada-text flex items-center gap-2">
              <Target className="w-5 h-5" />
              ಸ್ಪಷ್ಟತೆ ಸ್ಕೋರ್
            </h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="progress-ring w-full h-full">
                  <circle 
                    className="text-muted" 
                    strokeWidth="12" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="80" 
                    cx="96" 
                    cy="96"
                  />
                  <circle 
                    className="progress-ring-circle" 
                    strokeWidth="12" 
                    strokeDasharray={`${502.65}`}
                    strokeDashoffset={`${502.65 - (502.65 * fluencyScore) / 100}`}
                    strokeLinecap="round" 
                    fill="transparent" 
                    r="80" 
                    cx="96" 
                    cy="96"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-primary" data-testid="fluency-score">
                    {fluencyScore}%
                  </div>
                  <div className="text-sm text-muted-foreground kannada-text">ಸ್ಕೋರ್</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm kannada-text">ಮಾತಿನ ವೇಗ</span>
                <Badge className={`${fluencyScore >= 80 ? 'badge-primary' : fluencyScore >= 60 ? 'badge-secondary' : 'badge-accent'}`}>
                  {fluencyScore >= 80 ? 'ಉತ್ತಮ' : fluencyScore >= 60 ? 'ಸರಾಸರಿ' : 'ಸುಧಾರಣೆ ಅಗತ್ಯ'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm kannada-text">ನಿಯಮಿತತೆ</span>
                <Badge className={`${(stats?.currentStreak || 0) >= 7 ? 'badge-primary' : 'badge-secondary'}`}>
                  {(stats?.currentStreak || 0) >= 7 ? 'ಉತ್ತಮ' : 'ಸರಾಸರಿ'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm kannada-text">ಒಟ್ಟು ಪ್ರಗತಿ</span>
                <Badge className={`${(stats?.totalMinutes || 0) >= 300 ? 'badge-primary' : 'badge-secondary'}`}>
                  {(stats?.totalMinutes || 0) >= 300 ? 'ಉತ್ತಮ' : 'ಸರಾಸರಿ'}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold mb-6 kannada-text flex items-center gap-2">
            <Award className="w-6 h-6" />
            ಸಾಧನೆಗಳು ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`text-center p-6 rounded-xl border-2 transition-all ${
                    achievement.earned
                      ? `bg-gradient-to-br ${achievement.gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 border-primary/20`
                      : 'bg-muted/50 border-dashed border-border opacity-50'
                  }`}
                  data-testid={`achievement-${achievement.id}`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    achievement.earned
                      ? `bg-gradient-to-br ${achievement.gradient}`
                      : 'bg-muted'
                  }`}>
                    <IconComponent className={`w-10 h-10 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <h4 className={`font-semibold mb-1 kannada-text ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground kannada-text">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        {recentSessions && recentSessions.length > 0 && (
          <Card className="mt-8 p-6">
            <h3 className="text-xl font-bold mb-6 kannada-text flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ
            </h3>
            <div className="space-y-4">
              {recentSessions.slice(0, 5).map((session: any, index: number) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      session.type === 'reading' ? 'bg-primary/10' : 
                      session.type === 'naming' ? 'bg-secondary/10' : 'bg-accent/10'
                    }`}>
                      {session.type === 'reading' ? <Target className="w-5 h-5 text-primary" /> :
                       session.type === 'naming' ? <Star className="w-5 h-5 text-secondary" /> :
                       <TrendingUp className="w-5 h-5 text-accent" />}
                    </div>
                    <div>
                      <div className="font-medium kannada-text">
                        {session.type === 'reading' ? 'ಓದುವ ಅಭ್ಯಾಸ' :
                         session.type === 'naming' ? 'ಚಿತ್ರ ಹೆಸರಿಸುವಿಕೆ' : 'ಸಂಭಾಷಣೆ ಅಭ್ಯಾಸ'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(session.createdAt).toLocaleDateString('kn-IN')} • {Math.floor((session.duration || 0) / 60000)} ನಿಮಿಷಗಳು
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">+{session.points || 0}</div>
                    {session.fluencyScore && (
                      <div className="text-sm text-muted-foreground">{session.fluencyScore}% ಸ್ಪಷ್ಟತೆ</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
