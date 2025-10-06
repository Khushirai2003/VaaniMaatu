import { useEffect } from 'react';

interface AudioVisualizerProps {
  audioLevels: number[];
  isActive: boolean;
  className?: string;
}

export function AudioVisualizer({ audioLevels, isActive, className = "" }: AudioVisualizerProps) {
  return (
    <div className={`audio-wave ${className}`} data-testid="audio-visualizer">
      {Array.from({ length: 10 }, (_, index) => {
        const level = audioLevels[index] || 0;
        const height = isActive ? Math.max(level, 20) : 20;
        
        return (
          <div
            key={index}
            className="wave-bar"
            style={{
              left: `${(index + 1) * 9}%`,
              height: `${height}%`,
              animationDelay: `${index * 0.1}s`,
              animationPlayState: isActive ? 'running' : 'paused',
            }}
          />
        );
      })}
    </div>
  );
}
