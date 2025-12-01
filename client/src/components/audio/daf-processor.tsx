import { useDAFAudio } from "@/hooks/use-daf-audio";
import { useState, useEffect, useRef } from 'react';
import { AudioVisualizer } from "./audio-visualizer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/hooks/use-language";
import { Mic, Square, Play, Pause } from "lucide-react";

interface DAFProcessorProps {
  onSessionStart?: () => void;
  onSessionEnd?: (duration: number) => void;
  referenceText?: string;
  onCorrectedSentence?: (original: string, corrected: string) => void;
}

export function DAFProcessor({ onSessionStart, onSessionEnd, referenceText, onCorrectedSentence }: DAFProcessorProps) {
  const { t, language } = useLanguage();
  const { isActive, audioLevels, audioAnalysis, settings, hasRecorded, startDAF, stopDAF, updateDelay } = useDAFAudio();
  const [corrected, setCorrected] = useState<{ original: string; corrected: string } | null>(null);
  
  // Voice recording states
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Listen for corrected sentence events
  useEffect(() => {
    const handler = (e: any) => {
      const detail = e.detail || {};
      setCorrected({ original: detail.original || '', corrected: detail.corrected || '' });
      if (onCorrectedSentence) onCorrectedSentence(detail.original || '', detail.corrected || '');
    };
    window.addEventListener('daf.corrected', handler as EventListener);
    return () => window.removeEventListener('daf.corrected', handler as EventListener);
  }, [onCorrectedSentence]);

  const handleStart = async () => {
    console.log('Start button clicked!');
    try {
      // Start DAF
      console.log('Starting DAF...');
      const success = await startDAF(referenceText);
      console.log('DAF started:', success);
      if (!success) {
        console.log('DAF failed to start, using simple recording mode');
        // Fallback: just do recording without DAF
      }
      
      // Start recording simultaneously
      console.log('Starting recording...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('MediaRecorder stopped, chunks:', chunksRef.current.length);
        if (chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          console.log('Created blob:', blob.size, 'bytes');
          const url = URL.createObjectURL(blob);
          console.log('Created audio URL:', url);
          setAudioUrl(url);
        }
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000); // Collect data every second
      console.log('Recording started successfully');
      
      if (onSessionStart) {
        onSessionStart();
      }
    } catch (error) {
      console.error('Error starting DAF and recording:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert('Error: ' + errorMessage);
    }
  };

  const handleStop = () => {
    console.log('Stop button clicked');
    
    // Stop DAF
    stopDAF();
    
    // Stop recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log('Stopping MediaRecorder');
      mediaRecorderRef.current.stop();
    }
    
    if (onSessionEnd) {
      onSessionEnd(0);
    }
  };

  const playRecording = async () => {
    if (audioUrl) {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        
        console.log('Playing audio from URL:', audioUrl);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        // Create audio context for volume boost
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        const audioContext = audioContextRef.current;
        const source = audioContext.createMediaElementSource(audio);
        
        // Create gain node for volume boost
        if (!gainNodeRef.current) {
          gainNodeRef.current = audioContext.createGain();
        }
        
        const gainNode = gainNodeRef.current;
        gainNode.gain.value = 3.0; // Boost volume by 3x
        
        // Connect: source -> gain -> destination
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        audio.volume = 1.0; // Set base volume to maximum
        audio.onloadstart = () => console.log('Audio loading started');
        audio.oncanplay = () => console.log('Audio can play');
        audio.onerror = (e) => console.error('Audio error:', e);
        audio.onended = () => {
          console.log('Audio playback ended');
          setIsPlaying(false);
        };
        
        setIsPlaying(true);
        
        // Resume audio context if suspended
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        
        await audio.play();
        console.log('Audio playback started with volume boost');
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
        alert('Error playing recording: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    } else {
      console.log('No audio URL available');
    }
  };

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg max-h-96 overflow-y-auto"
      style={{
        scrollbarWidth: 'auto',
        scrollbarColor: '#ea580c #fed7aa'
      }}
    >
      <div className="mb-6">
        <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${language === 'kannada' ? 'kannada-text' : ''}`}>
          {t('daf.yourVoiceWave')}
        </h3>
        <p className={`text-gray-600 ${language === 'kannada' ? 'kannada-text' : ''}`}>
          {t('daf.realTimeAudio')}
        </p>
      </div>
      
      <AudioVisualizer 
        audioLevels={audioLevels} 
        isActive={isActive} 
        className="mb-6"
        data-testid="daf-visualizer"
      />

      {/* Audio Analysis Display */}
      {(isActive || hasRecorded) && (
        <div className="mb-6 p-4 bg-muted rounded-xl">
          <h4 className={`text-sm font-semibold mb-3 ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {t('daf.audioAnalysis')}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="fluency-score">
                {audioAnalysis.fluencyScore}%
              </div>
              <div className={`text-xs text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {t('daf.fluency')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600" data-testid="accuracy-score">
                {audioAnalysis.accuracyScore}%
              </div>
              <div className={`text-xs text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {t('daf.accuracy')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600" data-testid="clarity-score">
                {audioAnalysis.clarityScore}%
              </div>
              <div className={`text-xs text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {t('daf.clarity')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600" data-testid="speech-rate">
                {audioAnalysis.speechRate}
              </div>
              <div className={`text-xs text-muted-foreground ${language === 'kannada' ? 'kannada-text' : ''}`}>
                {t('daf.speed')}
              </div>
            </div>
          </div>
          {corrected && (
            <div className="mt-4 p-3 bg-white rounded-md border">
              <div className="text-xs text-muted-foreground">{language === 'kannada' ? 'ನಿಮ್ಮ ವಾಕ್ಯ' : 'Your sentence'}</div>
              <div className="font-medium">{corrected.original}</div>
              <div className="text-xs text-muted-foreground mt-2">{language === 'kannada' ? 'ಸರಿಪಡಿಸಿದ ವಾಕ್ಯ' : 'Corrected sentence'}</div>
              <div className="font-medium text-primary">{corrected.corrected}</div>
            </div>
          )}
        </div>
      )}

      {/* Delay Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className={`text-sm font-medium ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {language === 'kannada' ? 'DAF ವಿಳಂಬ ಹೊಂದಾಣಿಕೆ ಸ್ಲೈಡರ್' : 'DAF Delay Adjustment Slider'}
          </label>
          <span className="text-sm font-semibold text-primary" data-testid="delay-value">
            {settings.delayMs}ms
          </span>
        </div>
        <div className="mb-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
          <p className={`text-xs text-blue-700 text-center ${language === 'kannada' ? 'kannada-text' : ''}`}>
            {language === 'kannada' 
              ? '💡 ಅತ್ಯುತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ 150ms ನಲ್ಲಿ ಇರಿಸಿ'
              : '💡 Keep at 150ms for best results - scientifically proven optimal setting'
            }
          </p>
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
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={handleStart}
          disabled={isActive}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-2xl font-semibold text-lg w-full"
          data-testid="daf-start-button"
        >
          <Mic className="w-5 h-5 mr-2" />
          Start DAF & Record
        </Button>
        <Button 
          onClick={handleStop}
          disabled={!isActive}
          className="bg-pink-300 hover:bg-pink-400 text-gray-700 px-6 py-4 rounded-2xl font-semibold text-lg w-full disabled:opacity-50"
          data-testid="daf-stop-button"
        >
          <Square className="w-5 h-5 mr-2" />
          Stop
        </Button>
      </div>
        
      {/* Playback Controls */}
      {audioUrl && (
        <div className="mt-4 flex items-center justify-center gap-3 p-4 bg-muted rounded-xl">
          <Button
            onClick={isPlaying ? pausePlayback : playRecording}
            variant="outline"
            className="flex items-center gap-2 bg-green-100 hover:bg-green-200 border-green-300"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play Recording'}
          </Button>
          <span className="text-sm text-muted-foreground">
            ✅ Recording saved! Click to listen.
          </span>
        </div>
      )}
    </div>
  );
}
