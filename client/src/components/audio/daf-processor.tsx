import { useDAFAudio } from "@/hooks/use-daf-audio";
import { AudioVisualizer } from "./audio-visualizer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/hooks/use-language";
import { Mic, MicOff, Square } from "lucide-react";

interface DAFProcessorProps {
  onSessionStart?: () => void;
  onSessionEnd?: (duration: number) => void;
}

export function DAFProcessor({ onSessionStart, onSessionEnd }: DAFProcessorProps) {
  const { t } = useLanguage();
  const { isActive, audioLevels, settings, startDAF, stopDAF, updateDelay } = useDAFAudio();

  const handleStart = async () => {
    const success = await startDAF();
    if (success && onSessionStart) {
      onSessionStart();
    }
  };

  const handleStop = () => {
    stopDAF();
    if (onSessionEnd) {
      onSessionEnd(0); // TODO: Track actual session duration
    }
  };

  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 kannada-text">ನಿಮ್ಮ ಧ್ವನಿ ತರಂಗ</h3>
        <p className="text-sm text-muted-foreground kannada-text">ನೈಜ-ಸಮಯದ ಆಡಿಯೊ ದೃಶ್ಯೀಕರಣ</p>
      </div>
      
      <AudioVisualizer 
        audioLevels={audioLevels} 
        isActive={isActive} 
        className="mb-6"
        data-testid="daf-visualizer"
      />

      {/* Delay Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium kannada-text">{t('daf.delay')}</label>
          <span className="text-sm font-semibold text-primary" data-testid="delay-value">
            {settings.delayMs}ms
          </span>
        </div>
        <Slider
          value={[settings.delayMs]}
          onValueChange={(value) => updateDelay(value[0])}
          min={50}
          max={300}
          step={10}
          className="w-full"
          data-testid="delay-slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>50ms</span>
          <span>300ms</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={handleStart}
          disabled={isActive}
          className="btn-primary px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
          data-testid="daf-start-button"
        >
          <Mic className="w-5 h-5" />
          {t('daf.start')}
        </Button>
        <Button 
          onClick={handleStop}
          disabled={!isActive}
          variant="destructive"
          className="px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
          data-testid="daf-stop-button"
        >
          <Square className="w-5 h-5" />
          {t('daf.stop')}
        </Button>
      </div>
    </div>
  );
}
