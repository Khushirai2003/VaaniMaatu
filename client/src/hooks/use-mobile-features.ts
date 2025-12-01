import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { App } from '@capacitor/app';

export function useMobileFeatures() {
  const isNative = Capacitor.isNativePlatform();

  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (isNative) {
      await Haptics.impact({ style });
    }
  };

  const setStatusBarStyle = async (style: Style = Style.Dark) => {
    if (isNative) {
      await StatusBar.setStyle({ style });
    }
  };

  const exitApp = async () => {
    if (isNative) {
      await App.exitApp();
    }
  };

  return {
    isNative,
    triggerHaptic,
    setStatusBarStyle,
    exitApp
  };
}