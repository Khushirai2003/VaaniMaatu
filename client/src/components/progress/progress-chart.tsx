import { useMemo } from "react";
import { useLanguage } from "@/hooks/use-language";

interface ProgressData {
  date: string;
  totalMinutes: number;
  points: number;
  exercisesCompleted: number;
}

interface ProgressChartProps {
  data: ProgressData[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  const { language } = useLanguage();

  const kannadaWeekDays = ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'];
  const englishWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDays = language === 'kannada' ? kannadaWeekDays : englishWeekDays;
  
  const chartData = useMemo(() => {
    // Create array for last 7 days
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map((date, index) => {
      const dayData = data?.find(d => d.date === date);
      const dayName = weekDays[new Date(date).getDay()];
      
      return {
        date,
        dayName,
        minutes: dayData?.totalMinutes || 0,
        points: dayData?.points || 0,
        exercises: dayData?.exercisesCompleted || 0,
      };
    });
  }, [data]);

  const maxMinutes = Math.max(...chartData.map(d => d.minutes), 60); // At least 60 for scale

  return (
    <div className="space-y-4" data-testid="progress-chart">
      {chartData.map((day, index) => {
        const percentage = maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 0;
        const isToday = day.date === new Date().toISOString().split('T')[0];
        
        return (
            <div key={day.date} className="flex items-center gap-3">
              <div className={`w-16 text-sm ${language === 'kannada' ? 'kannada-text' : ''} ${isToday ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                {day.dayName}
              </div>
            <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
              <div 
                className={`h-full rounded-full flex items-center justify-end px-3 transition-all duration-500 ${
                  percentage > 0 
                    ? `bg-gradient-to-r ${isToday ? 'from-secondary to-primary' : 'from-primary to-accent'}` 
                    : 'bg-muted'
                }`}
                style={{ width: `${Math.max(percentage, percentage > 0 ? 20 : 0)}%` }}
                data-testid={`progress-bar-${index}`}
              >
                {day.minutes > 0 && (
                  <span className="text-xs font-medium text-white">
                    {day.minutes} {language === 'kannada' ? 'ನಿಮಿಷ' : 'min'}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right min-w-[60px]">
              <div className="text-sm font-medium text-foreground" data-testid={`day-minutes-${index}`}>
                {day.minutes}m
              </div>
              <div className="text-xs text-muted-foreground" data-testid={`day-points-${index}`}>
                {day.points} pts
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          <span className={`${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? 'ಸಾಮಾನ್ಯ ದಿನಗಳು' : 'Regular days'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
          <span className={`${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? 'ಇಂದು' : 'Today'}</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-primary" data-testid="week-total-minutes">
            {chartData.reduce((sum, day) => sum + day.minutes, 0)}
          </div>
          <div className={`text-xs text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? 'ಒಟ್ಟು ನಿಮಿಷಗಳು' : 'Total minutes'}</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-secondary" data-testid="week-total-points">
            {chartData.reduce((sum, day) => sum + day.points, 0)}
          </div>
          <div className={`text-xs text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? 'ಒಟ್ಟು ಅಂಕಗಳು' : 'Total points'}</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-accent" data-testid="week-active-days">
            {chartData.filter(day => day.minutes > 0).length}
          </div>
          <div className={`text-xs text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>{language === 'kannada' ? 'ಸಕ್ರಿಯ ದಿನಗಳು' : 'Active days'}</div>
        </div>
      </div>
    </div>
  );
}
