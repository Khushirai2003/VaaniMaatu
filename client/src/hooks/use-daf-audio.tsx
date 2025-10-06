import { useState, useRef, useCallback } from 'react';

interface DAFSettings {
  delayMs: number;
  enabled: boolean;
  volume: number;
}

export function useDAFAudio() {
  const [isActive, setIsActive] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [settings, setSettings] = useState<DAFSettings>({
    delayMs: 150,
    enabled: false,
    volume: 0.8,
  });

  const audioContext = useRef<AudioContext | null>(null);
  const microphone = useRef<MediaStreamAudioSourceNode | null>(null);
  const delayNode = useRef<DelayNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const animationFrame = useRef<number | null>(null);

  const initializeAudio = useCallback(async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        } 
      });

      // Create AudioContext with low latency settings
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        latencyHint: 'interactive',
        sampleRate: 44100,
      });

      // Create audio nodes
      microphone.current = audioContext.current.createMediaStreamSource(stream);
      analyser.current = audioContext.current.createAnalyser();
      delayNode.current = audioContext.current.createDelay(1.0);
      gainNode.current = audioContext.current.createGain();

      // Configure analyser for visualization
      analyser.current.fftSize = 256;
      analyser.current.smoothingTimeConstant = 0.8;

      // Connect audio nodes
      microphone.current.connect(analyser.current);
      microphone.current.connect(delayNode.current);
      delayNode.current.connect(gainNode.current);
      gainNode.current.connect(audioContext.current.destination);

      // Set initial settings
      delayNode.current.delayTime.value = settings.delayMs / 1000;
      gainNode.current.gain.value = settings.volume;

      return true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      return false;
    }
  }, [settings.delayMs, settings.volume]);

  const updateVisualization = useCallback(() => {
    if (!analyser.current) return;

    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.current.getByteFrequencyData(dataArray);

    // Process data for visualization (create 10 bars)
    const barCount = 10;
    const barWidth = Math.floor(bufferLength / barCount);
    const levels = [];

    for (let i = 0; i < barCount; i++) {
      let sum = 0;
      const start = i * barWidth;
      const end = start + barWidth;
      
      for (let j = start; j < end && j < bufferLength; j++) {
        sum += dataArray[j];
      }
      
      const average = sum / barWidth;
      levels.push((average / 255) * 100); // Convert to percentage
    }

    setAudioLevels(levels);

    if (isActive) {
      animationFrame.current = requestAnimationFrame(updateVisualization);
    }
  }, [isActive]);

  const startDAF = useCallback(async () => {
    const initialized = await initializeAudio();
    if (!initialized) return false;

    if (audioContext.current?.state === 'suspended') {
      await audioContext.current.resume();
    }

    setIsActive(true);
    setSettings(prev => ({ ...prev, enabled: true }));
    updateVisualization();
    return true;
  }, [initializeAudio, updateVisualization]);

  const stopDAF = useCallback(() => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }

    setIsActive(false);
    setAudioLevels([]);
    setSettings(prev => ({ ...prev, enabled: false }));
  }, []);

  const updateDelay = useCallback((delayMs: number) => {
    if (delayNode.current) {
      delayNode.current.delayTime.value = delayMs / 1000;
    }
    setSettings(prev => ({ ...prev, delayMs }));
  }, []);

  const updateVolume = useCallback((volume: number) => {
    if (gainNode.current) {
      gainNode.current.gain.value = volume;
    }
    setSettings(prev => ({ ...prev, volume }));
  }, []);

  return {
    isActive,
    audioLevels,
    settings,
    startDAF,
    stopDAF,
    updateDelay,
    updateVolume,
  };
}
