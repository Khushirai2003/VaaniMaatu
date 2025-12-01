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
  const { t, language } = useLanguage();

  // Mock demo stats data
  const stats = {
    totalPoints: 1250,
    totalMinutes: 180,
    currentStreak: 5,
    achievements: []
  };
  const statsLoading = false;

  // Mock weekly progress data
  const weeklyProgress = [
    { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], totalMinutes: 25, points: 75, exercisesCompleted: 2 },
    { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], totalMinutes: 30, points: 90, exercisesCompleted: 3 },
    { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], totalMinutes: 0, points: 0, exercisesCompleted: 0 },
    { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], totalMinutes: 40, points: 120, exercisesCompleted: 4 },
    { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], totalMinutes: 35, points: 105, exercisesCompleted: 3 },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], totalMinutes: 20, points: 60, exercisesCompleted: 2 },
    { date: new Date().toISOString().split('T')[0], totalMinutes: 30, points: 90, exercisesCompleted: 3 }
  ];
  const progressLoading = false;

  // Mock recent sessions data
  const recentSessions = [
    {
      id: '1',
      type: 'reading',
      duration: 900000, // 15 minutes in milliseconds
      points: 45,
      fluencyScore: 85,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: '2', 
      type: 'naming',
      duration: 600000, // 10 minutes
      points: 30,
      fluencyScore: 78,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
    },
    {
      id: '3',
      type: 'reading',
      duration: 1200000, // 20 minutes
      points: 60,
      fluencyScore: 92,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    }
  ];
  const sessionsLoading = false;

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
      title: language === 'kannada' ? 'ಮೊದಲ ಹೆಜ್ಜೆ' : 'First Step',
      description: language === 'kannada' ? 'ಮೊದಲ ಅವಧಿ ಪೂರ್ಣಗೊಳಿಸಿ' : 'Complete your first session',
      icon: Star,
      earned: true,
      gradient: 'from-yellow-400 via-orange-500 to-red-500'
    },
    {
      id: 'dedicated',
      title: language === 'kannada' ? 'ಸಮರ್ಪಿತ' : 'Dedicated',
      description: language === 'kannada' ? '7 ದಿನಗಳ ಸರಣಿ' : '7 day streak',
      icon: Flame,
      earned: true, // Demo: show colorful badge
      gradient: 'from-red-500 via-pink-500 to-purple-600'
    },
    {
      id: 'reader',
      title: language === 'kannada' ? 'ಓದುಗ' : 'Reader',
      description: language === 'kannada' ? '10 ಪ್ರಬಂಧಗಳು ಓದಿ' : 'Read 10 passages',
      icon: Target,
      earned: true, // Demo: show colorful badge
      gradient: 'from-blue-500 via-teal-500 to-green-500'
    },
    {
      id: 'month_master',
      title: language === 'kannada' ? 'ತಿಂಗಳ ಮಾಸ್ಟರ್' : 'Month Master',
      description: language === 'kannada' ? '30 ದಿನಗಳ ಸರಣಿ' : '30 day streak',
      icon: Award,
      earned: true, // Demo: show colorful badge
      gradient: 'from-purple-600 via-indigo-600 to-blue-700'
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
              <p className={`text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('ui.loading')}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('nav.progress')}</h1>
          <p className={`text-muted-foreground text-lg max-w-2xl mx-auto ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {t('progress.overall') || 'Track your improvement and earn achievements'}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-white to-pink-50 border-2 border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="total-points">
                  {stats?.totalPoints || 0}
                </div>
                <div className={`text-sm text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('stats.points')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="total-minutes">
                  {stats?.totalMinutes || 0}
                </div>
                <div className={`text-sm text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('stats.minutes')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="achievements-count">
                  {achievements.filter(a => a.earned).length}
                </div>
                <div className={`text-sm text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('stats.achievements')}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-white to-red-50 border-2 border-red-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground" data-testid="current-streak">
                  {stats?.currentStreak || 0}
                </div>
                <div className={`text-sm text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('stats.streak')}</div>
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
              {t('progress.weekly') || 'Weekly Progress'}
            </h3>
            <ProgressChart data={weeklyProgress || []} />
          </Card>

          {/* Fluency Score */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 kannada-text flex items-center gap-2">
              <Target className="w-5 h-5" />
              {t('progress.fluencyImprovement') || 'Fluency Score'}
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
                  <div className={`text-sm text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>Fluency</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className={`text-sm ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('time.minutes') || 'Speech Rate'}</span>
                <Badge className={`${fluencyScore >= 80 ? 'badge-primary' : fluencyScore >= 60 ? 'badge-secondary' : 'badge-accent'}`}>
                  {fluencyScore >= 80 ? (language === 'kannada' ? 'ಉತ್ತಮ' : 'Excellent') : fluencyScore >= 60 ? (language === 'kannada' ? 'ಸರಾಸರಿ' : 'Average') : (language === 'kannada' ? 'ಸುಧಾರಣೆ ಅಗತ್ಯ' : 'Needs improvement')}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className={`text-sm ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('progress.consistency') || 'Consistency'}</span>
                <Badge className={`${(stats?.currentStreak || 0) >= 7 ? 'badge-primary' : 'badge-secondary'}`}>
                  {(stats?.currentStreak || 0) >= 7 ? (language === 'kannada' ? 'ಉತ್ತಮ' : 'Excellent') : (language === 'kannada' ? 'ಸರಾಸರಿ' : 'Average')}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className={`text-sm ${language === 'kannada' ? 'kannada-text' : ''}`}>{t('progress.overall') || 'Overall Progress'}</span>
                <Badge className={`${(stats?.totalMinutes || 0) >= 300 ? 'badge-primary' : 'badge-secondary'}`}>
                  {(stats?.totalMinutes || 0) >= 300 ? (language === 'kannada' ? 'ಉತ್ತಮ' : 'Excellent') : (language === 'kannada' ? 'ಸರಾಸರಿ' : 'Average')}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold mb-6 kannada-text flex items-center gap-2">
            <Award className="w-6 h-6" />
            {language === 'kannada' ? 'ಸಾಧನೆಗಳು ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು' : 'Achievements & Badges'}
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`text-center p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    achievement.earned
                      ? `bg-gradient-to-br ${achievement.gradient}/10 border-yellow-400 shadow-xl`
                      : 'bg-gray-100 border-dashed border-gray-300 opacity-60'
                  }`}
                  data-testid={`achievement-${achievement.id}`}
                >
                  <div 
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl border-4 transform hover:scale-110 transition-all duration-300 animate-pulse`}
                    style={{
                      background: achievement.earned 
                        ? (achievement.id === 'first_step' ? 'linear-gradient(135deg, #facc15, #f97316, #ef4444)' :
                           achievement.id === 'dedicated' ? 'linear-gradient(135deg, #ef4444, #ec4899, #9333ea)' :
                           achievement.id === 'reader' ? 'linear-gradient(135deg, #3b82f6, #14b8a6, #22c55e)' :
                           'linear-gradient(135deg, #9333ea, #4f46e5, #1d4ed8)')
                        : 'linear-gradient(135deg, #d1d5db, #9ca3af)',
                      borderColor: achievement.earned ? '#fcd34d' : '#d1d5db'
                    }}
                  >
                    <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
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
                {language === 'kannada' ? 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ' : 'Recent activity'}
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
                        {session.type === 'reading' ? (language === 'kannada' ? 'ಓದುವ ಅಭ್ಯಾಸ' : 'Reading practice') :
                         session.type === 'naming' ? (language === 'kannada' ? 'ಚಿತ್ರ ಹೆಸರಿಸುವಿಕೆ' : 'Image naming') : (language === 'kannada' ? 'ಸಂಭಾಷಣೆ ಅಭ್ಯಾಸ' : 'Conversation practice')}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(session.createdAt).toLocaleDateString(language === 'kannada' ? 'kn-IN' : 'en-IN')} • {Math.floor((session.duration || 0) / 60000)} {language === 'kannada' ? 'ನಿಮಿಷಗಳು' : 'minutes'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">+{session.points || 0}</div>
                    {session.fluencyScore && (
                      <div className="text-sm text-muted-foreground">{session.fluencyScore}% {language === 'kannada' ? 'ಸ್ಪಷ್ಟತೆ' : 'clarity'}</div>
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
